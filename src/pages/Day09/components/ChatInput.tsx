import React, { useState, useRef, useEffect } from 'react';
import { InputAreaContainer, InputWrapper, StyledTextarea, SendButton } from '../Day09.styles';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError('Message cannot be empty');
      return;
    }
    
    setError(null);
    onSendMessage(trimmedMessage);
    setMessage('');
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <InputAreaContainer>
      {/* ARIA Live region for validation errors */}
      <div aria-live="polite" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
        {error}
      </div>
      
      <InputWrapper $hasError={!!error}>
        <StyledTextarea
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type your medical query here..."
          disabled={disabled}
          aria-label="Chat input"
          aria-invalid={!!error}
          aria-errormessage={error ? "chat-input-error" : undefined}
          rows={1}
        />
        <SendButton 
          onClick={handleSend} 
          disabled={disabled || !message.trim()}
          aria-label="Send message"
        >
          <span>➔</span>
        </SendButton>
      </InputWrapper>
      {error && (
        <span id="chat-input-error" style={{ color: 'var(--colors-semantic-error)', fontSize: '12px', marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </InputAreaContainer>
  );
};
