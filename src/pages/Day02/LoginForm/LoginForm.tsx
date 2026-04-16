import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';
import { useToast } from '@/hooks/useToast';
import './LoginForm.css';

interface LoginData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onLogin?: (data: LoginData) => Promise<void>;
  /** Path to redirect to after successful login. */
  redirectPath: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onLogin, 
  redirectPath
}) => {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage<string | null>('token', null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    if (token) {
      navigate(redirectPath);
    }
  }, [token, navigate, redirectPath]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateEmail(email)) {
      setError('Invalid email format');
      showToast('Invalid email format', 'error');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters');
      showToast('Password must be at least 8 characters', 'error');
      return;
    }

    setIsLoading(true);
    try {
      if (onLogin) {
        await onLogin({ email, password });
      } else {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Unauthorized');
        }

        const data = await response.json();
        setToken(data.token);
      }
      setSuccess('Login successful');
      showToast('Welcome back! You have successfully logged in.', 'success');
      setTimeout(() => {
        navigate(redirectPath);
      }, 500);
    } catch {
      const errorMessage = "Access Denied! 🕵️‍♂️ As a fellow coder, you know the drill—the right credentials are hidden in plain sight within the source code. Happy hunting!";
      setError(errorMessage);
      showToast('Login failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-box">
      {error && (
        <div className="message message-error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="message message-success">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            placeholder="Enter your email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            placeholder="Enter your password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="login-submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

