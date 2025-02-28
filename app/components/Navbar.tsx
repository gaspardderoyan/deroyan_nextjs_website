import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center px-2 sm:px-6 py-4 bg-[#EAE8DA] border-b border-black relative min-h-[50px] sm:min-h-[80px]">
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
          Collection
        </Link>
        <Link href="/about" className="text-gray-800 hover:text-gray-600 transition-colors text-sm sm:text-base">
          A propos
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 