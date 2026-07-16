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
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
        <button
          onClick={() => setActive(null)}
          className={`shrink-0 text-sm font-medium px-3 py-1.5 rounded-full border ${
            active === null ? "bg-black text-white border-black" : "border-gray-300"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={`shrink-0 text-sm font-medium px-3 py-1.5 rounded-full border ${
              active === cat.slug ? "bg-black text-white border-black" : "border-gray-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div>
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}