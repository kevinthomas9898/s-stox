import { store } from '@/store';
import api from '@/lib/api/axiosInstance';
import type { ApiResponse, AuthResponse, LoginCredentials } from '@/types';

/**
 * Login with email and password.
 * Backend returns jwtToken and refreshToken.
 */
export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    '/auth/login',
    credentials,
  );
  return response.data;
}

/**
 * Refresh the access token.
 * Refresh token is sent in the request body.
 */
export async function refreshToken(): Promise<AuthResponse> {
  const { refreshToken } = store.getState().auth;
  const { data } = await api.post<AuthResponse>('/auth/refreshToken', { refreshToken });
  return data;
}

/**
 * Logout the user.
 * Backend clears the refresh token cookie.
 */
export async function logoutUser(): Promise<void> {
  await api.post('/auth/logout');
}

/**
 * Test secure endpoint (requires authentication).
 */
export async function secure(): Promise<unknown> {
  const { data } = await api.get<ApiResponse<unknown>>('/auth/secure');
  return data.data;
}
