import { getUIElements } from "../lib/api";

const Footer = async () => {
  // fetch the UI elements text
  const UIElementsFrFooter = await getUIElements('fr', 'footer');
  return (
    <footer className="bg-[#EAE8DA] border-t border-black py-6 px-4 sm:px-6 ">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-start">
          <div>
            <p className="text-[8px] xs:text-xs sm:text-sm">13, rue Drouot 75009 Paris</p>
            <p className="text-[8px] xs:text-xs sm:text-sm">
              {UIElementsFrFooter.get('footer.tel')}. : <a href="tel:+33148000785" className="underline decoration-black">01.48.00.07.85</a>
            </p>
            <p className="text-[8px] xs:text-xs sm:text-sm">
              E.mail : <a href="mailto:galeriederoyan@gmail.com" className="underline decoration-black">galeriederoyan@gmail.com</a>
            </p>
          </div>
          <div className="text-[8px] xs:text-xs sm:text-sm text-right">
            <p>Deroyan 2025 ©</p>
            <p>{UIElementsFrFooter.get('footer.rights')}</p>
            <p>Conception: Gaspard Deroyan</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 