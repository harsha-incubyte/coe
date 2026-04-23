# Testing & Accessibility Playbook

Quality assurance is built into every layer of this application. We use a multi-tiered testing strategy following the Red-Green-Refactor TDD loop.

## 1. Unit & Component Testing (Vitest + RTL)
Used for testing isolated components, custom hooks, and utility functions.
- **Framework:** Vitest + React Testing Library (RTL).
- **Execution:** `npm run test` (Watch mode) or `npm run test:run` (CI mode).
- **Best Practices:**
  - Test *behavior*, not implementation. Rely on `findByRole`, `findByText`, and `findByLabelText`.
  - Use `@testing-library/user-event` to simulate real user interactions instead of `fireEvent`.

## 2. End-to-End Testing (Cypress)
Used for testing critical user journeys and integrations.
- **Framework:** Cypress.
- **Execution:** `npm run cy:open` (Interactive) or `npm run cy:run` (Headless).
- **Best Practices:**
  - Create dedicated `.cy.ts` files in `cypress/e2e/`.
  - Do not use brittle CSS selectors. Use `data-testid` or ARIA roles for selecting elements.

## 3. Network Mocking (MSW)
Mock Service Worker (MSW) is used to intercept network requests. This ensures tests are deterministic and resilient.
- **Unit/Integration:** Setup in `setupTests.ts`. Use `server.use()` within tests to mock specific error states or payloads.
- **E2E/Development:** Setup in `main.tsx` via the browser worker. This allows Cypress and local development to function without a real backend.

## 4. Accessibility Testing (A11y)
Accessibility is treated as a critical feature, not an afterthought. We target **WCAG 2.1 AA** compliance.

### A. Component-Level (`jest-axe`)
Integrated directly into Vitest. Checks for structural violations (e.g., missing ARIA labels).
```typescript
import { axe } from 'jest-axe';
it('should not have basic accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### B. Interactive Flow (`cypress-axe`)
Checks accessibility dynamically during E2E journeys (e.g., after opening a modal).
```typescript
cy.injectAxe();
cy.get('button').click();
cy.checkA11y(); // Checks the UI state after interaction
```

### C. Global Audit (`pa11y-ci`)
Runs against the built application to catch systemic issues across all routes.
- **Execution:** `npm run test:a11y:ci`
- **Config:** Managed via `.pa11yci` in the root directory.
