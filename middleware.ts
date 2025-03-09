import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

// List of supported locales
export const locales = ['en', 'fr'];
export const defaultLocale = 'en';

// Get the preferred locale from the request
// Extracts the 'Accept-Language' header from the request
// If no Accept-Language header is present, return the default locale
function getLocale(request: NextRequest): string {
  // Negotiator expects a plain object, so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  // If no Accept-Language header is present, return the default locale
  if (!languages.length) {
    return defaultLocale;
  }

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has locale, don't redirect
  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale in the pathname
  const locale = getLocale(request);
  
  // e.g. incoming request is /products
  // The new URL is now /en/products or /fr/products
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  // Preserve the search params
  newUrl.search = request.nextUrl.search;
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}; 