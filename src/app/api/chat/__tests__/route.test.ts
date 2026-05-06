/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../route';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { getLLMProvider } from '@/lib/llm/registry';
import { streamText } from 'ai';
import { retrieveContext, formatRagContext } from '@/lib/rag';

// Mock dependencies
vi.mock('next-auth/next', () => ({
  getServerSession: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({
  default: {
    conversation: { create: vi.fn(), findUnique: vi.fn() },
    message: { create: vi.fn(), findFirst: vi.fn() },
  },
  prisma: {
    conversation: { create: vi.fn(), findUnique: vi.fn() },
    message: { create: vi.fn(), findFirst: vi.fn() },
  }
}));

vi.mock('@/lib/llm/registry', () => ({
  getLLMProvider: vi.fn(),
}));

vi.mock('ai', async () => {
  const actual = await vi.importActual('ai');
  return {
    ...actual,
    streamText: vi.fn(),
    convertToModelMessages: vi.fn().mockImplementation((msgs) => msgs),
  };
});

vi.mock('@/lib/rag', () => ({
  retrieveContext: vi.fn().mockResolvedValue({ results: [] }),
  formatRagContext: vi.fn().mockReturnValue(''),
}));

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn().mockReturnValue(new Map()),
}));

describe('Chat API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 if messages are missing', async () => {
    // Arrange
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    // Act
    const res = await POST(req);

    // Assert
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Messages are required and must be a non-empty array');
  });

  it('returns 503 if LLM provider is unavailable', async () => {
    // Arrange
    vi.mocked(getLLMProvider).mockRejectedValue(new Error('Model not found'));

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }] }),
    });

    // Act
    const res = await POST(req);

    // Assert
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.error).toBe('The requested AI model is currently unavailable');
  });

  it('successfully streams a response and saves to DB if session exists', async () => {
    // Arrange
    const mockSession = { user: { id: 'user-1' } };
    vi.mocked(getServerSession).mockResolvedValue(mockSession);
    vi.mocked(getLLMProvider).mockResolvedValue({
       
      model: { id: 'test-model' } as any,
      adapter: { supportsSystemRole: true },
    });
    
    const mockStream = {
      toTextStreamResponse: vi.fn().mockImplementation((init) => {
        return new Response('streaming data', { headers: init?.headers });
      }),
    };
    vi.mocked(streamText).mockReturnValue(mockStream as any);
    
    vi.mocked(prisma.conversation.create).mockResolvedValue({ 
      id: 'conv-1', 
      title: 'hello',
      userId: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ 
        messages: [{ role: 'user', content: 'hello' }],
        conversationId: null
      }),
    });

    // Act
    const res = await POST(req);

    // Assert
    expect(res.status).toBe(200);
    expect(res.headers.get('x-conversation-id')).toBe('conv-1');
    
    // Verify DB calls
    expect(prisma.conversation.create).toHaveBeenCalled();
    expect(prisma.message.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        role: 'user',
        content: 'hello',
        conversationId: 'conv-1'
      })
    }));
  });

  it('injects RAG context for clinical queries', async () => {
    // Arrange
    vi.mocked(retrieveContext).mockResolvedValue({ 
      results: [{ document: { id: 'doc-1', title: 'Clinical Study' }, score: 0.9 }] 
    } as any);
    vi.mocked(formatRagContext).mockReturnValue('\n\nContext: Clinical Study');
    
    vi.mocked(getLLMProvider).mockResolvedValue({
      model: { id: 'test-model' } as any,
      adapter: { supportsSystemRole: true },
    });

    const mockStream = {
      toTextStreamResponse: vi.fn().mockImplementation((init) => new Response('data', { headers: init?.headers })),
    };
    vi.mocked(streamText).mockReturnValue(mockStream as any);

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ 
        messages: [{ role: 'user', content: 'What are the symptoms of hypertension?' }],
        systemPrompt: 'You are a doctor.'
      }),
    });

    // Act
    await POST(req);
    
    // Assert
    expect(retrieveContext).toHaveBeenCalledWith('What are the symptoms of hypertension?');
    
    const streamArgs = vi.mocked(streamText).mock.calls[0][0];
    expect(streamArgs.messages[0]).toMatchObject({
      role: 'system',
      parts: expect.arrayContaining([
        expect.objectContaining({
          text: expect.stringContaining('Context: Clinical Study')
        })
      ])
    });
  });

  it('returns cached response if matching message exists', async () => {
    // Arrange
    vi.mocked(getServerSession).mockResolvedValue({ user: { id: 'user-1' } });
    
    const mockCachedMessage = {
      id: 'msg-2',
      role: 'assistant',
      content: 'This is a cached response',
      conversationId: 'conv-1',
      timestamp: new Date(),
      promptTokens: 10,
      completionTokens: 20,
      model: 'test',
      citations: null,
      systemPromptHash: 'hash'
    };
    
    vi.mocked(prisma.message.findFirst).mockResolvedValue({
      id: 'msg-1',
      conversationId: 'conv-1',
      role: 'user',
      content: 'hello',
      timestamp: new Date(),
      promptTokens: null,
      completionTokens: null,
      model: null,
      citations: null,
      systemPromptHash: 'hash',
      conversation: {
        id: 'conv-1',
        title: 'hello',
        userId: 'user-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [
          { id: 'msg-1', role: 'user', content: 'hello' } as any,
          mockCachedMessage as any
        ]
      }
    } as any);

    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ 
        messages: [{ role: 'user', content: 'hello' }],
        systemPrompt: 'You are a helpful assistant'
      }),
    });

    // Act
    const res = await POST(req);

    // Assert
    expect(res.status).toBe(200);
    expect(res.headers.get('x-cache-hit')).toBe('true');
    
    const body = await res.text();
    expect(body).toContain('This is a cached response');
  });

  it('handles empty messages gracefully', async () => {
     // Arrange
     const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [] }),
    });

    // Act
    const res = await POST(req);

    // Assert
    expect(res.status).toBe(400);
  });
});
