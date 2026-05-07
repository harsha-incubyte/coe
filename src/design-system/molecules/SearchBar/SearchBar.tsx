'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/design-system/theme';

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onChange?: (query: string) => void;
  defaultValue?: string;
  className?: string;
}

const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  transition: all 0.2s ease-in-out;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[500]}40;
  }
`;
SearchContainer.defaultProps = { theme };

const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.base};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.7;
  }
`;
StyledInput.defaultProps = { theme };

const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: -4px;
  }
`;
SearchButton.defaultProps = { theme };

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  defaultValue = '',
  className,
}) => {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <SearchContainer onSubmit={handleSubmit} className={className} role="search">
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        aria-label="Search"
      />
      <SearchButton type="submit" aria-label="Search">
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
            clipRule="evenodd" 
          />
        </svg>
      </SearchButton>
    </SearchContainer>
  );
};

SearchBar.displayName = 'SearchBar';
