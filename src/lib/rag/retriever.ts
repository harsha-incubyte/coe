import { readdir, readFile } from 'fs/promises';
import path from 'path';
import type MiniSearch from 'minisearch';
import { buildIndex } from './index-builder';
import { formatRagContext } from './formatter';
import type { PubMedDocument, RagContext, RagSearchResult } from './types';

const DATA_DIR = path.resolve(process.cwd(), 'data/pubmed');
const TOP_K = 3;
const MIN_SCORE = 1.0;

const SEARCH_OPTIONS = {
  fields: ['title', 'abstract', 'meshTermsIndexed'],
  boost: { title: 3.0, meshTermsIndexed: 2.5, abstract: 1.0 },
  fuzzy: 0.15 as const,
  prefix: true,
  combineWith: 'OR' as const,
};

let _index: MiniSearch | null = null;
let _initPromise: Promise<void> | null = null;

async function loadAllDocuments(): Promise<PubMedDocument[]> {
  const files = await readdir(DATA_DIR);
  const jsonFiles = files.filter((f: string) => f.endsWith('.json'));
  const docs: PubMedDocument[] = [];
  for (const file of jsonFiles) {
    const raw = await readFile(path.join(DATA_DIR, file), 'utf-8');
    const parsed = JSON.parse(raw as string);
    if (Array.isArray(parsed)) docs.push(...parsed);
  }
  console.log(`[RAG] Loaded ${docs.length} documents from ${jsonFiles.length} topic files`);
  return docs;
}

async function initIndex(): Promise<void> {
  const docs = await loadAllDocuments();
  _index = buildIndex(docs);
  console.log(`[RAG] Index built with ${docs.length} documents`);
}

async function ensureIndex(): Promise<MiniSearch> {
  if (_index) return _index;
  if (!_initPromise) {
    _initPromise = initIndex().catch((err) => {
      console.error('[RAG] Index initialization failed:', err.message);
      _initPromise = null;
      throw err;
    });
  }
  await _initPromise;
  return _index!;
}

export async function retrieveContext(query: string): Promise<RagContext> {
  try {
    const index = await ensureIndex();
    const rawResults = index.search(query, SEARCH_OPTIONS);
    const results: RagSearchResult[] = rawResults
      .filter((r: { score: number }) => r.score >= MIN_SCORE)
      .slice(0, TOP_K)
      .map((r: Record<string, unknown>) => ({
        document: r as unknown as PubMedDocument,
        score: r.score as number,
      }));

    console.log(
      `[RAG] Query: "${query.slice(0, 60)}" → ${results.length} results`,
    );
    return { results, query, retrievedAt: Date.now() };
  } catch {
    return { results: [], query, retrievedAt: Date.now() };
  }
}

export { formatRagContext };
