import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#EAE8DA] border-b border-black">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Image
          src="/galerie_logo.png"
          alt="Galerie Logo"
          width={300}
          height={50}
          className="object-contain"
        />
      </div>
      
      {/* Navigation links on the right */}
      <div className="flex items-center space-x-8">
        <Link href="#" className="text-gray-800 hover:text-gray-600 transition-colors">
          Accueil
        </Link>
        <Link href="#" className="text-gray-800 hover:text-gray-600 transition-colors">
          Collections
        </Link>
        <Link href="#" className="text-gray-800 hover:text-gray-600 transition-colors">
          Contact
        </Link>
        <Link href="#" className="text-gray-800 hover:text-gray-600 transition-colors">
          Ma sélection
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 