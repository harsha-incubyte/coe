# Frontend Testing Strategy & Best Practices

> [!IMPORTANT]
> This document outlines the comprehensive testing strategy for the project, focusing on maintainability, reliability, and delivering high-quality user experiences. It serves as the primary reference for testing standards across all modules, including functions, headless components, utilities, and backend routes.

## 1. Testing Pyramid & Test Types

We adhere to the **Frontend Testing Pyramid**, prioritizing faster, cheaper tests at the base and reserving slower, more expensive tests for critical user flows at the top.

*   **Unit Tests (Base):** Focus on isolated pieces of logic (utility functions, custom hooks, reducers). They are fast, reliable, and run frequently.
*   **Integration Tests (Middle):** Test how multiple units work together. In a React context, this means testing components with their connected state, context providers, or data fetching hooks (mocking network requests). This is where we get the most value for UI components.
*   **End-to-End (E2E) Tests (Top):** Test complete user journeys in a real browser environment against a fully running application (or staging environment). They ensure the entire system works together from the user's perspective.

**Strategy by Module:**
*   **Utility Libraries:** 100% Unit Testing.
*   **Headless Components / UI Hooks:** Unit/Integration tests focusing on state changes and side effects.
*   **UI Components:** Integration tests using `React Testing Library` to simulate user interactions and verify rendered DOM output.
*   **Backend Routes / API:** Integration tests with mocked databases or in-memory databases to ensure correct request/response handling.

## 2. Test Coverage: Quality over Quantity

> [!TIP]
> 100% test coverage is a myth that often leads to testing implementation details rather than behavior. Our goal is **meaningful coverage**.

**Meaningful Coverage Metrics:**
*   **Branch Coverage:** Ensuring all logical paths (if/else, switch statements) are executed.
*   **Critical Path Coverage:** Focusing tests on the most important user flows (authentication, checkout, data submission) rather than trivial getters/setters or static UI rendering.
*   **Mutation Testing Concepts:** Ask "If I introduce a bug in this code, will a test fail?" If not, the test is not meaningful.

**Guidelines:**
*   Do not write tests just to increase lines covered.
*   Avoid testing third-party libraries (e.g., don't test that React's `useState` works).
*   Test **behavior** (what the user sees or what the function returns) rather than **implementation details** (internal state or private methods).

## 3. Testing Best Practices

### The AAA (Arrange-Act-Assert) / Given-When-Then Pattern

Every test should follow a clear structure to enhance readability and maintainability.

*   **Arrange (Given):** Set up the initial state, mock necessary dependencies, and render the component.
*   **Act (When):** Execute the action being tested (e.g., click a button, type in an input, call a function).
*   **Assert (Then):** Verify the expected outcome (e.g., an element appears, state changes, a mocked function is called).

```typescript
// Example using AAA Pattern
test('adds a new item to the list', async () => {
  // Arrange (Given)
  const user = userEvent.setup();
  render(<TodoList />);
  const input = screen.getByRole('textbox', { name: /add item/i });
  const button = screen.getByRole('button', { name: /submit/i });

  // Act (When)
  await user.type(input, 'New Task');
  await user.click(button);

  // Assert (Then)
  expect(screen.getByText('New Task')).toBeInTheDocument();
});
```

### Preventing Flaky Tests

Flaky tests (tests that pass and fail intermittently without code changes) erode trust in the test suite.

*   **Avoid Fixed Timeouts (`setTimeout`):** Use built-in wait utilities like `waitFor` or `findBy*` queries in React Testing Library that poll the DOM.
*   **Isolate Test State:** Ensure each test starts with a clean slate. Reset mocks (`jest.resetAllMocks()`) and clear local storage/cookies between tests.
*   **Mock External Dependencies:** Never make actual network requests in unit or integration tests. Use tools like MSW (Mock Service Worker) to intercept and stub API calls reliably.

## 4. Performance and Accessibility (a11y) Testing

Testing is not just about functional correctness; it's also about usability and performance.

*   **Accessibility Testing:** We integrate `jest-axe` into our unit/integration tests to automatically catch common accessibility violations (e.g., missing ARIA labels, low color contrast).
*   **Performance Testing:** We monitor component render times and bundle sizes. In E2E tests, we can assert on Core Web Vitals (LCP, FID, CLS) or set performance budgets in CI.

## 5. Visual Regression Testing

Visual regression tests catch unintended CSS or UI layout changes by comparing screenshots of components against established baselines. This is critical for preventing "CSS regressions" where a style change in one place inadvertently breaks a layout elsewhere.

*   **Strategy:** Use tools like Storybook combined with Chromatic (for component-level visual testing) or Playwright's built-in visual comparisons (for full-page or workflow visual testing).
*   **Focus:** Run these tests on isolated UI components (atoms/molecules) in different states (default, hover, disabled, error) to ensure consistent design implementation.
*   **Workflow:**
    *   **Baseline Generation:** When a component is newly created or intentionally updated, a "baseline" screenshot is approved and saved.
    *   **Comparison:** During CI/CD runs, new screenshots are captured and compared pixel-by-pixel to the baseline.
    *   **Review Process:** If a difference is detected, the test fails, requiring manual review. If the visual change was intended, the developer updates the baseline.
*   **Handling Flakiness:** To prevent false positives in visual tests, ensure dynamic content (like current dates, animations, or randomly generated IDs) is mocked, frozen, or masked before the screenshot is taken.

## 6. End-to-End (E2E) Testing with Playwright

Playwright is our tool of choice for E2E testing due to its cross-browser support, auto-waiting capabilities, and network interception.

**Setup & Best Practices:**
*   **Locator Strategy:** Use resilient locators (e.g., `getByRole`, `getByText`) rather than brittle CSS classes or XPath.
*   **Test Data Management:** Seed the database with predictable test data before E2E runs, or mock API responses for stable UI testing.
*   **Parallel Execution:** Run Playwright tests in parallel to reduce CI build times.

## 7. CI/CD Integration

Tests are only valuable if they run consistently.

*   **Pre-commit Hooks:** Run fast unit tests and linters (using Husky and lint-staged) on staged files before allowing a commit.
*   **Pull Request Checks:** The CI pipeline (e.g., GitHub Actions) must execute the full test suite (Unit, Integration, E2E) on every PR.
*   **Branch Protection:** Merging to `main` is blocked unless all tests pass.

## 8. Test Maintenance Strategies

Test suites require refactoring and maintenance just like production code.

*   **Refactor Tests:** When production code is refactored, tests should be updated to remain relevant. If a test breaks but the behavior hasn't changed, the test was likely testing implementation details.
*   **Custom Renderers:** Create custom render functions (e.g., `renderWithProviders`) that wrap components in necessary context providers (Theme, Redux, React Query) to reduce boilerplate in test files.
*   **Review Test Health:** Periodically review test execution times and coverage reports to identify slow tests or untested critical paths.

## 9. Current Codebase Audit & Action Items

An analysis of the existing codebase reveals a solid foundation of unit and integration tests (especially within the `design-system` and utility hooks), but several gaps need to be addressed to align with this strategy:

*   **E2E Tooling Mismatch (Cypress vs. Playwright):**
    *   **Finding:** The project currently relies on Cypress for E2E testing (e.g., `cypress/e2e/auth_flow.cy.js`, `day04.cy.js`). However, this strategy document standardizes on Playwright.
    *   **Action:** Plan a phased migration of existing Cypress tests to Playwright to unify our tooling and take advantage of Playwright's parallelization and multi-browser support.
*   **Backend / API Route Coverage:**
    *   **Finding:** While frontend components and utilities (`fizzbuzz`, `rag`) are well-tested, there is a distinct lack of tests for Next.js API routes (e.g., `src/app/api/chat/route.ts`).
    *   **Action:** Implement integration tests for API routes. Ensure MSW (which is already installed) or dedicated database mocks are used to validate request/response handling without hitting real databases.
*   **Restoring the Baseline:**
    *   **Finding:** A current run of the test suite (`npm run test:run`) shows failing tests (e.g., in `Weather.test.tsx` or similar components).
    *   **Action:** Immediately audit and fix the currently failing tests. A green test suite baseline must be established before enforcing CI/CD branch protection rules.

## Conclusion

This testing strategy solidifies the core concepts of software maintainability, clean code, and robust architecture introduced in Week 1. By focusing on behavior over implementation, leveraging the testing pyramid, and integrating continuous automated checks, we ensure that the project remains scalable, resilient to regressions, and capable of high-velocity feature development.
