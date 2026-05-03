---
name: toast
description: "Skill for the Toast area of coe. 5 symbols across 2 files."
---

# Toast

5 symbols | 2 files | Cohesion: 100%

## When to Use

- Working with code in `src/`
- Understanding how ToastContainer, removeToast, handleShowToast work
- Modifying toast-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `src/design-system/molecules/Toast/ToastContainer.tsx` | ToastContainer, removeToast, handleShowToast |
| `src/design-system/molecules/Toast/Toast.tsx` | getIcon, Toast |

## Entry Points

Start here when exploring this area:

- **`ToastContainer`** (Function) — `src/design-system/molecules/Toast/ToastContainer.tsx:19`
- **`removeToast`** (Function) — `src/design-system/molecules/Toast/ToastContainer.tsx:23`
- **`handleShowToast`** (Function) — `src/design-system/molecules/Toast/ToastContainer.tsx:33`
- **`Toast`** (Function) — `src/design-system/molecules/Toast/Toast.tsx:97`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `ToastContainer` | Function | `src/design-system/molecules/Toast/ToastContainer.tsx` | 19 |
| `removeToast` | Function | `src/design-system/molecules/Toast/ToastContainer.tsx` | 23 |
| `handleShowToast` | Function | `src/design-system/molecules/Toast/ToastContainer.tsx` | 33 |
| `Toast` | Function | `src/design-system/molecules/Toast/Toast.tsx` | 97 |
| `getIcon` | Function | `src/design-system/molecules/Toast/Toast.tsx` | 12 |

## How to Explore

1. `gitnexus_context({name: "ToastContainer"})` — see callers and callees
2. `gitnexus_query({query: "toast"})` — find related execution flows
3. Read key files listed above for implementation details
