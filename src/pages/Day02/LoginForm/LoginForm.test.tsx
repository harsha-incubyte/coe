import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vitest, beforeEach } from 'vitest';
import { LoginForm } from './LoginForm';

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(
    <Router initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </Router>
  );
};

describe('LoginForm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render email and password inputs and a login button', () => {
    renderWithRouter(<LoginForm onLogin={() => {}} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show error when email format is invalid', async () => {
    const user = userEvent.setup();
    const onLogin = vitest.fn();
    renderWithRouter(<LoginForm onLogin={onLogin} />);

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
    renderWithRouter(<LoginForm onLogin={onLogin} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'harsha@incubyte.co');
    await user.type(passwordInput, 'short');
    await user.click(submitButton);

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent(/password must be at least 8 characters/i);
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('should call onLogin with valid credentials', async () => {
    const user = userEvent.setup();
    const onLogin = vitest.fn();
    renderWithRouter(<LoginForm onLogin={onLogin} />);

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
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should show success message on successful login', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm onLogin={() => Promise.resolve()} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'harsha@incubyte.co');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
  });

  it('should show loading state and disable button during login', async () => {
    const user = userEvent.setup();
    // A promise that doesn't resolve immediately
    let resolveLogin: () => void;
    const loginPromise = new Promise<void>((resolve) => {
      resolveLogin = resolve;
    });
    
    renderWithRouter(<LoginForm onLogin={() => loginPromise} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'harsha@incubyte.co');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/logging in/i);

    resolveLogin!();
    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent(/login/i);
  });

  it('should show error message when login fails with invalid credentials', async () => {
    const user = userEvent.setup();
    const onLogin = vitest.fn().mockRejectedValue(new Error('Unauthorized'));
    renderWithRouter(<LoginForm onLogin={onLogin} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'wrong@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent(/invalid credentials/i);
    expect(screen.queryByText(/login successful/i)).not.toBeInTheDocument();
  });

  it('should login successfully using integrated API (MSW)', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />); // No onLogin prop

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'harsha@incubyte.co');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
  });

  it('should navigate to weather page after successful login', async () => {
    const user = userEvent.setup();
    render(
      <Router initialEntries={['/day-02/login']}>
        <Routes>
          <Route path="/day-02/login" element={<LoginForm />} />
          <Route path="/day-02/weather" element={<div>Weather Page</div>} />
        </Routes>
      </Router>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'harsha@incubyte.co');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(await screen.findByText(/weather page/i)).toBeInTheDocument();
  });

  it('should store authentication token in localStorage on successful login', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'harsha@incubyte.co');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBe(JSON.stringify('fake-jwt-token'));
  });

  it('should redirect to weather page if token is already present on mount', () => {
    localStorage.setItem('token', JSON.stringify('existing-token'));

    render(
      <Router initialEntries={['/day-02/login']}>
        <Routes>
          <Route path="/day-02/login" element={<LoginForm />} />
          <Route path="/day-02/weather" element={<div>Weather Dashboard</div>} />
        </Routes>
      </Router>
    );

    expect(screen.getByText(/weather dashboard/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
  });
});

