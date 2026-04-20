import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '@/design-system/theme';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
BreadcrumbNav.defaultProps = { theme };

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const BreadcrumbListItem = styled.li`
  display: flex;
  align-items: center;
`;

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary[500]};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
    text-decoration: underline;
  }
`;
BreadcrumbLink.defaultProps = { theme };

const BreadcrumbSeparator = styled.span`
  margin: 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
  user-select: none;
`;
BreadcrumbSeparator.defaultProps = { theme };

const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
BreadcrumbCurrent.defaultProps = { theme };

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  className,
}) => {
  return (
    <BreadcrumbNav className={className} aria-label="Breadcrumb">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <BreadcrumbListItem key={item.label}>
              {item.href && !isLast ? (
                <BreadcrumbLink to={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbCurrent aria-current="page">{item.label}</BreadcrumbCurrent>
              )}
              
              {!isLast && (
                <BreadcrumbSeparator aria-hidden="true">
                  {separator}
                </BreadcrumbSeparator>
              )}
            </BreadcrumbListItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
