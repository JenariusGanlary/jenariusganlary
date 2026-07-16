import { getAllPosts } from "@/lib/posts";
import CategoryFilter from "@/components/CategoryFilter";
import CategoryTag from "@/components/CategoryTag";
import { CATEGORIES } from "@/lib/categories";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const featuredTicker = featured
    ? CATEGORIES.find((c) => c.slug === featured.category)?.ticker
    : null;

  return (
    <div>
      <h1
        className="text-3xl font-semibold mb-8 text-navy"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Blog
      </h1>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="block mb-12 rounded-xl overflow-hidden border border-hairline hover:border-navy transition-colors bg-white"
        >
          <div
            className="aspect-[21/9] flex items-center justify-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #142433 0%, #1E6F5C 100%)" }}
          >
            {featured.thumbnail ? (
              <img
                src={featured.thumbnail}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className="text-white/25 text-5xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {featuredTicker}
              </span>
            )}
          </div>
          <div className="p-6 md:p-8">
            <CategoryTag category={featured.category} />
            <h2
              className="text-2xl md:text-3xl font-semibold mt-3 mb-2 text-navy"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {featured.title}
            </h2>
            <p className="text-gray-600 mb-2">{featured.description}</p>
            <p
              className="text-xs text-gray-400"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {featured.date}
            </p>
          </div>
        </Link>
      )}

      <CategoryFilter posts={rest} />
    </div>
  );
}