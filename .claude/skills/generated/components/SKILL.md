---
name: components
description: "Skill for the Components area of coe. 9 symbols across 3 files."
---

# Components

9 symbols | 3 files | Cohesion: 100%

## When to Use

- Working with code in `src/`
- Understanding how ChatInput, setMessage, handleSend work
- Modifying components-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `src/views/Day10/components/ChatInput.tsx` | ChatInput, setMessage, handleSend, handleKeyDown |
| `src/views/Day09/components/ChatInput.tsx` | ChatInput, handleSend, handleKeyDown |
| `src/views/Day02/Weather/components/WeatherIllustration.tsx` | WeatherIllustration, getSkyColor |

## Entry Points

Start here when exploring this area:

- **`ChatInput`** (Function) — `src/views/Day10/components/ChatInput.tsx:11`
- **`setMessage`** (Function) — `src/views/Day10/components/ChatInput.tsx:19`
- **`handleSend`** (Function) — `src/views/Day10/components/ChatInput.tsx:39`
- **`handleKeyDown`** (Function) — `src/views/Day10/components/ChatInput.tsx:56`
- **`ChatInput`** (Function) — `src/views/Day09/components/ChatInput.tsx:8`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `ChatInput` | Function | `src/views/Day10/components/ChatInput.tsx` | 11 |
| `setMessage` | Function | `src/views/Day10/components/ChatInput.tsx` | 19 |
| `handleSend` | Function | `src/views/Day10/components/ChatInput.tsx` | 39 |
| `handleKeyDown` | Function | `src/views/Day10/components/ChatInput.tsx` | 56 |
| `ChatInput` | Function | `src/views/Day09/components/ChatInput.tsx` | 8 |
| `handleSend` | Function | `src/views/Day09/components/ChatInput.tsx` | 21 |
| `handleKeyDown` | Function | `src/views/Day09/components/ChatInput.tsx` | 38 |
| `WeatherIllustration` | Function | `src/views/Day02/Weather/components/WeatherIllustration.tsx` | 11 |
| `getSkyColor` | Function | `src/views/Day02/Weather/components/WeatherIllustration.tsx` | 12 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `HandleKeyDown → SetMessage` | intra_community | 3 |
| `HandleKeyDown → SetMessage` | intra_community | 3 |

## How to Explore

1. `gitnexus_context({name: "ChatInput"})` — see callers and callees
2. `gitnexus_query({query: "components"})` — find related execution flows
3. Read key files listed above for implementation details
