import React from 'react';
import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
  message: string;
  title?: string;
  variant?: AlertVariant;
  onClose?: () => void;
  className?: string;
}

const getIcon = (variant: AlertVariant) => {
  switch (variant) {
    case 'success': return '✓';
    case 'error': return '!';
    case 'info': return 'i';
    case 'warning': return '⚠';
    default: return null;
  }
};

const StyledAlert = styled.div<{ $variant: AlertVariant }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme, $variant }) => theme.colors[$variant]};
  background-color: ${({ theme, $variant }) => `${theme.colors[$variant]}0d`}; // 0.05 opacity
  color: ${({ theme, $variant }) => theme.colors[$variant]};
  width: 100%;
  position: relative;
`;
StyledAlert.defaultProps = { theme };

const IconContainer = styled.div<{ $variant: AlertVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, $variant }) => theme.colors[$variant]};
  color: ${({ theme }) => theme.colors.background};
  font-size: 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
`;
IconContainer.defaultProps = { theme };

const Content = styled.div`
  flex-grow: 1;
`;
Content.defaultProps = { theme };

const Title = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: inherit;
`;
Title.defaultProps = { theme };

const Message = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: inherit;
`;
Message.defaultProps = { theme };

const CloseButton = styled.button<{ $variant: AlertVariant }>`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  font-size: 1.25rem;
  line-height: 1;
  opacity: 0.6;
  transition: opacity 0.2s;
  align-self: flex-start;
  margin-right: -0.5rem;
  margin-top: -0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    opacity: 1;
    background-color: ${({ theme, $variant }) => `${theme.colors[$variant]}1a`};
  }
`;
CloseButton.defaultProps = { theme };

export const Alert: React.FC<AlertProps> = ({
  message,
  title,
  variant = 'info',
  onClose,
  className,
}) => {
  return (
    <StyledAlert $variant={variant} className={className} role={variant === 'error' ? 'alert' : 'status'}>
      <IconContainer $variant={variant}>
        {getIcon(variant)}
      </IconContainer>
      <Content>
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
      </Content>
      {onClose && (
        <CloseButton $variant={variant} onClick={onClose} aria-label="Close alert">
          &times;
        </CloseButton>
      )}
    </StyledAlert>
  );
};

Alert.displayName = 'Alert';
