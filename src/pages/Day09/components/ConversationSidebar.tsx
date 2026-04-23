import React from 'react';
import { SidebarContainer, SidebarHeader, ConversationListContainer, ConversationItem } from '../Day09.styles';
import type { Conversation } from '../hooks/useChatState';
import { Button } from '@/design-system/atoms';
import { ChatSettings } from './ChatSettings';

interface ConversationSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  errorRate: number;
  onErrorRateChange: (rate: number) => void;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  errorRate,
  onErrorRateChange
}) => {
  return (
    <SidebarContainer aria-label="Chat History Sidebar">
      <SidebarHeader>
        <h2 style={{ fontSize: '16px', margin: 0 }}>Consultations</h2>
        <Button variant="ghost" size="sm" onClick={onNewConversation} aria-label="New Consultation">
          + New
        </Button>
      </SidebarHeader>
      
      <ConversationListContainer role="navigation" aria-label="Past Consultations">
        {conversations.map((convo) => (
          <ConversationItem
            key={convo.id}
            $isActive={convo.id === currentConversationId}
            onClick={() => onSelectConversation(convo.id)}
            aria-current={convo.id === currentConversationId ? "page" : undefined}
          >
            {convo.title}
          </ConversationItem>
        ))}
      </ConversationListContainer>

      <ChatSettings errorRate={errorRate} onErrorRateChange={onErrorRateChange} />
    </SidebarContainer>
  );
};
