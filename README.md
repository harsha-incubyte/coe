# Centre of Excellence - Incubyte Katas

This project is a collection of React + TypeScript Katas, developed following strict **Test-Driven Development (TDD)** principles. Each day represents a new challenge and a step forward in mastering modern web development.

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize Mock Service Worker (MSW):
   ```bash
   npx msw init public/ --save
   ```

### Running the Project
- **Development Server**: `npm run dev`
- **Storybook**: `npm run storybook` (Design System documentation)
- **Run Tests**: `npm run test`
- **Linting**: `npm run lint`
- **Accessibility Audit**: `npm run test:a11y:ci`
- **Full Quality Check**: `npm run test:all` (Lints + Unit Tests + E2E + Pa11y + Storybook Audit)

## 🛠 Project Architecture

The application is a **Next.js 16 App Router** project. Each "Day" is isolated as a self-contained view under `src/views/`, containing its components, styles, and tests. The `src/app/` layer holds only thin routing shells and the full-stack API routes.

The codebase completed two major refactoring phases:
- **Phase 2 (Atomic Design Migration):** All legacy vanilla CSS and duplicate UI components across all Katas were migrated to a strict `styled-components` design system.
- **Phase 3 (Next.js Migration):** Vite + React SPA was migrated to Next.js 16 App Router, adding SSR, API routes, Prisma database integration, and NextAuth authentication.

### Directory Structure
```text
src/
├── app/            # Next.js App Router — routing shells & API routes
│   ├── day-01/ … day-10/page.tsx  # Thin routing shells
│   ├── login/      # Login page
│   └── api/        # Full-stack API (auth, chat/LLM, conversations, messages)
├── views/          # Daily Kata implementations (Day01 - Day10)
├── design-system/  # Atomic Design System (Atoms, Molecules, Organisms)
│   ├── atoms/      # Basic blocks (Button, Input, Heading)
│   ├── molecules/  # Compound components (SearchBar, Modal, Tabs)
│   ├── organisms/  # Complex sections (Wizard, LoginForm, Navbar)
│   └── theme/      # Design tokens and Global Styles
├── hooks/          # Domain-agnostic utility hooks
├── layouts/        # Page layouts (MainLayout with Navbar)
├── lib/            # Auth, Prisma, React Query, MSW, LLM registry, RAG pipeline
├── store/          # Zustand global client state (persisted to localStorage)
└── setupTests.ts   # Vitest & jest-dom configuration
```

## 🧪 Testing Strategy (TDD)

We follow a strict **Red-Green-Refactor** cycle using standardized commit markers (🔴, 🟢, ♻️, ⚙️, 🎨). Our testing stack includes:

- **Unit Testing (Vitest + React Testing Library)**: For isolated component logic and DOM state verification. A custom `test-utils.tsx` pre-wires all providers (Theme, React Query, Layout) so every test renders with the full context.
- **End-to-End Testing (Playwright)**: Primary E2E framework — covers 5 browser/device profiles (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari) including auth flows, keyboard interaction, performance budgets, and visual regression snapshots. Cypress tests are retained for backward compatibility.
- **API Mocking (Mock Service Worker)**: Intercepts network requests in unit tests. Playwright uses `page.route()` for per-test API interception in E2E.
- **Performance Budgets**: `size-limit` enforces a 600 KB JS bundle cap in CI. `performance.spec.ts` asserts Core Web Vitals (LCP < 2500ms, CLS < 0.1) via `PerformanceObserver`.
- **Automated Accessibility Auditing**:
  - **`jest-axe`**: Globally registered in `setupTests.ts` — available in every unit test via `toHaveNoViolations()`.
  - **`axe-core/playwright`**: `AxeBuilder` scoped scans in E2E tests (e.g., `day05.spec.ts`) for dynamic A11y verification.
  - **`Pa11y`**: Global, URL-based auditing against WCAG 2.1 AA standards, integrated into the CI pipeline.
- **Manual Sanity Checks**: Verification of WCAG AA Contrast (4.5:1 ratio) and Mobile Touch Targets (min 44x44px hit area).
- **Visual Regression (Chromatic + Storybook)**: Storybook documents all 25 component states. Chromatic runs in a dedicated CI job for automated visual diffing across every PR.

## 🧠 AI Code Intelligence (GitNexus)

This project uses [GitNexus](https://github.com/abhigyanpatwari/GitNexus) to give Claude Code a deep knowledge graph of the codebase — 2,291 symbols, 2,896 relationships, 14 execution flows — so it can analyse blast radius before edits, trace call chains when debugging, and do safe multi-file renames.

Everything runs **locally on this machine**. No code leaves the filesystem.

### Quick setup on a new machine

```bash
npx gitnexus analyze --skills         # index repo + generate skills (run from project root)
claude mcp add gitnexus -- npx -y gitnexus@latest mcp  # register MCP with Claude Code
```

After commits Claude Code automatically re-indexes via a PostToolUse hook (configured in `.claude/settings.json`).

### Safe Development Workflow

To maintain codebase integrity, we follow these GitNexus-driven rules:
- **Impact Analysis**: Before modifying any symbol (function, class, method), we run `npx gitnexus impact <symbol>` to assess the blast radius.
- **Change Detection**: Before every commit, we run `npx gitnexus detect-changes` to verify that our edits only affect the intended symbols and execution flows.
- **Visual Validation**: We use the knowledge graph to trace execution paths for complex features like SSE streaming and RAG pipelines.

See [`docs/gitnexus.md`](docs/gitnexus.md) for the full reference.

## 🤖 Continuous Integration (GitHub Actions)

This project uses GitHub Actions to ensure code quality on every push and pull request. The workflow runs two parallel jobs:

**`build-and-test`**
- **Lint**: Ensures code follows ESLint standards.
- **Build**: Verifies that the application compiles correctly (Next.js production build).
- **Performance Budgets**: `size-limit` enforces a 600 KB JS bundle cap.
- **Unit Tests**: Runs all Vitest tests.
- **E2E (Cypress)**: Executes legacy Cypress end-to-end tests.
- **E2E (Playwright)**: Runs the full Playwright suite across Chromium, Firefox, and WebKit.
- **A11y**: Performs a WCAG 2.1 AA accessibility audit using Pa11y.

**`visual-regression`**
- **Chromatic**: Publishes Storybook to Chromatic and runs automated visual diffing against the baseline.

## 📅 Daily Progress

### Day 01: The Basics
- **FizzBuzz**: Implementation of the classic logic kata.
- **Counter**: A simple state management component.
- *Focus*: Vitest setup and `@testing-library/react` basics.

### Day 02: Forms & Weather Dashboard
- **Login Form**: A validated form with MSW integration and auto-redirect logic.
- **Weather Dashboard**: A premium interface featuring debounced search (300ms) and local storage persistence.
- *Focus*: Custom hooks, MSW API simulation, and Cypress E2E testing.

### Day 03: Semantic Audit & Accessibility
- **Semantic Refactor**: Replaced generic "div soup" with semantic HTML5 elements.
- **A11y Enhancements**: Implemented "Skip to Content" links and fully keyboard-accessible search bars (WCAG AA).
- *Focus*: Focus management, ARIA patterns, and semantic document structure.

### Day 04: ARIA Patterns & Reusable Components
- **Accessible Modal**: A decoupled, headless modal with focus trapping, focus restoration, and Escape key handling.
- **ARIA Live Regions**: Implementation of a global announcement hub to compare `polite` vs `assertive` live intensities.
- **Polymorphic Components**: Building reusable, type-safe atomic components (Button, Input).
- *Focus*: Focus trapping, focus restoration, ARIA dialog patterns, and live region announcements.

### Day 05: Automation & UI Sanity
- **Automated A11y**: Integration of `jest-axe` for unit tests and `cypress-axe` for dynamic E2E flow verification.
- **Touch Targets**: Standardized all interactive elements (buttons, links, triggers) to a minimum **44x44px** hit area.
- **Contrast Polish**: Optimized color contrast for all critical UI elements (errors, primary actions) to ensure passing WCAG 4.5:1 ratio on dark backgrounds.
- *Focus*: Automated accessibility auditing, mobile ergonomics, and WCAG compliance.

### Day 06: Performance & Headless Architecture
- **Multi-Step Configuration Wizard**: A complex, high-performance dashboard view for device onboarding.
- **Split Context Pattern**: Implementation of a performance-first state management pattern, decoupling "Navigation State" from "Domain Data" to eliminate redundant re-rendering of control buttons.
- **Headless Component Logic**: Refactored core navigation into generic, domain-agnostic hooks (`useStepNavigation`) and components, allowing the Wizard logic to be reused across different domains.
- **Auth Protection (HOC)**: Created a reusable `withAuth` Higher-Order Component to standardize route protection and dynamic redirection logic across the app.
- *Focus*: Performance optimization (Split Context), Headless Architecture, and Higher-Order Components.

### Day 07: State Management & Data Fetching
- **Persistent Zustand Store**: Centralized client-side state management for authentication using `zustand/middleware/persist` (replacing manual `localStorage` hooks) for seamless session recovery.
- **Advanced React Query Integration**: Implementation of a robust server state management system for task handling, featuring automatic background refetching and centralized query hydration.
- **Optimistic UI Updates**: Premium Task Board implementation that provides "instant" feedback on completion toggles using React Query's `onMutate` pattern, complete with error rollback.
- **Animated UX with Framer Motion**: Integrated `framer-motion` for fluid task transitions, status pill indicators, and high-quality interaction feedback.
- *Focus*: Synchronization of client vs. server state, optimistic mutation patterns, and maintaining UI responsiveness during long-running asynchronous operations.

### Day 08: Premium Design System & Architecture Foundations
- **Atomic Particles**: Established a centralized HSL-based color palette and spacing scale using `styled-components` ThemeProvider.
- **Design System Implementation**:
    - **Atoms**: Type-safe, WCAG-compliant `Heading`, `Button`, `Input`, and `Checkbox`.
    - **Molecules**: Completed 15 core molecules including `Modal`, `Tabs`, `Toast`, `SearchBar`, `Breadcrumbs`, `Pagination`, and `StepIndicator`.
- **Custom Hooks Collection**: Reusable, domain-agnostic hooks (`useDisclosure`, `useMediaQuery`, `useOnClickOutside`, `useBoolean`, `useDropdown`, `useModal`).
- **Performance & Navigation**:
    - **Lazy Loading**: Implemented route-based code splitting for all daily pages to optimize initial bundle size.
    - **Page Transitions**: Global `PageLayout` integrating `framer-motion` for premium UX.
- *Focus*: Scalable Atomic Design, Storybook Documentation, Performance Optimization, and robust Accessibility (WCAG 2.1 AA).

### Day 09: Medical Chat UI Foundation
- **Chat Interface Layout**: Created a premium, responsive medical chat interface featuring a conversation sidebar, message list, and chat input.
- **Mock AI Interaction**: Developed `useMockAI` hook to simulate typing indicators, network latency, and artificial error rates for robust UI state testing.
- **Chat State Management**: Implemented `useChatState` to handle client-side conversation history, message status transitions (sent, delivering, error), and message resending logic.
- *Focus*: UI layout, complex state management for asynchronous message flows, and error state visualization without a real backend.

### Day 10: AI/LLM Integration & Performance Optimization
- **Real LLM Streaming**: Integrated `@ai-sdk/react` (`useChat`) with `TextStreamChatTransport` to connect to a real backend API (`/api/chat`), featuring true server-sent events (SSE) streaming.
- **Streaming Stability**: Fixed race conditions, flickering, and stale closures in the `useChat` implementation to ensure a smooth, uninterrupted streaming experience.
- **Citation System**: Implemented a parallel citation fetching system that links LLM responses to verified medical sources (PubMed/RAG) in real-time.
- **Caching & Cost Optimization**: Implemented aggressive caching (`/api/chat/cache`) for identical prompts to minimize redundant LLM API calls and reduce operational costs.
- **Database Integration**: Connected the chat UI to a real backend to persist conversations and batched messages (`/api/conversations`, `/api/messages/batch`), leveraging `@tanstack/react-query` for synchronization.
- **Prompt Engineering System**: Added a `PromptTemplateSelector` allowing users to switch between different system prompts (e.g., standard vs. medical persona) before starting a conversation.
- **Architectural Visibility**: Created detailed user flow diagrams documenting the SSE streaming architecture and state synchronization logic.
- *Focus*: Real-time SSE streaming, LLM API cost management, citation integration, and architectural documentation.

## 📝 TODOs

- [ ] **Internationalization (i18n)**: Implement support for multiple languages using a framework like `react-i18next`. Ensure all static text, date formats, and accessibility labels are localized.
- [x] **Shared Theme System (Phase 2 Refactor)**: Standardized all color tokens, spacing, and typography into a centralized `styled-components` ThemeProvider. This was retroactively applied to all Katas (Day 01 - Day 07) to eliminate legacy CSS, remove duplicate components, and guarantee WCAG AA contrast compliance across the board.
- [ ] **State Machine Integration**: Explore XState for complex, multi-step flows to further decouple logic from React components.
- [ ] **AI-Driven Workflows**: Formalize custom local LLM agent workflows (e.g., via Antigravity and Gemma 2) to automate routine TDD tasks and PR summaries.

---
*Created with ❤️ by Harsha at Incubyte*
