import { streamText, convertToModelMessages } from 'ai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getLLMProvider } from '@/lib/llm/registry';
import { retrieveContext, formatRagContext } from '@/lib/rag';
import type { ClientCitation } from '@/lib/rag';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

import { Session } from 'next-auth';

function hashPrompt(systemPrompt: string | undefined | null): string | null {
  if (!systemPrompt) return null;
  return crypto.createHash('sha256').update(systemPrompt).digest('hex');
}

export const maxDuration = 30;

type MessagePart = 
  | { type: 'text'; text: string }
  | { type: 'reasoning'; text: string }
  | { type: 'image'; image: string }
  | { type: 'file'; mediaType: string; url: string };

interface Message {
  role: 'user' | 'assistant' | 'system';
  content?: string;
  parts?: MessagePart[];
}

interface ChatPayload {
  messages: Message[];
  model?: string;
  conversationId?: string;
  systemPrompt?: string;
}

export async function POST(req: Request) {
  try {
    console.log('[CHAT_API] Received request');

    // Check authentication
    const session = await getServerSession(authOptions) as Session | null;
    if (!session) {
      console.log('[CHAT_API] Anonymous session');
    }

    const payload = await req.json() as ChatPayload;
    const { messages, model = 'local-gemma', conversationId, systemPrompt } = payload;
    
    console.log(`[BACKEND][${new Date().toISOString()}] Chat API - Request received`, {
      payloadConversationId: conversationId,
      messageCount: messages?.length,
      model
    });

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('[CHAT_API] Invalid messages payload', payload);
      return new Response(JSON.stringify({ error: 'Messages are required and must be a non-empty array' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const lastMessage = messages[messages.length - 1];

    // Helper to safely extract text content from both old and new message formats
    const getMessageText = (msg: Message) => {
      if (typeof msg.content === 'string') return msg.content;
      if (Array.isArray(msg.parts)) {
        return msg.parts
          .filter((p: MessagePart): p is { type: 'text'; text: string } => p.type === 'text')
          .map((p) => p.text)
          .join('');
      }
      return '';
    };

    const lastMessageContent = getMessageText(lastMessage);
    if (!lastMessageContent) {
      console.warn('[CHAT_API] Empty message content detected');
    }

    // Augment systemPrompt with RAG context for clinical queries
    let augmentedSystemPrompt = systemPrompt;
    let capturedCitations: ClientCitation[] = [];
    const isClinicalQuery = lastMessageContent.trim().split(/\s+/).length >= 4;
    if (systemPrompt && isClinicalQuery) {
      try {
        const ragContext = await retrieveContext(lastMessageContent);
        const ragBlock = formatRagContext(ragContext.results);
        if (ragBlock) {
          augmentedSystemPrompt = systemPrompt + ragBlock;
          capturedCitations = ragContext.results.map((r) => ({
            id: r.document.id,
            title: r.document.title,
            authors: r.document.authors,
            journal: r.document.journal,
            year: r.document.year,
          }));
          console.log('[RAG] Injected context', {
            chunks: ragContext.results.length,
            topScore: ragContext.results[0]?.score ?? 0,
            blockLength: ragBlock.length,
          });
        } else {
          console.log('[RAG] No matching context for query');
        }
      } catch {
        console.warn('[RAG] Context retrieval skipped (error)');
      }
    } else {
      console.log('[RAG] Skipped — query too short or no system prompt');
    }

    // Normalize messages to ensure alternating roles (user/assistant)
    // This is required by many LLM providers (including Gemini and some local servers)
    const normalizedMessages: Message[] = [];
    for (const msg of messages) {
      const last = normalizedMessages[normalizedMessages.length - 1];
      if (last && last.role === msg.role) {
        const text = getMessageText(msg);
        const separator = '\n\n';
        
        if (last.parts) {
          last.parts.push({ type: 'text', text: separator + text });
        } else if (typeof last.content === 'string') {
          last.content += separator + text;
        } else {
          last.content = text;
        }
      } else {
        // Create a shallow copy of the message and its parts
        normalizedMessages.push({ 
          ...msg,
          parts: msg.parts ? [...msg.parts] : undefined
        });
      }
    }

    console.log('[CHAT_API] Normalized messages count:', normalizedMessages.length, 
      'Roles:', normalizedMessages.map(m => m.role).join(' -> '));

    // Optional: Save user message to DB immediately
    let currentConversationId = conversationId;
    
    try {
      if (session?.user?.id) {
        if (!currentConversationId) {
          console.log(`[BACKEND][${new Date().toISOString()}] Chat API - No conversationId provided, creating new one`);
          const conversation = await prisma.conversation.create({
            data: {
              title: lastMessageContent.substring(0, 50) || 'New Conversation',
              userId: session.user.id,
            }
          });
          currentConversationId = conversation.id;
          console.log(`[BACKEND][${new Date().toISOString()}] Chat API - New conversation created`, {
            id: currentConversationId,
            title: conversation.title
          });
        } else {
          console.log(`[BACKEND][${new Date().toISOString()}] Chat API - Using existing conversationId`, {
            id: currentConversationId
          });
        }

        console.log(`[BACKEND][${new Date().toISOString()}] Chat API - Saving user message`, { 
          conversationId: currentConversationId,
          role: 'user'
        });
        await prisma.message.create({
          data: {
            role: 'user',
            content: lastMessageContent,
            conversationId: currentConversationId,
            systemPromptHash: hashPrompt(augmentedSystemPrompt),
          }
        });
      }
    } catch (dbError) {
      console.error('[CHAT_API] Database error during message save', dbError);
      // We continue here so the chat can still function even if DB save fails
    }

    // Check for cached response first to save API costs
    try {
      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
      if (lastUserMessage) {
        const lastUserContent = getMessageText(lastUserMessage);
        const systemPromptHash = hashPrompt(augmentedSystemPrompt);

        console.log('[CHAT_API] Checking cache for message:', {
          content: lastUserContent.substring(0, 50) + (lastUserContent.length > 50 ? '...' : ''),
          systemPromptHash 
        });

        const previousUserMessage = await prisma.message.findFirst({
          where: {
            role: 'user',
            content: lastUserContent,
            systemPromptHash,
            conversation: {
              userId: session?.user?.id || undefined
            }
          },
          orderBy: {
            timestamp: 'desc'
          },
          include: {
            conversation: {
              include: {
                messages: {
                  orderBy: {
                    timestamp: 'asc'
                  }
                }
              }
            }
          }
        });

        if (previousUserMessage) {
          console.log('[CHAT_API] Found matching previous user message in conversation:', previousUserMessage.conversationId);
          
          const messagesInPrevConv = previousUserMessage.conversation.messages;
          const userMsgIndex = messagesInPrevConv.findIndex(m => m.id === previousUserMessage.id);
          
          const nextMessage = messagesInPrevConv[userMsgIndex + 1];
          if (nextMessage && nextMessage.role === 'assistant') {
            console.log('[CHAT_API] Cache Hit! Reusing previous response from message:', nextMessage.id);
            // Create a pseudo-stream response for the cached content
            const encoder = new TextEncoder();
            const stream = new ReadableStream({
              async start(controller) {
                controller.enqueue(encoder.encode(`0:${JSON.stringify(nextMessage.content)}\n`));
                controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":${nextMessage.promptTokens || 0},"completionTokens":${nextMessage.completionTokens || 0}}}\n`));
                controller.close();
              },
            });

            return new Response(stream, {
              headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'x-conversation-id': currentConversationId || '',
                'x-cache-hit': 'true',
              },
            });
          } else {
            console.log('[CHAT_API] Cache Miss: No assistant response follows the matching user message.');
          }
        } else {
          console.log('[CHAT_API] Cache Miss: No matching previous user message found.');
        }
      }
    } catch (cacheError) {
      console.warn('[CHAT_API] Cache check error', cacheError);
    }

    // The registry handles validation, health checks, and failovers automatically
    console.log('[CHAT_API] Getting LLM provider', { model });
    let provider;
    try {
      provider = await getLLMProvider(model);
    } catch (modelError) {
      console.error('[CHAT_API] Failed to get LLM provider', modelError);
      return new Response(JSON.stringify({ 
        error: 'The requested AI model is currently unavailable',
        details: modelError instanceof Error ? modelError.message : String(modelError)
      }), { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('[CHAT_API] Starting stream');
    
    // Determine how to handle system prompt based on provider capabilities
    let finalMessages = [...normalizedMessages];
    const supportsSystem = provider.adapter.supportsSystemRole !== false;

    if (!augmentedSystemPrompt) {
      console.log('[CHAT_API] No system prompt provided — using model default behaviour');
    }

    if (augmentedSystemPrompt) {
      console.log('[CHAT_API] System prompt injection', {
        strategy: supportsSystem ? 'system-role' : 'prepend-to-user',
        model,
        promptLength: augmentedSystemPrompt.length,
        promptPreview: augmentedSystemPrompt.slice(0, 500).replace(/\n/g, ' ') + (augmentedSystemPrompt.length > 500 ? '…' : ''),
      });
      if (supportsSystem) {
        finalMessages = [{ role: 'system', content: augmentedSystemPrompt } as Message, ...finalMessages];
      } else {
        // Prepend system prompt to the first user message
        const firstUserMsgIndex = finalMessages.findIndex(m => m.role === 'user');
        if (firstUserMsgIndex !== -1) {
          const firstUserMsg = { ...finalMessages[firstUserMsgIndex] };
          const text = getMessageText(firstUserMsg);
          const combinedContent = `${augmentedSystemPrompt}\n\n${text}`;

          if (firstUserMsg.parts) {
            firstUserMsg.parts = [{ type: 'text', text: combinedContent }];
          } else {
            firstUserMsg.content = combinedContent;
          }
          finalMessages[firstUserMsgIndex] = firstUserMsg;
        } else {
          // If no user message found (unlikely), add it as a user message
          finalMessages = [{ role: 'user', content: augmentedSystemPrompt } as Message, ...finalMessages];
        }
      }
    }

    const result = streamText({
      model: provider.model,
      messages: await convertToModelMessages(finalMessages.map((m: Message) => {
        const parts = (m.parts ?? [{ type: 'text', text: m.content || '' }]).map(part => {
          if (part.type === 'image') {
            return {
              type: 'file',
              mediaType: part.image.startsWith('data:') 
                ? part.image.split(';')[0].split(':')[1] 
                : 'image/png',
              url: part.image
            };
          }
          return part;
        });
        
        return {
          role: m.role,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          parts: parts as any // Cast to any to avoid strict union matching issues with custom MessagePart
        };
      })),
      stopSequences: ['<end_of_turn>'],
      onFinish: async (completion) => {
        if (session?.user?.id && currentConversationId) {
          try {
            console.log('[CHAT_API] Saving assistant response to DB', { 
              tokens: completion.usage,
              model: model 
            });
            await prisma.message.create({
              data: {
                role: 'assistant',
                content: completion.text,
                conversationId: currentConversationId,
                promptTokens: completion.usage.inputTokens,
                completionTokens: completion.usage.outputTokens,
                model: model,
                citations: capturedCitations.length > 0 ? JSON.stringify(capturedCitations) : null,
              }
            });
          } catch (finishDbError) {
            console.error('[CHAT_API] Database error during assistant response save', finishDbError);
          }
        }
      },
    });

    console.log(`[BACKEND][${new Date().toISOString()}] Chat API - Returning response`, {
      conversationId: currentConversationId
    });
    return result.toTextStreamResponse({
      headers: {
        'x-conversation-id': currentConversationId || '',
      },
    });
  } catch (error) {
    console.error('[CHAT_API] Unexpected error', error);
    return new Response(JSON.stringify({ 
      error: 'An unexpected error occurred',
      details: error instanceof Error ? error.message : String(error)
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
