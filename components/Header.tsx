import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-hairline bg-background">
      <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold text-navy"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Jenarius Ganlary
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-foreground">
          <Link href="/" className="hover:text-ledger">Home</Link>
          <Link href="/blog" className="hover:text-ledger">Blog</Link>
          <Link href="/about" className="hover:text-ledger">About</Link>
          <Link href="/contact" className="hover:text-ledger">Contact</Link>
        </nav>
      </div>
    </header>
  );
}