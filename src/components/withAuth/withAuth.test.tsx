import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vitest } from 'vitest';
import { withAuth } from './withAuth';
import { MemoryRouter } from 'react-router-dom';
import { useAppStore } from '@/store';

describe('withAuth HOC', () => {
  const MockComponent = ({ title }: { title: string }) => <div>Protected: {title}</div>;

  beforeEach(() => {
    useAppStore.setState({ user: null, token: null, isAuthenticated: false });
    vitest.clearAllMocks();
  });

  it('should render nothing (Navigate) by default if not authenticated', () => {
    const ProtectedComponent = withAuth(MockComponent);
    const { container } = render(
      <MemoryRouter initialEntries={['/secure-page']}>
        <ProtectedComponent title="My Dashboard" />
      </MemoryRouter>
    );

    // Navigate renders null
    expect(container.firstChild).toBeNull();
  });

  it('should render fallback component if provided and not authenticated', () => {
    const Fallback = () => <div data-testid="custom-fallback">Please Login</div>;
    const ProtectedComponent = withAuth(MockComponent, { fallback: Fallback });
    
    render(
      <MemoryRouter initialEntries={['/secure-page']}>
        <ProtectedComponent title="My Dashboard" />
      </MemoryRouter>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText(/Please Login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Protected: My Dashboard/i)).not.toBeInTheDocument();
  });

  it('should render WrappedComponent and forward props if authenticated', () => {
    useAppStore.setState({ user: { id: '1', name: 'Test', email: 'test@example.com' }, token: 'token', isAuthenticated: true });
    const ProtectedComponent = withAuth(MockComponent);

    render(
      <MemoryRouter>
        <ProtectedComponent title="My Dashboard" />
      </MemoryRouter>
    );

    expect(screen.getByText(/Protected: My Dashboard/i)).toBeInTheDocument();
  });
});
