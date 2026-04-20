import React, { createContext, useContext, useState, type ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '@/design-system/theme';

// Context
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// --- Styled Components ---

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
TabsContainer.defaultProps = { theme };

const StyledTabsList = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
`;
StyledTabsList.defaultProps = { theme };

const StyledTabTrigger = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme, $isActive }) => ($isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium)};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary[500] : theme.colors.textSecondary)};
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease-in-out;
  outline: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary[500]};
    transform: scaleX(${({ $isActive }) => ($isActive ? 1 : 0)});
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary[600] : theme.colors.text)};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[500]}40;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
StyledTabTrigger.defaultProps = { theme };

const StyledTabPanel = styled.div`
  outline: none;
`;
StyledTabPanel.defaultProps = { theme };

// --- Components ---

export interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}

const TabsRoot: React.FC<TabsProps> = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <TabsContainer>{children}</TabsContainer>
    </TabsContext.Provider>
  );
};

export interface TabsListProps {
  children: ReactNode;
  'aria-label'?: string;
}

const TabsList: React.FC<TabsListProps> = ({ children, 'aria-label': ariaLabel }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const tabs = Array.from((e.currentTarget as HTMLElement).querySelectorAll('[role="tab"]')) as HTMLElement[];
    const index = tabs.indexOf(document.activeElement as HTMLElement);

    if (index === -1) return;

    let nextIndex: number;
    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    tabs[nextIndex].focus();
    e.preventDefault();
  };

  return (
    <StyledTabsList role="tablist" aria-label={ariaLabel} onKeyDown={handleKeyDown}>
      {children}
    </StyledTabsList>
  );
};

export interface TabTriggerProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

const TabTrigger: React.FC<TabTriggerProps> = ({ id, children, disabled }) => {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === id;

  return (
    <StyledTabTrigger
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      id={`tab-${id}`}
      onClick={() => !disabled && setActiveTab(id)}
      $isActive={isActive}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
    >
      {children}
    </StyledTabTrigger>
  );
};

export interface TabPanelProps {
  id: string;
  children: ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ id, children }) => {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === id;

  if (!isActive) return null;

  return (
    <StyledTabPanel
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
    >
      {children}
    </StyledTabPanel>
  );
};

// Export consolidated object
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabTrigger,
  Panel: TabPanel,
});
