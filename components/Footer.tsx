import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/JenariusGanlary" },
  { label: "X", href: "https://x.com/jenariusdev" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jenarius-ganlary" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <p className="font-extrabold text-foreground mb-3">Jenarius Ganlary</p>
          <p className="text-mute mb-3">Building in public.</p>
          <div className="flex gap-4 text-mute">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition"
              >
                {social.label}
              </Link>
            ))}
          </div>
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
            <Link href="/terms-and-conditions" className="hover:text-foreground transition">Terms & Conditions</Link>
            <Link href="/cookie-policy" className="hover:text-foreground transition">Cookie Policy</Link>
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