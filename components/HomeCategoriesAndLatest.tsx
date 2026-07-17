"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import PostCard from "./PostCard";
import type { Post } from "@/lib/posts";

export default function HomeCategoriesAndLatest({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? posts.filter((p) => p.category === active) : posts;

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 py-10 border-t border-line">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
          <button
            onClick={() => setActive(null)}
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
              className={`shrink-0 text-sm px-4 py-2 rounded-full transition-colors ${
                active === cat.slug ? "bg-accent border border-accent text-white" : "border border-line text-foreground/80 hover:border-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-line">
        <h2 className="text-2xl font-bold mb-8 text-foreground">Latest Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 6).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}