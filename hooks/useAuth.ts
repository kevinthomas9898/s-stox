'use client';

import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout as logoutAction, setCredentials, setLoading } from '@/store/slices/authSlice';
import { getJwtToken, clearAuthCookies, decodeJwt, getUserEmail } from '@/lib/utils/cookies';
import { logoutUser } from '@/lib/services/auth';
import { toast } from 'sonner';
import type { LoginCredentials } from '@/types';

/**
 * Custom hook exposing auth state and actions.
 * Tokens are stored in cookies, user state in Redux.
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  // Initialize auth state from cookies on mount
  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      const payload = decodeJwt(token);
      if (payload) {
        const userId = payload.UserId || '';
        const email = getUserEmail() || payload.email || payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '';
        dispatch(setCredentials({
          user: { id: userId, email, name: email },
          isAuthenticated: true,
        }));
      } else {
        // Invalid token, clear it
        clearAuthCookies();
        dispatch(setLoading(false));
      }
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const login = useCallback(
    async (_credentials: LoginCredentials) => {
      // Login is handled in the login page component
      // This function exists for API compatibility
    },
    [],
  );

  const logout = useCallback(async () => {
    // Clear cookies
    clearAuthCookies();
    // Clear Redux state
    dispatch(logoutAction());
    // Show toast
    toast.success('Logged out successfully');
    // Call backend logout
    try {
      await logoutUser();
    } catch {
      // Ignore backend logout errors
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
