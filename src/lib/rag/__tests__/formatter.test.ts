import { describe, it, expect } from 'vitest';
import { formatRagContext } from '../formatter';
import type { RagSearchResult } from '../types';

const makeResult = (overrides?: Partial<RagSearchResult['document']>): RagSearchResult => ({
  score: 5.2,
  document: {
    id: '1',
    title: 'Hypertension Management in Adults',
    abstract: 'A'.repeat(700), // longer than 600 chars to test truncation
    authors: 'Smith J, Doe A',
    journal: 'NEJM',
    year: 2023,
    topic: 'cardiology',
    meshTerms: ['Hypertension', 'Blood Pressure', 'ACE Inhibitors'],
    ...overrides,
  },
});

describe('formatRagContext', () => {
  it('returns empty string for empty results', () => {
    expect(formatRagContext([])).toBe('');
  });

  it('includes section delimiters', () => {
    const output = formatRagContext([makeResult()]);
    expect(output).toContain('---');
    expect(output).toContain('RELEVANT MEDICAL LITERATURE');
  });

  it('includes numbered citation marker', () => {
    const output = formatRagContext([makeResult(), makeResult({ id: '2', title: 'Another Study' })]);
    expect(output).toContain('[1]');
    expect(output).toContain('[2]');
  });

  it('includes title, authors, journal, and year', () => {
    const output = formatRagContext([makeResult()]);
    expect(output).toContain('Hypertension Management in Adults');
    expect(output).toContain('Smith J, Doe A');
    expect(output).toContain('NEJM');
    expect(output).toContain('2023');
  });

  it('truncates abstract at 600 characters', () => {
    const output = formatRagContext([makeResult()]);
    // The abstract is 700 chars, so it should be truncated with '...'
    expect(output).toContain('...');
    const abstractSnippet = 'A'.repeat(600);
    expect(output).toContain(abstractSnippet);
    const tooLong = 'A'.repeat(601);
    // The 601st character should not appear before the truncation marker
    expect(output).not.toContain(tooLong + 'A');
  });

  it('includes MeSH terms when present', () => {
    const output = formatRagContext([makeResult()]);
    expect(output).toContain('MeSH:');
    expect(output).toContain('Hypertension');
  });

  it('omits MeSH line when meshTerms is empty', () => {
    const output = formatRagContext([makeResult({ meshTerms: [] })]);
    expect(output).not.toContain('MeSH:');
  });

  it('includes citation instruction at end', () => {
    const output = formatRagContext([makeResult()]);
    expect(output).toContain('Cite [1]');
  });

  it('limits MeSH terms to first 4', () => {
    const output = formatRagContext([makeResult({ meshTerms: ['TermOne', 'TermTwo', 'TermThree', 'TermFour', 'TermFive'] })]);
    expect(output).not.toContain('TermFive');
    expect(output).toContain('TermFour');
  });
});
