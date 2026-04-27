import React, { useState, useMemo } from 'react';
import { 
  SidebarContainer, 
  SidebarHeader, 
  ConversationListContainer, 
  ConversationItem, 
  SearchWrapper,
  ConversationTitle,
  ConversationSubtitle,
  DeleteButton,
  CostBadge
} from '../Day10.styles';
import { Button } from '@/design-system/atoms';
import { SearchBar } from '@/design-system/molecules';
import type { Message } from './ChatMessage';
import { calculateCost, formatCost } from '@/utils/token-cost';

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
  onDeleteConversation: (id: string) => void;
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    
    const query = searchQuery.toLowerCase();
    return conversations.filter(convo => 
      convo.title.toLowerCase().includes(query) || 
      convo.messages.some(msg => (msg.content || '').toLowerCase().includes(query))
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectConversation(convo.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-current={convo.id === currentConversationId ? "page" : undefined}
            >
              <ConversationTitle>{convo.title}</ConversationTitle>
              <ConversationSubtitle>
                {convo.messages.length} messages
                <CostBadge style={{ fontSize: '0.6rem', padding: '1px 4px' }}>
                  {formatCost(
                    convo.messages.reduce((acc, msg) => acc + calculateCost(msg.promptTokens, msg.completionTokens, msg.model), 0)
                  )}
                </CostBadge>
              </ConversationSubtitle>
              <DeleteButton 
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Are you sure you want to delete this conversation?')) {
                    onDeleteConversation(convo.id);
                  }
                }}
                title="Delete conversation"
                aria-label={`Delete conversation ${convo.title}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </DeleteButton>
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
