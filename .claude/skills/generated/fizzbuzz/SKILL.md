---
name: fizzbuzz
description: "Skill for the FizzBuzz area of coe. 3 symbols across 2 files."
---

# FizzBuzz

3 symbols | 2 files | Cohesion: 100%

## When to Use

- Working with code in `src/`
- Understanding how fizzBuzz work
- Modifying fizzbuzz-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `src/components/FizzBuzz/FizzBuzzUI.tsx` | FizzBuzzUI, generateSequence |
| `src/lib/fizzbuzz/fizzbuzz.ts` | fizzBuzz |

## Entry Points

Start here when exploring this area:

- **`fizzBuzz`** (Function) — `src/lib/fizzbuzz/fizzbuzz.ts:0`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `fizzBuzz` | Function | `src/lib/fizzbuzz/fizzbuzz.ts` | 0 |
| `FizzBuzzUI` | Function | `src/components/FizzBuzz/FizzBuzzUI.tsx` | 5 |
| `generateSequence` | Function | `src/components/FizzBuzz/FizzBuzzUI.tsx` | 13 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `FizzBuzzUI → FizzBuzz` | intra_community | 3 |

## How to Explore

1. `gitnexus_context({name: "fizzBuzz"})` — see callers and callees
2. `gitnexus_query({query: "fizzbuzz"})` — find related execution flows
3. Read key files listed above for implementation details
