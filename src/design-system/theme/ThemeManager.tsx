import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './index';
import { GlobalStyles } from './GlobalStyles';

interface ThemeManagerProps {
  children: React.ReactNode;
}

export const ThemeManager: React.FC<ThemeManagerProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
