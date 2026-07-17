import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-lg tracking-tight text-foreground">
          Jenarius Ganlary
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-foreground/80">
          <Link href="/" className="hover:text-foreground transition">Home</Link>
          <Link href="/blog" className="hover:text-foreground transition">Articles</Link>
          <Link href="/newsletter" className="hover:text-foreground transition">Newsletter</Link>
          <Link href="/about" className="hover:text-foreground transition">About</Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/blog"
            className="bg-accent text-white text-[13px] font-semibold px-4 py-2 rounded-md hover:opacity-90 transition"
          >
            Read Articles
          </Link>
        </div>
      </div>
    </header>
  );
}