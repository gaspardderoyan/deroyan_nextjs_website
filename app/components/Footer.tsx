import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#EAE8DA] border-t border-black py-6 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">Galerie Deroyan - 13, rue Drouot 75009 Paris</p>
            <p className="text-sm">Tél. : 01.48.00.07.85</p>
            <p className="text-sm">E.mail : galeriederoyan@gmail.com</p>
          </div>
          <div className="text-sm text-center md:text-right">
            <p>Deroyan 2025 © Tous droits réservés</p>
            <p>Conception: Gaspard Deroyan</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 