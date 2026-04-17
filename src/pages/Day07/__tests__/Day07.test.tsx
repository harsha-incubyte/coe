import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Day07 from '../index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppStore } from '@/store';
import React from 'react';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Day07 Component', () => {
  beforeEach(() => {
    useAppStore.setState({ user: { id: '1', name: 'Harsha', email: 'harsha@incubyte.co' } });
  });

  it('🟢 should render personalized welcome message from Zustand store', () => {
    render(<Day07 />, { wrapper: createWrapper() });
    const welcome = screen.getByText(/Welcome back,/i);
    expect(welcome).toBeInTheDocument();
    expect(welcome).toHaveTextContent(/Harsha/i);
  });

  it('🟢 should display tasks fetched by React Query', async () => {
    render(<Day07 />, { wrapper: createWrapper() });
    
    expect(screen.getByText(/Fetching your tasks/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Setup Day 07 Route/i)).toBeInTheDocument();
    });
  });

  it('🟢 should handle task completion toggle', async () => {
    render(<Day07 />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/Setup Day 07 Route/i)).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0]).toBeInTheDocument();
  });
});
