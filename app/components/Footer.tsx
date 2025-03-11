import { getLocalizedTranslations, LocalizedTranslations } from "@/app/lib/UI_api";
import { validateLocale  } from "@/app/lib/i18n";

/**
 * Footer component that displays contact information and copyright details
 * Responsive design: 
 * - Two-column layout on all screen sizes (mobile, tablet, desktop)
 * - Adjusted text sizes and spacing for different screen sizes
 */
export default async function Footer({
  params
}: {
  params: { locale: string }
}) {  
  // Fetch the UI elements text for localization
  const data: LocalizedTranslations = await getLocalizedTranslations();
  const { locale } = params;

  // Ensure we use a valid locale for text content
  const validLocale = validateLocale(locale);

  return (
    <footer className="bg-[#EAE8DA] border-t border-black py-3 px-4 sm:px-6 mt-auto">
      <div className="container mx-auto">
        {/* 
          Responsive layout container:
          - Two-column layout on all screen sizes with space-between
          - Adjusted alignment and spacing for different screen sizes
        */}
        <div className="flex flex-row justify-between items-start gap-4 sm:gap-6">
          {/* Contact information section */}
          <div className="text-left">
            {/* Slightly smaller text size for mobile, with responsive scaling for larger screens */}
            <p className="text-xs sm:text-sm md:text-base mb-1">13, rue Drouot 75009 Paris</p>
            <p className="text-xs sm:text-sm md:text-base mb-1">
              <a href="tel:+33148000785" className="underline decoration-black hover:text-gray-700 transition-colors">01.48.00.07.85</a>
            </p>
            <p className="text-xs sm:text-sm md:text-base">
               <a href="mailto:galeriederoyan@gmail.com" className="underline decoration-black hover:text-gray-700 transition-colors">galeriederoyan@gmail.com</a>
            </p>
          </div>
          
          {/* Copyright and credits section */}
          <div className="text-xs sm:text-sm md:text-base text-right">
            <p className="mb-1">Deroyan 2025 ©</p>
            <p className="mb-1">{data[validLocale]['footer.rights'].value}</p>
            <p className="mb-1">Gaspard Deroyan</p>
          </div>
        </div>
      </div>
    </footer>
  );
};