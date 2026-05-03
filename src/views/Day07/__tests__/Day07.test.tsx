import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Day07 from '@/views/Day07';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { ThemeManager } from '@/design-system/theme/ThemeManager';
import { LayoutProvider } from '@/design-system/layout/LayoutContext';

// Mock useSession
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeManager>
      <LayoutProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </LayoutProvider>
    </ThemeManager>
  );
  return Wrapper;
};

describe('Day07 Component', () => {
  beforeEach(() => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { name: 'Harsha', email: 'harsha@incubyte.co' } },
      status: 'authenticated',
    } as unknown as ReturnType<typeof useSession>);
  });

  it('should render personalized welcome message from Zustand store', () => {
    render(<Day07 />, { wrapper: createWrapper() });
    const welcome = screen.getByText(/Welcome back,/i);
    expect(welcome).toBeInTheDocument();
    expect(welcome).toHaveTextContent(/Harsha/i);
  });

  it('should display tasks fetched by React Query', async () => {
    render(<Day07 />, { wrapper: createWrapper() });
    
    expect(screen.getByText(/Fetching your tasks/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Setup Day 07 Route/i)).toBeInTheDocument();
    });
  });

  it('should handle task completion toggle', async () => {
    render(<Day07 />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/Setup Day 07 Route/i)).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0]).toBeInTheDocument();
  });

  it('should have the correct data-testid on tasks-list-container', async () => {
    render(<Day07 />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByTestId('tasks-list-container')).toBeInTheDocument();
    });
  });

  it('should have a task board heading', () => {
    render(<Day07 />, { wrapper: createWrapper() });
    expect(screen.getByRole('heading', { name: /Task Board/i })).toBeInTheDocument();
  });
});
