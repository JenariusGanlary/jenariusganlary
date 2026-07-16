import { getAllPosts, getPostBySlug } from "@/lib/posts";
import CategoryTag from "@/components/CategoryTag";
import Link from "next/link";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <article className="max-w-2xl mx-auto py-8">
      <Link
        href="/blog"
        className="text-sm text-gray-500 hover:text-navy mb-8 block"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        ← Back to blog
      </Link>

      <CategoryTag category={post.category} />

      <h1
        className="text-3xl md:text-4xl font-semibold mt-3 mb-3 text-navy leading-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {post.title}
      </h1>

      <p
        className="text-sm text-gray-400 mb-10 pb-8 border-b border-hairline"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {post.date}
      </p>

      <div
        className="prose-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}