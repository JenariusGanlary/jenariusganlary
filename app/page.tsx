import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import CategoryTag from "@/components/CategoryTag";
import { CATEGORIES } from "@/lib/categories";
import TypewriterRoles from "@/components/TypewriterRoles";
import HeroHeadline from "@/components/HeroHeadline";
import HomeCategoriesAndLatest from "@/components/HomeCategoriesAndLatest";
import TerminalCard from "@/components/TerminalCard";

export default function Home() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const supporting = rest.slice(0, 3);
  const featuredIsSvg = featured?.thumbnail?.endsWith(".svg");

  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 md:px-6 pt-10 pb-10 md:pt-24 md:pb-20 grid md:grid-cols-[1.15fr_0.85fr] gap-8 md:gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 mb-5 text-xs text-mute">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <TypewriterRoles />
          </div>
          <HeroHeadline />
          <p className="text-base md:text-lg text-mute max-w-md mb-6 md:mb-9 leading-relaxed">
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

        <div className="relative flex items-center justify-center">
          <TerminalCard />
        </div>
      </section>

      {featured && (
        <section className="max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-16 border-t border-line">
          <p className="text-xs font-mono text-mute mb-5 md:mb-8">FEATURED</p>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-6">
            <Link
              href={`/blog/${featured.slug}`}
              className="rounded-xl overflow-hidden bg-surface border border-line hover:border-[#2a2a2e] transition-colors"
            >
              <div className="relative h-44 md:h-56 bg-[#161618] flex items-center justify-center overflow-hidden">
                {featured.thumbnail ? (
                  featuredIsSvg ? (
                    <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover" />
                  ) : (
                    <Image
                      src={featured.thumbnail}
                      alt={featured.title}
                      fill
                      priority
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )
                ) : (
                  <span className="text-white/30 text-3xl font-bold font-mono">
                    {CATEGORIES.find((c) => c.slug === featured.category)?.ticker}
                  </span>
                )}
              </div>
              <div className="p-5 md:p-7">
                <CategoryTag category={featured.category} />
                <h2 className="text-xl md:text-2xl font-bold mt-3 mb-3 text-foreground leading-snug">{featured.title}</h2>
                <p className="text-mute text-sm mb-4">{featured.description}</p>
                <p className="text-xs text-mute font-mono">{featured.date}</p>
              </div>
            </Link>

            <div className="grid gap-4">
              {supporting.map((post) => {
                const isSvg = post.thumbnail?.endsWith(".svg");
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rounded-xl bg-surface border border-line hover:border-[#2a2a2e] transition-colors p-5 flex gap-4"
                  >
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg shrink-0 bg-[#161618] flex items-center justify-center overflow-hidden">
                      {post.thumbnail ? (
                        isSvg ? (
                          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                          <Image
                            src={post.thumbnail}
                            alt={post.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )
                      ) : (
                        <span className="text-white/30 text-xs font-bold font-mono">
                          {CATEGORIES.find((c) => c.slug === post.category)?.ticker}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <CategoryTag category={post.category} />
                      <h3 className="font-semibold text-sm mt-1 mb-1 leading-snug text-foreground line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-mute font-mono">{post.date}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <HomeCategoriesAndLatest posts={posts} />

      <section className="max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-16 border-t border-line">
        <p className="text-xs font-mono text-mute mb-3">TOOLS I ACTUALLY USE</p>
        <h2 className="text-2xl font-bold mb-6 md:mb-8 text-foreground">Resources</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Cursor", desc: "Code editor" },
            { name: "Vercel", desc: "Hosting" },
            { name: "Supabase", desc: "Database & auth" },
            { name: "Resend", desc: "Transactional email" },
          ].map((tool) => (
            <div key={tool.name} className="rounded-xl bg-surface border border-line p-4 md:p-6 hover:border-accent transition-colors cursor-pointer">
              <p className="font-semibold text-sm mb-1 text-foreground">{tool.name}</p>
              <p className="text-xs text-mute">{tool.desc}</p>
            </div>
          ))}
        </div>
        <Link href="/resources" className="inline-block mt-5 text-sm text-accent hover:opacity-80 transition">
          See all resources &rarr;
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-6 py-10 md:py-16 border-t border-line">
        <div className="rounded-2xl border border-line bg-surface p-6 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">Join thousands of developers and founders.</h2>
          <p className="text-mute mb-6 md:mb-8">Weekly insights. No spam. Just value.</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
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