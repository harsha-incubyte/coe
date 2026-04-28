import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Session } from 'next-auth';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions) as Session | null;

  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { id } = await params;

  try {
    // Verify the conversation belongs to the user
    const conversation = await prisma.conversation.findUnique({
      where: { id },
    });

    if (!conversation) {
      return new Response('Conversation not found', { status: 404 });
    }

    if (conversation.userId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Delete messages first (if not handled by cascade delete in schema)
    // Most likely Prisma handles this if configured, but let's be safe or check schema
    await prisma.message.deleteMany({
      where: { conversationId: id },
    });

    await prisma.conversation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
