import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} Jenarius Ganlary. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>
        </div>
      </div>
    </footer>
  );
}