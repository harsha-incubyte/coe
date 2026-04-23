# Contributing Guidelines

Welcome! This document outlines the process for contributing to the project. We follow strict engineering standards centered around **Test-Driven Development (TDD)** and **Atomic Design**.

## Prerequisites
- **Node.js**: Latest LTS version (v20+ recommended).
- **npm**: v10+

## Getting Started
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Initialize Mock Service Worker (required for local dev and tests):
   ```bash
   npm run msw-init
   ```

## Development Commands
- `npm run dev` - Starts the Vite development server.
- `npm run test` - Runs Vitest in watch mode (used during TDD).
- `npm run cy:open` - Opens the interactive Cypress test runner.
- `npm run storybook` - Opens the interactive Storybook UI for the design system.
- `npm run lint` - Runs ESLint.
- `npm run test:a11y:ci` - Runs the global Pa11y accessibility audit.
- `npm run test:all` - Runs the entire quality suite (Lint, Unit, E2E, A11y).

## The TDD Workflow (Red-Green-Refactor)
You must write tests *before* writing implementation code.

1. **Red**: Write a failing test for the new feature or bug fix.
2. **Green**: Write the minimal amount of code to make the test pass.
3. **Refactor**: Clean up the code, extract components to `src/design-system/`, optimize, and ensure tests stay green.

## Commit Message Conventions
Every commit must be prefixed with a specific Unicode marker to track our TDD lifecycle:

- 🔴 `test(scope): ...` — Used when writing a new failing test, or breaking an existing one to support new requirements.
- 🟢 `feat(scope): ...` or `fix(scope): ...` — Used when writing implementation code that makes tests pass.
- ♻️ `refactor(scope): ...` — Used when cleaning up code without changing its external behavior.
- 🎨 `style(scope): ...` — Used for purely visual or aesthetic changes.
- ⚙️ `chore(scope): ...` — Used for infrastructure, configuration, or dependency updates.

**Example:**
`🟢 feat(Day07): implement optimistic UI updates for task completion`

## Pull Request Process
Before submitting a PR, ensure that:
1. `npm run test:all` completes successfully with no errors.
2. No generic `console.log` statements remain in the code.
3. New UI components are properly documented in Storybook and use the `styled-components` theme.
4. The code contains no basic accessibility violations (must pass `jest-axe` and `pa11y-ci`).
