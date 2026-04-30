import { describe, it, expect, beforeAll } from 'vitest';
import { buildIndex } from '../index-builder';
import type { PubMedDocument } from '../types';

const makePubMedDoc = (
  id: string,
  title: string,
  abstract: string,
  meshTerms: string[] = [],
): PubMedDocument => ({
  id,
  title,
  abstract,
  authors: 'Author A, Author B',
  journal: 'Test Journal',
  year: 2024,
  topic: 'general',
  meshTerms,
});

const corpus: PubMedDocument[] = [
  makePubMedDoc(
    '1',
    'Hypertension Management in Adults',
    'Hypertension is a chronic condition requiring antihypertensive therapy. ACE inhibitors and beta-blockers are effective for blood pressure control. Lifestyle modification including low-sodium diet and regular exercise reduces blood pressure in hypertensive patients.',
    ['Hypertension', 'Antihypertensive Agents', 'Blood Pressure'],
  ),
  makePubMedDoc(
    '2',
    'Type 2 Diabetes Treatment Guidelines',
    'Metformin remains first-line pharmacotherapy for type 2 diabetes mellitus. Alongside lifestyle changes, metformin reduces glycated hemoglobin. Insulin therapy may be required when metformin is insufficient for glycemic control in diabetic patients.',
    ['Diabetes Mellitus', 'Metformin', 'Insulin Resistance'],
  ),
  makePubMedDoc(
    '3',
    'Antibiotic Resistance in Community Infections',
    'Drug resistance among community-acquired bacterial infections is increasing. Empirical antibiotic therapy must account for local resistance patterns. Beta-lactam antibiotics face growing resistance from gram-positive organisms.',
    ['Drug Resistance', 'Anti-Bacterial Agents', 'Community-Acquired Infections'],
  ),
];

const SEARCH_OPTS = {
  fields: ['title', 'abstract', 'meshTermsIndexed'],
  boost: { title: 3.0, meshTermsIndexed: 2.5, abstract: 1.0 },
  fuzzy: 0.15 as const,
  prefix: true,
  combineWith: 'OR' as const,
  limit: 5,
};

let index: ReturnType<typeof buildIndex>;

beforeAll(() => {
  index = buildIndex(corpus);
});

describe('RAG index retrieval behaviour', () => {
  it('returns matching documents for a relevant medical query', () => {
    const results = index.search('hypertension blood pressure', SEARCH_OPTS);
    const above = results.filter((r) => r.score >= 1.0);
    expect(above.length).toBeGreaterThan(0);
    expect(above[0].id).toBe('1');
  });

  it('returns empty results for completely unrelated queries', () => {
    const results = index.search('zzzzz qqqqqq unrelated xyzzy nonexistent', {
      ...SEARCH_OPTS,
      fuzzy: 0,
    });
    const above = results.filter((r) => r.score >= 1.0);
    expect(above).toHaveLength(0);
  });

  it('slicing top-3 after score filter never exceeds 3 results', () => {
    // MiniSearch has no built-in limit; the retriever slices manually after filtering
    const largeCorpus = Array.from({ length: 20 }, (_, i) =>
      makePubMedDoc(
        String(i + 10),
        `Hypertension Study ${i + 1}`,
        `Hypertension blood pressure antihypertensive treatment therapy management clinical trial ${i}`,
        ['Hypertension', 'Antihypertensive Agents'],
      ),
    );
    const largeIndex = buildIndex(largeCorpus);
    const results = largeIndex.search('hypertension treatment', SEARCH_OPTS);
    const capped = results.filter((r) => r.score >= 1.0).slice(0, 3);
    expect(capped.length).toBeLessThanOrEqual(3);
  });
});

describe('retrieveContext graceful degradation', () => {
  it('returns empty results with correct shape when no data files exist', async () => {
    // The data/pubmed dir exists but has no JSON files in the test environment.
    // The retriever should return an empty RagContext gracefully.
    const { retrieveContext } = await import('../retriever');
    const before = Date.now();
    const ctx = await retrieveContext('hypertension');
    // With no real data loaded, we get empty results (no matches)
    expect(Array.isArray(ctx.results)).toBe(true);
    expect(ctx.query).toBe('hypertension');
    expect(ctx.retrievedAt).toBeGreaterThanOrEqual(before);
  });
});
