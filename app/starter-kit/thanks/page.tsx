import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "You're In",
  description: "Your Solopreneur Starter Kit is on its way to your inbox.",
  path: "/starter-kit/thanks",
});

const nextSteps = [
  {
    label: "Read my story",
    desc: "Why I actually do any of this",
    href: "/blog/it-sector-to-rural-livelihoods-mindset-shift",
  },
  {
    label: "See the tools I actually use",
    desc: "No sponsored fluff, just my stack",
    href: "/resources",
  },
  {
    label: "Read the latest articles",
    desc: "SaaS, indie hacking, and building in public",
    href: "/blog",
  },
];

export default function StarterKitThanksPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 text-center">
      <div className="relative animate-fade-up">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-72 h-72 pointer-events-none opacity-30 dark:opacity-20"
          style={{ background: "radial-gradient(circle, #2B6FFF 0%, transparent 70%)" }}
        />
        <div className="relative">
          <span className="inline-block text-[10px] font-mono uppercase tracking-wide text-accent bg-accent/10 px-3 py-1 rounded-full mb-5">
            Subscribed
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-5">
            You&apos;re in.
          </h1>
          <p className="text-lg text-mute max-w-md mx-auto mb-14">
            Your Solopreneur Starter Kit is on its way to your inbox.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        {nextSteps.map((step) => (
          <Link
            key={step.href}
            href={step.href}
            className="rounded-xl bg-surface border-2 border-line p-5 text-left hover:border-accent transition-all shadow-sm hover:shadow-md"
          >
            <p className="font-semibold text-sm text-foreground mb-1">{step.label}</p>
            <p className="text-xs text-mute leading-relaxed">{step.desc}</p>
            <span className="inline-block mt-3 text-xs text-accent font-semibold">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}