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
  value: string;
  label: string;
  quesNo: string;
}

export interface AmbassadorQuestionsData {
  [key: string]: AmbassadorQuestionOption[];
}

export interface GetAllAmbassadorQuestionParams {
  LangCode: string;
  LanguageDialectCode: string;
}

// ── Create Application ──
export interface AmbassadorQuesAnswer {
  answerNumber: string;
  questionNumber: string;
}

export interface CreateApplicationParams {
  countryCode: string;
  firstName: string;
  surname: string;
  email: string;
  phoneNo: string;
  appointmentDate?: string;
  ambassadorQuesAnswerList: AmbassadorQuesAnswer[];
}

export interface CreateApplicationResponse {
  status: boolean;
  data: null;
  message: string;
}

// ── Email Verification ──
export interface VerifyUserRequest {
  emailAddress: string;
}

export interface UserSecurityQuestion {
  securityQuestion: string;      // quesNo (100, 200)
  securityQuestionAnswer: string; // user's answer
  securityQuestionValue: string;  // value from API (10, 20, 30)
}

export interface RegistrationUserData {
  registerUserEndpoint: string | null;
  registrationPage: string;
  contractCode: string;
  title: string | null;
  firstName: string;
  middleNames: string;
  surname: string;
  mobileCountryCode: string | null; // Page 1: Mobile country code
  mobileNumber: string | null;      // Page 1: Mobile number
  emailAddress: string;
  dateOfBirth: string | null;
  country: string | null;
  streetAddress: string;
  aptSuiteOrUnit: string;
  city: string;
  state: string;
  zipCode: string;
  createPassword: string | null;
  userSecurityQues: UserSecurityQuestion[];
  kycDocument: string | null;
  kycDocumentNumber: string;
  referralAmbassadorCode: string | null;
  isEmailVerified: boolean;
}

export interface VerifyUserData {
  user: RegistrationUserData | null;
  message: string;
  isExistingUser: boolean;
  isEmailVerified?: boolean;
  isRegistrationCompleted?: boolean;
}

export interface VerifyUserResponse {
  status: boolean;
  data: VerifyUserData;
  message: string;
}

export interface VerifyOtpRequest {
  contractCode: string;
  email: string;
  otp: string;
}

export interface VerifyOtpData {
  isValid: boolean;
  message: string;
  contractCode: string;
  email: string;
  registrationPage: string;
}

export interface VerifyOtpResponse {
  status: boolean;
  data: VerifyOtpData;
  message: string;
}

export interface VerifyMobileOtpRequest {
  contractCode: string;
  email: string;
  otp: string;
}

export interface SendMobileOtpRequest {
  contractCode: string;
  mobileNumber: string;
  countryCode: string;
  email: string;
}

export interface ResendOtpRequest {
  contractCode: string;
  emailAddress: string;
}

// ── Register User ──
export interface UserSecurityQuestionInput {
  securityQuestion: string;      // quesNo (e.g., "100", "200")
  securityQuestionAnswer: string;  // user's answer
  securityQuestionValue: string; // value from API (e.g., "10", "20", "30")
}

export interface RegisterUserRequest {
  registerUserEndpoint: string | null;
  registrationPage: string;
  contractCode: string;
  title: string;
  firstName: string;
  middleNames: string;
  surname: string;
  mobileCountryCode: string;
  mobileNumber: string;
  emailAddress: string;
  dateOfBirth: string;
  country: string;
  streetAddress: string;
  aptSuiteOrUnit: string;
  city: string;
  state: string;
  zipCode: string;
  createPassword: string;
  userSecurityQues: UserSecurityQuestionInput[];
  kycDocument: string;
  kycDocumentNumber: string;
  referralAmbassadorCode: string;
  isEmailVerified: boolean;
  tsCsAccepted: boolean;
}

export interface RegisterUserData {
  contractCode?: string;
  emailAddress?: string;
  registrationComplete?: boolean;
  user?: User | null;
  message?: string;
  isExistingUser?: boolean;
  isRegistrationCompleted?: boolean;
}

export interface RegisterUserResponse {
  status: boolean;
  data: RegisterUserData;
  message: string;
}

// ── Security Questions ──
export interface SecurityQuestionItem {
  quesNo: string;  // Question group number (e.g., "100", "200")
  label: string;    // Display text
  value: string;    // Actual value to send (e.g., "10", "20", "30")
}

export interface SecurityQuestionsData {
  [key: string]: SecurityQuestionItem[];
}

export interface SecurityQuestionsResponse {
  status: boolean;
  data: SecurityQuestionsData;
  message: string;
}

// Re-export available slots types
export type {
  AvailableDayWithSpots,
  AvailableSlot,
} from './calendly';
