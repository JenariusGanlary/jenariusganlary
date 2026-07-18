import Link from "next/link";
import CategoryTag from "./CategoryTag";
import { CATEGORIES } from "@/lib/categories";
import type { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  const ticker = CATEGORIES.find((c) => c.slug === post.category)?.ticker;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col h-full rounded-xl overflow-hidden bg-surface border border-line hover:border-[#2a2a2e] transition-colors"
    >
      <div className="aspect-video flex items-center justify-center bg-[#161618] shrink-0">
        {post.thumbnail ? (
          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white/15 text-4xl font-bold tracking-tight font-mono">{ticker}</span>
        )}
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <CategoryTag category={post.category} />
        <h2 className="text-lg font-bold mt-3 mb-2 text-foreground leading-snug line-clamp-2">
          {post.title}
        </h2>
        <p className="text-mute text-sm mb-4 leading-relaxed line-clamp-2">
          {post.description}
        </p>
        <p className="text-xs text-mute font-mono mt-auto">{post.date}</p>
      </div>
    </Link>
  );
}