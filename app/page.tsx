import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div>
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #1E6F5C, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #D98D1B, transparent 70%)" }}
        />

        <div className="relative grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full border border-hairline text-gray-500 mb-5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              PERSONAL BLOG · EST. 2026
            </span>

            <div
              className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 mb-6 text-xs font-semibold tracking-wider"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {CATEGORIES.map((cat) => (
                <span key={cat.slug} className={cat.color}>
                  {cat.ticker}
                </span>
              ))}
            </div>

            <h1
              className="text-4xl md:text-5xl font-semibold mb-4 text-navy leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Tech, Finance & Startups — for Indie Hackers
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
              Practical notes on building products, understanding money, and
              shipping as a solo founder.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-6">
              <Link
                href="/blog"
                className="inline-block bg-ember text-navy px-6 py-3 rounded-md font-semibold hover:opacity-90"
              >
                Read the blog
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-500 hover:text-navy"
              >
                About me →
              </Link>
            </div>
          </div>

          <div className="hidden md:block rounded-xl border border-hairline bg-white shadow-sm overflow-hidden">
            <div className="flex gap-1.5 px-4 py-3 border-b border-hairline bg-gray-50">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div
              className="p-6 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <p className="text-gray-400">$ whoami</p>
              <p className="text-navy mb-4">jenarius — builder, writer, indie hacker</p>
              <p className="text-gray-400">$ cat mission.md</p>
              <p className="text-ledger mb-4">Tech. Finance. Startups.</p>
              <p className="text-ledger mb-4">Shipped in public, one post at a time.</p>
              <p className="text-gray-400">$ _</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <h2
          className="text-2xl font-semibold mb-6 text-navy"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Latest posts
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getAllPosts().slice(0, 6).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <Newsletter />

      <div className="border-t border-hairline" />
    </div>
  );
}