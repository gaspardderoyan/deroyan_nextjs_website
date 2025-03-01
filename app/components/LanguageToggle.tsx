'use client';

import { useState } from 'react';

/**
 * Language toggle button component
 * Switches between English and French
 * This is a client component that maintains its own state
 */
export default function LanguageToggle() {
  // State to track the current locale
  const [locale, setLocale] = useState('en');
  
  // Function to toggle between English and French
  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'fr' : 'en');
    // Note: In a real implementation, this would also update the app's locale context
    // or call an API to change the language throughout the application
  };
  
  return (
    <button 
      onClick={toggleLocale}
      className="text-xs md:text-sm bg-white px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors shadow-sm font-medium"
      aria-label="Toggle language"
    >
      {locale.toUpperCase()}
    </button>
  );
} 