import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '@/store';
import { Navbar } from './Navbar';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/design-system/theme';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    useAppStore.setState({ isAuthenticated: false, user: null });
  });

  it('should render Day 01, Day 02, Day 07, Day 08 and Day 09 links', () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByText(/Day 01/i)).toBeInTheDocument();
    expect(screen.getByText(/Day 02/i)).toBeInTheDocument();
    expect(screen.getByText(/Day 07/i)).toBeInTheDocument();
    expect(screen.getByText(/Day 08/i)).toBeInTheDocument();
    expect(screen.getByText(/Day 09/i)).toBeInTheDocument();
  });

  it('should be wrapped in a header tag', () => {
    const { container } = renderWithProviders(<Navbar />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('should have a button for the User Profile dropdown with Correct ARIA attributes', () => {
    useAppStore.setState({ 
      isAuthenticated: true, 
      user: { id: '1', name: 'John Doe', email: 'john@example.com' } 
    });
    renderWithProviders(<Navbar />);
    const button = screen.getByRole('button', { name: /user profile/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'user-menu');
  });

  it('should show Login link when not authenticated', () => {
    useAppStore.setState({ isAuthenticated: false });
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
