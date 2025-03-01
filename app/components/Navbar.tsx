import Image from 'next/image';
import Link from 'next/link';
import { getUIElements } from '@/app/lib/api';

/**
 * Navbar component that displays the site navigation
 * Uses dynamic UI elements fetched at build time
 */
export async function Navbar() {
  // Fetch UI elements at build time
  const uiElements = await getUIElements();
  
  // Use the fetched values or fallback to defaults if API call fails
  const collectionText = uiElements['navbar.collection'] || 'Collection';
  const aboutText = uiElements['navbar.about'] || 'À propos';
  const contactText = uiElements['navbar.contact'] || 'Contact';

  return (
    <nav className="flex items-center px-4 sm:px-6 py-4 bg-[#EAE8DA] border-b border-black relative min-h-[50px] sm:min-h-[80px]">
      {/* Logo on the left */}
      <div className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2">
        <Link href="/">
          <Image
            src="/galerie_logo.png"
            alt="Galerie Logo"
            width={300}
            height={50}
            className="w-[130px] sm:w-[250px] object-contain"
          />
        </Link>
      </div>
      
      {/* Navigation links - right on mobile, centered on larger screens */}
      <div className="flex items-center space-x-4 sm:space-x-8 w-full justify-end sm:justify-center">
        <Link href="/collection" className="text-gray-800 hover:text-gray-600 transition-colors text-sm sm:text-base">
          {collectionText}
        </Link>
        <Link href="/about" className="text-gray-800 hover:text-gray-600 transition-colors text-sm sm:text-base">
          {aboutText}
        </Link>
        <Link href="/contact" className="text-gray-800 hover:text-gray-600 transition-colors text-sm sm:text-base">
          {contactText}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar; 