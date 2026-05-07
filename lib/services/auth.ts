import api from '@/lib/api/axiosInstance';
import type {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  User,
  VerifyUserResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from '@/types';

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

export interface LogoutParams {
  refreshToken: string;
}

export interface LogoutResponse {
  status: boolean;
  data: null;
  message: string;
}

/**
 * Logout the user.
 * Sends refresh token to backend for invalidation.
 */
export async function logoutUser(params: LogoutParams): Promise<LogoutResponse> {
  const { data } = await api.post<LogoutResponse>('/auth/logout', params);
  return data;
}

/**
 * Session restoration endpoint.
 * Backend reads cookies and returns current user info.
 */
export async function secure(): Promise<User> {
  const { data } = await api.get<ApiResponse<User>>('/auth/secure');
  // Handle both { data: { ... } } and { Data: { ... } } if backend varies
  const responseData = (data as { data?: User }).data || (data as { Data?: User }).Data || (data as unknown as User);
  return responseData;
}

/**
 * Verify user email and send OTP.
 * Returns contract code for the verification flow.
 */
export async function verifyUser(emailAddress: string): Promise<VerifyUserResponse> {
  const { data } = await api.post<VerifyUserResponse>('/auth/verifyUser', emailAddress);
  return data;
}

/**
 * Verify OTP code.
 * Validates the OTP and returns verification status.
 */
export async function verifyOtp(params: VerifyOtpRequest): Promise<VerifyOtpResponse> {
  const { data } = await api.post<VerifyOtpResponse>('/auth/verifyOtp', params);
  return data;
}

/**
 * Register user with complete registration data.
 * Saves progress or completes registration based on the step.
 */
export async function registerUser(params: RegisterUserRequest): Promise<RegisterUserResponse> {
  const { data } = await api.post<RegisterUserResponse>('/auth/registerUser', params);
  return data;
}
