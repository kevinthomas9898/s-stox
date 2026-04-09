'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCredentials, logout as logoutAction } from '@/store/slices/authSlice';
import { login as loginService, logoutUser } from '@/lib/services/auth';
import type { LoginCredentials } from '@/types';

/**
 * Custom hook exposing auth state and actions.
 * Tokens are handled securely via HTTP-only cookies.
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const response = await loginService(credentials);
        dispatch(setCredentials({ 
          user: response.data.user
        }));
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      dispatch(logoutAction());
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
