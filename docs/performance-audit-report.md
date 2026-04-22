# Performance Audit and Structural Refactor Plan

This document outlines the findings from the Phase 1 Lighthouse performance audit and the strategy for implementing aggressive Code Splitting and Shared Component Extraction to optimize the React/TypeScript application.

## 1. Audit Findings Summary

Headless Lighthouse audits were executed locally on port `5173` across all 8 application routes. The tests yielded highly consistent metrics across the entire application:

| Route | Largest Contentful Paint (LCP) | Total Blocking Time (TBT) |
|---|---|---|
| `/day-01` | 23.9s | 8.5ms |
| `/day-02` | 23.7s | 10.0ms |
| `/day-03` | 23.6s | 12.0ms |
| `/day-04` | 23.6s | 10.0ms |
| `/day-05` | 23.6s | 9.5ms |
| `/day-06` | 24.0s | 8.0ms |
| `/day-07` | 23.5s | 30.5ms |
| `/day-08` | 23.6s | 10.0ms |

### Analysis
- **Total Blocking Time (TBT)**: Consistently low across all routes (< 31ms), indicating excellent Javascript main-thread execution on interaction. The runtime component logic is lightweight.
- **Largest Contentful Paint (LCP)**: Extremely degraded (averaging nearly 24 seconds locally). 

> [!WARNING]
> The massive LCP is a clear indicator that the initial payload needs aggressive trimming. The application is pushing down a massive, bloated initial javascript main chunk instead of serving split routes. As the application is slated to receive two massive new routes, doubling down on code-splitting is the highest priority.

---

## 2. Refactoring Implementation Plan

### Phase 2.1: Dynamic Import Conversions (Aggressive Code Splitting)

Currently, the outer layer of `App.tsx` lazy-loads the top-level routes (`Day01` to `Day08`), but the internal structure of these routes statically imports heavy components, forcing them into the unified initial chunk. 

- [x] **Day 03**: Convert `ArticleCardBad` and `ArticleCardGood` static imports to `lazy()` with a `Suspense` wrapper.
- [x] **Day 06**: Dynamically import the `Wizard` multi-step form to prevent its logic from loading upfront.
- [x] **Day 02**: Apply lazy loading to the heavy `WeatherTabs` and `WeatherIllustration` SVGs.

### Phase 2.2: Tree-Shaking Improvements

The central `design-system` architecture uses aggressive barrel exports (`index.ts`). A lack of explicit `sideEffects` configuration prevents robust tree-shaking by modern bundlers like Vite/Rollup.

- [x] **`package.json`**: Add `"sideEffects": false` (or explicitly scope to preserve CSS) to allow the Vite module graph to aggressively drop unused components imported from `index.ts` barrel files. 
- [x] **`App.tsx`**: Standardize any explicit named imports across the root.

### Phase 2.3: TypeScript Interface Optimizations

Currently, thick components hold multiple inline `interface` declarations for their configurations and properties. Extracting these standardizes `import type { XYZ }` usage and drastically cuts down TypeScript compilation bloat.

- [x] **Tabs Module**: Extract 5+ inline interfaces (`TabsContextValue`, `TabsProps`, `TabTriggerProps`, etc.) from `Tabs.tsx` into a dedicated `Tabs.types.ts` module.
- [x] **Modal Module**: Extract props for `Modal`, `ModalHeader`, `ModalFooter` to a centralized `Modal.types.ts`.
- [x] **Weather Domain**: Extract domain interfaces like `WeatherData` and `Suggestion` into `Weather.types.ts`.

---

## 3. Verification Plan

1. [x] Run `npm run build` locally before and after the refactor to directly compare the generated chunk sizes and verify that dead-code elimination was successful.
2. [x] Run standard testing suite (`npm run test:run` and `npm run cy:run`) to ensure no broken standard imports or unhandled `Suspense` boundaries have slipped into the codebase.
3. [x] Execute a follow-up CLI headless Lighthouse audit on `http://localhost:5173/day-03` to verify the module graph drops the LCP time significantly.
