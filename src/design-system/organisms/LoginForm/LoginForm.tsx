import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/useToast';
import { Button, Input } from '@/design-system/atoms';
import { useBoolean } from '@/hooks/useBoolean';
import * as S from './LoginForm.styles';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || redirectPath;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, { setTrue: startLoading, setFalse: stopLoading }] = useBoolean(false);

  const { showToast } = useToast();

  // We will handle redirect logic within handleSubmit or via searchParams middleware
  
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

    startLoading();
    try {
      if (onLogin) {
        await onLogin({ email, password });
      } else {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        setSuccess('Login successful');
        showToast('Welcome back! You have successfully logged in.', 'success');
        
        setTimeout(() => {
          router.push(callbackUrl);
          router.refresh();
        }, 500);
      }
    } catch (err: any) {
      const errorMessage = err.message === 'CredentialsSignin' 
        ? "Access Denied! Invalid credentials." 
        : "Something went wrong. Please try again.";
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      stopLoading();
    }
  };

  return (
    <S.LoginBox>
      {error && (
        <S.Message $variant="error" role="alert">
          {error}
        </S.Message>
      )}
      {success && (
        <S.Message $variant="success">
          {success}
        </S.Message>
      )}
      <S.LoginFormContainer onSubmit={handleSubmit} noValidate>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        <Button 
          type="submit" 
          disabled={isLoading} 
          variant="accent" 
          fullWidth 
          size="lg"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </S.LoginFormContainer>
    </S.LoginBox>
  );
};

