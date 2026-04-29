# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Day10 is a **Medical Chat UI** backed by real LLM streaming. It replaces the mock AI from Day09 with a live backend (`/api/chat`) that uses SSE via the Vercel AI SDK. The feature includes conversation persistence, a cache-first cost-saving strategy, per-message token cost tracking, and a prompt template system.

## Component map

```
index.tsx (Day10)               — root component, owns all state and data-fetching
├── ConversationSidebar         — lists/searches/deletes past conversations (280px, hidden on mobile)
├── PromptTemplateSelector      — shown only when messages.length === 0; sets system prompt
├── MessageList                 — virtualized (react-virtuoso) message list with ScrollNudge
│   ├── ChatMessage             — single message bubble; handles user/assistant/error states
│   │   └── AIResponseRenderer  — renders assistant markdown via react-markdown + remark-gfm
│   └── TypingIndicator         — bouncing dots shown during 'submitted' status
└── ChatInput                   — auto-resizing textarea; Enter sends, Shift+Enter newlines
```

All styled-components are in `Day10.styles.ts` and consume design tokens from `@/design-system/tokens`.

## Data flow

### Sending a message

1. `handleSendMessage` calls `POST /api/chat/cache` first (cache check via `checkCache` mutation)
2. **Cache hit**: manually injects both messages into `setMessages`, calls `saveBatchMessages` to persist to DB, skips LLM entirely
3. **Cache miss**: calls `sendMessage()` from `useChat` → streams via `TextStreamChatTransport` → `POST /api/chat`
4. On `onFinish`, refetches conversations and sets `currentConversationId` if this was a new session

### useChat session management

`chatSessionId` (a `crypto.randomUUID()`) is the `id` prop passed to `useChat`. It is **reset** whenever a new conversation is started or an existing one is selected — this tears down and recreates the chat hook so message history doesn't bleed between sessions.

### Conversation lifecycle

- `currentConversationId === null` → new conversation (blank slate)
- On first LLM response, the API creates a conversation in the DB; `onFinish` picks up the new ID from `refetchConversations`
- Switching conversations sets a new `chatSessionId` and loads messages from the React Query cache

## Message type

`Message` extends `UIMessage` from `'ai'` and adds:

```ts
status?: string            // 'delivering' | 'error' | 'ready'
timestamp?: Date | number
content?: string           // legacy string format (from DB)
promptTokens?: number
completionTokens?: number
model?: string
```

Components must handle **both** the old `content: string` format (DB-persisted messages) and the new `parts: [{type:'text', text:'...'}]` format (AI SDK streaming messages). Use `message.content || message.parts?.filter(p => p.type === 'text').map(p => p.text).join('')` to extract text.

## Key gotchas

- **Stop token leak**: The local Gemma model emits `<end_of_turn>` tokens. `AIResponseRenderer` strips them with `.replace(/<end_of_turn>/g, '')` before rendering.
- **Role normalization**: `/api/chat` merges consecutive same-role messages before sending to the LLM — many providers (including Gemma) require strictly alternating roles.
- **System prompt placement**: If the provider sets `supportsSystemRole = false`, the system prompt is prepended to the first user message instead of sent as a `{role:'system'}` message.
- **PromptTemplateSelector locking**: It becomes unreachable once messages exist (hidden by `messages.length === 0` guard in `index.tsx`). Template selection before first message only.
- **ConversationSidebar mobile**: Collapses to `width: 0` at ≤ 768px — no toggle button yet.

## External dependencies specific to this view

| Package | Used for |
|---|---|
| `@ai-sdk/react` (`useChat`) | Streaming chat state machine |
| `ai` (`TextStreamChatTransport`, `streamText`) | SSE transport and server streaming |
| `react-virtuoso` | Virtual scrolling in `MessageList` |
| `react-markdown` + `remark-gfm` | Markdown rendering in `AIResponseRenderer` |

## Token cost utilities

`@/utils/token-cost` exports `estimateTokens`, `calculateCost`, `formatCost`. `calculateCost` uses `MODEL_PRICING` keyed by model name; unknown models fall back to `local-gemma` (free). Cost badges appear in `ChatMessage` (per-message) and `ConversationSidebar` (aggregate per conversation).

## Prompt templates

Defined in `@/lib/llm/prompts.ts` as `MEDICAL_PROMPTS[]`. Each template has `id`, `name`, `description`, `icon`, and `systemPrompt`. Adding a new persona = adding an entry to that array; the UI picks it up automatically.

## API surface consumed

| Method + Path | Purpose |
|---|---|
| `GET /api/conversations` | Load sidebar list (React Query, staleTime 5m) |
| `POST /api/chat/cache` | Pre-flight cache check before LLM call |
| `POST /api/chat` | LLM streaming (SSE) |
| `POST /api/messages/batch` | Persist cache-hit messages to DB |
| `DELETE /api/conversations/:id` | Delete a conversation |
