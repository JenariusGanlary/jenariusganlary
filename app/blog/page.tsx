import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import CategoryTag from "@/components/CategoryTag";
import { CATEGORIES } from "@/lib/categories";
import { formatDate } from "@/lib/dates";
import CategoryFilterFull from "@/components/CategoryFilterFull";
import Link from "next/link";
import Image from "next/image";
import { buildPageMetadata, SITE_URL } from "@/lib/metadata";

const PAGE_DESCRIPTION =
  "Every article on SaaS, AI tools, indie hacking, developer life, and finance for builders — practical, first-hand notes from building products in public.";

export const metadata: Metadata = buildPageMetadata({
  title: "Articles",
  description: PAGE_DESCRIPTION,
  path: "/blog",
});

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Articles",
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}/blog`,
  isPartOf: {
    "@id": "https://www.jenariusganlary.com/#website",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE_URL}/blog` },
  ],
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const featuredIsSvg = featured?.thumbnail?.endsWith(".svg");

  return (
    <div className="py-8">
      <script
        id="collection-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <h1 className="text-3xl font-bold mb-8 text-foreground">Articles</h1>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="block mb-12 rounded-xl overflow-hidden border border-line bg-surface hover:border-[#2a2a2e] transition-colors"
        >
          <div className="relative aspect-[21/9] bg-[#161618] flex items-center justify-center overflow-hidden">
            {featured.thumbnail ? (
              featuredIsSvg ? (
                <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover" />
              ) : (
                <Image
                  src={featured.thumbnail}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(min-width: 1200px) 1152px, 100vw"
                  className="object-cover"
                />
              )
            ) : (
              <span className="text-white/30 text-4xl font-bold font-mono">
                {CATEGORIES.find((c) => c.slug === featured.category)?.ticker}
              </span>
            )}
          </div>
          <div className="p-6 md:p-8">
            <CategoryTag category={featured.category} />
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-2 text-foreground leading-snug">
              {featured.title}
            </h2>
            <p className="text-mute mb-2">{featured.description}</p>
            <p className="text-xs text-mute font-mono">
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
            </p>
          </div>
        </Link>
      )}

      <CategoryFilterFull posts={rest} />
    </div>
  );
}