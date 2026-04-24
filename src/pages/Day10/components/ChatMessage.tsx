import React from 'react';
import { MessageWrapper, MessageBubble, MessageMeta, ResendButton } from '../Day10.styles';
import { AIResponseRenderer } from './AIResponseRenderer';
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
        {isUser ? (
          <div style={{ whiteSpace: 'pre-wrap' }}>{message.content}</div>
        ) : (
          <AIResponseRenderer content={message.content} />
        )}
      </MessageBubble>
      <MessageMeta>
        <span aria-hidden="true">{timeString}</span>
        {/* Visually hidden but accessible time */}
        <span className="sr-only">Sent at {timeString}</span>
        
        {isUser && message.status === 'delivering' && <span>Sending...</span>}
        {isError && (
          <>
            <span style={{ color: 'var(--colors-semantic-error)' }}>Failed to send</span>
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
