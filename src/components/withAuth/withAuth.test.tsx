import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vitest } from 'vitest';
import { withAuth } from './withAuth';
import { MemoryRouter } from 'react-router-dom';
import { useAppStore } from '@/store';

// Mock Navigate to avoid infinite loops in tests where we render the component directly
vitest.mock('react-router-dom', async () => {
  const actual = await vitest.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: vitest.fn(() => <div data-testid="navigate-mock" />),
    // Need to mock useLocation and useNavigate if needed, but react-router-dom ones work fine if not looping
  };
});

describe('withAuth HOC', () => {
  const MockComponent = ({ title }: { title: string }) => <div>Protected: {title}</div>;

  beforeEach(() => {
    useAppStore.setState({ user: null, token: null, isAuthenticated: false });
    vitest.clearAllMocks();
  });

  it('should render Navigate by default if not authenticated', () => {
    const ProtectedComponent = withAuth(MockComponent);
    render(
      <MemoryRouter initialEntries={['/secure-page']}>
        <ProtectedComponent title="My Dashboard" />
      </MemoryRouter>
    );

    expect(screen.getByTestId('navigate-mock')).toBeInTheDocument();
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
