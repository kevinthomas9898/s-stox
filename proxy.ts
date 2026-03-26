import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './i18n/config';
import type { NextRequest } from 'next/server';

// Create the next-intl middleware instance
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

// Export it as proxy as required by Next.js 16
export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except API routes, static files, and Next.js internals
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
