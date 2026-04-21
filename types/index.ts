// ── User ──
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// ── Auth ──
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponseData {
  user?: User;
  User?: User;
  jwtToken?: string;
  refreshToken?: string;
}

export interface AuthResponse {
  status: boolean;
  data: AuthResponseData;
  message: string;
}

// ── API ──
export interface ApiResponse<T> {
  status: boolean;
  data: T;
  message: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// ── Ambassador ──
export interface AmbassadorQuestionOption {
  value: number;
  text: string;
}

export interface AmbassadorQuestionsData {
  [key: string]: AmbassadorQuestionOption[];
}

export interface GetAllAmbassadorQuestionParams {
  LangCode: string;
  LanguageDialectCode: string;
}

// ── Create Application ──
export interface CreateApplicationParams {
  countryCode: string;
  firstName: string;
  surname: string;
  email: string;
  marketingBaseQ1: number;
  yearsOfExperienceQ2: number;
  availabilityToStartQ3: number;
  independentOrEmployedQ4: number;
}

export interface CreateApplicationResponse {
  status: boolean;
  data: null;
  message: string;
}
