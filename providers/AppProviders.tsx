'use client';

import { useEffect } from 'react';
import ReduxProvider from './ReduxProvider';
import QueryProvider from './QueryProvider';
import { useAppDispatch } from '@/store';
import { setCredentials, setLoading, logout } from '@/store/slices/authSlice';
import { refreshToken } from '@/lib/services/auth';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import axios from 'axios';

/**
 * Re-validates the session on every app load by calling /auth/refreshToken.
 * - If the refresh token cookie is valid → stores fresh jwtToken in Redux.
 * - If the server returns 401 → session is expired, call logout() to clear state.
 * - If the request fails for any other reason (network error, server down) →
 *   do NOT logout; keep persisted isAuthenticated/user so the UI stays intact.
 *   The token will be re-fetched on the next API call via the 401 interceptor.
 */
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await refreshToken();
        const responseData = response.data || response;
        const newJwt = responseData.jwtToken || (responseData as any).JwtToken;
        const newRefresh = responseData.refreshToken || (responseData as any).RefreshToken;

        dispatch(setCredentials({ 
          jwtToken: newJwt, 
          refreshToken: newRefresh 
        }));
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // Refresh token is expired/invalid — clear auth state
          dispatch(logout());
        } else {
          // Network error or server issue — don't clear auth
          // Just mark loading as done and keep persisted state
          dispatch(setLoading(false));
        }
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
