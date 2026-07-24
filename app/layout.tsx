import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import { ThemeProvider } from "next-themes";
import {
  buildPageMetadata,
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
} from "@/lib/metadata";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildPageMetadata({ description: SITE_DESCRIPTION, path: "/" }),
  // The template still applies to any page that hasn't been migrated to
  // buildPageMetadata() yet — migrated pages use { absolute } and skip it.
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
};

// Site-wide structured data (GEO/SEO Phase 1).
// The full Person entity (bio, skills, social links) lives on app/about/page.tsx
// as the single source of truth — this WebSite schema just points to it by
// @id rather than repeating a second, slightly-different copy of the same
// person on every page.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.jenariusganlary.com/#website",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@id": "https://www.jenariusganlary.com/#person",
  },
  inLanguage: "en-US",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <AnalyticsScripts />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ReadingProgress />
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-10 min-h-screen">{children}</main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}