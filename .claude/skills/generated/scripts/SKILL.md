---
name: scripts
description: "Skill for the Scripts area of coe. 7 symbols across 1 files."
---

# Scripts

7 symbols | 1 files | Cohesion: 100%

## When to Use

- Working with code in `scripts/`
- Understanding how sleep, fetchJson, fetchPmids work
- Modifying scripts-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `scripts/fetch-pubmed.ts` | sleep, fetchJson, fetchPmids, fetchSummaries, fetchAbstracts (+2) |

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `sleep` | Function | `scripts/fetch-pubmed.ts` | 23 |
| `fetchJson` | Function | `scripts/fetch-pubmed.ts` | 27 |
| `fetchPmids` | Function | `scripts/fetch-pubmed.ts` | 33 |
| `fetchSummaries` | Function | `scripts/fetch-pubmed.ts` | 40 |
| `fetchAbstracts` | Function | `scripts/fetch-pubmed.ts` | 91 |
| `fetchTopic` | Function | `scripts/fetch-pubmed.ts` | 136 |
| `main` | Function | `scripts/fetch-pubmed.ts` | 156 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Main → FetchJson` | intra_community | 4 |
| `Main → Sleep` | intra_community | 4 |

## How to Explore

1. `gitnexus_context({name: "sleep"})` — see callers and callees
2. `gitnexus_query({query: "scripts"})` — find related execution flows
3. Read key files listed above for implementation details
