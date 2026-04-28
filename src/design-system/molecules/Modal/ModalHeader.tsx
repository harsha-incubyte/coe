import React from 'react';
import styled from 'styled-components';
import { theme } from '@/design-system/theme';
import type { ModalHeaderProps } from './Modal.types';
export type { ModalHeaderProps };

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
HeaderContainer.defaultProps = { theme };

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
`;
Title.defaultProps = { theme };

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  font-size: 1.5rem;
  line-height: 1;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;
CloseButton.defaultProps = { theme };

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  className,
  titleId,
}) => {
  return (
    <HeaderContainer className={className}>
      <Title id={titleId}>{title}</Title>
      {onClose && (
        <CloseButton onClick={onClose} aria-label="Close modal">
          &times;
        </CloseButton>
      )}
    </HeaderContainer>
  );
};

ModalHeader.displayName = 'ModalHeader';
