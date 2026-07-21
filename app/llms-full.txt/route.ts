import { getAllPosts } from "@/lib/posts";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/metadata";

// llms-full.txt — the expanded companion to llms.txt: full raw Markdown of
// every post in one document, so an LLM can ingest the site's entire content
// in a single fetch. Auto-generated from getAllPosts().

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();

  const articles = posts
    .map(
      (p) =>
        `# ${p.title}\n\nURL: ${SITE_URL}/blog/${p.slug}\nDate: ${p.date}\nCategory: ${p.category}\n\n${p.content.trim()}`
    )
    .join("\n\n---\n\n");

  const body = `# Jenarius Ganlary — Full Content

> ${SITE_DESCRIPTION}

This file contains the complete text of every published article on ${SITE_URL}.

---

${articles}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}