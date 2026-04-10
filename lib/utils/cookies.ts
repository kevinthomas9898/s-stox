import Cookies from 'js-cookie';

const TOKEN_KEY = 'jwtToken';
const REFRESH_KEY = 'refreshToken';
const EMAIL_KEY = 'userEmail';

export interface JwtPayload {
  UserId?: string;
  email?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  exp?: number;
}

/**
 * Decode JWT token safely
 * Returns null if token is invalid
 */
export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJwt(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
}

export function setAuthCookies(jwtToken: string, refreshToken: string, email?: string) {
  // Set cookies with secure options - use path / for entire site
  Cookies.set(TOKEN_KEY, jwtToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: 7, // 7 days
    path: '/',
  });
  Cookies.set(REFRESH_KEY, refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: 30, // 30 days
    path: '/',
  });
  if (email) {
    Cookies.set(EMAIL_KEY, email, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: 7,
      path: '/',
    });
  }
}

export function getAuthCookies() {
  return {
    jwtToken: Cookies.get(TOKEN_KEY) || null,
    refreshToken: Cookies.get(REFRESH_KEY) || null,
  };
}

export function clearAuthCookies() {
  // Must specify same path as when setting cookies
  Cookies.remove(TOKEN_KEY, { path: '/' });
  Cookies.remove(REFRESH_KEY, { path: '/' });
  Cookies.remove(EMAIL_KEY, { path: '/' });
}

export function getUserEmail(): string | null {
  return Cookies.get(EMAIL_KEY) || null;
}

export function getJwtToken(): string | null {
  const token = Cookies.get(TOKEN_KEY);
  if (!token || isTokenExpired(token)) {
    return null;
  }
  return token;
}
