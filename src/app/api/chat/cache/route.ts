import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Session } from 'next-auth';
import crypto from 'crypto';

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

    // Create a stable hash of the input context
    // We only care about role and content to match cache
    const context = messages.map(m => ({
      role: m.role,
      content: m.content || (m.parts?.[0]?.text) || ''
    }));

    const inputString = JSON.stringify({
      systemPrompt,
      context
    });

    const hash = crypto.createHash('sha256').update(inputString).digest('hex');

    console.log('[CHAT_CACHE_CHECK] Hash:', hash);

    // Look for a similar previous exchange in the database
    // This is a "Semantic Cache" lite - looking for exact matches of history
    // In a real app, we might use a vector DB here.
    
    // For now, let's just find if this EXACT context has been sent by THIS user before
    // and if there was an assistant response immediately following it.
    
    // Actually, a simpler approach for the demo: 
    // Check if the last user message + system prompt exists in ANY conversation of this user
    // and return the following assistant message.
    
    const lastUserMessage = context[context.length - 1];
    if (lastUserMessage.role !== 'user') {
      return NextResponse.json({ cached: false });
    }

    // Find a message with the same content for this user
    const previousUserMessage = await prisma.message.findFirst({
      where: {
        role: 'user',
        content: lastUserMessage.content,
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
        console.log('[CHAT_CACHE_HIT] Found cached response');
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
