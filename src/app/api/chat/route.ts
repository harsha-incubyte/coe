import { streamText, convertToModelMessages } from 'ai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getLLMProvider } from '@/lib/llm/registry';
import prisma from '@/lib/prisma';

import { Session } from 'next-auth';

export const maxDuration = 30;

interface MessagePart {
  type: string;
  text?: string;
}

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
          .filter((p: MessagePart) => p.type === 'text')
          .map((p: MessagePart) => p.text || '')
          .join('');
      }
      return '';
    };

    const lastMessageContent = getMessageText(lastMessage);
    if (!lastMessageContent) {
      console.warn('[CHAT_API] Empty message content detected');
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

    // Optional: Save user message to DB immediately
    let currentConversationId = conversationId;
    
    try {
      if (session?.user?.id) {
        if (!currentConversationId) {
          console.log('[CHAT_API] Creating new conversation');
          const conversation = await prisma.conversation.create({
            data: {
              title: lastMessageContent.substring(0, 50) || 'New Conversation',
              userId: session.user.id,
            }
          });
          currentConversationId = conversation.id;
        }

        console.log('[CHAT_API] Saving user message to DB', { conversationId: currentConversationId });
        await prisma.message.create({
          data: {
            role: 'user',
            content: lastMessageContent,
            conversationId: currentConversationId,
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
        
        const cachedResponse = await prisma.message.findFirst({
          where: {
            role: 'assistant',
            conversation: {
              userId: session?.user?.id || undefined,
              messages: {
                some: {
                  role: 'user',
                  content: lastUserContent,
                }
              }
            }
          },
          orderBy: { timestamp: 'desc' },
        });

        if (cachedResponse) {
          console.log('[CHAT_API] Cache Hit! Reusing previous response.');
          // Create a pseudo-stream response for the cached content
          const encoder = new TextEncoder();
          const stream = new ReadableStream({
            async start(controller) {
              controller.enqueue(encoder.encode(`0:${JSON.stringify(cachedResponse.content)}\n`));
              controller.enqueue(encoder.encode(`d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`));
              controller.close();
            },
          });

          return new Response(stream, {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'x-conversation-id': conversationId || '',
              'x-cache-hit': 'true',
            },
          });
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

    if (systemPrompt) {
      if (supportsSystem) {
        finalMessages = [{ role: 'system', content: systemPrompt } as Message, ...finalMessages];
      } else {
        // Prepend system prompt to the first user message
        const firstUserMsgIndex = finalMessages.findIndex(m => m.role === 'user');
        if (firstUserMsgIndex !== -1) {
          const firstUserMsg = { ...finalMessages[firstUserMsgIndex] };
          const text = getMessageText(firstUserMsg);
          const combinedContent = `${systemPrompt}\n\n${text}`;
          
          if (firstUserMsg.parts) {
            firstUserMsg.parts = [{ type: 'text', text: combinedContent }];
          } else {
            firstUserMsg.content = combinedContent;
          }
          finalMessages[firstUserMsgIndex] = firstUserMsg;
        } else {
          // If no user message found (unlikely), add it as a user message
          finalMessages = [{ role: 'user', content: systemPrompt } as Message, ...finalMessages];
        }
      }
    }

    const result = streamText({
      model: provider.model,
      messages: await convertToModelMessages(finalMessages.map((m: Message) => ({
        ...m,
        role: m.role as 'user' | 'assistant' | 'system',
        parts: (m.parts as any) ?? [{ type: 'text', text: m.content || '' }]
      }))),
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
                promptTokens: (completion.usage as any).promptTokens,
                completionTokens: (completion.usage as any).completionTokens,
                model: model,
              }
            });
          } catch (finishDbError) {
            console.error('[CHAT_API] Database error during assistant response save', finishDbError);
          }
        }
      },
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
