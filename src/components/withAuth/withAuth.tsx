import type { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store';

/**
 * withAuth HOC
 * Protects a component by checking for a valid token in the store.
 * If no token is found, it redirects to the login page.
 */
export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const AuthenticatedComponent = (props: P) => {
    const isAuthenticated = useAppStore((state) => state.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
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
