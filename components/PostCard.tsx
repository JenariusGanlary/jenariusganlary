import Link from "next/link";
import Image from "next/image";
import CategoryTag from "./CategoryTag";
import { CATEGORIES } from "@/lib/categories";
import type { Post } from "@/lib/posts";

export default function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const ticker = CATEGORIES.find((c) => c.slug === post.category)?.ticker;
  const isSvg = post.thumbnail?.endsWith(".svg");

  return (
    <div className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col h-full rounded-xl overflow-hidden bg-surface border border-line hover:border-accent hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
      >
        {/* The thumbnail is decorative here: the card's visible title sits right
            below it inside the same link, so the image gets an empty alt and the
            fallback ticker is aria-hidden — otherwise screen readers announce
            the title (or ticker) twice per card. */}
        <div className="relative aspect-video flex items-center justify-center bg-[#161618] shrink-0">
          {post.thumbnail ? (
            isSvg ? (
              <img src={post.thumbnail} alt="" className="w-full h-full object-cover" />
            ) : (
              <Image
                src={post.thumbnail}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            )
          ) : (
            <span aria-hidden="true" className="text-white/30 text-4xl font-bold tracking-tight font-mono">
              {ticker}
            </span>
          )}
        </div>
        <div className="p-5 md:p-6 flex flex-col flex-1">
          <CategoryTag category={post.category} />
          <h3 className="text-lg font-bold mt-3 mb-2 text-foreground leading-snug line-clamp-2">
            {post.title}
          </h3>
          <p className="text-mute text-sm mb-4 leading-relaxed line-clamp-2">
            {post.description}
          </p>
          <p className="text-xs text-mute font-mono mt-auto">{post.date}</p>
        </div>
      </Link>
    </div>
  );
}