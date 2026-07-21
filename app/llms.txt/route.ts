import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/metadata";

// llms.txt — a structured index of the site for AI crawlers and LLM-based
// search engines (the llmstxt.org convention). Auto-generated from
// getAllPosts(), same as the sitemap, so it can never go stale.

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();

  const categorySections = CATEGORIES.map((cat) => {
    const catPosts = posts.filter((p) => p.category === cat.slug);
    const lines = catPosts
      .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
      .join("\n");
    return `## ${cat.label}\n\n${SITE_URL}/blog/category/${cat.slug}\n\n${lines}`;
  }).join("\n\n");

  const body = `# Jenarius Ganlary

> ${SITE_DESCRIPTION}

Personal blog of Jenarius Ganlary — full-stack developer building CreatorBit and running Ganlary Labs. Articles cover SaaS, AI tools, indie hacking, developer life, and finance for builders, written from first-hand experience.

- [About](${SITE_URL}/about): Background, skills, and current projects
- [All articles](${SITE_URL}/blog): Full article index
- [Contact](${SITE_URL}/contact): Freelance inquiries and messages

${categorySections}

## Optional

- [Resources](${SITE_URL}/resources): Tools actually used to build this site and CreatorBit
- [RSS feed](${SITE_URL}/rss.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}