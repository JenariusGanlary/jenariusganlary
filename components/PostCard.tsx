import Link from "next/link";
import CategoryTag from "./CategoryTag";
import { CATEGORIES } from "@/lib/categories";
import type { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  const ticker = CATEGORIES.find((c) => c.slug === post.category)?.ticker;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border border-gray-300 rounded-lg overflow-hidden bg-white hover:border-navy hover:shadow-md transition-all"
    >
      <div
        className="aspect-video flex items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #142433 0%, #1E6F5C 100%)" }}
      >
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className="text-white/25 text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {ticker}
          </span>
        )}
      </div>
      <div className="p-6">
        <CategoryTag category={post.category} />
        <h2
          className="text-xl font-semibold mt-3 mb-2 text-navy"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </h2>
        <p className="text-gray-600 mb-3">{post.description}</p>
        <p
          className="text-xs text-gray-400"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {post.date}
        </p>
      </div>
    </Link>
  );
}