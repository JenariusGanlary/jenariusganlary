import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-extrabold text-foreground mb-3">Jenarius Ganlary</p>
          <p className="text-mute">Building in public.</p>
        </div>
        <div>
          <p className="font-semibold text-foreground/80 mb-3">Site</p>
          <div className="flex flex-col gap-2 text-mute">
            <Link href="/about" className="hover:text-foreground transition">About</Link>
            <Link href="/contact" className="hover:text-foreground transition">Contact</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-foreground/80 mb-3">Resources</p>
          <div className="flex flex-col gap-2 text-mute">
            <Link href="/blog" className="hover:text-foreground transition">Articles</Link>
            <Link href="/resources" className="hover:text-foreground transition">Resources</Link>
            <Link href="/newsletter" className="hover:text-foreground transition">Newsletter</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-foreground/80 mb-3">Legal</p>
          <div className="flex flex-col gap-2 text-mute">
            <Link href="/privacy-policy" className="hover:text-foreground transition">Privacy Policy</Link>
            <Link href="/affiliate-disclosure" className="hover:text-foreground transition">Affiliate Disclosure</Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-line text-xs text-mute flex flex-col md:flex-row justify-between gap-2">
        <p>&copy; {new Date().getFullYear()} Jenarius Ganlary. All rights reserved.</p>
        <p className="font-mono">jenariusganlary.com</p>
      </div>
    </footer>
  );
}