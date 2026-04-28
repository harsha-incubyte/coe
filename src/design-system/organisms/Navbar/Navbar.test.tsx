import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './Navbar';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/design-system/theme';
import { useSession } from 'next-auth/react';

// Mock useSession
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('Navbar', () => {
  it('should render Day 01, Day 02, Day 07, Day 08 and Day 09 links', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    } as import('next-auth/react').SessionContextValue);
    
    renderWithProviders(<Navbar />);

    expect(screen.getByText(/Day 01/i)).toBeInTheDocument();
    expect(screen.getByText(/Day 02/i)).toBeInTheDocument();
    expect(screen.getByText(/Day 07/i)).toBeInTheDocument();
    expect(screen.getByText(/Day 08/i)).toBeInTheDocument();
    expect(screen.getByText(/Day 09/i)).toBeInTheDocument();
  });

  it('should be wrapped in a header tag', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    } as import('next-auth/react').SessionContextValue);
    
    const { container } = renderWithProviders(<Navbar />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('should have a button for the User Profile dropdown with Correct ARIA attributes', () => {
    vi.mocked(useSession).mockReturnValue({
      data: { user: { name: 'John Doe', email: 'john@example.com' } },
      status: 'authenticated',
    } as import('next-auth/react').SessionContextValue);
    
    renderWithProviders(<Navbar />);
    const button = screen.getByRole('button', { name: /user profile/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'user-menu');
  });

  it('should show Login link when not authenticated', () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    } as import('next-auth/react').SessionContextValue);
    
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
