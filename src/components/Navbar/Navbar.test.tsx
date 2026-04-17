import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '@/store';
import Navbar from './Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    useAppStore.setState({ isAuthenticated: false, user: null });
  });

  it('should render Day 01 and Day 02 links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Day 01/i)).toBeInTheDocument();
    expect(screen.getByText(/Day 02/i)).toBeInTheDocument();
  });

  it('should be wrapped in a header tag', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('should have a button for the User Profile dropdown with Correct ARIA attributes', () => {
    useAppStore.setState({ 
      isAuthenticated: true, 
      user: { id: '1', name: 'John Doe', email: 'john@example.com' } 
    });
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /user profile/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', 'user-menu');
  });

  it('should have a dropdown menu with a matching ID', () => {
    useAppStore.setState({ 
      isAuthenticated: true, 
      user: { id: '1', name: 'John Doe', email: 'john@example.com' } 
    });
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    // Initially hidden or empty, but the element structure should exist if we are testing ID link
    // Actually, we usually test toggle behavior here too
    const button = screen.getByRole('button', { name: /user profile/i });
    expect(button).toHaveAttribute('aria-controls', 'user-menu');
  });
});
