"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-5 md:px-6 py-3.5 md:py-4 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-base md:text-lg tracking-tight text-foreground">
          Jenarius Ganlary
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-foreground/80">
          <Link href="/" className="hover:text-foreground transition">Home</Link>
          <Link href="/blog" className="hover:text-foreground transition">Articles</Link>
          <Link href="/newsletter" className="hover:text-foreground transition">Newsletter</Link>
          <Link href="/about" className="hover:text-foreground transition">About</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/blog"
            className="bg-accent text-white text-[13px] font-semibold px-4 py-2 rounded-md hover:opacity-90 transition"
          >
            Read Articles
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="text-foreground p-1">
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line px-5 py-5 flex flex-col gap-4 text-[15px] font-medium bg-background">
          <Link href="/" onClick={() => setOpen(false)} className="text-foreground/80 hover:text-foreground transition">Home</Link>
          <Link href="/blog" onClick={() => setOpen(false)} className="text-foreground/80 hover:text-foreground transition">Articles</Link>
          <Link href="/newsletter" onClick={() => setOpen(false)} className="text-foreground/80 hover:text-foreground transition">Newsletter</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="text-foreground/80 hover:text-foreground transition">About</Link>
          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="bg-accent text-white text-sm font-semibold px-4 py-2.5 rounded-md text-center mt-2"
          >
            Read Articles
          </Link>
        </div>
      )}
    </header>
  );
}