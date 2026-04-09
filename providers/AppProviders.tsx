'use client';

import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import ReduxProvider from './ReduxProvider';
import QueryProvider from './QueryProvider';
import { useAppDispatch, useAppSelector, persistor } from '@/store';
import { setCredentials, setLoading, logout as logoutAction } from '@/store/slices/authSlice';
import { refreshToken as refreshTokenService, secure as fetchUserProfile } from '@/lib/services/auth';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import axios from 'axios';

/**
 * Re-validates the session on every app load by calling /auth/refreshToken.
 * - If the refresh token cookie is valid → backend returns 200 → mark as authenticated.
 * - If the server returns 401 → session is expired or missing, clear auth state.
 */
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { refreshToken, user, isAuthenticated } = useAppSelector((state) => state.auth);
  const isLoadingPersist = useAppSelector((state) => state.auth.isLoading);

  useEffect(() => {
    // Skip API hit for obviously unauthenticated users (guests)
    // We only try to restore the session if we have previous evidence of a login
    if (!isAuthenticated && !refreshToken) {
      if (isLoadingPersist) {
        dispatch(setLoading(false));
      }
      return;
    }

    const initAuth = async () => {
      try {
        await refreshTokenService(refreshToken || undefined);
        
        // If session is restored, fetch the latest user profile if not already present
        if (!user) {
          try {
            const userData = await fetchUserProfile();
            dispatch(setCredentials({ user: userData, isAuthenticated: true }));
          } catch {
            // Fallback: mark authenticated even if profile fetch fails
            dispatch(setCredentials({ user: null, isAuthenticated: true }));
          }
        } else {
          // Keep existing user info
          dispatch(setCredentials({ user, isAuthenticated: true }));
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // Cookies are missing or expired
          dispatch(logoutAction());
        } else {
          // Network error or server issue — keep persisted state if it exists
          dispatch(setLoading(false));
        }
      }
    };

    initAuth();
  }, [dispatch]); // Only run on mount to initialize session

  return <>{children}</>;
}

/**
 * Composes all global providers in the correct order.
 * Redux must wrap QueryProvider so Axios interceptors can access the store.
 */
export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        <QueryProvider>
          <AuthInitializer>
            {children}
            <ScrollToTopButton />
          </AuthInitializer>
        </QueryProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
