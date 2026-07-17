import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import CategoryTag from "@/components/CategoryTag";
import TypewriterRoles from "@/components/TypewriterRoles";
import HeroHeadline from "@/components/HeroHeadline";
import HomeCategoriesAndLatest from "@/components/HomeCategoriesAndLatest";

export default function Home() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const supporting = rest.slice(0, 3);

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 mb-7 text-xs text-mute">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <TypewriterRoles />
          </div>
          <HeroHeadline />
          <p className="text-lg text-mute max-w-md mb-9 leading-relaxed">
            Helping developers and founders build better products.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog" className="bg-accent text-white px-5 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition">
              Read Articles
            </Link>
            <Link href="/newsletter" className="border border-line text-foreground px-5 py-3 rounded-md text-sm font-medium hover:border-[#34343a] transition">
              Subscribe
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center h-72 md:h-96">
          <div
            className="absolute w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-30 dark:opacity-20"
            style={{ background: "#FF3B3B" }}
          />
          <div className="relative w-52 h-64 rounded-2xl border border-line bg-surface flex items-center justify-center">
            <span className="text-mute text-xs text-center px-4">[ portrait photo ]</span>
          </div>
          <div className="absolute top-4 -left-2 bg-surface border border-line rounded-lg px-3 py-2 text-xs font-mono text-foreground">Next.js</div>
          <div className="absolute bottom-8 -right-4 bg-surface border border-line rounded-lg px-3 py-2 text-xs font-mono text-foreground">Supabase</div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {featured && (
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-line">
          <p className="text-xs font-mono text-mute mb-8">FEATURED</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Link
              href={`/blog/${featured.slug}`}
              className="rounded-xl overflow-hidden bg-surface border border-line hover:border-[#2a2a2e] transition-colors"
            >
              <div className="h-56 bg-[#161618]" />
              <div className="p-7">
                <CategoryTag category={featured.category} />
                <h2 className="text-2xl font-bold mt-3 mb-3 text-foreground leading-snug">{featured.title}</h2>
                <p className="text-mute text-sm mb-4">{featured.description}</p>
                <p className="text-xs text-mute font-mono">{featured.date}</p>
              </div>
            </Link>

            <div className="grid gap-4">
              {supporting.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-xl bg-surface border border-line hover:border-[#2a2a2e] transition-colors p-6 flex gap-4"
                >
                  <div className="w-20 h-20 rounded-lg shrink-0 bg-[#161618]" />
                  <div>
                    <CategoryTag category={post.category} />
                    <h3 className="font-semibold text-sm mt-1 mb-1 leading-snug text-foreground line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-mute font-mono">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <HomeCategoriesAndLatest posts={posts} />

      {/* RESOURCES */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-line">
        <p className="text-xs font-mono text-mute mb-3">TOOLS I ACTUALLY USE</p>
        <h2 className="text-2xl font-bold mb-8 text-foreground">Resources</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { name: "Cursor", desc: "Code editor" },
            { name: "Vercel", desc: "Hosting" },
            { name: "Supabase", desc: "Database & auth" },
            { name: "Resend", desc: "Transactional email" },
          ].map((tool) => (
            <div key={tool.name} className="rounded-xl bg-surface border border-line p-6 hover:border-accent transition-colors cursor-pointer">
              <p className="font-semibold text-sm mb-1 text-foreground">{tool.name}</p>
              <p className="text-xs text-mute">{tool.desc}</p>
            </div>
          ))}
        </div>
        <Link href="/resources" className="inline-block mt-6 text-sm text-accent hover:opacity-80 transition">
          See all resources &rarr;
        </Link>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-line">
        <div className="rounded-2xl border border-line bg-surface p-12 text-center">
          <h2 className="text-3xl font-bold mb-3 text-foreground">Join thousands of developers and founders.</h2>
          <p className="text-mute mb-8">Weekly insights. No spam. Just value.</p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              placeholder="you@company.com"
              className="flex-1 bg-transparent border border-line rounded-md px-4 py-3 text-sm text-foreground"
            />
            <button className="bg-accent text-white px-5 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}