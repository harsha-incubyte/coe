import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vitest } from 'vitest';
import { withAuth } from './withAuth';
import { MemoryRouter } from 'react-router-dom';

// Mock the LoginForm to avoid full render complexities in HOC test
vitest.mock('@/pages/Day02/LoginForm/LoginForm', () => ({
  LoginForm: ({ redirectPath }: { redirectPath: string }) => (
    <div data-testid="mock-login-form">Login Form for {redirectPath}</div>
  )
}));

describe('withAuth HOC', () => {
  const MockComponent = ({ title }: { title: string }) => <div>Protected: {title}</div>;
  const ProtectedComponent = withAuth(MockComponent);

  beforeEach(() => {
    localStorage.clear();
  });

  it('should render fallback Login UI with dynamic redirectPath if not authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/secure-page']}>
        <ProtectedComponent title="My Dashboard" />
      </MemoryRouter>
    );

    expect(screen.getByText(/Authentication Required/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-login-form')).toBeInTheDocument();
    expect(screen.getByText(/Login Form for \/secure-page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Protected: My Dashboard/i)).not.toBeInTheDocument();
  });

  it('should render WrappedComponent and forward props if authenticated', () => {
    localStorage.setItem('token', JSON.stringify('valid-token'));

    render(
      <MemoryRouter>
        <ProtectedComponent title="My Dashboard" />
      </MemoryRouter>
    );

    expect(screen.getByText(/Protected: My Dashboard/i)).toBeInTheDocument();
    expect(screen.queryByTestId('mock-login-form')).not.toBeInTheDocument();
  });
});
