import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vitest } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('should render email and password inputs and a login button', () => {
    render(<LoginForm onLogin={() => {}} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show error when email format is invalid', async () => {
    const user = userEvent.setup();
    const onLogin = vitest.fn();
    render(<LoginForm onLogin={onLogin} />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'invalid-email');
    expect(emailInput).toHaveValue('invalid-email');
    
    await user.click(submitButton);

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent(/invalid email format/i);
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('should show error when password is too short', async () => {
    const user = userEvent.setup();
    const onLogin = vitest.fn();
    render(<LoginForm onLogin={onLogin} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'short');
    await user.click(submitButton);

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent(/password must be at least 8 characters/i);
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('should call onLogin with valid credentials', async () => {
    const user = userEvent.setup();
    const onLogin = vitest.fn();
    render(<LoginForm onLogin={onLogin} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'user@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(onLogin).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

