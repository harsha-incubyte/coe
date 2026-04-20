import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/design-system/theme';

export interface InputGroupProps {
  children: React.ReactElement;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
}

const StyledInputGroup = styled.div<{ $hasPrefix: boolean; $hasSuffix: boolean }>`
  display: flex;
  align-items: stretch;
  width: 100%;
  position: relative;

  /* Styles for the nested input atom */
  input {
    flex: 1;
    border-radius: 0;
    
    ${({ $hasPrefix, theme }) => !$hasPrefix && css`
      border-top-left-radius: ${theme.borderRadius.md};
      border-bottom-left-radius: ${theme.borderRadius.md};
    `}
    
    ${({ $hasSuffix, theme }) => !$hasSuffix && css`
      border-top-right-radius: ${theme.borderRadius.md};
      border-bottom-right-radius: ${theme.borderRadius.md};
    `}

    &:focus {
      z-index: 2;
    }
  }
`;
StyledInputGroup.defaultProps = { theme };

const Addon = styled.span<{ $type: 'prefix' | 'suffix' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  white-space: nowrap;
  
  ${({ $type, theme }) => $type === 'prefix' ? css`
    border-right: none;
    border-top-left-radius: ${theme.borderRadius.md};
    border-bottom-left-radius: ${theme.borderRadius.md};
  ` : css`
    border-left: none;
    border-top-right-radius: ${theme.borderRadius.md};
    border-bottom-right-radius: ${theme.borderRadius.md};
  `}
`;
Addon.defaultProps = { theme };

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  prefix,
  suffix,
  className,
}) => {
  return (
    <StyledInputGroup 
      className={className} 
      $hasPrefix={!!prefix} 
      $hasSuffix={!!suffix}
    >
      {prefix && <Addon $type="prefix">{prefix}</Addon>}
      {children}
      {suffix && <Addon $type="suffix">{suffix}</Addon>}
    </StyledInputGroup>
  );
};

InputGroup.displayName = 'InputGroup';
