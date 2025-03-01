import Image from 'next/image';
import Link from 'next/link';
import { getUIElements } from '@/app/lib/api';
import LanguageToggle from './LanguageToggle';

/**
 * Navbar component that displays the site navigation
 * Uses dynamic UI elements fetched at build time
 */
export async function Navbar() {
  // Fetch UI elements at build time
  const uiElements = await getUIElements('fr');
  
  // Use the fetched values or fallback to defaults if API call fails
  const collectionText = uiElements['navbar.collection'] || 'Collection';
  const aboutText = uiElements['navbar.about'] || 'À propos';
  const contactText = uiElements['navbar.contact'] || 'Contact';

  return (
    <nav className="flex items-center px-4 lg:px-6 py-4 bg-[#EAE8DA] border-b border-black relative min-h-[50px] lg:min-h-[80px]">
      {/* Logo on the left */}
      <div className="absolute left-2 lg:left-6 top-1/2 transform -translate-y-1/2 z-10">
        <Link href="/">
          <Image
            src="/galerie_logo.png"
            alt="Galerie Logo"
            width={300}
            height={50}
            className="w-[130px] md:w-[180px] lg:w-[250px] object-contain"
          />
        </Link>
      </div>
      
      {/* Right side container with flex layout - takes up the full width */}
      <div className="flex justify-end lg:justify-center items-center w-full ml-[140px] md:ml-[190px] lg:ml-0">
        {/* Navigation links - right aligned on mobile/tablet, centered on desktop */}
        <div className="flex items-center space-x-3 lg:space-x-8">
          <Link href="/collection" className="text-gray-800 hover:text-gray-600 transition-colors text-sm lg:text-base">
            {collectionText}
          </Link>
          <Link href="/about" className="text-gray-800 hover:text-gray-600 transition-colors text-sm lg:text-base">
            {aboutText}
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-gray-600 transition-colors text-sm lg:text-base">
            {contactText}
          </Link>
        </div>
        
        {/* Language toggle - always on the right side with margin */}
        <div className="flex items-center ml-3 lg:ml-6 lg:absolute lg:right-6">
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 