import React, { useRef } from 'react';
import { Virtuoso } from 'react-virtuoso';
import type { VirtuosoHandle } from 'react-virtuoso';
import { MessageListContainer } from '../Day09.styles';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import type { Message } from '../hooks/useChatState';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onResend: (messageId: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, onResend }) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  // Auto-scroll logic happens inside Virtuoso with followOutput
  return (
    <MessageListContainer role="log" aria-live="polite">
      <Virtuoso
        ref={virtuosoRef}
        data={messages}
        style={{ height: '100%' }}
        followOutput={true}
        initialTopMostItemIndex={messages.length > 0 ? messages.length - 1 : 0}
        itemContent={(_index, message) => (
          <div style={{ paddingBottom: '8px' }}>
            <ChatMessage message={message} onResend={onResend} />
          </div>
        )}
        components={{
          Header: () => <div style={{ height: '32px' }} />,
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
    </MessageListContainer>
  );
};
