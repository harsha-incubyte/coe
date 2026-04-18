import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface StyledButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary[500]};
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[600]};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[700]};
    }
  `,
  secondary: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary[400]};
    border: 1px solid ${({ theme }) => theme.colors.primary[400]};

    &:hover:not(:disabled) {
      background-color: rgba(99, 102, 241, 0.1);
      border-color: ${({ theme }) => theme.colors.primary[300]};
      color: ${({ theme }) => theme.colors.primary[300]};
    }

    &:active:not(:disabled) {
      background-color: rgba(99, 102, 241, 0.2);
    }
  `,
  accent: css`
    background-color: ${({ theme }) => theme.colors.accent[600]};
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.accent[500]};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.accent[700]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.surfaceLight};
      color: ${({ theme }) => theme.colors.text};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
    border: none;

    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }
  `,
};

const sizeStyles = {
  sm: css`
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  `,
  md: css`
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  `,
  lg: css`
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  `,
};

export const Button = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[500]}40;
  }

  /* Apply Variant Styles */
  ${({ $variant = 'primary' }) => variantStyles[$variant]}

  /* Apply Size Styles */
  ${({ $size = 'md' }) => sizeStyles[$size]}
`;
