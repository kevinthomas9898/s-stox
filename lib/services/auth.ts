import api from '@/lib/api/axiosInstance';
import type { ApiResponse, AuthResponse, LoginCredentials, User } from '@/types';

/**
 * Login with email and password.
 * Returns jwtToken and refreshToken in response (frontend sets cookies).
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
 * Refresh token is sent via HTTP-only cookie.
 */
export async function refreshToken(): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/refreshToken');
  return data;
}

/**
 * Logout the user.
 * Backend clears cookies.
 */
export async function logoutUser(): Promise<void> {
  await api.post('/auth/logout', {}); // Backend requires non-empty body
}

/**
 * Session restoration endpoint.
 * Backend reads cookies and returns current user info.
 */
export async function secure(): Promise<User> {
  const { data } = await api.get<ApiResponse<User>>('/auth/secure');
  // Handle both { data: { ... } } and { Data: { ... } } if backend varies
  const responseData = (data as any).data || (data as any).Data || data;
  return responseData;
}
