import React from 'react';
import { TypingIndicatorContainer, TypingDot } from '../Day09.styles';

export const TypingIndicator: React.FC = () => {
  return (
    <TypingIndicatorContainer aria-live="polite" aria-atomic="true">
      <span className="sr-only">Medical Assistant is typing...</span>
      <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
        <TypingDot />
        <TypingDot />
        <TypingDot />
      </div>
    </TypingIndicatorContainer>
  );
};
