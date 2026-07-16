import { getAllPosts } from "@/lib/posts";
import CategoryFilter from "@/components/CategoryFilter";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <CategoryFilter posts={posts} />
    </div>
  );
}