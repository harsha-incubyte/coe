import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('should render email and password inputs and a login button', () => {
    render(<LoginForm onLogin={() => {}} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
