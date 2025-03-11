import Image from 'next/image';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import { validateLocale } from '@/app/lib/i18n';
import { Suspense } from 'react';
import translations from '@/app/lib/translations.json';
/**
 * Navbar component that displays the site navigation
 * Uses dynamic UI elements fetched at build time
 * On mobile: Two-row layout with logo and language toggle in first row, nav links in second row
 * On desktop: Single row layout with logo on left, nav links and language toggle on right
 */
export async function Navbar({
  params
}: {
  params: { locale: string }
}) {
  // Fetch UI elements at build time
  const { locale } = await params;

  // ensure we use a valid locale
  const validLocale = validateLocale(locale);

  const t = translations[validLocale as keyof typeof translations];

  return (
    <nav className="sticky top-0 z-50 flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 lg:px-6 py-0 lg:py-0 bg-[#EAE8DA] border-b border-black relative">
      {/* First row on mobile: Logo and Language Toggle */}
      <div className="flex justify-between items-center w-full py-3 lg:py-0 min-h-[60px] lg:min-h-[80px] lg:w-auto">
        {/* Logo */}
        <div className="lg:relative z-10">
          <Link href={`/${validLocale}`}>
            <Image
              src="/galerie_logo.png"
              alt="Galerie Logo"
              width={300}
              height={50}
              className="w-[160px] md:w-[200px] lg:w-[250px] object-contain"
            />
          </Link>
        </div>
        
        {/* Language toggle - right side on mobile, hidden on desktop as it's moved to the right side container */}
        <div className="lg:hidden">
          <Suspense fallback={<div className="text-sm md:text-base bg-[hsl(53,28%,89%)] px-3 py-2 border border-black shadow-sm font-medium">...</div>}>
            <LanguageToggle />
          </Suspense>
        </div>
      </div>
      
      {/* Second row on mobile / Right side on desktop: Navigation Links and Language Toggle */}
      <div className="flex justify-center lg:justify-end items-center w-full py-3 lg:py-0">
        {/* Navigation links - centered on mobile, right-aligned on desktop */}
        <div className="flex items-center space-x-5 lg:space-x-8">
          <Link href={`/${validLocale}`} className="text-gray-800 hover:text-gray-600 transition-colors text-base font-medium lg:text-base lg:font-normal">
            {t['navbar.home']}
          </Link>
          <Link href={`/${validLocale}/collection`} className="text-gray-800 hover:text-gray-600 transition-colors text-base font-medium lg:text-base lg:font-normal">
            {t['navbar.collection']}
          </Link>
          <Link href={`/${validLocale}/about`} className="text-gray-800 hover:text-gray-600 transition-colors text-base font-medium lg:text-base lg:font-normal">
            {t['navbar.about']}
          </Link>
        </div>
        
        {/* Language toggle on desktop - positioned next to nav links */}
        <div className="hidden lg:flex items-center ml-6">
          <Suspense fallback={<div className="text-xs md:text-sm bg-[hsl(53,28%,89%)] px-2 py-1 border border-black shadow-sm font-medium">...</div>}>
            <LanguageToggle />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 