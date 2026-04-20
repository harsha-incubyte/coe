import React from 'react';
import styled from 'styled-components';
import { Button } from '@/design-system/atoms/Button';
import { theme } from '@/design-system/theme';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PaginationContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;
PaginationContainer.defaultProps = { theme };

const PageInfo = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  user-select: none;
`;
PageInfo.defaultProps = { theme };

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <PaginationContainer className={className} aria-label="Pagination">
      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Previous page"
        size="sm"
      >
        ← Prev
      </Button>
      
      <PageInfo>
        Page {currentPage} of {totalPages}
      </PageInfo>
      
      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Next page"
        size="sm"
      >
        Next →
      </Button>
    </PaginationContainer>
  );
};

Pagination.displayName = 'Pagination';
