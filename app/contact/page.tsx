import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Get in touch about SaaS MVP builds, AI feature integration, freelance work through Ganlary Labs, or anything on the blog — every message read personally.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12 animate-fade-up">
        <div className="inline-flex items-center gap-2 mb-5 text-xs font-mono text-mute border border-line rounded-full px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          AVAILABLE FOR FREELANCE WORK
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
          Let&apos;s build<br />something.
        </h1>
        <p className="text-lg text-mute max-w-lg">
          Whether it&apos;s a SaaS MVP, a freelance project through Ganlary Labs,
          or just swapping notes on indie hacking — I read every message
          myself.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_0.75fr] gap-10">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <ContactForm />
        </div>

        <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-surface border border-line rounded-xl p-6">
            <p className="text-xs font-mono text-mute mb-4">WHAT I TAKE ON</p>
            <ul className="space-y-3 text-sm text-foreground/90">
              <li className="flex gap-2"><span className="text-accent">→</span> SaaS MVP builds</li>
              <li className="flex gap-2"><span className="text-accent">→</span> AI feature integration</li>
              <li className="flex gap-2"><span className="text-accent">→</span> Small business websites</li>
              <li className="flex gap-2"><span className="text-accent">→</span> Sponsorships &amp; collabs</li>
            </ul>
          </div>

          <div className="bg-surface border border-line rounded-xl p-6">
            <p className="text-xs font-mono text-mute mb-2">PREFER EMAIL?</p>
            <a href="mailto:hello@jenariusganlary.com" className="text-accent font-semibold hover:opacity-80 transition break-all">
              hello@jenariusganlary.com
            </a>
          </div>

          <div className="bg-surface border border-line rounded-xl p-6">
            <p className="text-xs font-mono text-mute mb-2">RESPONSE TIME</p>
            <p className="text-sm text-foreground/90">Usually within a day, wherever in the world you&apos;re writing from.</p>
          </div>
        </div>
      </div>
    </div>
  );
}