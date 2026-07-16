import { getCategory } from "@/lib/categories";

export default function CategoryTag({ category }: { category: string }) {
  const cat = getCategory(category);
  if (!cat) return null;
  return (
    <span
      className={`text-xs font-semibold tracking-wide ${cat.color}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {cat.ticker}
    </span>
  );
}