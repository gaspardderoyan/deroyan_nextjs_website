import { locales, defaultLocale } from '@/middleware';

// Validate that the locale is supported
export function validateLocale(locale: string | undefined): string {
  if (!locale || !locales.includes(locale)) {
    return defaultLocale;
  }
  return locale;
}

// Get the display name of a locale
export function getLocaleDisplayName(locale: string): string {
  const displayNames: Record<string, string> = {
    en: 'EN',
    fr: 'FR',
  };
  
  return displayNames[validateLocale(locale)] || displayNames[defaultLocale];
} 