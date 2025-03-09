import { getLocalizedTranslations, LocalizedTranslations } from "@/app/lib/UI_api";
import { validateLocale  } from "@/app/lib/i18n";

export default async function Footer({
  params
}: {
  params: { locale: string }
}) {  
  // fetch the UI elements text
  const data: LocalizedTranslations = await getLocalizedTranslations();
  const { locale } = params;

  // ensure we use a valid locale
  const validLocale = validateLocale(locale);

  return (
    <footer className="bg-[#EAE8DA] border-t border-black py-6 px-4 sm:px-6 ">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-start">
          <div>
            <p className="text-[8px] xs:text-xs sm:text-sm">13, rue Drouot 75009 Paris</p>
            <p className="text-[8px] xs:text-xs sm:text-sm">
              Tel: <a href="tel:+33148000785" className="underline decoration-black">01.48.00.07.85</a>
            </p>
            <p className="text-[8px] xs:text-xs sm:text-sm">
              E.mail : <a href="mailto:galeriederoyan@gmail.com" className="underline decoration-black">galeriederoyan@gmail.com</a>
            </p>
          </div>
          <div className="text-[8px] xs:text-xs sm:text-sm text-right">
            <p>Deroyan 2025 ©</p>
            <p>{data[validLocale]['footer.rights'].value}</p>
            <p>Conception: Gaspard Deroyan</p>
          </div>
        </div>
      </div>
    </footer>
  );
};