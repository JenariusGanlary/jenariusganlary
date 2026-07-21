import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import PostCard from "./PostCard";
import type { Post } from "@/lib/posts";

// The category chips are real links to the five topic-hub pages
// (/blog/category/<slug>) rather than a client-side filter — crawlers follow
// them, users get shareable URLs, and this component (and with it the whole
// /blog post grid) stays fully server-rendered.

export default function CategoryFilterFull({ posts }: { posts: Post[] }) {
  return (
    <div>
      <nav
        aria-label="Article categories"
        className="flex gap-3 overflow-x-auto pb-2 mb-10 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap"
      >
        <span
          aria-current="page"
          className="shrink-0 text-sm px-4 py-2 rounded-full bg-accent border border-accent text-white"
        >
          All
        </span>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className="shrink-0 text-sm px-4 py-2 rounded-full border border-line text-foreground/80 hover:border-accent transition-colors"
          >
            {cat.label}
          </Link>
        ))}
      </nav>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </div>
  );
}