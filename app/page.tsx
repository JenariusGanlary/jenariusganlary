import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  return (
    <div>
      <section className="py-16 md:py-24 text-center">
        <div
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-6 text-xs font-semibold tracking-wider"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {CATEGORIES.map((cat) => (
            <span key={cat.slug} className={cat.color}>
              {cat.ticker}
            </span>
          ))}
        </div>

        <h1
          className="text-4xl md:text-5xl font-semibold mb-4 text-navy"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Tech, Finance & Startups — for Indie Hackers
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Practical notes on building products, understanding money, and
          shipping as a solo founder.
        </p>

        <Link
          href="/blog"
          className="inline-block bg-ember text-navy px-6 py-3 rounded-md font-semibold hover:opacity-90"
        >
          Read the blog
        </Link>
      </section>

      <section className="py-14">
        <h2
          className="text-2xl font-semibold mb-6 text-navy"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Latest posts
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {getAllPosts().slice(0, 4).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <div className="border-t border-hairline" />
    </div>
  );
}