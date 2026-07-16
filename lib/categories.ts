export const CATEGORIES = [
  { slug: "saas-ai-tools", label: "SaaS & AI Tools", color: "bg-blue-100 text-blue-800" },
  { slug: "startups-indie-hacking", label: "Startups & Indie Hacking", color: "bg-purple-100 text-purple-800" },
  { slug: "tech-dev-life", label: "Tech & Developer Life", color: "bg-green-100 text-green-800" },
  { slug: "finance-builders", label: "Finance for Builders", color: "bg-amber-100 text-amber-800" },
  { slug: "building-in-public", label: "Building in Public", color: "bg-rose-100 text-rose-800" },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}