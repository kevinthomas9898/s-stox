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
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  jwtToken: string;
  refreshToken: string;
  isError: boolean;
  errorMsg: string | null;
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


