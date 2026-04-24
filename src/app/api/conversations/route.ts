import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !(session.user as any)?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: { userId: (session.user as any).id },
      include: {
        messages: {
          orderBy: { timestamp: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
