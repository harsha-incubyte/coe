import React, { useRef, useState, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import type { VirtuosoHandle } from 'react-virtuoso';
import { MessageListContainer, ScrollNudge } from '../Day10.styles';
import { ChatMessage, type Message } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  status: 'ready' | 'submitted' | 'streaming' | 'error';
  onResend: (messageId: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, status, onResend }) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [atBottom, setAtBottom] = useState(true);
  const [showNudge, setShowNudge] = useState(false);
  const prevStatusRef = useRef(status);

  // Handle scrolling when status changes
  useEffect(() => {
    // 1. Initial scroll when model starts streaming
    if (prevStatusRef.current === 'submitted' && status === 'streaming') {
      virtuosoRef.current?.scrollToIndex({
        index: messages.length - 1,
        align: 'end',
        behavior: 'smooth'
      });
    }

    // 2. Show nudge if streaming finishes and user is not at bottom
    if (prevStatusRef.current === 'streaming' && status === 'ready') {
      if (!atBottom) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowNudge(true);
      }
    }

    // Reset nudge if we go back to submitted or streaming
    if (status === 'submitted' || status === 'streaming') {
      setShowNudge(false);
    }

    prevStatusRef.current = status;
  }, [status, messages.length, atBottom]);

  // Hide nudge if user scrolls to bottom
  useEffect(() => {
    if (atBottom) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowNudge(false);
    }
  }, [atBottom]);

  const scrollToBottom = () => {
    virtuosoRef.current?.scrollToIndex({
      index: messages.length - 1,
      align: 'end',
      behavior: 'smooth'
    });
    setShowNudge(false);
  };

  return (
    <MessageListContainer role="log" aria-live="polite" style={{ position: 'relative' }}>
      <Virtuoso
        ref={virtuosoRef}
        data={messages}
        style={{ height: '100%' }}
        // followOutput is removed to prevent continuous scrolling
        initialTopMostItemIndex={messages.length > 0 ? messages.length - 1 : 0}
        atBottomStateChange={setAtBottom}
        itemContent={(_index, message) => (
          <div style={{ paddingBottom: '8px' }}>
            <ChatMessage message={message} onResend={onResend} />
          </div>
        )}
        components={{
          Footer: () => {
            if (!isTyping) return <div style={{ height: '16px' }} />;
            return (
              <div style={{ paddingBottom: '8px' }}>
                <TypingIndicator />
              </div>
            );
          }
        }}
      />
      
      <ScrollNudge 
        $visible={showNudge} 
        onClick={scrollToBottom}
        aria-label="Scroll to newest message"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </ScrollNudge>
    </MessageListContainer>
  );
};
