import { Libre_Baskerville } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import translations from '@/app/lib/translations.json';
import { validateLocale } from '@/app/lib/i18n';

// Load Libre Baskerville font
const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata({ params }: { params: { locale: string } }) {
  // Get the locale from params and validate it using the i18n utility
  const { locale } = await params;
  const validLocale = validateLocale(locale);
  
  // Get translations for the validated locale
  const t = translations[validLocale as keyof typeof translations];
  
  return {
    title: t["meta.title"],
    description: t["meta.description"],
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Await the params object before destructuring
  const awaitedParams = await params;
  const { locale } = awaitedParams;
  
  // Validate locale using the i18n utility
  const validLocale = validateLocale(locale);
  
  return (
    <html lang={validLocale}>
      <body className={`${libreBaskerville.className} antialiased bg-[#EAE8DA] min-h-screen flex flex-col`}>
        <Navbar params={{ locale: validLocale }} />
        <main className="bg-[#EAE8DA] flex-grow flex flex-col">
          {children}
        </main>
        <Footer params={{ locale: validLocale }} />
      </body>
    </html>
  );
}
