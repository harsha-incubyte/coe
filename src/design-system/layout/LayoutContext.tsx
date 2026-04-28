'use client';

import React, { useState, useCallback } from 'react';
import { LayoutContext } from './LayoutContextDefinition';

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
