import React from 'react';
import styled from 'styled-components';
import { theme } from '@/design-system/theme';
import type { ModalFooterProps } from './Modal.types';
export type { ModalFooterProps };

const FooterContainer = styled.footer<{ $align: string }>`
  display: flex;
  justify-content: ${({ $align }) => $align};
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
FooterContainer.defaultProps = { theme };

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  align = 'flex-end',
  className,
}) => {
  return (
    <FooterContainer className={className} $align={align}>
      {children}
    </FooterContainer>
  );
};

ModalFooter.displayName = 'ModalFooter';
