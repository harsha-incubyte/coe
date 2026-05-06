# Test Suite Maintenance Procedures

This document outlines the periodic maintenance procedures required to ensure the health, reliability, and performance of the 'Centre of Excellence' test suite.

## 1. Test Health Reviews
**Frequency:** Bi-weekly or after major feature releases.

- **Execution Time Audit:** Identify tests taking significantly longer than average. Aim for unit tests < 100ms and E2E tests < 10s per flow.
- **Flakiness Tracking:** Monitor CI logs for tests that pass after retries. Investigate and fix root causes (usually race conditions or unhandled async state).
- **Redundant Tests:** Remove tests that cover the same logic as other more efficient tests (e.g., duplicate unit tests for logic already covered by a robust integration test).

## 2. Refactoring Synchronization
**Procedure:** Every production code change MUST include corresponding test updates.

- **Logic Changes:** If a business rule changes, update the relevant `Given-When-Then` assertions in unit and integration tests.
- **UI Component Refactors:** If a component is refactored (e.g., from Tailwind classes to a different styling system), ensure E2E tests still pass by relying on `Role` and `TestID` rather than implementation details.
- **API Contract Changes:** If an API endpoint's schema changes, immediately update MSW handlers and integration test mocks to prevent downstream failures.

## 3. Coverage Quality Audits
**Frequency:** Monthly.

- **Critical Path Coverage:** Ensure every high-value user flow (Login, Chat, RAG Retrieval, Weather Search) has at least one E2E test and multiple integration tests.
- **Branch Coverage:** Use Vitest's coverage reporter (`npm run test:coverage`) to identify unhandled edge cases and error states. Aim for 80%+ branch coverage in core business logic.
- **Accessibility (a11y) Audits:** Regularly review `jest-axe` outputs and Playwright accessibility reports to ensure no new violations have been introduced.

## 4. Visual Baseline Management
**Procedure:** Snapshot updates.

- Use `npx playwright test --update-snapshots` only after verifying that UI changes are intentional.
- Review snapshot diffs during Pull Request reviews to ensure no unintended layout shifts (CLS) occurred.
