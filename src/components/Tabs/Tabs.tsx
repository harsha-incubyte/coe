import React, { useState } from 'react';
import { TabsContext } from './TabsContext';
import { TabsList } from './TabsList';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> & {
  List: typeof TabsList;
  Tab: typeof Tab;
  Panel: typeof TabPanel;
} = ({ defaultValue, children, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`tabs-container ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
