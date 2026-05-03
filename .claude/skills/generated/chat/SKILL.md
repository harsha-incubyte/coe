---
name: chat
description: "Skill for the Chat area of coe. 5 symbols across 3 files."
---

# Chat

5 symbols | 3 files | Cohesion: 89%

## When to Use

- Working with code in `src/`
- Understanding how formatRagContext, getLLMProvider, POST work
- Modifying chat-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `src/app/api/chat/route.ts` | hashPrompt, POST, getMessageText |
| `src/lib/rag/formatter.ts` | formatRagContext |
| `src/lib/llm/registry.ts` | getLLMProvider |

## Entry Points

Start here when exploring this area:

- **`formatRagContext`** (Function) — `src/lib/rag/formatter.ts:5`
- **`getLLMProvider`** (Function) — `src/lib/llm/registry.ts:13`
- **`POST`** (Function) — `src/app/api/chat/route.ts:35`
- **`getMessageText`** (Function) — `src/app/api/chat/route.ts:65`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `formatRagContext` | Function | `src/lib/rag/formatter.ts` | 5 |
| `getLLMProvider` | Function | `src/lib/llm/registry.ts` | 13 |
| `POST` | Function | `src/app/api/chat/route.ts` | 35 |
| `getMessageText` | Function | `src/app/api/chat/route.ts` | 65 |
| `hashPrompt` | Function | `src/app/api/chat/route.ts` | 10 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `POST → LoadAllDocuments` | cross_community | 5 |
| `POST → BuildIndex` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Rag | 1 calls |

## How to Explore

1. `gitnexus_context({name: "formatRagContext"})` — see callers and callees
2. `gitnexus_query({query: "chat"})` — find related execution flows
3. Read key files listed above for implementation details
