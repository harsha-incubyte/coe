# Day 10: AI/LLM Integration Basics for Chat Applications

This document outlines the plan to implement Day 10 of the KATA. We will be building the core AI integration hooks and UI components for the chat application, designed to interface with a backend service running a Gemma 2 9B model (or any OpenAI-compatible API).

## User Review Required

> [!WARNING]
> **API Endpoint Setup:** Since the backend (NextJS or similar) is not yet available in this React repository, the frontend will be built to call an configurable API endpoint (e.g., `http://localhost:4000/v1/chat/completions` or `/api/chat`). Do you want me to build a mock service worker / mock backend for testing the React UI directly, or should we assume a local LiteLLM/MLX server is already running and point directly to it?

> [!IMPORTANT]
> **Dependencies:** I will need to install `react-markdown` and `remark-gfm` to properly render the markdown responses from the AI. Please confirm if it's okay to run `npm install react-markdown remark-gfm`.

## Open Questions

1. **Caching Strategy:** The task requires "Caching AI responses". Should this be implemented as a simple session memory cache (deduplicating identical prompt requests), or something more persistent like `localStorage`?
2. **Token Heuristic:** Since we don't have a tokenizer available in the browser natively for Gemma 2, is it acceptable to use a rough heuristic (e.g., `character_count / 4`) for the frontend token counting practice?

## Proposed Changes

### Core Hooks & Logic
We will implement the AI service integration focusing on robustness and streaming.

#### [NEW] `src/pages/Day10/hooks/useChatCompletions.ts`
- **Purpose**: Encapsulates API calls, SSE streaming parsing, error handling, retries, and token counting.
- **Features**:
  - Uses the native `fetch` API to read the SSE stream using `response.body.getReader()`.
  - Implements exponential backoff for 429 Rate Limit errors and 50x server errors.
  - Exposes `isGenerating`, `error`, and `usage` (token counts) states.

#### [NEW] `src/pages/Day10/utils/prompts.ts`
- **Purpose**: Houses the prompt engineering system for the medical Q&A.
- **Features**:
  - `MEDICAL_SYSTEM_PROMPT`: Instructions for Gemma 2 9B to act as a helpful but cautious medical assistant, ensuring it outputs standard markdown and explicit disclaimers.
  - Helper functions to format the message history before sending it to the API.

### UI Components
We need to enhance the chat interface to handle the new AI capabilities.

#### [NEW] `src/pages/Day10/components/AIResponseRenderer.tsx`
- **Purpose**: A markdown renderer wrapper.
- **Features**:
  - Uses `react-markdown` and `remark-gfm`.
  - Maps standard HTML elements (like `h1`, `p`, `code`, `pre`, `table`) to styled-components matching our premium design system.
  - Special styling for medical disclaimers if detected.

#### [NEW] `src/pages/Day10/components/TypingIndicator.tsx`
- **Purpose**: Loading state for the AI response.
- **Features**:
  - A sleek, animated 3-dot bouncing indicator.
  - Displayed immediately after the user sends a message, before the first SSE chunk arrives.

### Integration

#### [NEW] `src/pages/Day10` (Duplicated from Day09)
We will duplicate the `Day09` folder to `Day10` to preserve the previous day's work and add our new logic.

#### [MODIFY] `src/pages/Day10/Day10.tsx` (and inner layout components)
- **Modifications**:
  - Integrate `useChatCompletions`.
  - When a message is sent:
    1. Append user message.
    2. Create a placeholder assistant message with status `delivering`.
    3. Call the API hook.
    4. Upon receiving chunks, use the existing `updateMessageContent` hook with a callback to append chunks: `updateMessageContent(convoId, msgId, (prev) => prev + chunk)`.
    5. On completion, change status to `sent`.
    6. On error, change status to `error` and allow the user to click a "Retry" button.

#### [MODIFY] `src/pages/Day10/components/MessageList.tsx`
- **Modifications**:
  - Render the `AIResponseRenderer` inside the message bubble for assistant messages.
  - Conditionally render the `TypingIndicator` at the bottom if `isGenerating` is true and no chunks have arrived yet.

## Verification Plan

### Automated Tests
- N/A for this scope unless specifically requested, but we will ensure ESLint and TypeScript checks pass.

### Manual Verification
- We will test the UI by simulating an API call (or connecting to a local mock).
- **Streaming**: Verify chunks appear smoothly in real-time.
- **Markdown**: Verify code blocks, bold text, and tables render beautifully.
- **Retries**: Force an error and verify the retry button works and uses backoff logic.
- **Typing Indicator**: Verify it shows before the stream starts.
