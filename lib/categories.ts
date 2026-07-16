export const CATEGORIES = [
  { slug: "saas-ai-tools", label: "SaaS & AI Tools", ticker: "$SAAS", color: "text-ledger" },
  { slug: "startups-indie-hacking", label: "Startups & Indie Hacking", ticker: "$INDIE", color: "text-ember" },
  { slug: "tech-dev-life", label: "Tech & Developer Life", ticker: "$DEV", color: "text-navy" },
  { slug: "finance-builders", label: "Finance for Builders", ticker: "$CAP", color: "text-ledger" },
  { slug: "building-in-public", label: "Building in Public", ticker: "$BUILD", color: "text-ember" },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}