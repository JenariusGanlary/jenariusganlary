import type { TocItem } from "@/lib/posts";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav className="rounded-xl border border-line bg-surface p-5 mb-10">
      <p className="text-xs font-mono text-mute mb-3">ON THIS PAGE</p>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
            <a href={`#${item.id}`} className="text-foreground/80 hover:text-accent transition-colors">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}