# Application Architecture

This project is built as a **Single Unified Web Application** (using Vite + React + TypeScript) that serves as a robust platform for modern frontend development practices. Instead of completely isolated codebases, the application centralizes scalable patterns while isolating feature sets into "Katas".

## Core Principles

1. **Atomic Design System:** UI components are strictly segregated into Atoms, Molecules, and Organisms. They consume a central `styled-components` theme.
2. **Feature Isolation (Katas):** Complex domain logic is isolated within individual page directories (`src/pages/DayXX/`).
3. **Decoupled State:** Client state is managed via Zustand, while Server state/data fetching is managed via React Query.
4. **Strict Testing (TDD):** Every layer is covered by Vitest (Unit), Cypress (E2E), and Pa11y/Axe (Accessibility).

## Directory Structure

```text
/
├── .github/               # CI/CD Workflows
├── cypress/               # End-to-End Tests & cypress-axe audits
├── docs/                  # Architecture & Playbook Documentation
├── src/
│   ├── design-system/     # ATOMIC DESIGN SYSTEM
│   │   ├── atoms/         # Building blocks (Button, Input, Heading)
│   │   ├── molecules/     # Compound UI (SearchBar, Modal, Tabs)
│   │   ├── organisms/     # Complex UI sections (Wizard)
│   │   ├── layout/        # Global page layouts & wrappers
│   │   ├── theme/         # styled-components ThemeProvider & GlobalStyles
│   │   └── tokens/        # Colors, Spacing, Typography constants
│   │
│   ├── hooks/             # Domain-agnostic reusable hooks
│   ├── lib/               # External library config (MSW, etc.)
│   ├── store/             # Global client state (Zustand)
│   │
│   ├── pages/             # FEATURE ISOLATION (KATAS)
│   │   ├── Day01/         # Simple state & logic Katas
│   │   ├── Day02/         # Forms & MSW Mocking
│   │   ├── Day06/         # Performance & Dashboard
│   │   ├── Day07/         # Server State (React Query)
│   │   └── ...
│   │
│   ├── App.tsx            # Main Application Router
│   ├── setupTests.ts      # Vitest & jest-dom configuration
│   └── main.tsx           # Entry point
```

## How It Solves Scalability

### 1. Maximum Reusability
Instead of rewriting standard components (like a modal or a button), everything is built once in `src/design-system/`. When building complex features in later Katas, developers construct the UI rapidly using robust, heavily tested atomic components.

### 2. Feature Scaffolding
The `src/pages/DayXX` pattern isolates the scaffolding of specific tasks. This ensures that domain-specific logic (e.g., the Weather fetching logic of Day 02 or the Task Board optimistic updates of Day 07) does not pollute the global application scope.

### 3. Unified Testing Map
Because it is a single React application, test runners (Vitest, Cypress, Pa11y) can scan the entire codebase efficiently. A single CI run validates the entire history of the project's progression without needing to traverse disparate project folders.
