import React from 'react';
import { MessageWrapper, MessageBubble, MessageMeta, ResendButton, CostBadge, ErrorText } from '../Day10.styles';
import { AIResponseRenderer } from './AIResponseRenderer';
import { calculateCost, formatCost } from '@/utils/token-cost';
import { MessageSources } from './MessageSources';

import { UIMessage } from 'ai';
import type { ClientCitation } from '@/app/api/chat/rag-citations/route';

export interface Message extends UIMessage {
  status?: string;
  timestamp?: Date | number;
  createdAt?: Date | number;
  content?: string;
  promptTokens?: number;
  completionTokens?: number;
  model?: string;
}

interface ChatMessageProps {
  message: Message;
  onResend?: (messageId: string) => void;
  citations?: ClientCitation[];
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onResend, citations }) => {
  const isUser = message.role === 'user';
  const isError = message.status === 'error';

  const [fallbackTimestamp, setFallbackTimestamp] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!message.createdAt && !message.timestamp) {
      setFallbackTimestamp(Date.now());
    }
  }, [message.createdAt, message.timestamp]);

  const timeValue = message.createdAt || message.timestamp || fallbackTimestamp;
  const timeString = timeValue ? new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(timeValue)) : '--:--';

  // Extract content string from message (handles both old string content and new parts format)
  const displayContent = message.content || 
    message.parts
      ?.filter((p) => p.type === 'text')
      .map((p) => p.text)
      .join('') || '';

  return (
    <MessageWrapper $isUser={isUser} role="listitem">
      <MessageBubble 
        $isUser={isUser} 
        $isError={isError}
        aria-label={`${isUser ? 'You' : 'Medical Assistant'} said`}
      >
        {isUser ? (
          <div style={{ whiteSpace: 'pre-wrap' }}>{displayContent}</div>
        ) : (
          <AIResponseRenderer content={displayContent} />
        )}
      </MessageBubble>
      <MessageMeta>
        <span aria-hidden="true">{timeString}</span>
        {/* Visually hidden but accessible time */}
        <span className="sr-only">Sent at {timeString}</span>

        {!isUser && message.promptTokens !== undefined && (
          <CostBadge>
            {formatCost(calculateCost(message.promptTokens, message.completionTokens, message.model))}
          </CostBadge>
        )}

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
      {!isUser && citations && citations.length > 0 && (
        <MessageSources citations={citations} />
      )}
    </MessageWrapper>
  );
};
