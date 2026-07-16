import Link from "next/link";
import CategoryTag from "./CategoryTag";
import type { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border border-hairline rounded-lg p-6 hover:border-navy transition-colors bg-white"
    >
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
    </Link>
  );
}