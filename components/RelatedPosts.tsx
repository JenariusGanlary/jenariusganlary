import Link from "next/link";
import { getAllPosts, type Post } from "@/lib/posts";
import CategoryTag from "./CategoryTag";

export default function RelatedPosts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const allPosts = getAllPosts();
  const sameCategory = allPosts.filter((p) => p.category === category && p.slug !== currentSlug);
  const others = allPosts.filter((p) => p.category !== category && p.slug !== currentSlug);
  const related: Post[] = [...sameCategory, ...others].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-line">
      <p className="text-xs font-mono text-mute mb-5">KEEP READING</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-xl bg-surface border border-line p-4 hover:border-accent transition-colors"
          >
            <CategoryTag category={post.category} />
            <p className="font-semibold text-sm text-foreground mt-2 leading-snug line-clamp-2">
              {post.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}