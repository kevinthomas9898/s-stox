// ── User ──
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// ── Auth ──
export interface AuthState {
  jwtToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponseData {
  jwtToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  status: string;
  data: AuthResponseData;
  message: string;
}

// ── API ──
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}


