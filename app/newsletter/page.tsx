import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Newsletter",
  description:
    "Building SaaS, freelancing through Ganlary Labs, and writing about both — straight to your inbox. One email, roughly weekly, no daily noise.",
  path: "/newsletter",
});

const benefits = [
  "One email, roughly weekly — no daily noise",
  "What's actually working (and not) building CreatorBit and freelancing",
  "SaaS, AI, and finance notes before they hit the blog",
  "No spam, unsubscribe in one click",
];

export default function NewsletterPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <div className="animate-fade-up">
        <p className="text-xs font-mono text-mute mb-4">$SUBSCRIBE</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
          Join the newsletter.
        </h1>
        <p className="text-lg text-mute max-w-md mx-auto mb-10">
          Building SaaS, freelancing through Ganlary Labs, and writing about
          both — straight to your inbox.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-8 md:p-10 mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <NewsletterForm />
        <p className="text-xs text-mute mt-2">No spam. Unsubscribe anytime.</p>
      </div>

      <div className="text-left max-w-sm mx-auto space-y-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        {benefits.map((b) => (
          <div key={b} className="flex gap-3 items-start">
            <span className="text-accent mt-0.5">&rarr;</span>
            <p className="text-sm text-mute">{b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}