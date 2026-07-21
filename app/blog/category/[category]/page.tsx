import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, getCategory } from "@/lib/categories";
import PostCard from "@/components/PostCard";
import { buildPageMetadata, SITE_URL } from "@/lib/metadata";

// Five static topic-hub pages, one per content pillar — real, indexable URLs
// for category-level queries (audit item #7). A future sixth pillar added to
// lib/categories.ts gets its hub page here automatically.

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return buildPageMetadata({
    title: cat.label,
    description: cat.description,
    path: `/blog/category/${cat.slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const posts = getAllPosts().filter((p) => p.category === cat.slug);
  const url = `${SITE_URL}/blog/category/${cat.slug}`;

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.label,
    description: cat.description,
    url,
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
      { "@type": "ListItem", position: 3, name: cat.label, item: url },
    ],
  };

  return (
    <div className="py-8">
      <script
        id="category-collection-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        id="category-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Link
        href="/blog"
        className="text-sm text-mute hover:text-foreground transition mb-8 inline-block font-mono"
      >
        &larr; All articles
      </Link>

      <p aria-hidden="true" className="text-xs font-mono text-accent mb-2">
        {cat.ticker}
      </p>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{cat.label}</h1>
      <p className="text-mute mb-10 max-w-2xl">{cat.description}</p>

      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      ) : (
        <p className="text-mute">
          Nothing published in this category yet — it&apos;s coming.{" "}
          <Link href="/blog" className="text-accent hover:opacity-80 transition">
            Browse all articles
          </Link>{" "}
          in the meantime.
        </p>
      )}
    </div>
  );
}