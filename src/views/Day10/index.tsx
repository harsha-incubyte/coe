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
import { PageLayout } from '@/design-system/layout/PageLayout';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';

interface Conversation {
  id: string;
  title: string;
  messages: import('./components/ChatMessage').Message[];
  updatedAt: Date | number;
}

const Day10: React.FC = () => {
  const { data: session } = useSession();
  const { showToast } = useToast();
  const [currentConversationId, setCurrentConversationId] = React.useState<string | null>(null);

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
    id: currentConversationId || undefined,
    initialMessages: currentConversation?.messages || [],
    onFinish: () => {
      refetchConversations();
    },
    onError: (err) => {
      console.error('[CHAT_ERROR]', err);
      showToast('Failed to send message. The AI model might be unavailable.', 'error');
    },
    // Note: In version 6+, api and body might need to be configured via transport 
    // if the default transport doesn't pick them up from the top-level options.
    ...({
      api: '/api/chat',
      body: {
        conversationId: currentConversationId,
      },
    } as any),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  React.useEffect(() => {
    if (currentConversation) {
      setMessages(currentConversation.messages || []);
    } else {
      setMessages([]);
    }
  }, [currentConversationId, currentConversation, setMessages]);

  const handleNewConversation = () => {
    setCurrentConversationId(null);
    setMessages([]);
    setInput('');
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
      content: `Error: ${errorMessage}. Please try again or check the server status.`,
      status: 'error',
      createdAt: new Date(),
    } as import('./components/ChatMessage').Message);
  }

  return (
    <PageLayout title="Medical Chat" mode="full">
      <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
        <ConversationSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={setCurrentConversationId}
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
