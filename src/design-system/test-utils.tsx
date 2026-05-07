/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { render, renderHook, type RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LayoutProvider } from './layout/LayoutContext';

/**
 * Creates a fresh QueryClient for each test to ensure state isolation.
 */
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
      staleTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
});

interface AllTheProvidersProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
}

/**
 * Wrapper component that provides all global contexts required by components.
 */
const AllTheProviders: React.FC<AllTheProvidersProps> = ({ 
  children, 
  queryClient = createTestQueryClient() 
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

/**
 * Custom render function that wraps the UI with all necessary providers.
 * Use this instead of @testing-library/react's render.
 */
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { queryClient?: QueryClient },
) => {
  const { queryClient, ...renderOptions } = options || {};
  return render(ui, { 
    wrapper: (props) => <AllTheProviders {...props} queryClient={queryClient} />, 
    ...renderOptions 
  });
};

/**
 * Custom renderHook function that wraps the hook with all necessary providers.
 * Use this instead of @testing-library/react's renderHook.
 */
const customRenderHook = <Result, Props>(
  render: (props: Props) => Result,
  options?: Omit<RenderOptions, 'wrapper'> & { queryClient?: QueryClient },
) => {
  const { queryClient, ...renderOptions } = options || {};
  return renderHook(render, { 
    wrapper: (props) => <AllTheProviders {...props} queryClient={queryClient} />, 
    ...renderOptions 
  });
};

// Re-export everything from RTL
export * from '@testing-library/react';

// Override render and renderHook with our provider-aware versions
export { customRender as render, customRenderHook as renderHook };
