'use client';

import { useEffect } from 'react';
import ReduxProvider from './ReduxProvider';
import QueryProvider from './QueryProvider';
import { useAppDispatch } from '@/store';
import { setCredentials, setLoading, logout } from '@/store/slices/authSlice';
import { refreshToken } from '@/lib/services/auth';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

/**
 * Initializes auth state on app load by attempting to refresh the session.
 * If a valid refresh token cookie exists, the backend returns a new access token.
 */
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { jwtToken } = await refreshToken();
        dispatch(setCredentials({ jwtToken }));
      } catch {
        // No valid session — user is not authenticated
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    initAuth();
  }, [dispatch]);

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
      <QueryProvider>
        <AuthInitializer>
          {children}
          <ScrollToTopButton />
        </AuthInitializer>
      </QueryProvider>
    </ReduxProvider>
  );
}
