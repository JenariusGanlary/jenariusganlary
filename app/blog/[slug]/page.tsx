import { getAllPosts, getPostBySlug } from "@/lib/posts";
import CategoryTag from "@/components/CategoryTag";

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
    <article className="max-w-2xl mx-auto">
      <CategoryTag category={post.category} />
      <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-8">{post.date}</p>
      <div
        className="prose-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}