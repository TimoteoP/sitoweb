import type { Metadata } from "next";
import { Geist_Mono, Inter, Roboto } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import Iframes from "@/components/Iframes";
import Navigation from "@/components/ui/Navigation";
import FooterWrapper from "@/components/FooterWrapper";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: 'swap',
});

import { siteConfig } from "../../config/site.config";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.author.name }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${inter.variable} ${roboto.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navigation />
        {children}
        <FooterWrapper />
        
        {/* Cookie Banner and IFrame Management */}
        <CookieBanner />
        <Iframes />
        
        {/* Floating Cookie Preferences Button */}
        <button
          type="button"
          aria-label="Preferenze cookie"
          data-cc="show-preferencesModal"
          className="fixed bottom-4 left-4 z-50 rounded-full px-3 py-2 text-sm shadow-md bg-white/80 backdrop-blur hover:bg-white transition-all duration-200"
          style={{ 
            border: '1px solid #e5e7eb',
            color: '#374151',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          🍪 Preferenze cookie
        </button>
      </body>
    </html>
  );
}
