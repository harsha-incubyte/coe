# Migrate to Next.js & Full-Stack AI Integration

This plan outlines the steps to perform an **in-place** migration of the current Vite-based React Single Page Application into a Next.js (App Router) full-stack application. The migration will be executed in small, meaningful chunks to ensure that existing features and testing infrastructure (A11y, Cypress, Vitest) are not broken. 

The goal is to enable server-side capabilities for Email/Password Authentication, a Database connection, and a robust API layer for AI model integrations (Local Gemma 2 9B, OpenAI, and Anthropic's Claude) using the Vercel AI SDK.

## User Review Required

> [!IMPORTANT]
> **Database Choice**: For storing user credentials, conversation history, and caching, I recommend using **PostgreSQL** via **Prisma ORM**. PostgreSQL is highly robust for production, and Prisma provides excellent type safety and migration tooling. Alternatively, we can start with **SQLite** for easier local development if you prefer not to set up a Postgres instance immediately. *Please confirm if you are okay with Prisma + SQLite (for local dev) moving towards PostgreSQL.*

## AI SDK Comparison Matrix

As requested, here is a comparison of top AI SDK choices for this use case to justify the selection of Vercel AI SDK:

| Feature/SDK | Vercel AI SDK | LangChain.js | LlamaIndex.ts |
| :--- | :--- | :--- | :--- |
| **Primary Focus** | Seamless UI/UX, React Hooks (`useChat`), Streaming | Complex Agentic Workflows, Tool Chaining | RAG (Retrieval-Augmented Generation), Data Ingestion |
| **Learning Curve** | Low (React-centric) | High (Custom abstractions) | Medium (Data-centric) |
| **Multi-Model Support**| Excellent (OpenAI, Anthropic, Custom via OpenAI API) | Excellent | Good |
| **UI Integration** | Built-in React hooks (`useChat`, `useCompletion`) | Requires manual wiring | Requires manual wiring |
| **Local Model (Gemma)**| Yes (via LiteLLM/OpenAI-compatible proxy) | Yes | Yes |
| **Best For...** | **Building Chat UIs quickly with robust streaming.** | Building complex, multi-step autonomous agents. | Connecting LLMs to large internal document databases. |

**Conclusion**: The **Vercel AI SDK** is the best fit for our specific use case, which is focused on building a responsive Medical Q&A chat interface with multiple models and robust streaming capabilities.

---

## Proposed Migration Chunks (In-Place)

We will execute this migration on a **new branch** in the following isolated chunks. We will run tests after every chunk to verify stability.

### Chunk 1: Next.js Foundation & Build Setup
Initialize Next.js alongside Vite, allowing both to run initially if needed, then fully swap.
#### [NEW] `next.config.ts`
- Setup Next.js configuration, enabling compiler options for `styled-components`.
#### [MODIFY] `package.json`
- Add `next`, `react@19` (or `18` based on Next.js 15 requirements), `react-dom@19`.
- Update scripts: add `next:dev`, `next:build`. We will keep `vite` scripts temporarily until the switch is confirmed.
#### [MODIFY] `cypress.config.ts`, `vitest.config.ts`, `.pa11yci`
- Ensure our testing tools can point to the Next.js dev server port (e.g., `localhost:3000`) once we switch. 

### Chunk 2: Root Layout & Global Providers
Create the App Router foundation.
#### [NEW] `src/app/layout.tsx`
- Implement the root HTML document.
- Migrate global styles and `styled-components` registry.
#### [NEW] `src/app/page.tsx`
- Setup a temporary landing page or redirect to the primary route.

### Chunk 3: Routing Refactor (Iterative)
Migrate existing `react-router-dom` routes to Next.js file-based routing.
#### [MODIFY] `src/pages/*` -> `src/app/*`
- Example: `src/pages/Day09` -> `src/app/day09/page.tsx`.
- Replace `useNavigate` with `next/navigation`'s `useRouter`.
- Replace `<Link>` from `react-router-dom` with `next/link`.
- **Testing Checkpoint**: Run Cypress E2E tests to verify navigation works as expected in Next.js.

### Chunk 4: Database & Authentication
Setup Prisma and NextAuth (Auth.js) for Email/Password login.
#### [NEW] `prisma/schema.prisma`
- Define `User`, `Conversation`, and `Message` models.
#### [NEW] `src/app/api/auth/[...nextauth]/route.ts`
- Implement NextAuth with `CredentialsProvider`.
- Add bcrypt for password hashing.
#### [NEW] `src/middleware.ts`
- Protect chat routes, requiring active sessions.

### Chunk 5: Vercel AI SDK & API Layer
Implement the backend chat logic.
#### [NEW] `src/app/api/chat/route.ts`
- Setup POST endpoint using Vercel AI SDK `streamText`.
- Implement dynamic provider selection (OpenAI, Anthropic, Custom/LiteLLM for Gemma 2).
- Add logic to save user messages and AI responses to the Database (Prisma) during the stream lifecycle callbacks.
#### [MODIFY] `ConversationSidebar.tsx` & Chat Components
- Swap custom state management with Vercel AI SDK's `useChat` hook.
- Connect the UI to the new `/api/chat` endpoint.

### Chunk 6: Cleanup & Final Validation
#### [DELETE] Vite configuration
- Remove `vite.config.ts`, `index.html`, `react-router-dom`, and update `package.json` to make Next.js the primary build tool (`npm run dev` = `next dev`).
#### [TEST] Full Suite Run
- Run A11y, Cypress, and Unit tests to ensure 100% pass rate on the new architecture.

## Verification Plan

### Automated Tests
- **A11y (`test:a11y:ci`)**: We will update the URL to point to the Next.js server. The UI components are identical, so A11y should pass.
- **Cypress (`cy:run`)**: We will adjust Cypress base URLs and potentially update route assertions if Next.js changes URL structures slightly.
- **Vitest**: Unit tests for pure functions and components will continue to work normally.

### Manual Verification
- Verify the new branch is created.
- Verify we can build the project successfully with `npm run build`.
- Verify Email/Password login creates a user in the database.
- Verify AI chat streams correctly from Gemma, OpenAI, and Claude.
