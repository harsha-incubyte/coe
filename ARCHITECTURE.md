# Application Architecture

This project is built as a **Next.js 16 App Router** application that serves as a robust platform for modern full-stack development practices. Instead of completely isolated codebases, the application centralizes scalable patterns while isolating feature sets into "Katas".

## Core Principles

1. **Atomic Design System:** UI components are strictly segregated into Atoms, Molecules, and Organisms. They consume a central `styled-components` theme.
2. **Feature Isolation (Katas):** Complex domain logic is isolated within individual view directories (`src/views/DayXX/`). The `src/app/` layer contains only thin routing shells that render these views.
3. **Decoupled State:** Client state is managed via Zustand, while server state/data fetching is managed via React Query.
4. **Full-Stack API:** API routes under `src/app/api/` provide auth, LLM streaming, conversation persistence, and RAG-powered citations — all within the same Next.js project.
5. **Strict Testing (TDD):** Every layer is covered by Vitest (Unit), Playwright + Cypress (E2E), and Pa11y/Axe (Accessibility).

## Directory Structure

```text
/
├── .github/               # CI/CD Workflows (GitHub Actions)
├── .storybook/            # Storybook configuration
├── cypress/               # Legacy Cypress E2E tests
├── tests/e2e/             # Playwright E2E tests (primary)
├── prisma/                # Prisma schema, migrations, and seed
├── docs/                  # Architecture & Playbook Documentation
├── src/
│   ├── app/               # NEXT.JS APP ROUTER
│   │   ├── layout.tsx     # Root layout (Providers, Navbar)
│   │   ├── page.tsx       # Home page
│   │   ├── login/         # Login page
│   │   ├── day-01/ … day-10/  # Routing shells (render src/views/DayXX)
│   │   └── api/           # API Routes
│   │       ├── auth/[...nextauth]/  # NextAuth session handler
│   │       ├── chat/               # LLM streaming (SSE), cache, RAG citations
│   │       ├── conversations/      # List / create / fetch conversations
│   │       └── messages/batch/     # Bulk message persistence
│   │
│   ├── views/             # FEATURE ISOLATION (KATAS)
│   │   ├── Day01/         # Simple state & logic Katas
│   │   ├── Day02/         # Forms & MSW Mocking
│   │   ├── Day06/         # Performance & Dashboard
│   │   ├── Day07/         # Server State (React Query)
│   │   ├── Day09/         # Medical Chat UI (mock AI)
│   │   ├── Day10/         # Real LLM Streaming + RAG
│   │   └── ...
│   │
│   ├── design-system/     # ATOMIC DESIGN SYSTEM
│   │   ├── atoms/         # Building blocks (Button, Input, Heading)
│   │   ├── molecules/     # Compound UI (SearchBar, Modal, Tabs)
│   │   ├── organisms/     # Complex UI sections (Wizard, LoginForm, Navbar)
│   │   ├── layout/        # Global page layouts & wrappers
│   │   ├── theme/         # styled-components ThemeProvider & GlobalStyles
│   │   ├── tokens/        # Colors, Spacing, Typography constants
│   │   └── test-utils.tsx # Custom render with all providers pre-wired
│   │
│   ├── hooks/             # Domain-agnostic reusable hooks
│   ├── lib/               # External library configs
│   │   ├── auth.ts        # NextAuth configuration
│   │   ├── prisma.ts      # Prisma client singleton
│   │   ├── queryClient.ts # React Query client
│   │   ├── msw/           # Mock Service Worker (handlers, server, browser)
│   │   ├── llm/           # LLM provider registry + failover (Gemma → OpenAI → Anthropic)
│   │   └── rag/           # BM25 retrieval pipeline (index-builder, retriever, formatter)
│   ├── store/             # Global client state (Zustand, persisted to localStorage)
│   ├── components/        # App-level components (Providers, Counter, FizzBuzz)
│   ├── layouts/           # MainLayout (Navbar wrapper)
│   └── setupTests.ts      # Vitest & jest-dom configuration
```

## How It Solves Scalability

### 1. Maximum Reusability
Instead of rewriting standard components (like a modal or a button), everything is built once in `src/design-system/`. When building complex features in later Katas, developers construct the UI rapidly using robust, heavily tested atomic components.

### 2. Feature Scaffolding
The `src/views/DayXX` pattern isolates domain-specific logic from the routing layer. The thin `src/app/day-XX/page.tsx` shells contain only a default export that renders the view — no business logic. This means view components are Next.js-agnostic and can be unit-tested directly without a server context.

### 3. Unified Testing Map
Because it is a single application, test runners (Vitest, Playwright, Cypress, Pa11y) can scan the entire codebase efficiently. A single CI run validates the entire history of the project's progression without needing to traverse disparate project folders.

### 4. Full-Stack in One Repo
The Next.js API routes eliminate the need for a separate backend server. Auth, LLM streaming, conversation persistence, and RAG citations all live alongside the frontend in `src/app/api/`, sharing types and the Prisma client with no network boundary overhead during development.
