import React from 'react';
import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export interface CardHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
HeaderContainer.defaultProps = { theme };

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;
TitleGroup.defaultProps = { theme };

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;
Title.defaultProps = { theme };

const Subtitle = styled.div`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;
Subtitle.defaultProps = { theme };

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;
Actions.defaultProps = { theme };

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  actions,
  className,
  titleLevel = 3,
}) => {
  const HeadingTag = `h${titleLevel}` as React.ElementType;

  return (
    <HeaderContainer className={className}>
      <TitleGroup>
        <Title as={HeadingTag}>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleGroup>
      {actions && <Actions>{actions}</Actions>}
    </HeaderContainer>
  );
};

CardHeader.displayName = 'CardHeader';
