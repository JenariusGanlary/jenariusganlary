import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import StarterKitForm from "@/components/StarterKitForm";

export const metadata: Metadata = buildPageMetadata({
  title: "Solopreneur Starter Kit",
  description:
    "Get the free Solopreneur Starter Kit — a practical guide to finding an idea, validating it, building your first product, and figuring out how to monetize it.",
  path: "/starter-kit",
});

const benefits = [
  "Find an idea worth building, without months of analysis paralysis",
  "Validate it before writing a line of code",
  "Ship a first version without over-engineering it",
  "Turn it into actual income",
];

export default function StarterKitPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <div className="animate-fade-up">
        <p className="text-xs font-mono text-mute mb-4">$STARTER_KIT</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
          Build Something of Your Own.
        </h1>
        <p className="text-lg text-mute max-w-md mx-auto mb-10">
          Get the free Solopreneur Starter Kit — a practical guide to finding
          an idea, validating it, building your first product, and figuring
          out how to monetize it.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-8 md:p-10 mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <StarterKitForm />
        <p className="text-xs text-mute mt-3">Free. No spam. Unsubscribe anytime.</p>
      </div>

      <div className="text-left max-w-sm mx-auto space-y-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        {benefits.map((benefit) => (
          <div key={benefit} className="flex gap-3 items-start">
            <span className="text-accent mt-0.5">&rarr;</span>
            <p className="text-sm text-mute">{benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}