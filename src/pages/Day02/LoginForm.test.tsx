import { render, screen, fireEvent } from '@testing-library/react';
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
    const onLogin = vitest.fn();
    render(<LoginForm onLogin={onLogin} />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    expect(onLogin).not.toHaveBeenCalled();
  });
});
