import { fetchItem, getFullImageUrl } from "../lib/api";
import { validateLocale } from "../lib/i18n";
import translations from "../lib/translations.json";
import Image from "next/image";
import Link from "next/link";
/**
 * Home page component that displays content based on the current locale
 * @param params - Contains the locale from the dynamic route segment
 */
export default async function Home({
  params
}: {
  params: { locale: string }
}) {
  const { locale } = await params;
  const validLocale = validateLocale(locale);
  const response = await fetchItem('damien_hirst_1');
  const rawImageUrl = response.data?.[0]?.images?.[0]?.formats?.large?.url;

  if (!rawImageUrl) {
    throw new Error("Image URL is undefined");
  }

  const imageUrl = getFullImageUrl(rawImageUrl);
  // Get translations for the validated locale
  const t = translations[validLocale as keyof typeof translations];

return (
  <main className="max-w-[1400px] mx-auto px-6 py-12 min-h-screen animate-fade-in">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
        {/* Left side - Image */}
        <div className="lg:w-1/2 relative">
          <div className="aspect-square overflow-hidden rounded-full">
            <Image
              src={imageUrl}
              alt="Damien Hirst"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Right side - Content */}
        <div className="lg:w-1/2 space-y-8">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-800">{t["home.1"]}</p>
            <p className="text-lg leading-relaxed text-gray-800">{t["home.2"]}</p>
            <p className="text-lg leading-relaxed text-gray-800">{t["home.3"]}</p>
          </div>

          <Link 
            href={`/${validLocale}/collection`}
            className="inline-block px-8 py-3 bg-[#1a1a1a] text-white rounded hover:bg-[#333333] transition-colors duration-300"
          >
            {validLocale === 'en' ? 'Explore Collection' : 'Explorer la Collection'}
          </Link>
        </div>
      </div>

      {/* Opening Hours Section */}
      <div className="border-t border-gray-200 pt-16">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-light uppercase tracking-wider mb-8">{t["home.hours.1"]}</h2>
          <div className="space-y-3 text-lg text-gray-800">
            <p>{t["home.hours.2"]}</p>
            <p>{t["home.hours.3"]} - {t["home.hours.4"]}</p>
            <p className="italic">{t["home.hours.5"]}</p>
          </div>
        </div>
      </div>
  </main>
);
}
