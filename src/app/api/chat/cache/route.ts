import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Session } from 'next-auth';
import crypto from 'crypto';

function hashPrompt(systemPrompt: string | undefined | null): string | null {
  if (!systemPrompt) return null;
  return crypto.createHash('sha256').update(systemPrompt).digest('hex');
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { messages, systemPrompt } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages', { status: 400 });
    }

    const systemPromptHash = hashPrompt(systemPrompt);

    const context = messages.map((m: { role: string; content?: string; parts?: { text?: string }[] }) => ({
      role: m.role,
      content: m.content || m.parts?.[0]?.text || ''
    }));

    console.log('[CHAT_CACHE_CHECK]', {
      systemPromptHash,
      hasSystemPrompt: !!systemPrompt,
    });

    const lastUserMessage = context[context.length - 1];
    if (lastUserMessage.role !== 'user') {
      return NextResponse.json({ cached: false });
    }

    // Find a message with the same content AND same system prompt for this user
    const previousUserMessage = await prisma.message.findFirst({
      where: {
        role: 'user',
        content: lastUserMessage.content,
        systemPromptHash,
        conversation: {
          userId: session.user.id
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
      // Find the assistant message that follows this user message
      const messagesInPrevConv = previousUserMessage.conversation.messages;
      const userMsgIndex = messagesInPrevConv.findIndex(m => m.id === previousUserMessage.id);
      
      const nextMessage = messagesInPrevConv[userMsgIndex + 1];
      if (nextMessage && nextMessage.role === 'assistant') {
        console.log('[CHAT_CACHE_HIT] Found cached response', {
          systemPromptHash,
          messageId: previousUserMessage.id,
        });
        return NextResponse.json({
          cached: true,
          content: nextMessage.content,
          model: nextMessage.model,
          usage: {
            promptTokens: nextMessage.promptTokens,
            completionTokens: nextMessage.completionTokens
          }
        });
      }
    }

    return NextResponse.json({ cached: false });
  } catch (error) {
    console.error('[CHAT_CACHE_ERROR]', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
