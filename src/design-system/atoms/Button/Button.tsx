import React, { type ElementType, type ComponentPropsWithoutRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { theme } from '@/design-system/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface StyledButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
  $isLoading?: boolean;
}

const dotPulse = keyframes`
  0%, 80%, 100% { opacity: 0.4; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1.1); }
`;

const LoadingDots = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  span {
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 50%;
    display: inline-block;
    animation: ${dotPulse} 1s infinite ease-in-out both;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0s; }
  }
`;

const variantStyles = {
  primary: css`
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[400]} 0%, ${({ theme }) => theme.colors.primary[600]} 100%);
    color: white;
    border: none;
    box-shadow: 0 4px 14px 0 ${({ theme }) => theme.colors.primary[500]}40;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px 0 ${({ theme }) => theme.colors.primary[500]}60;
      filter: brightness(1.1);
    }

    &:active:not(:disabled) {
      transform: translateY(-1px);
    }
  `,
  secondary: css`
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(8px);
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      background: rgba(30, 41, 59, 0.8);
      border-color: ${({ theme }) => theme.colors.primary[400]};
      transform: translateY(-2px);
    }
  `,
  accent: css`
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent[400]} 0%, ${({ theme }) => theme.colors.accent[600]} 100%);
    color: white;
    border: none;
    box-shadow: 0 4px 14px 0 ${({ theme }) => theme.colors.accent[500]}40;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px 0 ${({ theme }) => theme.colors.accent[500]}60;
      filter: brightness(1.1);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.surfaceLight};
      color: ${({ theme }) => theme.colors.text};
      transform: translateY(-1px);
    }
  `,
  danger: css`
    background: rgba(251, 113, 133, 0.1);
    color: ${({ theme }) => theme.colors.error};
    border: 1px solid ${({ theme }) => theme.colors.error}40;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.error};
      color: white;
      border-color: ${({ theme }) => theme.colors.error};
      box-shadow: 0 4px 14px 0 ${({ theme }) => theme.colors.error}40;
      transform: translateY(-2px);
    }
  `,
};

const sizeStyles = {
  sm: css`
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    padding: 0.5rem 1rem;
    min-height: 2.25rem;
    min-width: 2.25rem;
  `,
  md: css`
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    padding: 0.75rem 1.5rem;
    min-height: 3rem;
    min-width: 3rem;
  `,
  lg: css`
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    padding: 1rem 2rem;
    min-height: 3.5rem;
    min-width: 3.5rem;
  `,
};

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  position: relative;
  overflow: hidden;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary[500]}40;
  }

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
  ${({ $size = 'md' }) => sizeStyles[$size]}

  ${({ $isLoading }) => $isLoading && css`
    cursor: wait;
    & > *:not(.btn-spinner):not(.btn-content) {
      visibility: hidden;
      opacity: 0;
    }
  `}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  // Support transient props for backward compatibility with existing design-system usage
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
}

type ButtonProps<T extends ElementType = 'button'> = BaseButtonProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseButtonProps | 'as'>;

export const Button = <T extends ElementType = 'button'>({
  as,
  variant,
  size,
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth,
  $variant,
  $size,
  $fullWidth,
  children,
  ...props
}: ButtonProps<T>) => {
  // Merge regular props and transient props (favor regular props)
  const finalVariant = variant || $variant || 'primary';
  const finalSize = size || $size || 'md';
  const finalFullWidth = fullWidth || $fullWidth || false;

  return (
    <StyledButton
      as={as as React.ElementType}
      $variant={finalVariant}
      $size={finalSize}
      $fullWidth={finalFullWidth}
      $isLoading={isLoading}
      disabled={isLoading || (props as { disabled?: boolean }).disabled}
      aria-busy={isLoading}
      aria-live={isLoading ? 'polite' : undefined}
      aria-label={isLoading && !loadingText ? 'Loading' : undefined}
      {...props}
    >
      {!isLoading && leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      <span className="btn-content">
        {isLoading ? (
          loadingText || (
            <LoadingDots aria-label="LoadingDots">
              <span />
              <span />
              <span />
            </LoadingDots>
          )
        ) : (
          children
        )}
      </span>
      {!isLoading && rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
    </StyledButton>
  );
};

Button.defaultProps = { theme };
