import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "You're In",
  description: "Your Solopreneur Starter Kit is on its way to your inbox.",
  path: "/starter-kit/thanks",
});

const nextSteps = [
  { label: "Read my story", href: "/blog/it-sector-to-rural-livelihoods-mindset-shift" },
  { label: "See the tools I actually use", href: "/resources" },
  { label: "Read the latest articles", href: "/blog" },
];

export default function StarterKitThanksPage() {
  return (
    <div className="max-w-xl mx-auto py-16 text-center">
      <div className="animate-fade-up">
        <p className="text-xs font-mono text-mute mb-4">$STARTER_KIT</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
          You&apos;re in.
        </h1>
        <p className="text-lg text-mute max-w-md mx-auto mb-12">
          Your Solopreneur Starter Kit is on its way to your inbox.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        {nextSteps.map((step) => (
          <Link
            key={step.href}
            href={step.href}
            className="rounded-md border border-line px-5 py-3 text-sm font-medium text-foreground hover:border-accent transition-colors"
          >
            {step.label}
          </Link>
        ))}
      </div>
    </div>
  );
}