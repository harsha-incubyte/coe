import React from 'react';
import styled from 'styled-components';
import { useDropdown } from '@/hooks/useDropdown';
import { Button } from '@/design-system/atoms/Button';
import { theme } from '@/design-system/theme';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

DropdownContainer.defaultProps = { theme };

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

DropdownMenu.defaultProps = { theme };

const DropdownItem = styled.button<{ $variant?: 'default' | 'danger' }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: none;
  border: none;
  text-align: left;
  color: ${({ theme, $variant }) => ($variant === 'danger' ? theme.colors.error : theme.colors.text)};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceLight};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

DropdownItem.defaultProps = { theme };

interface DropdownProps {
  label?: React.ReactNode;
  trigger?: (props: { isOpen: boolean; onToggle: () => void }) => React.ReactNode;
  items?: Array<{ label: string; onClick: () => void; variant?: 'default' | 'danger' }>;
  children?: React.ReactNode;
  menuId?: string;
}

export const Dropdown = ({ label, trigger, items, children, menuId }: DropdownProps) => {
  const { isOpen, onToggle, containerRef, onClose } = useDropdown();

  return (
    <DropdownContainer ref={containerRef}>
      {trigger ? (
        trigger({ isOpen, onToggle })
      ) : (
        <Button 
          variant="secondary" 
          onClick={onToggle}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={menuId}
        >
          {label} ▾
        </Button>
      )}
      
      {isOpen && (
        <DropdownMenu id={menuId} role="menu">
          {children}
          {items?.map((item, index) => (
            <DropdownItem
              key={index}
              role="menuitem"
              $variant={item.variant}
              onClick={() => {
                item.onClick();
                onClose();
              }}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};


