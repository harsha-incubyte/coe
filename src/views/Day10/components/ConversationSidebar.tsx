import React, { useState, useMemo } from 'react';
import { 
  SidebarContainer, 
  SidebarHeader, 
  ConversationListContainer, 
  ConversationItem, 
  SearchWrapper,
  ConversationTitle,
  ConversationSubtitle
} from '../Day10.styles';
import { Button } from '@/design-system/atoms';
import { SearchBar } from '@/design-system/molecules';
import type { Message } from './ChatMessage';

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number | Date;
}

interface ConversationSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    
    const query = searchQuery.toLowerCase();
    return conversations.filter(convo => 
      convo.title.toLowerCase().includes(query) || 
      convo.messages.some(msg => msg.content.toLowerCase().includes(query))
    );
  }, [conversations, searchQuery]);

  return (
    <SidebarContainer aria-label="Chat History Sidebar">
      <SidebarHeader>
        <h2 style={{ fontSize: '16px', margin: 0 }}>Consultations</h2>
        <Button variant="ghost" size="sm" onClick={onNewConversation} aria-label="New Consultation">
          + New
        </Button>
      </SidebarHeader>

      <SearchWrapper>
        <SearchBar 
          placeholder="Search conversations..." 
          onSearch={() => {}} // We search as user types
          onChange={setSearchQuery}
        />
      </SearchWrapper>
      
      <ConversationListContainer role="navigation" aria-label="Past Consultations">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((convo) => (
            <ConversationItem
              key={convo.id}
              $isActive={convo.id === currentConversationId}
              onClick={() => onSelectConversation(convo.id)}
              aria-current={convo.id === currentConversationId ? "page" : undefined}
            >
              <ConversationTitle>{convo.title}</ConversationTitle>
              <ConversationSubtitle>
                {convo.messages.length} messages
              </ConversationSubtitle>
            </ConversationItem>
          ))
        ) : (
          <div style={{ padding: '20px', textAlign: 'center', opacity: 0.5, fontSize: '14px' }}>
            No conversations found
          </div>
        )}
      </ConversationListContainer>
    </SidebarContainer>
  );
};
