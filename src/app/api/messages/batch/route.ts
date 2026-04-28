import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Session } from 'next-auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { conversationId, messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages', { status: 400 });
    }

    let targetConversationId = conversationId;

    // Create conversation if it doesn't exist
    if (!targetConversationId) {
      const firstUserMsg = messages.find(m => m.role === 'user');
      const title = firstUserMsg?.content?.substring(0, 50) || 'New Conversation';
      
      const conversation = await prisma.conversation.create({
        data: {
          title,
          userId: session.user.id,
        }
      });
      targetConversationId = conversation.id;
    }

    // Save all messages
    await prisma.message.createMany({
      data: messages.map(m => ({
        role: m.role,
        content: m.content,
        conversationId: targetConversationId,
        model: m.model || 'cached',
        status: 'sent'
      }))
    });

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: targetConversationId },
      data: { updatedAt: new Date() }
    });

    return NextResponse.json({ success: true, conversationId: targetConversationId });
  } catch (error) {
    console.error('[BATCH_MESSAGE_SAVE_ERROR]', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
