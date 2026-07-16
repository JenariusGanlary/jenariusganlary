import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Tech, Finance & Startups — for Indie Hackers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Practical notes on building products, understanding money, and
          shipping as a solo founder.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium"
        >
          Read the blog
        </Link>
      </section>
    </div>
  );
}