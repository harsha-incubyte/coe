import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vitest, beforeEach, vi } from 'vitest';
import { LoginForm } from './LoginForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/design-system/theme';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
  signIn: vi.fn(),
}));

const mockShowToast = vitest.fn();
vitest.mock('@/hooks/useToast', () => ({
  useToast: () => ({
    showToast: mockShowToast,
  }),
}));

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('LoginForm', () => {
  const mockPush = vi.fn();
  const mockRefresh = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    } as any);
    vi.mocked(useSearchParams).mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    } as any);
  });

  it('should render email and password inputs and a login button', () => {
    renderWithTheme(<LoginForm onLogin={async () => {}} redirectPath="/day-02/weather" />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show error when email format is invalid', async () => {
    const user = userEvent.setup();
    const onLogin = vitest.fn();
    renderWithTheme(<LoginForm onLogin={onLogin} redirectPath="/day-02/weather" />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent(/invalid email format/i);
    expect(mockShowToast).toHaveBeenCalledWith('Invalid email format', 'error');
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('should call onLogin with valid credentials', async () => {
    const user = userEvent.setup();
    const onLogin = vitest.fn().mockResolvedValue(undefined);
    renderWithTheme(<LoginForm onLogin={onLogin} redirectPath="/day-02/weather" />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'harsha@incubyte.co');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(onLogin).toHaveBeenCalledWith({
      email: 'harsha@incubyte.co',
      password: 'password123',
    });
  });

  it('should call signIn with valid credentials when onLogin is not provided', async () => {
    const user = userEvent.setup();
    vi.mocked(signIn).mockResolvedValue({ error: null, status: 200, ok: true, url: '' });
    
    renderWithTheme(<LoginForm redirectPath="/day-02/weather" />);

    await user.type(screen.getByLabelText(/email/i), 'harsha@incubyte.co');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'harsha@incubyte.co',
      password: 'password123',
      redirect: false,
      callbackUrl: '/day-02/weather',
    });
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/day-02/weather');
    });
  });

  it('should show error message when login fails', async () => {
    const user = userEvent.setup();
    vi.mocked(signIn).mockResolvedValue({ error: 'CredentialsSignin', status: 401, ok: false, url: '' });
    
    renderWithTheme(<LoginForm redirectPath="/day-02/weather" />);

    await user.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent(/access denied/i);
    expect(mockShowToast).toHaveBeenCalledWith(expect.stringContaining('Access Denied'), 'error');
  });
});

