import { retrieveContext, formatRagContext } from '../src/lib/rag/index.js';

const args = process.argv.slice(2);
const queryIdx = args.indexOf('--query');
const query = queryIdx !== -1 ? args.slice(queryIdx + 1).join(' ') : 'fever and sore throat treatment';

console.log(`[RAG_TEST] Query: "${query}"\n`);

const before = Date.now();
const ctx = await retrieveContext(query);
const elapsed = Date.now() - before;

console.log(`[RAG_TEST] Retrieved ${ctx.results.length} results in ${elapsed}ms\n`);

if (ctx.results.length === 0) {
  console.log('[RAG_TEST] No results. Have you run `npm run rag:fetch:all` to populate data/pubmed/?');
} else {
  ctx.results.forEach((r, i) => {
    console.log(`--- Result ${i + 1} (score: ${r.score.toFixed(2)}) ---`);
    console.log(`Title:    ${r.document.title}`);
    console.log(`Journal:  ${r.document.journal} (${r.document.year})`);
    console.log(`Authors:  ${r.document.authors}`);
    if (r.document.meshTerms.length > 0) {
      console.log(`MeSH:     ${r.document.meshTerms.slice(0, 4).join(', ')}`);
    }
    console.log(`Abstract: ${r.document.abstract.slice(0, 200)}...`);
    console.log();
  });

  console.log('=== FORMATTED CONTEXT (as injected into systemPrompt) ===');
  console.log(formatRagContext(ctx.results));
}
