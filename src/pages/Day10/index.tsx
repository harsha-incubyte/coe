import React from 'react';
import { v4 as uuidv4 } from 'uuid';
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
import { useChatState } from './hooks/useChatState';
import type { Message } from './hooks/useChatState';
import { useChatCompletions } from './hooks/useChatCompletions';
import { buildPromptMessages } from './utils/prompts';
import { PageLayout } from '@/design-system/layout/PageLayout';

const Day10: React.FC = () => {
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

  const { generateCompletion, isGenerating } = useChatCompletions();
  const [errorRate, setErrorRate] = React.useState(0.1);

  const handleSendMessage = async (content: string) => {
    if (!currentConversationId || !currentConversation) return;

    const userMessageId = uuidv4();
    const assistantMessageId = uuidv4();

    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content,
      timestamp: Date.now(),
      status: 'sent',
    };
    addMessage(currentConversationId, userMessage);

    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now() + 1,
      status: 'delivering',
    };
    addMessage(currentConversationId, assistantMessage);

    const history = currentConversation.messages.map(m => ({ role: m.role, content: m.content }));
    const apiMessages = buildPromptMessages(history, content);

    try {
      await generateCompletion(apiMessages, (chunk) => {
        updateMessageContent(currentConversationId, assistantMessageId, (prev) => prev + chunk);
      });
      updateMessageStatus(currentConversationId, assistantMessageId, 'sent');
    } catch (err) {
      updateMessageStatus(currentConversationId, assistantMessageId, 'error');
    }
  };

  const handleResend = async (messageId: string) => {
    if (!currentConversationId || !currentConversation) return;
    
    const msg = currentConversation.messages.find(m => m.id === messageId);
    if (!msg) return;

    updateMessageStatus(currentConversationId, messageId, 'delivering');
    
    // For assistant messages that failed
    if (msg.role === 'assistant') {
       const userMsgIndex = currentConversation.messages.findIndex(m => m.id === messageId) - 1;
       const userMsg = currentConversation.messages[userMsgIndex];
       const history = currentConversation.messages.slice(0, userMsgIndex).map(m => ({ role: m.role, content: m.content }));
       const apiMessages = buildPromptMessages(history, userMsg?.content || '');
       
       try {
         await generateCompletion(apiMessages, (chunk) => {
           updateMessageContent(currentConversationId, messageId, (prev) => prev + chunk);
         });
         updateMessageStatus(currentConversationId, messageId, 'sent');
       } catch (err) {
         updateMessageStatus(currentConversationId, messageId, 'error');
       }
    }
  };

  return (
    <PageLayout title="Medical Chat" mode="full">
      <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
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
            messages={currentConversation?.messages || []} 
            isTyping={isGenerating} 
            onResend={handleResend}
          />

          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={isGenerating} 
          />
        </ChatMain>
      </div>
    </PageLayout>
  );
};

export default Day10;
