import React from 'react';
import {
  PageContainer,
  MainLayoutContent,
  ChatContainer,
  SidebarArea,
  ChatArea,
  EmptyStateContainer,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText,
  ChatMain,
  ChatHeader
} from './Day10.styles';
import { ConversationSidebar } from './components/ConversationSidebar';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { type Message } from './components/ChatMessage';
import { useChat } from '@ai-sdk/react';
import { PageLayout } from '@/design-system/layout/PageLayout';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

const Day10: React.FC = () => {
  const { data: session } = useSession();
  const [currentConversationId, setCurrentConversationId] = React.useState<string | null>(null);

  const { data: conversations = [], refetch: refetchConversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const res = await fetch('/api/conversations');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    enabled: !!session?.user,
  });

  const currentConversation = conversations.find((c: any) => c.id === currentConversationId);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, append, reload, error } = useChat({
    api: '/api/chat',
    body: {
      conversationId: currentConversationId,
    },
    initialMessages: currentConversation?.messages || [],
    onFinish: () => {
      refetchConversations();
    },
  });

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
  };

  const handleSendMessage = async (content: string) => {
    append({
      role: 'user',
      content,
    });
  };

  const displayMessages = [...messages];
  if (error) {
    displayMessages.push({
      id: 'error-placeholder',
      role: 'assistant',
      content: 'There was an error communicating with the AI. Please try again.',
      status: 'error',
      createdAt: new Date(),
    } as any);
  }

  return (
    <PageLayout title="Medical Chat" mode="full">
      <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
        <ConversationSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={setCurrentConversationId}
          onNewConversation={handleNewConversation}
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
            messages={displayMessages as any} 
            isTyping={isLoading} 
            onResend={() => reload()} 
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
