'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/middleware';
import { getLocaleDisplayName } from '@/app/lib/i18n';

/**
 * LanguageToggle component that allows users to switch between available locales
 * This is a client component that uses Next.js's usePathname and useRouter hooks
 * to redirect to the equivalent path in the selected locale
 */
export default function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Extract the current locale from the pathname
  // Wrapped in useCallback to avoid dependency issues with useEffect
  const getCurrentLocale = useCallback(() => {
    // The pathname format is /{locale}/rest/of/path
    const firstSegment = pathname.split('/')[1];
    return locales.includes(firstSegment) ? firstSegment : 'en';
  }, [pathname]);
  
  // State to track the current locale
  const [locale, setLocale] = useState(getCurrentLocale());
  
  // Update locale state when pathname changes
  useEffect(() => {
    setLocale(getCurrentLocale());
  }, [getCurrentLocale]);
  
  // Function to toggle between available locales
  const toggleLocale = () => {
    // Get the next locale (cycling through available locales)
    const currentIndex = locales.indexOf(locale);
    const nextLocale = locales[(currentIndex + 1) % locales.length];
    
    // Update the locale state
    setLocale(nextLocale);
    
    // Construct the new pathname with the new locale
    const pathSegments = pathname.split('/');
    
    // If the first segment is a locale, replace it
    if (locales.includes(pathSegments[1])) {
      pathSegments[1] = nextLocale;
    } else {
      // If not, insert the locale after the first slash
      pathSegments.splice(1, 0, nextLocale);
    }
    
    // Navigate to the new path
    router.push(pathSegments.join('/'));
  };
  
  return (
    <button 
      onClick={toggleLocale}
      className="text-xs md:text-sm bg-[hsl(53,28%,89%)] px-2 py-1 border border-black shadow-sm font-medium"
      aria-label="Toggle language"
    >
      {getLocaleDisplayName(locale)}
    </button>
  );
} 