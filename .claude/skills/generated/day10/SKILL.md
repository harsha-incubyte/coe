---
name: day10
description: "Skill for the Day10 area of coe. 13 symbols across 6 files."
---

# Day10

13 symbols | 6 files | Cohesion: 100%

## When to Use

- Working with code in `src/`
- Understanding how showToast, Navbar, handleLogout work
- Modifying day10-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `src/views/Day10/index.tsx` | Day10, handleNewConversation, handleDeleteConversation, handleSendMessage |
| `src/design-system/organisms/LoginForm/LoginForm.tsx` | validateEmail, validatePassword, handleSubmit |
| `src/views/Day04/index.tsx` | Day04, handleFormSubmit |
| `src/design-system/organisms/Navbar/Navbar.tsx` | Navbar, handleLogout |
| `src/hooks/useToast.ts` | showToast |
| `src/views/Day08/index.tsx` | MoleculesShowcase |

## Entry Points

Start here when exploring this area:

- **`showToast`** (Function) — `src/hooks/useToast.ts:12`
- **`Navbar`** (Function) — `src/design-system/organisms/Navbar/Navbar.tsx:167`
- **`handleLogout`** (Function) — `src/design-system/organisms/Navbar/Navbar.tsx:175`
- **`validateEmail`** (Function) — `src/design-system/organisms/LoginForm/LoginForm.tsx:37`
- **`validatePassword`** (Function) — `src/design-system/organisms/LoginForm/LoginForm.tsx:38`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `showToast` | Function | `src/hooks/useToast.ts` | 12 |
| `Navbar` | Function | `src/design-system/organisms/Navbar/Navbar.tsx` | 167 |
| `handleLogout` | Function | `src/design-system/organisms/Navbar/Navbar.tsx` | 175 |
| `validateEmail` | Function | `src/design-system/organisms/LoginForm/LoginForm.tsx` | 37 |
| `validatePassword` | Function | `src/design-system/organisms/LoginForm/LoginForm.tsx` | 38 |
| `handleSubmit` | Function | `src/design-system/organisms/LoginForm/LoginForm.tsx` | 40 |
| `Day10` | Function | `src/views/Day10/index.tsx` | 28 |
| `handleNewConversation` | Function | `src/views/Day10/index.tsx` | 226 |
| `handleDeleteConversation` | Function | `src/views/Day10/index.tsx` | 239 |
| `handleSendMessage` | Function | `src/views/Day10/index.tsx` | 262 |
| `MoleculesShowcase` | Function | `src/views/Day08/index.tsx` | 83 |
| `Day04` | Function | `src/views/Day04/index.tsx` | 11 |
| `handleFormSubmit` | Function | `src/views/Day04/index.tsx` | 17 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Navbar → ShowToast` | intra_community | 3 |

## How to Explore

1. `gitnexus_context({name: "showToast"})` — see callers and callees
2. `gitnexus_query({query: "day10"})` — find related execution flows
3. Read key files listed above for implementation details
