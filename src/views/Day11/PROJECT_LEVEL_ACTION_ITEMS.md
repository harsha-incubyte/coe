# Project-Level Actionable Items Checklist

> [!IMPORTANT]
> This checklist tracks project-level infrastructure, configuration, and architectural tasks defined in the testing strategy. These items ensure robust CI/CD, maintainability, and code quality across the entire repository.

## 1. CI/CD & Git Workflow Setup
- [x] **Pre-commit Hooks:** Install and configure `husky` and `lint-staged` to automatically run linters and fast unit tests on staged files before commit.
- [x] **Pull Request CI Checks:** Set up GitHub Actions (or equivalent CI pipeline) to execute the complete test suite (Unit, Integration, E2E) on every Pull Request.
- [x] **Branch Protection:** Enforce rules to block merging into the `main` branch unless all automated CI checks pass successfully.
- [x] **Performance Budgets in CI:** Configure the pipeline to track and assert performance budgets (e.g., bundle sizes, component render times) to prevent performance regressions.

## 2. Tooling Integration & Environment
- [ ] **Accessibility (a11y) Testing:** Integrate `jest-axe` into the unit/integration testing environments to automatically flag ARIA and contrast violations.
- [ ] **Global API Mocking:** Fully configure Mock Service Worker (MSW) across the project for reliable, isolated integration testing without real network requests.
- [ ] **Visual Regression Setup:** Integrate Storybook with Chromatic (or Playwright's visual comparisons) to catch unintended UI layout changes.
    - [ ] Establish a workflow for baseline screenshot generation and approval.
    - [ ] Configure the environment to freeze or mock dynamic content (dates, IDs, animations) to avoid visual test flakiness.
- [ ] **E2E Tooling Configuration:** Standardize Playwright as the primary E2E testing tool.
    - [ ] Enable parallel execution in the Playwright config to minimize CI build times.
    - [ ] Implement a predictable test data management strategy (database seeding or API mocking) for E2E runs.

## 3. Codebase Migrations & Immediate Fixes
- [ ] **Fix Failing Tests:** Audit and resolve all currently failing tests (e.g., `Weather.test.tsx`) to establish a green baseline before enforcing branch protection.
- [ ] **Migrate E2E Tests:** Execute a phased migration of all existing Cypress E2E tests (e.g., `cypress/e2e/auth_flow.cy.js`, `day04.cy.js`) to Playwright.
- [ ] **API Route Testing:** Implement comprehensive integration tests for Next.js API routes (e.g., `src/app/api/chat/route.ts`) using MSW or in-memory databases.

## 4. Test Architecture & Code Quality Standards
- [ ] **Custom Test Renderers:** Implement global utility wrappers (e.g., `renderWithProviders`) for Theme, Redux, or React Query contexts to reduce boilerplate.
- [ ] **AAA Pattern Formatting:** Standardize the Given-When-Then (Arrange-Act-Assert) structure for all test files through conventions or linting rules.
- [ ] **Flaky Test Eradication:** Audit the codebase to replace fixed timeouts (`setTimeout`) with appropriate polling/wait utilities (e.g., RTL's `waitFor`).
- [ ] **State Isolation:** Ensure global state, mocks, cookies, and local storage are predictably cleared between every test run (`jest.resetAllMocks()`).
- [ ] **Core Web Vitals:** Add assertions in E2E tests to validate performance metrics like LCP, FID, and CLS.

## 5. Ongoing Maintenance Procedures
- [ ] **Test Health Reviews:** Schedule and perform periodic reviews of test execution times and coverage reports to find brittle or slow tests.
- [ ] **Refactoring Synchronization:** Establish a documented procedure that tests must be refactored alongside production code changes to prevent testing implementation details.
- [ ] **Coverage Quality Audits:** Periodically audit tests to ensure they provide "Critical Path Coverage" and "Branch Coverage" rather than just pursuing 100% line coverage.
