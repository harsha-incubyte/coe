import React, { type ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/design-system/theme';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info';

export interface BadgeProps {
  children?: ReactNode;
  label?: ReactNode;
  variant?: BadgeVariant;
  pill?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

const StyledBadge = styled.span<{ $variant: BadgeVariant; $pill: boolean; $size: 'sm' | 'md' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  white-space: nowrap;
  
  ${({ $size, theme }) => 
    $size === 'sm' ? css`
      padding: 0.125rem 0.375rem;
      font-size: 0.625rem;
    ` : css`
      padding: 0.25rem 0.625rem;
      font-size: ${theme.typography.fontSize.xs};
    `
  }

  border-radius: ${({ theme, $pill }) => ($pill ? theme.borderRadius.full : theme.borderRadius.sm)};
  
  ${({ theme, $variant }) => {
    const color = $variant === 'default' ? theme.colors.neutral[400] : ($variant === 'primary' ? theme.colors.primary[500] : theme.colors[$variant]);
    return css`
      background-color: ${color}26; // ~0.15 opacity
      color: ${color};
      border: 1px solid ${color}4d; // ~0.3 opacity
    `;
  }}

  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
StyledBadge.defaultProps = { theme };

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  label,
  variant = 'default', 
  pill = false, 
  size = 'md',
  className 
}) => {
  return (
    <StyledBadge $variant={variant} $pill={pill} $size={size} className={className}>
      {children || label}
    </StyledBadge>
  );
};

Badge.displayName = 'Badge';
