import { getCategory } from "@/lib/categories";

export default function CategoryTag({ category }: { category: string }) {
  const cat = getCategory(category);
  if (!cat) return null;
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded ${cat.color}`}>
      {cat.label}
    </span>
  );
}