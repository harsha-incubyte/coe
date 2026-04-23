import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PageContainer, ChatMain, ChatHeader } from './Day09.styles';
import { ConversationSidebar } from './components/ConversationSidebar';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { useChatState } from './hooks/useChatState';
import type { Message } from './hooks/useChatState';
import { useMockAI } from './hooks/useMockAI';

const Day09: React.FC = () => {
  const {
    conversations,
    currentConversation,
    currentConversationId,
    setCurrentConversationId,
    createNewConversation,
    addMessage,
    updateMessageStatus,
    updateMessageContent
  } = useChatState();

  const { isTyping, simulateResponse, errorRate, setErrorRate } = useMockAI({
    conversationId: currentConversationId || '',
    addMessage,
    updateMessageContent
  });

  const handleSendMessage = (content: string) => {
    if (!currentConversationId) return;

    const messageId = uuidv4();
    const isError = Math.random() < errorRate; // Simulate network error based on setting

    const newMessage: Message = {
      id: messageId,
      role: 'user',
      content,
      timestamp: Date.now(),
      status: isError ? 'error' : 'sent',
    };

    addMessage(currentConversationId, newMessage);

    if (!isError) {
      simulateResponse();
    }
  };

  const handleResend = (messageId: string) => {
    if (!currentConversationId || !currentConversation) return;
    
    // Find the message
    const msg = currentConversation.messages.find(m => m.id === messageId);
    if (!msg) return;

    // We can try to send it again. 
    // Mark as delivering, then randomly succeed or fail.
    updateMessageStatus(currentConversationId, messageId, 'delivering');
    
    setTimeout(() => {
      const isError = Math.random() < errorRate;
      if (isError) {
        updateMessageStatus(currentConversationId, messageId, 'error');
      } else {
        updateMessageStatus(currentConversationId, messageId, 'sent');
        simulateResponse();
      }
    }, 1000);
  };

  return (
    <PageContainer>
      <ConversationSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={setCurrentConversationId}
        onNewConversation={createNewConversation}
        errorRate={errorRate}
        onErrorRateChange={setErrorRate}
      />
      
      <ChatMain>
        <ChatHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🩺</span>
            <h2 style={{ fontSize: '18px', margin: 0 }}>
              {currentConversation?.title || 'Medical Consultation'}
            </h2>
          </div>
        </ChatHeader>

        <MessageList 
          messages={currentConversation?.messages || []} 
          isTyping={isTyping} 
          onResend={handleResend}
        />

        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping} 
        />
      </ChatMain>
    </PageContainer>
  );
};

export default Day09;
