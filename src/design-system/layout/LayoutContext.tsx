'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface LayoutContextType {
  isFullWidth: boolean;
  setFullWidth: (fullWidth: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFullWidth, setIsFullWidth] = useState(false);

  const setFullWidth = useCallback((fullWidth: boolean) => {
    setIsFullWidth(fullWidth);
  }, []);

  return (
    <LayoutContext.Provider value={{ isFullWidth, setFullWidth }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
