# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Start Next.js dev server (port 3000)
npm run storybook        # Start Storybook (port 6006)

# Testing
npm run test             # Run Vitest in watch mode
npm run test:run         # Run Vitest once (CI mode)
npx vitest run src/path/to/component.test.tsx  # Run a single test file
npm run cy:open          # Open Cypress interactive runner
npm run cy:run           # Run Cypress headlessly

# Quality
npm run lint             # ESLint
npm run test:a11y:ci     # Build + Pa11y accessibility audit (requires prod build)
npm run test:all         # Full pipeline: lint + unit + E2E + a11y + storybook audit

# Database
npx prisma migrate dev   # Run migrations
npx prisma studio        # Open Prisma Studio
npx ts-node prisma/seed.ts  # Seed the database
node seed_test_user.cjs  # Seed a test user for E2E/auth

# Build
npm run build            # Next.js production build
```

## Architecture

### Project structure

This is a **Next.js 16 App Router** project (migrated from Vite). The key split is:

- `src/app/` — Next.js routing layer: page shells (`day-XX/page.tsx`) and API routes (`api/`)
- `src/views/DayXX/` — The actual feature implementations (Katas). Each day is self-contained with its own components, hooks, styles, and tests
- `src/design-system/` — Atomic Design system: `atoms/`, `molecules/`, `organisms/`, `layout/`, `theme/`, `tokens/`
- `src/components/` — Shared app-level components (`Providers`, `Wizard`)
- `src/hooks/` — Domain-agnostic hooks (`useDisclosure`, `useBoolean`, `useModal`, `useDropdown`, etc.)
- `src/lib/` — Library configs: `auth.ts` (NextAuth), `prisma.ts`, `queryClient.ts`, `registry.tsx` (styled-components SSR), `msw/`, `llm/`
- `src/store/` — Zustand global store (`useAppStore` with localStorage persistence)
- `src/layouts/` — `MainLayout` (Navbar wrapper)

### State management split

- **Zustand** (`src/store/index.ts`) — client-side UI/auth state, persisted to localStorage under key `coe-app-storage`
- **React Query** (`src/lib/queryClient.ts`) — all server state, data fetching, mutations

### Styling

`styled-components` v6 with a `ThemeProvider` (`src/design-system/theme/`). The Next.js compiler has `styledComponents: true` for SSR support. The `StyledComponentsRegistry` (`src/lib/registry.tsx`) is required for App Router SSR. Path alias `@` maps to `src/`.

### Auth

NextAuth.js v4 with `CredentialsProvider` (email/password). JWT strategy. Prisma adapter. Session is extended to include `user.id`. Auth config lives in `src/lib/auth.ts`.

### LLM / AI (Day 10)

`src/lib/llm/registry.ts` abstracts three providers: `local-gemma` (default, `LOCAL_LLM_URL`), `openai`, `anthropic`. The registry performs health checks and automatic failover in priority order: gemma → openai → anthropic. The `/api/chat` route uses this registry and implements DB-backed response caching (checks for prior identical user messages before hitting the LLM).

### API routes

All under `src/app/api/`:
- `POST /api/chat` — LLM streaming (SSE), persists messages to DB, checks cache
- `GET/POST /api/conversations` — list/create conversations
- `GET /api/conversations/[id]` — fetch conversation with messages
- `POST /api/messages/batch` — bulk save messages

### Database

SQLite (dev) via Prisma. Schema: `User → Conversation → Message`. `DATABASE_URL` must point to the `.db` file.

### Testing approach

- **Unit**: Vitest + React Testing Library. `jsdom` environment. Setup in `src/setupTests.ts`. Tests colocated as `Component.test.tsx`.
- **E2E**: Cypress tests in `cypress/e2e/`. Use `cypress-axe` for dynamic a11y.
- **A11y**: `jest-axe` in unit tests, `cypress-axe` in E2E, `pa11y-ci` for WCAG 2.1 AA scanning.
- **API mocking**: MSW v2. Browser worker in `src/lib/msw/browser.ts`, Node server in `src/lib/msw/server.ts`, handlers in `src/lib/msw/handlers.ts`.
- **Storybook**: Stories colocated as `Component.stories.tsx`.

## Commit conventions

Every commit must follow: `{emoji} {type} {DayXX}: {feature} - {message}`

| Step | Emoji | Type |
|------|-------|------|
| Failing test (RED) | 🔴 | `test` |
| Implementation (GREEN) | 🟢 | `feat` |
| Refactoring | ♻️ | `refactor` |
| Config/build | ⚙️ | `chore` |

**Never use `git add .`** — always stage files individually.

Each TDD step (Red → Green → Refactor) must be its own atomic commit.

## TDD workflow

All work follows strict Red-Green-Refactor:
1. Write a failing test first (🔴 commit)
2. Write the minimum code to pass it (🟢 commit)
3. Refactor while keeping tests green (♻️ commit)

Before starting any task, produce an **Implementation Plan** listing files to create/modify and the commit sequence. Confirm any open design questions before coding.

## Required env vars

```
DATABASE_URL=file:/path/to/prisma/dev.db
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=sk-...          # optional, for openai provider
ANTHROPIC_API_KEY=sk-ant-...   # optional, for anthropic provider
LOCAL_LLM_URL=http://localhost:8080/v1  # for local Gemma
```
