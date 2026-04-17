import React from 'react';

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
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
    <div 
      role="tablist" 
      className={`tabs-list ${className}`} 
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};
