'use client';

import React from 'react';
import {
  ChatMain,
  ChatHeader
} from './Day10.styles';
import { ConversationSidebar } from './components/ConversationSidebar';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import { Message } from './components/ChatMessage';
import { PromptTemplateSelector } from './components/PromptTemplateSelector';
import { DEFAULT_PROMPT, PromptTemplate } from '@/lib/llm/prompts';
import { PageLayout } from '@/design-system/layout/PageLayout';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';
import type { ClientCitation } from '@/app/api/chat/rag-citations/route';

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: Date | number;
}

const Day10: React.FC = () => {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [currentConversationId, setCurrentConversationId] = React.useState<string | null>(null);
  const [chatSessionId, setChatSessionId] = React.useState(() => crypto.randomUUID());
  const [selectedTemplate, setSelectedTemplate] = React.useState<PromptTemplate>(DEFAULT_PROMPT);
  const [messageCitations, setMessageCitations] = React.useState<Record<string, ClientCitation[]>>({});
  // Bridge: citations fetched at send-time but keyed by message ID known only at finish-time
  const pendingCitationsRef = React.useRef<ClientCitation[] | null>(null);

  // Read initial conversationId from URL on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('conversationId');
      if (id) {
        setCurrentConversationId(id);
      }
    }
  }, []);

  // Sync currentConversationId to URL params
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const currentParam = url.searchParams.get('conversationId');
      
      if (currentConversationId !== currentParam) {
        if (currentConversationId) {
          url.searchParams.set('conversationId', currentConversationId);
        } else {
          url.searchParams.delete('conversationId');
        }
        window.history.pushState({}, '', url.toString());
      }
    }
  }, [currentConversationId]);

  // Listen for browser back/forward navigation
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const handlePopState = () => {
        const params = new URLSearchParams(window.location.search);
        setCurrentConversationId(params.get('conversationId'));
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  const { 
    data: conversations = [], 
    refetch: refetchConversations,
    error: queryError 
  } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/conversations');
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to fetch conversations');
        }
        return res.json();
      } catch (err) {
        console.error('[CONVERSATIONS_FETCH_ERROR]', err);
        throw err;
      }
    },
    enabled: !!session?.user,
    staleTime: 1000 * 60 * 5, // 5 minutes - keep data fresh enough but avoid constant refetching
    gcTime: 1000 * 60 * 60, // 1 hour - keep in memory even if unused
    refetchOnWindowFocus: false, // Don't refetch when user switches tabs
    retry: 1,
  });

  // Show toast on query error
  React.useEffect(() => {
    if (queryError) {
      showToast('Could not load conversations. Please check your connection.', 'error');
    }
  }, [queryError, showToast]);

  const queryClient = useQueryClient();

  // Mutation for cache check
  const { mutateAsync: checkCache } = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch('/api/chat/cache', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content }],
          systemPrompt: selectedTemplate.systemPrompt,
        }),
      });
      return res.json();
    },
  });

  // Mutation for batch saving (used for cache hits)
  const { mutateAsync: saveBatchMessages } = useMutation({
    mutationFn: async ({ conversationId, userContent, assistantContent, model, citations }: { conversationId: string | null, userContent: string, assistantContent: string, model?: string, citations?: ClientCitation[] }) => {
      const res = await fetch('/api/messages/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          messages: [
            { role: 'user', content: userContent },
            { role: 'assistant', content: assistantContent, model: model || 'cached' }
          ],
          assistantCitations: citations,
        })
      });
      return res.json();
    },
    onSuccess: (data) => {
      if (!currentConversationId && data.conversationId) {
        setCurrentConversationId(data.conversationId);
      }
      // Invalidate conversations to show the new one/messages
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    }
  });

  const currentConversation = conversations.find((c) => c.id === currentConversationId);

  const [input, setInput] = React.useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const { messages, status, setMessages, sendMessage, regenerate, error: chatError } = useChat({
    id: chatSessionId,
    experimental_throttle: 50,
    messages: (currentConversation?.messages || []).map(m => ({
      ...m,
      role: m.role as 'user' | 'assistant' | 'system',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parts: (m as any).parts || [{ type: 'text', text: (m as any).content || '' }],
    })),
    onFinish: async ({ message }) => {
      console.log(`[FRONTEND][${new Date().toISOString()}] useChat onFinish - Received message`, {
        messageId: message.id,
        role: message.role
      });

      // Wire pending citations to the final message ID
      if (pendingCitationsRef.current && pendingCitationsRef.current.length > 0) {
        setMessageCitations((prev) => ({
          ...prev,
          [message.id]: pendingCitationsRef.current!,
        }));
        pendingCitationsRef.current = null;
      }

      const { data: newConversations } = await refetchConversations();
      console.log(`[FRONTEND][${new Date().toISOString()}] useChat onFinish - Refetched conversations`, {
        count: newConversations?.length,
        topId: newConversations?.[0]?.id,
        currentId: currentConversationId
      });
      if (!currentConversationId && newConversations && newConversations.length > 0) {
        console.log(`[FRONTEND][${new Date().toISOString()}] useChat onFinish - Setting initial conversation ID`, {
          newId: newConversations[0].id
        });
        // The newest conversation will be at the top due to 'orderBy: { updatedAt: desc }'
        setCurrentConversationId(newConversations[0].id);
      }
    },
    onError: (err) => {
      console.error('[CHAT_ERROR]', err);
      showToast('Failed to send message. The AI model might be unavailable.', 'error');
    },
    transport: new TextStreamChatTransport({
      api: '/api/chat',
      body: {
        conversationId: currentConversationId,
        systemPrompt: selectedTemplate.systemPrompt,
      },
    }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  React.useEffect(() => {
    console.log(`[FRONTEND][${new Date().toISOString()}] useEffect [currentConversationId, status]`, {
      currentConversationId,
      status,
      messagesInState: messages.length
    });
    // Only update messages from the database if we're not currently chatting
    if (status !== 'ready') return;

    if (currentConversation) {
      console.log(`[FRONTEND][${new Date().toISOString()}] useEffect - Loading messages for conversation`, {
        id: currentConversation.id,
        count: currentConversation.messages?.length
      });

      // Restore citations keyed by DB message ID so they survive the message list replacement
      const restoredCitations: Record<string, ClientCitation[]> = {};
      for (const m of currentConversation.messages || []) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = (m as any).citations;
        if (raw && typeof raw === 'string') {
          try {
            const parsed = JSON.parse(raw) as ClientCitation[];
            if (parsed.length > 0) restoredCitations[m.id] = parsed;
          } catch { /* ignore malformed JSON */ }
        }
      }
      setMessageCitations(restoredCitations);

      setMessages((currentConversation.messages || []).map(m => ({
        ...m,
        role: m.role as 'user' | 'assistant' | 'system',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parts: (m as any).parts || [{ type: 'text', text: (m as any).content || '' }],
      })));
    } else if (currentConversationId === null) {
      console.log(`[FRONTEND][${new Date().toISOString()}] useEffect - Clearing messages (new conversation)`);
      setMessages([]);
    }
  }, [currentConversationId, currentConversation, setMessages, status]);

  const handleNewConversation = () => {
    setCurrentConversationId(null);
    setChatSessionId(crypto.randomUUID());
    setMessages([]);
    setInput('');
    setSelectedTemplate(DEFAULT_PROMPT);
    setMessageCitations({});
    pendingCitationsRef.current = null;
  };

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
    setChatSessionId(crypto.randomUUID());
  };

  const handleDeleteConversation = async (id: string) => {
    try {
      const res = await fetch(`/api/conversations/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete conversation');
      }

      showToast('Conversation deleted successfully', 'success');
      
      if (currentConversationId === id) {
        handleNewConversation();
      }
      
      refetchConversations();
    } catch (err) {
      console.error('[DELETE_CONVERSATION_ERROR]', err);
      showToast('Could not delete conversation. Please try again.', 'error');
    }
  };

  const fetchCitations = async (content: string): Promise<ClientCitation[]> => {
    try {
      const res = await fetch('/api/chat/rag-citations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: content, systemPrompt: selectedTemplate.systemPrompt }),
      });
      if (!res.ok) return [];
      const data = await res.json();
      return data.citations ?? [];
    } catch {
      return [];
    }
  };

  const handleSendMessage = async (content: string) => {
    console.log(`[FRONTEND][${new Date().toISOString()}] handleSendMessage - Triggered`, {
      contentLength: content.length,
      currentConversationId: currentConversationId
    });
    try {
      if (!content.trim()) return;

      // Try to get from cache first to save costs
      try {
        const cacheData = await checkCache(content);

        if (cacheData.cached) {
          showToast('Aggressive Cache Hit: Saved API Costs 💰', 'success');

          const tempAssistantId = `temp-${Date.now()}-assistant`;

          // Manually add messages to UI for instant feedback
          const userMsg = {
            id: `temp-${Date.now()}-user`,
            role: 'user',
            parts: [{ type: 'text', text: content }],
            timestamp: Date.now()
          };
          const assistantMsg = {
            id: tempAssistantId,
            role: 'assistant',
            parts: [{ type: 'text', text: cacheData.content }],
            timestamp: Date.now(),
            status: 'ready'
          };

          setMessages(prev => [...prev, userMsg as Message, assistantMsg as Message]);

          // Fetch citations and persist them alongside the batch save
          const citations = await fetchCitations(content);
          if (citations.length > 0) {
            setMessageCitations((prev) => ({ ...prev, [tempAssistantId]: citations }));
          }

          // Save to DB (including citations so they survive page reload)
          await saveBatchMessages({
            conversationId: currentConversationId,
            userContent: content,
            assistantContent: cacheData.content,
            model: cacheData.model,
            citations,
          });

          setInput('');
          return;
        }
      } catch (cacheErr) {
        console.warn('[CACHE_CHECK_FAILED]', cacheErr);
        // Continue to live chat if cache check fails
      }

      // Fetch citations in parallel with the LLM call; store in ref so onFinish can key them
      fetchCitations(content).then((citations) => {
        pendingCitationsRef.current = citations.length > 0 ? citations : null;
      });

      await sendMessage({
        text: content,
      });
      setInput('');
    } catch (err) {
      console.error('[SEND_MESSAGE_ERROR]', err);
      showToast('An unexpected error occurred while sending your message.', 'error');
    }
  };

  const displayMessages = [...messages];
  if (chatError) {
    const errorMessage = chatError instanceof Error ? chatError.message : 'Unknown communication error';
    displayMessages.push({
      id: 'error-placeholder',
      role: 'assistant',
      parts: [{ type: 'text', text: `Error: ${errorMessage}. Please try again or check the server status.` }],
      status: 'error',
      timestamp: Date.now(),
    } as unknown as Message);
  }

  return (
    <PageLayout title="Medical Chat" mode="full">
      <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
        <ConversationSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          onDeleteConversation={handleDeleteConversation}
        />
        
        <ChatMain>
          <ChatHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🩺
              </div>
              <div>
                <h2 style={{ fontSize: '16px', margin: 0, fontWeight: 600 }}>
                  {currentConversation?.title || 'Medical Consultation'}
                </h2>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>AI Health Assistant</span>
              </div>
            </div>
          </ChatHeader>

          {messages.length === 0 && (
            <PromptTemplateSelector 
              selectedTemplateId={selectedTemplate.id}
              onSelectTemplate={setSelectedTemplate}
              disabled={isLoading}
            />
          )}

          <MessageList
            messages={displayMessages}
            isTyping={status === 'submitted'}
            status={status}
            onResend={() => regenerate()}
            citationsByMessageId={messageCitations}
          />

          <ChatInput 
            value={input}
            onChange={handleInputChange}
            onSendMessage={handleSendMessage} 
            disabled={isLoading} 
          />
        </ChatMain>
      </div>
    </PageLayout>
  );
};

export default Day10;
