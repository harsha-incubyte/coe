import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../index';

describe('Auth Store (Zustand)', () => {
  beforeEach(() => {
    useAppStore.setState({ user: null, token: null, isAuthenticated: false });
  });

  it('🔴 should have initial unauthenticated state', () => {
    const state = useAppStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('🔴 should update state correctly on login', () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    const mockToken = 'mock-token';

    useAppStore.getState().login(mockUser, mockToken);

    const state = useAppStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe(mockToken);
    expect(state.isAuthenticated).toBe(true);
  });

  it('🔴 should clear state correctly on logout', () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    const mockToken = 'mock-token';

    useAppStore.getState().login(mockUser, mockToken);
    useAppStore.getState().logout();

    const state = useAppStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
