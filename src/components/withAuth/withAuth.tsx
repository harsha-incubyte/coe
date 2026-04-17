import type { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';

/**
 * withAuth HOC
 * Protects a component by checking for a valid token in localStorage.
 * If no token is found, it redirects to the login page.
 */
export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const AuthenticatedComponent = (props: P) => {
    const [token] = useLocalStorage<string | null>('token', null);
    const location = useLocation();

    if (!token) {
      // Redirect to login page instead of rendering inline
      return <Navigate to="/day-02/login" state={{ from: location }} replace />;
    }

    // Forward props and render the wrapped component
    return <WrappedComponent {...props} />;
  };

  // Set display name for better debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  AuthenticatedComponent.displayName = `withAuth(${displayName})`;

  return AuthenticatedComponent;
}
