export interface PubMedDocument {
  id: string;
  title: string;
  abstract: string;
  authors: string;
  journal: string;
  year: number;
  topic: string;
  meshTerms: string[];
}

export interface RagSearchResult {
  document: PubMedDocument;
  score: number;
}

export interface RagContext {
  results: RagSearchResult[];
  query: string;
  retrievedAt: number;
}
