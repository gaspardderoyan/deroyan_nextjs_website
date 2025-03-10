import { getLocalizedTranslations, LocalizedTranslations } from "@/app/lib/UI_api";
import { validateLocale  } from "@/app/lib/i18n";

/**
 * Footer component that displays contact information and copyright details
 * Responsive design: 
 * - On mobile: Single column layout with centered, larger text
 * - On larger screens: Two-column layout with left/right alignment
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
    <footer className="bg-[#EAE8DA] border-t border-black py-6 px-4 sm:px-6 mt-auto">
      <div className="container mx-auto">
        {/* 
          Responsive layout container:
          - Mobile: flex-col (stacked vertically) with centered content
          - Tablet/Desktop: flex-row (horizontal) with space-between
        */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
          {/* Contact information section */}
          <div className="text-center md:text-left">
            {/* Slightly smaller text size for mobile, with responsive scaling for larger screens */}
            <p className="text-xs sm:text-sm md:text-base mb-1">13, rue Drouot 75009 Paris</p>
            <p className="text-xs sm:text-sm md:text-base mb-1">
              Tel: <a href="tel:+33148000785" className="underline decoration-black hover:text-gray-700 transition-colors">01.48.00.07.85</a>
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              E.mail: <a href="mailto:galeriederoyan@gmail.com" className="underline decoration-black hover:text-gray-700 transition-colors">galeriederoyan@gmail.com</a>
            </p>
          </div>
          
          {/* Copyright and credits section */}
          <div className="text-xs sm:text-sm md:text-base text-center md:text-right">
            <p className="mb-1">Deroyan 2025 ©</p>
            <p className="mb-1">{data[validLocale]['footer.rights'].value}</p>
            <p>Conception: Gaspard Deroyan</p>
          </div>
        </div>
      </div>
    </footer>
  );
};