import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";
import { ThemeProvider } from "next-themes";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://jenariusganlary.com"),
  title: {
    default: "Jenarius Ganlary — Tech, Finance & Startups for Indie Hackers",
    template: "%s | Jenarius Ganlary",
  },
  description: "Personal blog on tech, finance, and startups for indie hackers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ReadingProgress />
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-10 min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}