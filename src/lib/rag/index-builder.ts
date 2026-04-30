import MiniSearch from 'minisearch';
import type { PubMedDocument } from './types';

interface IndexableDoc {
  id: string;
  title: string;
  abstract: string;
  meshTermsIndexed: string; // joined string for indexing
  authors: string;
  journal: string;
  year: number;
  topic: string;
  meshTerms: string[]; // original array for retrieval
}

export function buildIndex(documents: PubMedDocument[]): MiniSearch<IndexableDoc> {
  const index = new MiniSearch<IndexableDoc>({
    fields: ['title', 'abstract', 'meshTermsIndexed'],
    storeFields: ['id', 'title', 'abstract', 'authors', 'journal', 'year', 'topic', 'meshTerms'],
    idField: 'id',
    tokenize: (text) =>
      text
        .toLowerCase()
        .split(/[\s,;:()[\]/\-.]+/)
        .filter((t) => t.length > 2),
    processTerm: (term) => term,
  });

  const indexable: IndexableDoc[] = documents.map((d) => ({
    ...d,
    meshTermsIndexed: d.meshTerms.join(' '),
  }));

  index.addAll(indexable);
  return index;
}
