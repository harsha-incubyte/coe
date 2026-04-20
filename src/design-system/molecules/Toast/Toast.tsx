import React from 'react';
import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const getIcon = (type: ToastType) => {
  switch (type) {
    case 'success': return '✓';
    case 'error': return '!';
    case 'info': return 'i';
    case 'warning': return '⚠';
    default: return null;
  }
};

const StyledToast = styled.div<{ $type: ToastType }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  color: ${({ theme }) => theme.colors.text};
  min-width: 300px;
  max-width: 450px;
  pointer-events: auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${({ theme, $type }) => theme.colors[$type]};
  }
`;
StyledToast.defaultProps = { theme };

const IconContainer = styled.div<{ $type: ToastType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, $type }) => theme.colors[$type]};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  flex-shrink: 0;
`;
IconContainer.defaultProps = { theme };

const Message = styled.div`
  flex-grow: 1;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;
Message.defaultProps = { theme };

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  font-size: 1.25rem;
  line-height: 1;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.surface};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
  }
`;
CloseButton.defaultProps = { theme };

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <StyledToast $type={type} role="status">
      <IconContainer $type={type}>
        {getIcon(type)}
      </IconContainer>
      <Message>{message}</Message>
      <CloseButton 
        onClick={onClose} 
        aria-label="Close announcement"
        title="Close"
      >
        &times;
      </CloseButton>
    </StyledToast>
  );
};
