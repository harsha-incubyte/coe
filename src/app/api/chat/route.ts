import { streamText } from 'ai';
import { openai, createOpenAI } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Define the local Gemma model provider
const localGemma = createOpenAI({
  baseURL: process.env.LOCAL_LLM_URL || 'http://localhost:4000/v1',
  apiKey: 'not-needed',
});

export const maxDuration = 30;

export async function POST(req: Request) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    // For now, let's allow anonymous requests during migration testing, 
    // but in production, we should return 401.
    // return new Response('Unauthorized', { status: 401 });
  }

  const { messages, model = 'local-gemma' } = await req.json();

  let providerModel;

  switch (model) {
    case 'openai':
      providerModel = openai('gpt-4o');
      break;
    case 'anthropic':
      providerModel = anthropic('claude-3-5-sonnet-20240620');
      break;
    case 'local-gemma':
    default:
      providerModel = localGemma('gemma-2-9b'); // Or whatever the local model ID is
      break;
  }

  const result = await streamText({
    model: providerModel,
    messages,
    onFinish: async (completion) => {
      // Optional: Save to database here if we have conversationId
      // This is where Chunk 5's DB persistence logic will go.
    },
  });

  return result.toAIStreamResponse();
}
