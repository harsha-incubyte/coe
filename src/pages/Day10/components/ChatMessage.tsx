import React from 'react';
import { MessageWrapper, MessageBubble, MessageMeta, ResendButton } from '../Day10.styles';
import { AIResponseRenderer } from './AIResponseRenderer';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'data';
  content: string;
  createdAt?: Date | number;
  timestamp?: Date | number;
  status?: string;
}

interface ChatMessageProps {
  message: Message;
  onResend?: (messageId: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onResend }) => {
  const isUser = message.role === 'user';
  const isError = message.status === 'error';

  const timeValue = message.createdAt || message.timestamp || Date.now();
  const timeString = new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(timeValue));

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
