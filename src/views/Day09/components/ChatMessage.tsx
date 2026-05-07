import React from 'react';
import { MessageWrapper, MessageBubble, MessageMeta, ResendButton, ErrorText } from '../Day09.styles';
import type { Message } from '../hooks/useChatState';

interface ChatMessageProps {
  message: Message;
  onResend?: (messageId: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onResend }) => {
  const isUser = message.role === 'user';
  const isError = message.status === 'error';

  const timeString = new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(message.timestamp));

  return (
    <MessageWrapper $isUser={isUser} role="listitem">
      <MessageBubble 
        $isUser={isUser} 
        $isError={isError}
        aria-label={`${isUser ? 'You' : 'Medical Assistant'} said`}
      >
        {/* We can use a markdown parser here later if needed, for now just text */}
        <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
      </MessageBubble>
      <MessageMeta>
        <span aria-hidden="true">{timeString}</span>
        {/* Visually hidden but accessible time */}
        <span className="sr-only">Sent at {timeString}</span>
        
        {isUser && message.status === 'delivering' && <span>Sending...</span>}
        {isError && (
          <>
            <ErrorText>Failed to send</ErrorText>
            {onResend && (
              <ResendButton onClick={() => onResend(message.id)} aria-label="Resend message">
                Resend
              </ResendButton>
            )}
          </>
        )}
      </MessageMeta>
    </MessageWrapper>
  );
};
