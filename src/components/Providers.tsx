'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { ThemeManager } from '@/design-system/theme/ThemeManager';
import { ToastContainer } from '@/design-system/molecules';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '@/layouts/MainLayout';
import StyledComponentsRegistry from '@/lib/registry';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeManager>
            <MainLayout>
              {children}
            </MainLayout>
            <ToastContainer />
          </ThemeManager>
        </QueryClientProvider>
      </SessionProvider>
    </StyledComponentsRegistry>
  );
}
