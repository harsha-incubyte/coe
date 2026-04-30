import fs from 'fs/promises';
import path from 'path';
import { PubMedDocument } from '../src/lib/rag/types.js';

const BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const API_KEY = process.env.NCBI_API_KEY ?? '';
// NCBI rate limit: 3 req/s without key, 10/s with key
const DELAY_MS = API_KEY ? 150 : 400;

const TOPIC_QUERIES: Record<string, string> = {
  'general': 'general medicine[MeSH] AND english[Language] AND hasabstract[text]',
  'symptom-diagnosis': 'signs and symptoms[MeSH] AND diagnosis[MeSH] AND english[Language] AND hasabstract[text]',
  'pharmacology': 'drug interactions[MeSH] AND pharmacology[MeSH] AND english[Language] AND hasabstract[text]',
  'emergency': 'emergency medicine[MeSH] AND triage[MeSH] AND english[Language] AND hasabstract[text]',
  'cardiology': 'cardiology[MeSH] AND cardiovascular diseases[MeSH] AND english[Language] AND hasabstract[text]',
  'oncology': 'neoplasms[MeSH] AND oncology[MeSH] AND english[Language] AND hasabstract[text]',
  'neurology': 'neurology[MeSH] AND nervous system diseases[MeSH] AND english[Language] AND hasabstract[text]',
  'endocrinology': 'endocrine system diseases[MeSH] AND endocrinology[MeSH] AND english[Language] AND hasabstract[text]',
};

const DATA_DIR = path.resolve(process.cwd(), 'data/pubmed');
const apiParam = API_KEY ? `&api_key=${API_KEY}` : '';

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

async function fetchPmids(topic: string, count: number): Promise<string[]> {
  const query = encodeURIComponent(TOPIC_QUERIES[topic]);
  const url = `${BASE_URL}/esearch.fcgi?db=pubmed&term=${query}&retmax=${count}&retmode=json&sort=relevance${apiParam}`;
  const data = (await fetchJson(url)) as { esearchresult: { idlist: string[] } };
  return data.esearchresult.idlist;
}

async function fetchSummaries(pmids: string[], topic: string): Promise<PubMedDocument[]> {
  const docs: PubMedDocument[] = [];
  const batchSize = 20;

  for (let i = 0; i < pmids.length; i += batchSize) {
    const batch = pmids.slice(i, i + batchSize);
    const ids = batch.join(',');
    const url = `${BASE_URL}/esummary.fcgi?db=pubmed&id=${ids}&retmode=json${apiParam}`;

    try {
      const data = (await fetchJson(url)) as {
        result: Record<string, {
          uid: string;
          title: string;
          authors?: Array<{ name: string }>;
          fulljournalname?: string;
          pubdate?: string;
          error?: string;
        }>;
      };

      for (const pmid of batch) {
        const entry = data.result[pmid];
        if (!entry || entry.error) continue;

        const year = parseInt(entry.pubdate?.split(' ')[0] ?? '0', 10) || 0;
        const authors = (entry.authors ?? []).map((a) => a.name).slice(0, 3).join(', ');
        const journal = entry.fulljournalname ?? '';

        // esummary does not include abstract text; we fetch abstracts separately
        docs.push({
          id: pmid,
          title: entry.title ?? '',
          abstract: '', // filled in next step
          authors,
          journal,
          year,
          topic,
          meshTerms: [],
        });
      }
    } catch (err) {
      console.warn(`[RAG] Batch ${i / batchSize + 1} summary failed:`, err);
    }

    await sleep(DELAY_MS);
  }

  return docs;
}

async function fetchAbstracts(docs: PubMedDocument[]): Promise<PubMedDocument[]> {
  const batchSize = 20;
  const result = [...docs];

  for (let i = 0; i < result.length; i += batchSize) {
    const batch = result.slice(i, i + batchSize);
    const ids = batch.map((d) => d.id).join(',');
    const url = `${BASE_URL}/efetch.fcgi?db=pubmed&id=${ids}&rettype=abstract&retmode=xml${apiParam}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const xml = await res.text();

      // Extract AbstractText and MeshHeading from PubMed XML
      for (let j = 0; j < batch.length; j++) {
        const pmid = batch[j].id;
        // Simple regex extraction (sufficient for static data building)
        const abstractMatch = xml.match(
          new RegExp(`<PMID[^>]*>${pmid}</PMID>[\\s\\S]*?<AbstractText[^>]*>([\\s\\S]*?)</AbstractText>`),
        );
        const abstract = abstractMatch
          ? abstractMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
          : '';

        // Extract MeSH terms
        const meshMatches = [...xml.matchAll(/<DescriptorName[^>]*>([^<]+)<\/DescriptorName>/g)];
        const meshTerms = meshMatches.slice(0, 10).map((m) => m[1].trim());

        const docIndex = result.findIndex((d) => d.id === pmid);
        if (docIndex !== -1) {
          result[docIndex] = { ...result[docIndex], abstract, meshTerms };
        }
      }
    } catch (err) {
      console.warn(`[RAG] Batch ${i / batchSize + 1} abstract fetch failed:`, err);
    }

    await sleep(DELAY_MS);
  }

  // Filter out docs with empty abstracts (not useful for RAG)
  return result.filter((d) => d.abstract.length > 50);
}

async function fetchTopic(topic: string, count: number) {
  console.log(`[RAG] Fetching topic: ${topic} (${count} articles)`);

  const pmids = await fetchPmids(topic, count);
  console.log(`[RAG]   Found ${pmids.length} PMIDs`);
  await sleep(DELAY_MS);

  const summaries = await fetchSummaries(pmids, topic);
  console.log(`[RAG]   Got ${summaries.length} summaries`);

  const withAbstracts = await fetchAbstracts(summaries);
  console.log(`[RAG]   Got ${withAbstracts.length} documents with abstracts`);

  const outPath = path.join(DATA_DIR, `${topic}.json`);
  await fs.writeFile(outPath, JSON.stringify(withAbstracts, null, 2));
  console.log(`[RAG]   Written to ${outPath}`);

  return withAbstracts.length;
}

async function main() {
  const args = process.argv.slice(2);
  const allFlag = args.includes('--all');
  const countIdx = args.indexOf('--count');
  const count = countIdx !== -1 ? parseInt(args[countIdx + 1], 10) : 60;
  const topicIdx = args.indexOf('--topic');
  const topicArg = topicIdx !== -1 ? args[topicIdx + 1] : null;

  const topics = allFlag
    ? Object.keys(TOPIC_QUERIES)
    : topicArg
      ? [topicArg]
      : Object.keys(TOPIC_QUERIES).slice(0, 1);

  if (topicArg && !TOPIC_QUERIES[topicArg]) {
    console.error(`Unknown topic: ${topicArg}. Valid topics: ${Object.keys(TOPIC_QUERIES).join(', ')}`);
    process.exit(1);
  }

  await fs.mkdir(DATA_DIR, { recursive: true });

  let total = 0;
  for (const topic of topics) {
    total += await fetchTopic(topic, count);
    if (topics.length > 1) await sleep(DELAY_MS * 2);
  }

  console.log(`[RAG] Done. Total documents: ${total}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
