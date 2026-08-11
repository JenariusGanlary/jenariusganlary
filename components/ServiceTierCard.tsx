import Link from "next/link";
import type { ServiceTier } from "@/lib/services";

export default function ServiceTierCard({ tier }: { tier: ServiceTier }) {
  return (
    <div className="flex flex-col rounded-2xl border-2 border-line bg-surface p-6 md:p-7 hover:border-accent transition-colors">
      <p className="text-xs font-mono text-accent tracking-wide mb-4">
        TIER {tier.tier}
      </p>

      <h3
        className="text-xl font-bold text-foreground mb-2"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {tier.name}
      </h3>

      <p className="text-mute text-sm leading-relaxed mb-5">
        {tier.description}
      </p>

      <p className="font-mono text-2xl font-bold text-foreground mb-6">
        {tier.price}
        <span className="text-sm font-normal text-mute ml-1">onwards</span>
      </p>

      <ul className="flex flex-col gap-2.5 mb-7 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-foreground/85">
            <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">
              &#10003;
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href="#book-a-call"
        className="text-center bg-accent text-white text-sm font-semibold px-5 py-3 rounded-md hover:opacity-90 transition"
      >
        {tier.cta}
      </Link>
    </div>
  );
}