import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

const TypingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  border-bottom-left-radius: 4px;
`;

const Dot = styled.div<{ $delay: string }>`
  width: 6px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${props => props.$delay};
`;

export const TypingIndicator: React.FC = () => {
  return (
    <div style={{ padding: '0 2rem', marginBottom: '1rem' }}>
      <TypingContainer>
        <Dot $delay="-0.32s" />
        <Dot $delay="-0.16s" />
        <Dot $delay="0s" />
      </TypingContainer>
    </div>
  );
};
