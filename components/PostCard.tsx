import Link from "next/link";
import CategoryTag from "./CategoryTag";
import type { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block border-b border-gray-200 py-6">
      <CategoryTag category={post.category} />
      <h2 className="text-xl font-bold mt-2 mb-1">{post.title}</h2>
      <p className="text-gray-600 mb-2">{post.description}</p>
      <p className="text-sm text-gray-400">{post.date}</p>
    </Link>
  );
}