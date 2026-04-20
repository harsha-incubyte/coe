import React, { type ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export interface StatBlockProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: string;
    type: 'success' | 'error' | 'info' | 'warning';
  };
  className?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;
Container.defaultProps = { theme };

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;
Header.defaultProps = { theme };

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
Label.defaultProps = { theme };

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primary[500]};
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
IconWrapper.defaultProps = { theme };

const ValueWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
ValueWrapper.defaultProps = { theme };

const Value = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
`;
Value.defaultProps = { theme };

const Trend = styled.span<{ $type: 'success' | 'error' | 'info' | 'warning' }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, $type }) => theme.colors[$type]};
`;
Trend.defaultProps = { theme };

export const StatBlock: React.FC<StatBlockProps> = ({
  label,
  value,
  icon,
  trend,
  className,
}) => {
  return (
    <Container className={className}>
      <Header>
        <Label>{label}</Label>
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </Header>
      <ValueWrapper>
        <Value>{value}</Value>
        {trend && (
          <Trend $type={trend.type}>
            {trend.value}
          </Trend>
        )}
      </ValueWrapper>
    </Container>
  );
};

StatBlock.displayName = 'StatBlock';
