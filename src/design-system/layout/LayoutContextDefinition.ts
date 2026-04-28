'use client';

import { createContext } from 'react';

export interface LayoutContextType {
  isFullWidth: boolean;
  setFullWidth: (fullWidth: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);
