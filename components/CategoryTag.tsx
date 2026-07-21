import { getCategory } from "@/lib/categories";

export default function CategoryTag({ category }: { category: string }) {
  const cat = getCategory(category);
  if (!cat) return null;
  // aria-hidden: tickers like "$SAAS" are visual branding — to a screen reader
  // they're just noise announced before every card title, so they're marked
  // decorative (per the accessibility audit).
  return (
    <span aria-hidden="true" className="text-xs font-semibold tracking-wide font-mono text-accent">
      {cat.ticker}
    </span>
  );
}