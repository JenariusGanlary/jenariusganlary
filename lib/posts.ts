import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "posts");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  thumbnail?: string;
  content: string;
};

export type TocItem = { text: string; id: string; level: number };
export type FaqItem = { question: string; answer: string };

export type PostWithToc = Post & { toc: TocItem[]; faq: FaqItem[] };

export function getAllPosts(): Post[] {
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category,
      thumbnail: data.thumbnail,
      content,
    };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function extractToc(markdownContent: string): TocItem[] {
  const headingRegex = /^(##|###)\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    items.push({ text, id, level });
  }
  return items;
}

// Extracts real Q&A pairs from a "## Frequently asked questions" section,
// written as **Question**\nAnswer. Returns [] if the post has no such
// section — we never fabricate FAQ content that isn't actually in the post.
function extractFaq(markdownContent: string): FaqItem[] {
  const faqHeadingMatch = markdownContent.match(/^##\s+Frequently asked questions\s*$/im);
  if (!faqHeadingMatch || faqHeadingMatch.index === undefined) return [];

  const startIdx = faqHeadingMatch.index + faqHeadingMatch[0].length;
  const rest = markdownContent.slice(startIdx);
  const nextHeadingMatch = rest.match(/\n##\s+/);
  const section = nextHeadingMatch ? rest.slice(0, nextHeadingMatch.index) : rest;

  const items: FaqItem[] = [];
  const qaRegex = /\*\*(.+?)\*\*\s*\n([\s\S]+?)(?=\n\*\*|\n---|\s*$)/g;
  let m;
  while ((m = qaRegex.exec(section)) !== null) {
    const question = m[1].trim();
    const answer = m[2].trim();
    if (question && answer) items.push({ question, answer });
  }
  return items;
}

export async function getPostBySlug(slug: string): Promise<PostWithToc> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const toc = extractToc(content);
  const faq = extractFaq(content);

  const processed = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    thumbnail: data.thumbnail,
    content: processed.toString(),
    toc,
    faq,
  };
}