import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
// Load Libre Baskerville font
const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Galerie Deroyan",
  // TODO: make this based on the locale
  description: "Galerie Deroyan, une galerie de tapis et textiles d'art ancien.",
};

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body className={`${libreBaskerville.className} antialiased bg-[#EAE8DA] min-h-screen`}>
        <Navbar params={{ locale }} />
        <main className="bg-[#EAE8DA]">
          {children}
        </main>
        <Footer params={{ locale }} />
      </body>
    </html>
  );
}
