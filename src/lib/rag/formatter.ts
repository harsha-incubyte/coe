import type { RagSearchResult } from './types';

const ABSTRACT_MAX_CHARS = 600;
const MAX_MESH_TERMS = 4;

export function formatRagContext(results: RagSearchResult[]): string {
  if (results.length === 0) return '';

  const citations = results
    .map((r, i) => {
      const doc = r.document;
      const abstractSnippet =
        doc.abstract.length > ABSTRACT_MAX_CHARS
          ? doc.abstract.slice(0, ABSTRACT_MAX_CHARS) + '...'
          : doc.abstract;
      const meshLine =
        doc.meshTerms.length > 0
          ? `    MeSH: ${doc.meshTerms.slice(0, MAX_MESH_TERMS).join(', ')}`
          : null;

      return [
        `[${i + 1}] "${doc.title}" (${doc.journal}, ${doc.year})`,
        `    ${doc.authors}`,
        meshLine,
        `    ${abstractSnippet}`,
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n');

  return [
    '',
    '---',
    'RELEVANT MEDICAL LITERATURE (retrieved from PubMed):',
    '',
    citations,
    '',
    '---',
    'Use the above evidence to ground your response. Cite [1], [2], etc. where applicable.',
  ].join('\n');
}
