# Project Review — Centre of Excellence (CoE)

**Reviewer:** Claude Code (Sonnet 4.6)
**Date:** 2026-05-06
**Branch:** `docs/day11-testing-strategy`
**Scope:** Full project review — architecture, code quality, testing strategy, documentation, DX, and CI/CD

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Design System](#3-design-system)
4. [State Management](#4-state-management)
5. [Backend & Database](#5-backend--database)
6. [LLM / AI Integration](#6-llm--ai-integration)
7. [Testing Strategy](#7-testing-strategy)
8. [CI/CD Pipeline](#8-cicd-pipeline)
9. [Developer Experience](#9-developer-experience)
10. [Documentation](#10-documentation)
11. [Commit Discipline & TDD Adherence](#11-commit-discipline--tdd-adherence)
12. [Gaps & Improvement Areas](#12-gaps--improvement-areas)
13. [Summary Scorecard](#13-summary-scorecard)

---

## 1. Project Overview

**Centre of Excellence** is a 10-day progression of frontend engineering Katas, built as a single unified Next.js 16 App Router application. Each day (`Day01`–`Day10`) is a self-contained feature exercise demonstrating progressively advanced skills — from basic TDD and component architecture (Day 01) to real-time LLM streaming with a RAG pipeline and medical citation system (Day 10).

### Scale at a Glance

| Metric | Value |
|--------|-------|
| Total commits | 374 |
| Source files | 319 |
| Symbols indexed (GitNexus) | 2,291 |
| Unit test files | 47 |
| Playwright E2E specs | 8 |
| Cypress E2E specs | 4 (legacy) |
| Storybook stories | 25 |
| Design system components | 30+ |
| Custom hooks | 11 |
| API routes | 8 |
| Days / Katas | 10 |

The project was bootstrapped from scratch (Day 01, `69818ba`) and evolved through a Vite → Next.js migration (PR #1), a full Atomic Design refactoring, and a Day 10 LLM integration — all visible in the clean, disciplined commit history.

---

## 2. Architecture

### 2.1 Directory Structure

The project follows a deliberate two-layer split:

```
src/
├── app/                 # Next.js App Router — routing shells & API routes
│   ├── day-01/ … day-10/page.tsx
│   ├── login/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/
│       ├── chat/          (+ cache/, rag-citations/)
│       ├── conversations/ (+ [id]/)
│       └── messages/batch/
│
├── views/DayXX/         # Feature implementations (Katas)
├── design-system/       # Atomic Design (atoms → molecules → organisms)
├── hooks/               # Domain-agnostic reusable hooks
├── lib/                 # Auth, Prisma, React Query, MSW, LLM registry, RAG
├── store/               # Zustand global client state
├── components/          # App-level components (Providers, Counter, FizzBuzz)
└── layouts/             # MainLayout wrapper
```

This thin-routing-shell + thick-view pattern is well-suited to the App Router: pages stay minimal (server boundaries) while all feature logic lives under `src/views/` where it can be tested independently of Next.js internals.

### 2.2 Framework Choices

| Layer | Technology | Assessment |
|-------|-----------|------------|
| Framework | Next.js 16 (App Router) | Appropriate — enables SSR, API routes, and the Prisma backend in one repo |
| Styling | styled-components v6 + ThemeProvider | Well-integrated via `styledComponents: true` compiler flag and `StyledComponentsRegistry` for SSR hydration |
| State (client) | Zustand v5 with `persist` middleware | Minimal, correct — used only for auth/UI state, not server data |
| State (server) | TanStack React Query v5 | Appropriate — used for all data fetching with optimistic updates on Day 07 |
| ORM | Prisma v5 + SQLite | Pragmatic for a local development project; schema is well-normalized |
| Auth | NextAuth.js v4 (Credentials + JWT) | Standard approach; session extended to carry `user.id` |
| AI SDK | Vercel AI SDK v6 + `@ai-sdk/react` | Modern choice; `useChat` + SSE streaming is the right abstraction |
| Animation | Framer Motion v12 | Used tastefully in Day 07 task transitions and page layouts |

### 2.3 Routing Architecture

The 10-day pages are clean routing shells that simply render the corresponding view:

```tsx
// src/app/day-02/page.tsx
import Day02View from '@/views/Day02';
export default function Day02Page() { return <Day02View />; }
```

This decoupling means views are framework-portable and directly testable without a Next.js server context — a strong architectural decision.

### 2.4 TypeScript Configuration

`tsconfig.json` uses `"strict": false` with `"strictNullChecks": true`. This is a pragmatic trade-off for a project that evolved through a major migration, but it leaves type safety gaps — `noImplicitAny` and `strictFunctionTypes` are off. The `"checkJs": false` setting is fine given all files are TypeScript.

---

## 3. Design System

### 3.1 Atomic Design Implementation

The design system follows Atomic Design rigorously across three levels:

**Atoms (5):** `Button`, `Checkbox`, `Heading`, `Input`, `Spinner`
**Molecules (15+):** `Alert`, `Badge`, `Breadcrumbs`, `CardHeader`, `CheckboxGroup`, `Dropdown`, `FormGroup`, `InputGroup`, `Modal`, `Pagination`, `RadioGroup`, `SearchBar`, `StatBlock`, `StepIndicator`, `Tabs`, `Toast`
**Organisms (3):** `LoginForm`, `Navbar`, `Wizard`

Every component has: an implementation file, a `.styles.ts` for styled-components, a `.test.tsx`, and a `.stories.tsx`. This consistency is excellent — it makes the design system independently navigable and auditable.

### 3.2 Theme System

The theme uses HSL-based color tokens and a spacing scale, centralized in `src/design-system/tokens/`. `GlobalStyles.ts` resets and applies the base styles. The ThemeProvider is injected both in the app (`Providers.tsx`) and in tests (`test-utils.tsx`), so component rendering is always theme-consistent.

### 3.3 Storybook Integration

25 stories cover all atoms, all molecules, and 4 Day 10 components. The Storybook setup uses `@storybook/react-vite`, and the `@storybook/addon-a11y` plugin adds automated accessibility checking in the Storybook UI. Chromatic is wired up for visual regression in CI.

One notable gap: organisms (`LoginForm`, `Navbar`, `Wizard`) have no stories, making them absent from the visual regression surface.

---

## 4. State Management

The state management split is clean and well-enforced:

| State Type | Tool | Persistence | Notes |
|-----------|------|-------------|-------|
| Auth / UI flags | Zustand | `localStorage` (`coe-app-storage`) | Correct — only stable client state goes here |
| Server / async data | React Query | In-memory with staleTime | All fetching, mutation, optimistic updates |
| Form state | Local `useState` | — | Appropriate for Day 04/06 wizard steps |
| Chat messages | `useChat` (AI SDK) | Server-synced via `/api/conversations` | Hybrid: streaming + DB persistence |

The optimistic mutation pattern in Day 07 (`onMutate` / rollback) is correctly implemented and a strong demonstration of the pattern. The `useAppStore` Zustand store persisting to localStorage with the `persist` middleware is the right approach to avoid session loss on refresh.

---

## 5. Backend & Database

### 5.1 Prisma Schema

```
User → Conversation → Message
```

The schema is normalized, with UUIDs as primary keys and appropriate timestamps on all models. The `Message` model carries production-grade metadata: `promptTokens`, `completionTokens`, `model`, `systemPromptHash` (SHA-256 for cache keying), and `citations` (JSON array for RAG). These fields reflect real cost-management and observability thinking.

### 5.2 API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth session management |
| `/api/chat` | POST | LLM streaming (SSE), RAG injection, DB persistence, cache check |
| `/api/chat/cache` | GET | Cache lookup by hash |
| `/api/chat/rag-citations` | POST | Parallel citation fetch from RAG index |
| `/api/conversations` | GET/POST | List / create conversations |
| `/api/conversations/[id]` | GET | Fetch conversation with messages |
| `/api/messages/batch` | POST | Bulk save messages after stream completes |

The chat route is architecturally the most sophisticated: it checks the response cache (by `systemPromptHash + message`), injects RAG context into the system prompt, streams via SSE, and persists asynchronously. The separation of citation fetching into its own route (`/api/chat/rag-citations`) is a clean decomposition.

### 5.3 Database Hygiene

One issue: there are two SQLite files — `prisma/dev.db` and `prisma/prisma/dev.db`. The nested one appears to be an artifact of a migration and should be removed. Running `npx prisma db push` always creates at the `DATABASE_URL` path, so the duplicate is inert but adds confusion.

---

## 6. LLM / AI Integration

### 6.1 Provider Registry

`src/lib/llm/registry.ts` implements a three-provider failover chain:

```
local-gemma (default) → openai → anthropic
```

Each provider implements `LLMProviderAdapter` with `isHealthy()` and `getModel()`. The registry performs a live health check on the requested provider before returning it, then iterates the fallback order if unhealthy. This is production-grade resilience for a development kata.

### 6.2 RAG Pipeline

The RAG pipeline in `src/lib/rag/` has three modules with full TDD coverage:

- `index-builder.ts` — ingests PubMed JSON documents into a MiniSearch BM25 index
- `retriever.ts` — BM25 keyword search returning top-N results with score threshold
- `formatter.ts` — formats retrieved documents into the system prompt context block

PubMed data lives under `data/pubmed/` (fetched via `scripts/fetch-pubmed.ts`). The `systemPromptHash` field in the `Message` model means the same user query under different system prompts (different medical specialties) correctly bypasses the cache — a subtle but important correctness detail.

### 6.3 Streaming Architecture

The chat API uses Vercel AI SDK's `streamText` and returns an SSE response. The client uses `useChat` from `@ai-sdk/react`. A parallel citation fetch fires immediately after the stream completes. User flow diagrams documenting this architecture exist in `docs/day10-userflow.mmd` and `docs/day10-userflow.png` — an excellent transparency practice.

---

## 7. Testing Strategy

This is the most comprehensive aspect of the project and deserves the most detailed treatment.

### 7.1 Testing Layers

```
┌────────────────────────────────────────────────────────┐
│  Layer 4: Visual Regression (Chromatic / Storybook)    │
├────────────────────────────────────────────────────────┤
│  Layer 3: Headless A11y Audit (pa11y-ci, WCAG 2.1 AA)  │
├────────────────────────────────────────────────────────┤
│  Layer 2: E2E (Playwright × 5 browsers + Cypress)      │
├────────────────────────────────────────────────────────┤
│  Layer 1: Unit / Component (Vitest + RTL + jest-axe)   │
└────────────────────────────────────────────────────────┘
```

### 7.2 Unit & Component Tests (47 files)

**Configuration (`vitest.config.ts`):**
- `jsdom` environment
- `globals: true` — no boilerplate imports in test files
- `setupFiles: ['./src/setupTests.ts']`
- E2E directory excluded (`**/tests/e2e/**`)
- `@` alias mirrors the app config

**Global Test Setup (`src/setupTests.ts`):**
- `jest-axe` registered globally via `expect.extend(toHaveNoViolations)` — axe assertions available in every test file without any additional setup
- MSW server started `beforeAll`, handlers reset `afterEach`, server closed `afterAll` — correct lifecycle
- `next/navigation` mocked (`useRouter`, `usePathname`, `useSearchParams`) — avoids Next.js dependency in unit tests
- `next-auth/react` mocked with a static unauthenticated session — keeps tests independent of auth state
- `window.matchMedia` polyfilled — prevents hook errors in jsdom

**Custom Render (`src/design-system/test-utils.tsx`):**
This is a standout implementation. The custom `render` and `renderHook` wrappers inject all three required providers:

```
QueryClientProvider (fresh per test, retry: false, gcTime: 0)
  └─ ThemeProvider (production theme)
       └─ LayoutProvider (responsive context)
```

A fresh `QueryClient` per test prevents React Query cache from leaking between tests. The `retry: false` and `gcTime: 0` settings avoid flaky async behaviour. This is textbook React Query testing hygiene.

**Test Distribution:**

| Category | Files | Notable |
|----------|-------|---------|
| Design system atoms/molecules/organisms | 22 | Full coverage of all 30+ components |
| Custom hooks | 8 | DOM side effects, storage, media queries tested |
| Feature views (Days 02–10) | 8 | From weather search to LLM chat |
| Library / utility | 4 | RAG pipeline (TDD — 3 files), FizzBuzz |
| API routes | 1 | Chat route — 254 lines, most complex test file |
| Layouts | 1 | MainLayout |
| App components | 2 | Counter, FizzBuzz |

**Testing Patterns Used:**
- Behaviour-first: `findByRole`, `getByLabelText`, `getByText` — not `querySelector`
- `userEvent.setup()` over `fireEvent` — closer to real browser interactions
- MSW handler overrides per test for error paths (`server.use(http.post(...))`)
- `axe()` + `toHaveNoViolations()` for structural accessibility assertions (explicitly in Modal tests)
- Arrange-Act-Assert structure is consistently followed
- DOM side-effect cleanup in `beforeEach`/`afterEach` for hooks that touch `document.body`

**API Route Test (`src/app/api/chat/__tests__/route.test.ts`, 254 lines):**
This is the most sophisticated test file. It mocks the Prisma client, LLM registry, and RAG pipeline to test the chat route's full decision tree:
- Returns 400 for missing `messages`
- Returns 503 when no LLM provider is available
- Successful streaming with DB persistence
- Cache hit short-circuits LLM call
- RAG context injection from retrieved documents
- Response saved to cache after streaming

### 7.3 Playwright E2E Tests (8 files)

**Configuration (`playwright.config.ts`):**
- 5 browser profiles: Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12)
- `fullyParallel: true` locally, `workers: 2` on CI
- `retries: 2` on CI only
- Screenshots on failure, trace on first retry
- Global setup seeds the test database with `doctor@example.com`
- `webServer` block starts `npm run start` before tests, reuses existing server locally

**Test Coverage:**

| File | Purpose | Highlight |
|------|---------|-----------|
| `smoke.spec.ts` | All pages load | Baseline health check |
| `auth_flow.spec.ts` | Login → feature → logout | Real auth via seeded DB |
| `day04.spec.ts` | Modal focus trapping, toast ARIA | `Tab` / `Shift+Tab` cycle assertions |
| `day05.spec.ts` | Axe-builder audit, touch targets | `AxeBuilder` scoped to `.day-05-grid`; 44×44px checks |
| `day07.spec.ts` | Task CRUD | Optimistic updates verified |
| `performance.spec.ts` | Core Web Vitals | LCP < 2500ms, CLS < 0.1 via `PerformanceObserver` |
| `visual.spec.ts` | Visual regression snapshots | Snapshot-based regression |
| `global-setup.ts` | DB seeding | `bcryptjs` hash, Prisma upsert |

The performance budget test measuring LCP and CLS via the browser's `PerformanceObserver` API is an advanced technique rarely seen in kata-level projects. The multi-browser matrix (including mobile Safari) demonstrates genuine commitment to cross-platform quality.

### 7.4 Cypress E2E Tests (4 files, Legacy)

Cypress covers `auth_flow`, `day04`, `day05`, and `day07` — mirroring the Playwright suite. `cypress-axe` is imported in the support file. The tests use `cy.intercept()` for API mocking rather than MSW. These are being superseded by Playwright; the migration is partially complete.

### 7.5 Accessibility Testing (Three Layers)

**Layer 1 — Unit (jest-axe):** `toHaveNoViolations` globally available. Explicitly used in Modal tests; the infrastructure exists for adoption across all components.

**Layer 2 — E2E (axe-core/playwright):** `day05.spec.ts` runs `AxeBuilder` scoped to the feature region and asserts zero violations. `day04.spec.ts` manually verifies ARIA attributes (`aria-modal`, `aria-labelledby`) and touch target sizes (`≥ 44×44px`).

**Layer 3 — Headless CI (pa11y-ci):** WCAG 2.1 AA scan against 5 URL targets (`day-01` through `day-05`), with `useIncognitoBrowser: true` and sandbox Chrome flags for CI compatibility.

### 7.6 Visual Regression (Chromatic)

A dedicated `visual-regression` CI job runs `npx chromatic` with the `CHROMATIC_PROJECT_TOKEN` secret. This gives Storybook-level visual diff coverage across all 25 stories. The `@storybook/addon-a11y` plugin adds accessibility overlays in the Storybook UI as a developer aid.

### 7.7 Performance Budgets (size-limit)

`size-limit` is configured with a **600 KB limit** on `.next/static/chunks/**/*.js`. The CI job runs `npm run test:size` after build — a hard gate that would fail the build if a dependency inadvertently bloats the bundle. This is production-quality thinking for a kata project.

### 7.8 Pre-commit Hooks (Husky + lint-staged)

`.husky/pre-commit` runs `npx lint-staged`, which executes:
1. `eslint --fix` on staged `*.{js,jsx,ts,tsx}` files
2. `vitest related --run` — runs only tests related to staged files

This is an ideal pre-commit configuration: fast (runs related tests only), catches issues before they land in history, and auto-fixes linting.

---

## 8. CI/CD Pipeline

### 8.1 GitHub Actions

**Triggers:** All branches and all PRs (`branches: ["**"]`) plus manual dispatch.

**Job 1: `build-and-test`**

```
Checkout → Node 20 (npm cache) → npm ci → Prisma generate + db push
  → Lint → Build → size-limit → Unit Tests → Cypress E2E
  → Playwright E2E → Pa11y A11y
  → Upload Cypress artifacts on failure
```

This is a comprehensive, ordered pipeline. The Prisma `db push` step correctly sets up the SQLite schema in CI. `--legacy-peer-deps` on `npm ci` is a minor flag — likely needed for a transitive peer conflict and acceptable for now.

**Job 2: `visual-regression`**

```
Checkout (full history) → Node 20 → npm ci → Chromatic
```

Runs in parallel with `build-and-test`. Full git history (`fetch-depth: 0`) is correctly set — Chromatic needs history for baselines.

### 8.2 What's Well-Covered

- Both Cypress and Playwright run in CI (unlike the `npm run test:all` script which only runs Cypress locally)
- Performance budgets enforced as a hard gate post-build
- Chromatic visual regression in a dedicated parallel job
- Artifacts (screenshots, videos) uploaded on test failure for debugging
- Database setup automated — no manual seeding step needed

### 8.3 Observations

The `test:all` npm script and the CI workflow are intentionally different: `test:all` is the local developer shortcut (Cypress-only), while CI runs the full suite including Playwright. This is documented implicitly but could confuse a new developer expecting `test:all` to match CI exactly.

---

## 9. Developer Experience

### 9.1 GitNexus Code Intelligence

GitNexus is wired as a Claude Code MCP server, giving AI-assisted development access to the full symbol graph (2,291 nodes, 2,896 edges, 14 execution flows). A `PostToolUse` hook in `.claude/settings.json` auto-reindexes after commits. Skill files under `.claude/skills/gitnexus/` document how to use each capability (exploring, impact analysis, debugging, refactoring). This is a genuinely sophisticated AI-assisted development setup that goes well beyond standard tooling.

### 9.2 CLAUDE.md

A comprehensive `CLAUDE.md` documents the architecture, all commands, state management split, LLM provider logic, testing approach, database commands, commit conventions, and required environment variables. This is the right place for AI-assistant guidance and is kept accurate. The GitNexus section is auto-updated by `npx gitnexus analyze`.

### 9.3 .cursorrules

A `.cursorrules` file provides equivalent guidance for the Cursor IDE, demonstrating awareness that different AI-assisted tools need project context in different formats.

### 9.4 Storybook

Storybook runs on port 6006 with `@storybook/react-vite`. The 25 stories cover all atoms and molecules, acting as a living component library and the target surface for Chromatic visual regression. The `@storybook/addon-a11y` overlay is available to developers for interactive accessibility checking during component development.

### 9.5 Tooling Ergonomics

| Tool | Integration | Quality |
|------|------------|---------|
| ESLint | `eslint.config.js` (flat config), `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, Storybook plugin | Solid — hooks rules enforced |
| TypeScript | `ts ~6.0.2`, incremental build | Good — `strictNullChecks` on; `strict: false` is the main gap |
| Prisma Studio | `npx prisma studio` | Available for DB inspection |
| React Query Devtools | Installed as devDependency | Available in development |
| Node memory | `NODE_OPTIONS='--max-old-space-size=4096'` on test scripts | Appropriate for large jsdom test suites |

### 9.6 Scripts Inventory

The `package.json` scripts are well-organized and cover every phase of the development workflow:
- Development (`dev`, `storybook`)
- Quality (`lint`, `test`, `test:run`, `test:e2e`, `test:a11y`, `test:all`, `test:size`)
- Database (`db:delete-conversations`)
- RAG data (`rag:fetch`, `rag:fetch:all`, `rag:test`)
- Visual regression (`chromatic`)
- Build (`build`, `build-storybook`)

---

## 10. Documentation

### 10.1 Root-Level Documentation

| File | Content | Quality |
|------|---------|---------|
| `README.md` | Project overview, daily progress log, TDD strategy summary, GitNexus setup | Good — comprehensive daily progress log is excellent for assessment |
| `ARCHITECTURE.md` | Directory structure, core principles, scalability rationale | Needs update — still references `src/pages/` and Vite terminology from before the Next.js migration |
| `GUIDELINES.md` | TDD workflow, commit conventions, component architecture, state management rules | Concise and accurate |
| `COMMIT_CONVENTION.md` | Emoji/type convention with examples | Clear and followed consistently in the commit history |
| `CLAUDE.md` | AI-assistant instructions, architecture, commands | Excellent — most up-to-date document in the project |

### 10.2 `/docs/` Directory

20+ documentation files covering:
- Day-specific implementation plans (`day_04_completion_plan.md`, `day_06_architecture_and_implementation_plan.md`, etc.)
- Architecture deep dives (`wizard_architecture.md`, `state_management.md`, `design_system.md`)
- RAG architecture (`rag-pipeline-plan.md`, `Day10- RAG_architectural_flow.md`, `Day10- RAG_class_diagram_DX.md`)
- Performance audit (`performance-audit-report.md`)
- GitNexus reference (`gitnexus.md`)
- User flow diagrams (`day10-userflow.mmd`, `day10-userflow.png`)

The breadth of pre-implementation planning documents demonstrates disciplined upfront design. The Mermaid diagram and PNG export for the Day 10 SSE flow is a strong visual communication practice.

### 10.3 Playwright Maintenance Note

`tests/MAINTENANCE.md` provides runbook notes for maintaining the E2E test suite — a thoughtful addition that signals awareness of long-term maintainability.

---

## 11. Commit Discipline & TDD Adherence

### 11.1 Commit Convention Adherence

The convention `{emoji} {type} {DayXX}: {feature} - {message}` is well-followed throughout the 374-commit history. Early commits show the strict TDD cycle visibly:

```
8a89881 test(fizzbuzz): add failing test for input 1          ← 🔴 RED
2dc721c feat(fizzbuzz): implement basic number return          ← 🟢 GREEN
ef678e2 feat(fizzbuzz): implement Fizz logic for multiples of 3
d64f4e3 test(fizzbuzz): add failing test for input 3
...
```

Later commits show appropriate use of `⚙️ chore` for infrastructure work and `♻️ refactor` for clean-up phases.

### 11.2 TDD Evidence

The RAG pipeline (`src/lib/rag/`) is a strong example of TDD applied to pure business logic. Each of the three modules (`index-builder`, `retriever`, `formatter`) has a dedicated test file with tests written before or alongside the implementation. The `55143f1 🔴🟢 test Day10: RAG - add TDD implementation of BM25 retrieval pipeline` commit bundles the red-green for the full pipeline, which is slightly against the atomic-commit ideal but acceptable for an exploratory domain.

### 11.3 Atomic Commit Quality

The project correctly avoids `git add .` and stages files individually. Commits are small and purposeful. The 374-commit history is a genuine record of progressive development rather than bulk squashes.

---

## 12. Gaps & Improvement Areas

These are observations for improvement — not blockers for a portfolio submission.

### 12.1 TypeScript Strictness

`"strict": false` in `tsconfig.json` disables `noImplicitAny`, `strictFunctionTypes`, `strictBindCallApply`, and `strictPropertyInitialization`. Only `strictNullChecks` is enabled via an explicit override. For a project demonstrating production-readiness, enabling full strict mode would close this gap.

### 12.2 Pa11y Coverage Incomplete

`.pa11yci` scans only Days 01–05. Days 06–10 — including the modal-heavy Day 06, the task board Day 07, and the medical chat Day 10 — have no headless accessibility scan. Given that Day 10 involves a complex UI with dynamic content (streaming responses, citations panel, conversation sidebar), this is the most impactful coverage gap.

**Fix:** Add Days 06–10 to `.pa11yci`. Note that Days 09/10 require auth — use the `actions` field to log in first.

### 12.3 `jest-axe` Underutilized in Unit Tests

`toHaveNoViolations` is globally registered but only one test file (`Modal.test.tsx`) explicitly calls `axe(container)`. With 22 design-system component test files, each could include an axe scan as a baseline assertion alongside the behavioural tests.

### 12.4 Documentation Staleness

`ARCHITECTURE.md` and `README.md` reference the old Vite structure (`src/pages/`, `src/main.tsx`, Cypress as the sole E2E tool). These should be updated to reflect the Next.js App Router migration and the addition of Playwright.

### 12.5 Dual E2E Frameworks

Cypress and Playwright now cover the same test scenarios (auth, day04, day05, day07). Maintaining two E2E frameworks doubles the maintenance surface. The migration to Playwright is clearly in progress — completing it and retiring the Cypress suite would reduce this overhead. The `test:all` script still runs Cypress only; CI runs both.

### 12.6 No Coverage Thresholds

`@vitest/coverage-v8` is installed but no coverage thresholds are configured in `vitest.config.ts` and no `npm run test:coverage` script exists. Without enforcement, coverage can silently degrade. Adding a `coverage` block with `thresholds: { lines: 80, functions: 80 }` would make regressions visible.

### 12.7 Duplicate Database File

`prisma/prisma/dev.db` is a nested duplicate of `prisma/dev.db`. It appears to be an artifact from the initial Prisma setup and should be removed to avoid confusion.

### 12.8 Organisms Missing from Storybook

`LoginForm`, `Navbar`, and `Wizard` have no stories. These are the most complex components in the design system and the most valuable targets for visual regression. Adding stories for their key states would complete the visual regression surface.

### 12.9 `useSearchParams` Mock Limitation

`setupTests.ts` mocks `useSearchParams` to return `new URLSearchParams()` (always empty). Components that read URL query parameters in tests will see no params. The `Day10/index.test.tsx` tests URL-param-driven behaviour — if these rely on the mock, they may not catch param-parsing bugs.

### 12.10 `--legacy-peer-deps` in CI

`npm ci --legacy-peer-deps` suppresses peer dependency conflict errors. This is a yellow flag — it means at least one transitive peer conflict exists in the dependency tree. It's worth investigating and resolving so that the dependency graph is clean.

---

## 13. Summary Scorecard

| Area | Score | Notes |
|------|-------|-------|
| **Architecture** | ★★★★★ | Clean App Router structure, feature isolation, correct SSR setup |
| **Design System** | ★★★★★ | Full Atomic Design, consistent file structure, theme tokens |
| **State Management** | ★★★★★ | Correct Zustand/React Query split, optimistic updates |
| **Backend / API Design** | ★★★★☆ | Solid routes, good schema; duplicate DB file is minor |
| **LLM / AI Integration** | ★★★★★ | Failover registry, RAG pipeline, streaming, cost-aware caching |
| **Unit Testing** | ★★★★☆ | 47 files, great patterns, jest-axe underutilized |
| **E2E Testing** | ★★★★☆ | Playwright with 5 browsers, Core Web Vitals, performance budgets |
| **Accessibility Testing** | ★★★★☆ | Three-layer strategy; pa11y coverage incomplete for Days 06–10 |
| **CI/CD Pipeline** | ★★★★★ | Lint → build → size-limit → unit → Cypress → Playwright → pa11y → Chromatic |
| **Developer Experience** | ★★★★★ | GitNexus, CLAUDE.md, Husky, Storybook, comprehensive scripts |
| **Documentation** | ★★★★☆ | Comprehensive; ARCHITECTURE.md and README.md need update post-migration |
| **Commit Discipline** | ★★★★★ | 374 commits, TDD cycle visible from Day 01, no `git add .` |
| **TypeScript Quality** | ★★★☆☆ | `strictNullChecks` only; full `strict: true` would strengthen guarantees |

**Overall: Strong portfolio-grade project.** The commitment to TDD from the very first commit, the three-layer accessibility strategy, the performance-budgeted CI pipeline, the RAG pipeline with medical citations, and the AI-assisted development tooling (GitNexus) collectively demonstrate senior-level thinking in both engineering and project process. The gaps identified are real but all minor, addressable, and do not undermine the quality of the work.

---

*Report generated by Claude Code (Sonnet 4.6) on 2026-05-06. No code was modified during this review.*
