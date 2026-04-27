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

    // The registry handles validation, health checks, and failovers automatically
    console.log('[CHAT_API] Getting LLM provider', { model });
    let providerModel;
    try {
      providerModel = await getLLMProvider(model);
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
    const result = streamText({
      model: providerModel,
      messages: await convertToModelMessages([
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt } as Message] : []),
        ...normalizedMessages
      ].map((m: Message) => ({
        ...m,
        role: m.role as 'user' | 'assistant' | 'system',
        parts: m.parts ?? [{ type: 'text', text: m.content || '' }]
      }))),
      stopSequences: ['<end_of_turn>'],
      onFinish: async (completion) => {
        if (session?.user?.id && currentConversationId) {
          try {
            console.log('[CHAT_API] Saving assistant response to DB');
            await prisma.message.create({
              data: {
                role: 'assistant',
                content: completion.text,
                conversationId: currentConversationId,
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
