import { validateLocale } from '@/app/lib/i18n';
import translations from '@/app/lib/translations.json';

export default async function AboutPage({
  params
}: {
  params: { locale: string }
}) {
  // Get the locale from params and validate it
  const { locale } = await params;
  const validLocale = validateLocale(locale);
  
  // Get translations for the validated locale
  const t = translations[validLocale as keyof typeof translations];

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-12 min-h-screen animate-fade-in">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-12 text-center">{t["bio.page_title"]}</h1>
      
      {/* Biography Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">{t["bio.title"]}</h2>
        
        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-black p-4">
            <p className="font-medium">{t["bio.timeline.1"]}</p>
          </div>
          <div className="border border-black p-4">
            <p className="font-medium">{t["bio.timeline.2"]}</p>
          </div>
          <div className="border border-black p-4">
            <p className="font-medium">{t["bio.timeline.3"]}</p>
          </div>
        </div>
        
        {/* Biography Paragraphs */}
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-800">{t["bio.paragraph.1"]}</p>
          <p className="text-lg leading-relaxed text-gray-800">{t["bio.paragraph.2"]}</p>
          <p className="text-lg leading-relaxed text-gray-800">{t["bio.paragraph.3"]}</p>
          <p className="text-lg leading-relaxed text-gray-800">{t["bio.paragraph.4"]}</p>
          <p className="text-lg leading-relaxed text-gray-800">{t["bio.paragraph.5"]}</p>
        </div>
      </div>
      
      {/* Restoration & Conservation Section */}
      <div>
        <h2 className="text-3xl font-semibold mb-6">{t["restoration.title"]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Restoration */}
          <div className="border border-black p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-4">{t["restoration.section.1.title"]}</h3>
            <p className="text-gray-800">{t["restoration.section.1.content"]}</p>
          </div>
          
          {/* ATC Workshop */}
          <div className="border border-black p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-4">{t["restoration.section.2.title"]}</h3>
            <p className="text-gray-800">{t["restoration.section.2.content"]}</p>
          </div>
          
          {/* Creation */}
          <div className="border border-black p-6 shadow-sm">
            <h3 className="text-xl font-medium mb-4">{t["restoration.section.3.title"]}</h3>
            <p className="text-gray-800">{t["restoration.section.3.content"]}</p>
          </div>
        </div>
      </div>
    </main>
  );
} 