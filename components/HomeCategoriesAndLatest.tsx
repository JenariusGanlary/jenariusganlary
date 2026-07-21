"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import PostCard from "./PostCard";
import type { Post } from "@/lib/posts";

// The homepage's Featured section already shows the 4 newest posts, so when no
// category filter is active, "Latest Articles" starts from the 5th post instead
// of repeating the same four. When a filter IS active, it shows all posts in
// that category — filtering should never hide the newest posts.
const POSTS_SHOWN_IN_FEATURED = 4;

export default function HomeCategoriesAndLatest({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active
    ? posts.filter((p) => p.category === active)
    : posts.slice(POSTS_SHOWN_IN_FEATURED);

  return (
    <>
      <section className="max-w-6xl mx-auto px-5 md:px-6 py-10 border-t border-line">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap">
          <button
            onClick={() => setActive(null)}
            aria-pressed={active === null}
            className={`shrink-0 text-sm px-4 py-2 rounded-full transition-colors ${
              active === null ? "bg-accent border border-accent text-white" : "border border-line text-foreground/80 hover:border-accent"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActive(cat.slug)}
              aria-pressed={active === cat.slug}
              className={`shrink-0 text-sm px-4 py-2 rounded-full transition-colors ${
                active === cat.slug ? "bg-accent border border-accent text-white" : "border border-line text-foreground/80 hover:border-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-16 border-t border-line">
        <h2 className="text-2xl font-bold mb-6 md:mb-8 text-foreground">Latest Articles</h2>
        <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.slice(0, 6).map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}