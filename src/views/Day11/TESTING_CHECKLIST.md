# Daily Testing Checklist

> [!IMPORTANT]
> Use this checklist against the code written for each Day to ensure all test cases meet the project's testing expectations. If any code does not meet these standards, make the appropriate additions or modifications.

## 1. Test Coverage & Strategy
- [ ] **Utility Functions:** Are all utility functions and pure logic covered by 100% unit tests?
- [ ] **Hooks / Headless UI:** Are custom hooks or state management logic covered by integration tests focusing on state changes and side-effects?
- [x] **UI Components:** Are React components covered by integration tests using `React Testing Library` (RTL) simulating actual user interactions?
- [ ] **API/Backend Routes:** Are all Next.js API routes covered by integration tests using mocked databases (or MSW) to test request/response handling?
- [ ] **Meaningful Coverage:** Are critical paths and logical branches tested instead of just chasing 100% line coverage?
- [x] **Behavioral Focus:** Do the tests focus on behavior (input/output/rendered UI) rather than implementation details (React's internal state)?

## 2. Test Structure & Best Practices
- [x] **AAA Pattern:** Does every test follow the clear **Arrange-Act-Assert** (Given-When-Then) structure?
- [x] **Clean State:** Is the test state properly isolated? (e.g., `jest.resetAllMocks()` used, cookies/local storage cleared between tests).
- [x] **No Flaky Timeouts:** Are tests free of fixed timeouts like `setTimeout`? (Use built-in wait utilities like RTL's `waitFor` or `findBy*`).
- [ ] **Mocked Dependencies:** Are all external dependencies and network requests mocked reliably?

## 3. Accessibility & Visual Testing
- [ ] **a11y Compliance:** Are `jest-axe` checks included to catch accessibility violations (e.g., ARIA labels, contrast)?
- [ ] **Visual Regression (Component Level):** Are visual tests (via Storybook/Chromatic or Playwright) updated, and are dynamic values mocked/frozen to prevent false positives?
- [ ] **Visual Baselines:** Have baseline screenshots been approved and saved for any intentionally updated UI components?

## 4. End-to-End (E2E) Testing (Playwright)
- [ ] **Resilient Locators:** Are Playwright E2E tests using user-centric locators (`getByRole`, `getByText`) rather than brittle CSS selectors or XPaths?
- [ ] **Predictable Test Data:** Is the database predictably seeded with test data, or are API responses mocked for stable E2E workflows?

## 5. Maintenance
- [x] **Test Refactoring:** If production code was refactored, were the tests updated accordingly?
- [ ] **Boilerplate Reduction:** Are custom renderers (e.g., `renderWithProviders`) being utilized to keep test files clean?
- [x] **Green Build:** Does the entire test suite pass locally without errors (`npm run test:all`)?
