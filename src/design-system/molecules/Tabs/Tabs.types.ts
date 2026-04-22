import { type ReactNode } from 'react';

export interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}

export interface TabsListProps {
  children: ReactNode;
  'aria-label'?: string;
}

export interface TabTriggerProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

export interface TabPanelProps {
  id: string;
  children: ReactNode;
}
