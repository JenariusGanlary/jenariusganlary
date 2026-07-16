import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Jenarius Ganlary — Tech, Finance & Startups for Indie Hackers",
  description: "Personal blog on tech, finance, and startups for indie hackers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-10 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}