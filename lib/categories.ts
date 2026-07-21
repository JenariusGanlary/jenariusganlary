export const CATEGORIES = [
  {
    slug: "saas-ai-tools",
    label: "SaaS & AI Tools",
    ticker: "$SAAS",
    color: "text-ledger",
    description:
      "Hands-on reviews and breakdowns of SaaS products and AI tools — what they actually do, what they cost, and whether they earn a place in a builder's stack.",
  },
  {
    slug: "startups-indie-hacking",
    label: "Startups & Indie Hacking",
    ticker: "$INDIE",
    color: "text-ember",
    description:
      "Notes on starting up without permission — funding paths, growth stories, and the practical mechanics of building small products that make real money.",
  },
  {
    slug: "tech-dev-life",
    label: "Tech & Developer Life",
    ticker: "$DEV",
    color: "text-navy",
    description:
      "The working life of a developer — stack choices, tooling comparisons, and honest write-ups of what it's actually like to build software for a living.",
  },
  {
    slug: "finance-builders",
    label: "Finance for Builders",
    ticker: "$CAP",
    color: "text-ledger",
    description:
      "Money math for people who build — SaaS metrics, pricing decisions, runway calculations, and the financial discipline that keeps indie products alive.",
  },
  {
    slug: "building-in-public",
    label: "Building in Public",
    ticker: "$BUILD",
    color: "text-ember",
    description:
      "The unfiltered journey of building CreatorBit and Ganlary Labs in public — real progress, real setbacks, and what each one teaches along the way.",
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}