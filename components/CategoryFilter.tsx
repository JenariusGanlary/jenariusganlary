"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import PostCard from "./PostCard";
import type { Post } from "@/lib/posts";

export default function CategoryFilter({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? posts.filter((p) => p.category === active) : posts;

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
        <button
          onClick={() => setActive(null)}
          className={`shrink-0 text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
            active === null
              ? "bg-navy text-white border-navy"
              : "border-hairline text-gray-600 hover:border-navy"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={`shrink-0 text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
              active === cat.slug
                ? "bg-navy text-white border-navy"
                : "border-hairline text-gray-600 hover:border-navy"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}