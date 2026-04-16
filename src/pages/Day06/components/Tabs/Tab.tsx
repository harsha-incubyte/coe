import React from 'react';
import { useTabs } from './TabsContext';

interface TabProps {
  id: string;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ id, children }) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === id;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      id={`tab-${id}`}
      onClick={() => setActiveTab(id)}
      className={`tab-button ${isActive ? 'active' : ''}`}
      tabIndex={isActive ? 0 : -1}
    >
      {children}
    </button>
  );
};
