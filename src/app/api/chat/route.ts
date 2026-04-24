import { streamText } from 'ai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getLLMProvider } from '@/lib/llm/registry';
import prisma from '@/lib/prisma';

export const maxDuration = 30;

export async function POST(req: Request) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    // For now, let's allow anonymous requests during migration testing, 
    // but in production, we should return 401.
    // return new Response('Unauthorized', { status: 401 });
  }

  const { messages, model = 'local-gemma', conversationId } = await req.json();
  const lastMessage = messages[messages.length - 1];

  // Optional: Save user message to DB immediately
  let currentConversationId = conversationId;
  
  if (session?.user?.id) {
    if (!currentConversationId) {
      const conversation = await prisma.conversation.create({
        data: {
          title: lastMessage.content.substring(0, 50) || 'New Conversation',
          userId: session.user.id,
        }
      });
      currentConversationId = conversation.id;
    }

    await prisma.message.create({
      data: {
        role: 'user',
        content: lastMessage.content,
        conversationId: currentConversationId,
      }
    });
  }

  // The registry handles validation, health checks, and failovers automatically
  const providerModel = await getLLMProvider(model);

  const result = streamText({
    model: providerModel,
    messages,
    onFinish: async (completion) => {
      if (session?.user?.id && currentConversationId) {
        await prisma.message.create({
          data: {
            role: 'assistant',
            content: completion.text,
            conversationId: currentConversationId,
          }
        });
      }
    },
  });

  return result.toDataStreamResponse();
}
