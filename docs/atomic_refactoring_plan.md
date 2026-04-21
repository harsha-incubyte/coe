# Multi-Conversation Refactoring Plan: Styled-Components Atomic Design System

To successfully and reliably execute this refactor using Gemini 3 Flash in Fast mode, the task must be broken down into discrete, highly context-specific chunks. While Gemini 3 Flash has an enormous context window (up to 2 million tokens) and can easily "read" the entire codebase, breaking the task down into smaller chunks significantly improves its reasoning, reduces hallucinations during complex architecture migrations, and ensures it can follow a strict, incremental Test-Driven Development (TDD) loop.

For the **best, error-free results**, start a **new individual conversation for each Phase below**, and copy-paste the "Instructions for Agent" alongside the "Target Files" to the Flash model.

## Core Directives for Agent (Apply to ALL Phases)
1. **Strict TDD & Commit Conventional**: You must adhere strictly to the Red-Green-Refactor loop. 
2. **Incremental Commits**: Commit your work incrementally at each TDD step using the project's standard unicode markers:
   - 🔴 `test(scope): write failing test or break existing test for new requirements`
   - 🟢 `feat(scope): implementation that makes tests pass`
   - ♻️ `refactor(scope): refactoring passing code for maintainability/cleanup`
3. **WCAG Compliance**: Run `pa11y-ci` and `cypress-axe` to guarantee zero regressions.

---

## Phase 1: Global Styles Migration

**Prompt / Instructions for Agent:**
> Your task is to refactor global layout CSS into styled-components using a strict TDD approach.
> 1. Write or update tests in `MainLayout.test.tsx` to assert new styled-component behaviors/renders (Commit 🔴).
> 2. Move semantic global styling from `App.css` into `src/design-system/theme/GlobalStyles.ts` and convert `MainLayout.css` into styled components in `src/layouts/MainLayout.styles.ts`. Update usages. Ensure tests pass (Commit 🟢).
> 3. Delete `src/App.css` and `src/layouts/MainLayout.css` and clean usages (Commit ♻️).
> 4. Verify by running `npm run test -- MainLayout` and `npm run test:a11y:ci`.

**Target Files:**
- `src/App.tsx`, `src/App.css`
- `src/index.css`, `src/design-system/theme/GlobalStyles.ts`
- `src/layouts/MainLayout.tsx`, `src/layouts/MainLayout.styles.ts`, `src/layouts/MainLayout.test.tsx`
- `src/layouts/MainLayout.css`

---

## Phase 2: Legacy Component Deletion Extravaganza

**Prompt / Instructions for Agent:**
> Your task is to purge outdated legacy components that duplicate atomic design components using incremental commits.
> 1. Identify usage of `src/components/Spinner`, `src/components/Modal`, `src/components/Tabs`, `src/components/Toast`, and `src/components/Navbar`.
> 2. For each component replaced, update the parent's tests to expect the new `design-system` API structure, causing them to fail (Commit 🔴).
> 3. Replace the legacy imports to point towards the robust `design-system/` counterparts to make tests pass (Commit 🟢).
> 4. Delete the updated legacy directories entirely from `src/components/`. (Commit ♻️).
> 5. Run the full unit test suite `npm run test:run` to verify that no broken imports remain.

**Target Files:**
- Entire `src/` directory (searching for specific import paths)
- `src/components/Spinner`, `src/components/Modal`, `src/components/Tabs`, `src/components/Toast`, `src/components/Navbar` (To be deleted)

---

## Phase 3: Day04 UI Refactor

**Prompt / Instructions for Agent:**
> Your task is to refactor Day04 to use atomic styled-components instead of vanilla CSS using TDD.
> 1. Update `Day04.test.tsx` and `day04.cy.js` to assert the presence of specific Atomic Component structures/roles (Commit 🔴).
> 2. Migrate vanilla CSS from `Day04.css` into `Day04.styles.ts`. Swap native elements in `Day04/index.tsx` with atomic components (`Button`, `Input`). Ensure WCAG aria-labels are present. Make tests pass (Commit 🟢).
> 3. Delete `Day04.css` and clean up logic (Commit ♻️).
> 4. Verify UI and tests by running `npx cypress run --spec cypress/e2e/day04.cy.js` and `npm run test -- Day04`.

**Target Files:**
- `src/pages/Day04/index.tsx`, `src/pages/Day04/Day04.css`, `src/pages/Day04/Day04.styles.ts`
- `cypress/e2e/day04.cy.js`

---

## Phase 4: Day05 UI Refactor

**Prompt / Instructions for Agent:**
> Your task is to refactor Day05 using a TDD styled-components approach.
> 1. Update Cypress Day05 specs to fail for new expected accessibility and styling roles (Commit 🔴).
> 2. Migrate styles from `Day05.css` into `Day05.styles.ts` and apply atomic tokens on `Day05.tsx`. Fix accessibility components to make tests pass (Commit 🟢).
> 3. Delete `Day05.css` and optimize imports (Commit ♻️).
> 4. Verify accessibility compliance by running `npx cypress run --spec cypress/e2e/day05.cy.ts` and tests via `npm run test -- Day05`.

**Target Files:**
- `src/pages/Day05/Day05.tsx`, `src/pages/Day05/Day05.css`, `src/pages/Day05/Day05.styles.ts`
- `cypress/e2e/day05.cy.ts`

---

## Phase 5A: Day06 Dashboard Refactor

**Prompt / Instructions for Agent:**
> Your task is to refactor the Dashboard portion of Day06 (excluding Wizard) using TDD.
> 1. Review `src/pages/Day06/Dashboard/Dashboard.tsx` and unit tests. Update expectations for UI changes (Commit 🔴).
> 2. Migrate `Dashboard.css` into `Dashboard.styles.ts`. Ensure layout passes tests (Commit 🟢).
> 3. Delete `Dashboard.css` and perform cleanup (Commit ♻️).
> 4. Run `npm run test -- Dashboard`.

**Target Files:**
- `src/pages/Day06/Dashboard/Dashboard.tsx`
- `src/pages/Day06/Dashboard/Dashboard.css`
- `src/pages/Day06/Dashboard/Dashboard.styles.ts`

---

## Phase 5B: Day06 Wizard Atomic Styling Migration

**Prompt / Instructions for Agent:**
> Your task is to rewrite the CSS logic of the Wizard component into Styled-Components.
> 1. Write layout and visibility assertions in `Wizard.test.tsx` that will map to our new styled tokens (Commit 🔴). 
> 2. Migrate `Wizard.css` entirely into `Wizard.styles.ts` and bind them inside `Wizard.tsx`. Make tests pass (Commit 🟢).
> 3. Delete `Wizard.css` and refactor typings if they are loose (Commit ♻️).
> 4. Run `npm run test -- Wizard` to verify.

**Target Files:**
- `src/pages/Day06/components/Wizard/Wizard.tsx`
- `src/pages/Day06/components/Wizard/Wizard.css`
- `src/pages/Day06/components/Wizard/Wizard.styles.ts`
- `src/pages/Day06/components/Wizard/Wizard.test.tsx`

---

## Phase 5C: Day06 Wizard Architecture Migration

**Prompt / Instructions for Agent:**
> Your task is to migrate the fully styled Wizard out of Day06 and into the core `design-system` as a reusable organism.
> 1. Move the `Wizard` directory into `src/design-system/organisms/`. Update all parent imports in Day06 and fix failing unit tests caused by the move (Commit 🔴).
> 2. Address context hook mappings (`WizardContext`, `useWizard`, `WizardProvider`) so they are seamlessly exported via the `design-system` index file. Ensure it renders correctly (Commit 🟢).
> 3. Polish the implementation to ensure zero reliance on Day06 local state (Commit ♻️).
> 4. Run test commands to ensure the move caused no cascading failures. 

**Target Files:**
- `src/pages/Day06/components/Wizard/`
- `src/design-system/organisms/`
- `src/pages/Day06/index.tsx`

---

## Phase 6: Day07 Finish and Global Audit

**Prompt / Instructions for Agent:**
> Your task is to complete the final CSS refactor for Day07 and execute a global audit.
> 1. Setup failing test cases for Day07 (Commit 🔴).
> 2. Migrate `src/pages/Day07/Day07.css` into `Day07.styles.ts`. Make tests pass (Commit 🟢).
> 3. Delete `Day07.css` (Commit ♻️).
> 4. Run the entire E2E suite `npm run cy:run` and unit suite `npm run test:run` to ensure total green coverage.
> 5. Run `npm run test:a11y:ci` to perform a robust automated WCAG scan of all built pages. Fix any final errors inside a new TDD loop.

**Target Files:**
- `src/pages/Day07/index.tsx`
- `src/pages/Day07/Day07.css`, `src/pages/Day07/Day07.styles.ts`
- `src/pages/Day07/__tests__/Day07.test.tsx`
