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
import { PageLayout } from '@/design-system/layout/PageLayout';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';

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
    retry: 1,
  });

  // Show toast on query error
  React.useEffect(() => {
    if (queryError) {
      showToast('Could not load conversations. Please check your connection.', 'error');
    }
  }, [queryError, showToast]);

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
    onFinish: async () => {
      const { data: newConversations } = await refetchConversations();
      if (!currentConversationId && newConversations && newConversations.length > 0) {
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
      },
    }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  React.useEffect(() => {
    // Only update messages from the database if we're not currently chatting
    if (status !== 'ready') return;

    if (currentConversation) {
      setMessages((currentConversation.messages || []).map(m => ({
        ...m,
        role: m.role as 'user' | 'assistant' | 'system',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parts: (m as any).parts || [{ type: 'text', text: (m as any).content || '' }],
      })));
    } else if (currentConversationId === null) {
      setMessages([]);
    }
  }, [currentConversationId, currentConversation, setMessages, status]);

  const handleNewConversation = () => {
    setCurrentConversationId(null);
    setChatSessionId(crypto.randomUUID());
    setMessages([]);
    setInput('');
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

  const handleSendMessage = async (content: string) => {
    try {
      if (!content.trim()) return;
      
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

          <MessageList 
            messages={displayMessages} 
            isTyping={isLoading} 
            onResend={() => regenerate()} 
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
