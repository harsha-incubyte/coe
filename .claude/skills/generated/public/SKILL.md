---
name: public
description: "Skill for the Public area of coe. 7 symbols across 1 files."
---

# Public

7 symbols | 1 files | Cohesion: 100%

## When to Use

- Working with code in `public/`
- Understanding how handleRequest, resolveMainClient, getResponse work
- Modifying public-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `public/mockServiceWorker.js` | handleRequest, resolveMainClient, getResponse, passthrough, sendToClient (+2) |

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `handleRequest` | Function | `public/mockServiceWorker.js` | 123 |
| `resolveMainClient` | Function | `public/mockServiceWorker.js` | 176 |
| `getResponse` | Function | `public/mockServiceWorker.js` | 210 |
| `passthrough` | Function | `public/mockServiceWorker.js` | 215 |
| `sendToClient` | Function | `public/mockServiceWorker.js` | 287 |
| `respondWithMock` | Function | `public/mockServiceWorker.js` | 310 |
| `serializeRequest` | Function | `public/mockServiceWorker.js` | 332 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `HandleRequest → Passthrough` | intra_community | 3 |
| `HandleRequest → SerializeRequest` | intra_community | 3 |
| `HandleRequest → SendToClient` | intra_community | 3 |
| `HandleRequest → RespondWithMock` | intra_community | 3 |

## How to Explore

1. `gitnexus_context({name: "handleRequest"})` — see callers and callees
2. `gitnexus_query({query: "public"})` — find related execution flows
3. Read key files listed above for implementation details
