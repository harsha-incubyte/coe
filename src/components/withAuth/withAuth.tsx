import type { ComponentType } from 'react';
import { LoginForm } from '@/pages/Day02/LoginForm/LoginForm';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';

/**
 * withAuth HOC
 * Protects a component by checking for a valid token in localStorage.
 * If no token is found, it renders the LoginForm as a fallback.
 */
export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const AuthenticatedComponent = (props: P) => {
    const [token] = useLocalStorage<string | null>('token', null);

    if (!token) {
      // Fallback UI when not authenticated
      // Re-using Day 02 LoginForm as the LoginPrompt
      return (
        <div className="auth-guard-container" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Authentication Required</h2>
          <p>Please sign in to access this secure area.</p>
          <LoginForm redirectPath="/day-06" />
        </div>
      );
    }

    // Forward props and render the wrapped component
    return <WrappedComponent {...props} />;
  };

  // Set display name for better debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  AuthenticatedComponent.displayName = `withAuth(${displayName})`;

  return AuthenticatedComponent;
}
