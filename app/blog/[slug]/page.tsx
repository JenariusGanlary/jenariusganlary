import { getAllPosts, getPostBySlug } from "@/lib/posts";
import CategoryTag from "@/components/CategoryTag";
import ShareRow from "@/components/ShareRow";
import AuthorBio from "@/components/AuthorBio";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import FAQSection from "@/components/FAQSection";
import Link from "next/link";
import type { Metadata } from "next";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
    twitter: {
      card: post.thumbnail ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  };
}

function estimateReadTime(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const readTime = estimateReadTime(post.content);
  const url = `https://jenariusganlary.com/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: "Jenarius Ganlary",
      url: "https://jenariusganlary.com/about",
    },
    publisher: {
      "@type": "Person",
      name: "Jenarius Ganlary",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(post.thumbnail && { image: `https://jenariusganlary.com${post.thumbnail}` }),
  };

  // Only generated when the post actually has a "Frequently asked questions"
  // section with real Q&A pairs — never fabricated for posts without one.
  const faqJsonLd =
    post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <article className="max-w-2xl mx-auto py-6 md:py-8">
      <script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          id="faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Link href="/blog" className="text-sm text-mute hover:text-foreground transition mb-8 inline-block font-mono">
        &larr; Back to articles
      </Link>

      <div className="inline-flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        <CategoryTag category={post.category} />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold mt-1 mb-3 text-foreground leading-tight">
        {post.title}
      </h1>
      <p className="text-sm text-mute mb-8 pb-8 border-b border-line font-mono">
        {post.date} <span className="mx-2 opacity-40">&middot;</span> {readTime} min read
      </p>

      <TableOfContents items={post.toc} />

      <div className="prose-body" dangerouslySetInnerHTML={{ __html: post.content }} />

      <FAQSection items={post.faq} />

      <ShareRow title={post.title} url={url} />
      <AuthorBio />
      <RelatedPosts currentSlug={post.slug} category={post.category} />

      <div className="mt-8">
        <Link href="/blog" className="text-accent text-sm font-medium hover:opacity-80 transition">
          &larr; Read more articles
        </Link>
      </div>
    </article>
  );
}