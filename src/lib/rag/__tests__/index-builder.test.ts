import { describe, it, expect } from 'vitest';
import { buildIndex } from '../index-builder';
import type { PubMedDocument } from '../types';

const sampleDocs: PubMedDocument[] = [
  {
    id: '1',
    title: 'Hypertension Management in Adults',
    abstract: 'This study examines the management of hypertension using ACE inhibitors and beta-blockers. Blood pressure control is essential.',
    authors: 'Smith J, Doe A',
    journal: 'NEJM',
    year: 2023,
    topic: 'cardiology',
    meshTerms: ['Hypertension', 'Antihypertensive Agents', 'Blood Pressure'],
  },
  {
    id: '2',
    title: 'Type 2 Diabetes Treatment Guidelines',
    abstract: 'Metformin remains first-line therapy for type 2 diabetes mellitus. Lifestyle modification alongside pharmacotherapy improves outcomes.',
    authors: 'Lee C, Park K',
    journal: 'JAMA',
    year: 2022,
    topic: 'endocrinology',
    meshTerms: ['Diabetes Mellitus', 'Metformin', 'Insulin Resistance'],
  },
  {
    id: '3',
    title: 'Antibiotic Resistance in Community Infections',
    abstract: 'Resistance to beta-lactam antibiotics is rising. Empirical therapy must consider local resistance patterns.',
    authors: 'Brown M',
    journal: 'Lancet',
    year: 2024,
    topic: 'general',
    meshTerms: ['Drug Resistance', 'Anti-Bacterial Agents', 'Community-Acquired Infections'],
  },
];

describe('buildIndex', () => {
  it('returns an index that finds matching documents by title keyword', () => {
    const index = buildIndex(sampleDocs);
    const results = index.search('hypertension');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('1');
  });

  it('returns an index that finds documents by abstract keyword', () => {
    const index = buildIndex(sampleDocs);
    const results = index.search('metformin');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('2');
  });

  it('returns an index that finds documents by MeSH term', () => {
    const index = buildIndex(sampleDocs);
    const results = index.search('Insulin Resistance');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.id === '2')).toBe(true);
  });

  it('scores title matches higher than abstract-only matches for the same term', () => {
    // "hypertension" appears in the title of doc 1, but doc 2 abstract mentions "beta-blockers" which is not
    // Create a focused test: doc with term in title vs doc with term only in abstract
    const docs: PubMedDocument[] = [
      { ...sampleDocs[0] }, // "Hypertension" in title
      {
        id: '4',
        title: 'Cardiovascular Risk Reduction',
        abstract: 'Managing hypertension is critical for cardiovascular risk reduction.',
        authors: 'Jones R',
        journal: 'BMJ',
        year: 2023,
        topic: 'cardiology',
        meshTerms: [],
      },
    ];
    const index = buildIndex(docs);
    const results = index.search('hypertension');
    expect(results[0].id).toBe('1'); // title match should rank first
  });

  it('handles empty document array', () => {
    const index = buildIndex([]);
    const results = index.search('anything');
    expect(results).toHaveLength(0);
  });

  it('supports prefix matching', () => {
    const index = buildIndex(sampleDocs);
    const results = index.search('hypertens', { prefix: true });
    expect(results.some(r => r.id === '1')).toBe(true);
  });
});
