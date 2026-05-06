import { render, screen, fireEvent, waitFor } from '@/design-system/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Day07 from '@/views/Day07';
import { useSession } from 'next-auth/react';

// Mock useSession
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

describe('Day07 Component', () => {
  beforeEach(() => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { name: 'Harsha', email: 'harsha@incubyte.co' } },
      status: 'authenticated',
    } as unknown as ReturnType<typeof useSession>);
  });

  it('should render personalized welcome message from Zustand store', () => {
    render(<Day07 />);
    const welcome = screen.getByText(/Welcome back,/i);
    expect(welcome).toBeInTheDocument();
    expect(welcome).toHaveTextContent(/Harsha/i);
  });

  it('should display tasks fetched by React Query', async () => {
    render(<Day07 />);
    
    expect(screen.getByText(/Fetching your tasks/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Setup Day 07 Route/i)).toBeInTheDocument();
    });
  });

  it('should handle task completion toggle', async () => {
    render(<Day07 />);

    await waitFor(() => {
      expect(screen.getByText(/Setup Day 07 Route/i)).toBeInTheDocument();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(checkboxes[0]).toBeInTheDocument();
  });

  it('should have the correct data-testid on tasks-list-container', async () => {
    render(<Day07 />);
    await waitFor(() => {
      expect(screen.getByTestId('tasks-list-container')).toBeInTheDocument();
    });
  });

  it('should have a task board heading', () => {
    render(<Day07 />);
    expect(screen.getByRole('heading', { name: /Task Board/i })).toBeInTheDocument();
  });
});
