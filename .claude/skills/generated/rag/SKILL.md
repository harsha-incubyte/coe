---
name: rag
description: "Skill for the Rag area of coe. 5 symbols across 2 files."
---

# Rag

5 symbols | 2 files | Cohesion: 89%

## When to Use

- Working with code in `src/`
- Understanding how retrieveContext, buildIndex work
- Modifying rag-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `src/lib/rag/retriever.ts` | loadAllDocuments, initIndex, ensureIndex, retrieveContext |
| `src/lib/rag/index-builder.ts` | buildIndex |

## Entry Points

Start here when exploring this area:

- **`retrieveContext`** (Function) — `src/lib/rag/retriever.ts:54`
- **`buildIndex`** (Function) — `src/lib/rag/index-builder.ts:15`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `retrieveContext` | Function | `src/lib/rag/retriever.ts` | 54 |
| `buildIndex` | Function | `src/lib/rag/index-builder.ts` | 15 |
| `loadAllDocuments` | Function | `src/lib/rag/retriever.ts` | 22 |
| `initIndex` | Function | `src/lib/rag/retriever.ts` | 35 |
| `ensureIndex` | Function | `src/lib/rag/retriever.ts` | 41 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `POST → LoadAllDocuments` | cross_community | 5 |
| `POST → BuildIndex` | cross_community | 5 |

## How to Explore

1. `gitnexus_context({name: "retrieveContext"})` — see callers and callees
2. `gitnexus_query({query: "rag"})` — find related execution flows
3. Read key files listed above for implementation details
