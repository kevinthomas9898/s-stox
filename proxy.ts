import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createProxy from 'next-intl/middleware';
import { locales, localePrefix, defaultLocale } from './i18n/config';

const PROTECTED_ROUTES = ['/dashboard', '/profile'];
const AUTH_ROUTES = ['/login', '/signup'];

const intlProxy = createProxy({
  locales,
  defaultLocale,
  localePrefix,
});

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Tokens from cookies
  const jwtToken = request.cookies.get('jwtToken')?.value || request.cookies.get('JwtToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value || request.cookies.get('RefreshToken')?.value;

  const isAuthenticated = !!(jwtToken || refreshToken);

  // 2. Normalize route (remove locale)
  let baseRoute = pathname;

  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      baseRoute = pathname.replace(`/${locale}`, '');
      break;
    }
    if (pathname === `/${locale}`) {
      baseRoute = '/';
      break;
    }
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => baseRoute.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => baseRoute.startsWith(route));

  // 3. Extract locale
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : defaultLocale;

  // 4. Redirect logic
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // 5. Delegate to next-intl proxy
  return intlProxy(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|static|.*\\..*).*)'],
};