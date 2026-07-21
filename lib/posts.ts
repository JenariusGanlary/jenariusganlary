import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { z } from "zod";
import { CATEGORIES } from "./categories";

const postsDirectory = path.join(process.cwd(), "posts");

// ─────────────────────────────────────────────────────────────────────────────
// Frontmatter contract — validated at build time.
// An invalid post fails the build with a readable error instead of shipping a
// silent bug (missing thumbnails, drifting category names, malformed dates,
// and date-prefixed slugs were all real bugs this schema now makes impossible).
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

// Clean slugs only: lowercase letters, digits, single hyphens.
// e.g. "the-ai-tool-stack-tax" ✓   "My_Post" ✗   "2026-07-20-my-post" ✗
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PREFIX_PATTERN = /^\d{4}-\d{2}-\d{2}-/;

const frontmatterSchema = z.object({
  title: z.string().min(1, "title is required and must not be empty"),
  description: z.string().min(1, "description is required and must not be empty"),
  // If the date is written unquoted in YAML, gray-matter parses it as a JS
  // Date object — we normalize that back to a YYYY-MM-DD string so both
  // styles are accepted and the rest of the codebase always sees a string.
  date: z.preprocess(
    (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be in "YYYY-MM-DD" format')
  ),
  category: z.string().refine((value) => CATEGORY_SLUGS.includes(value), {
    message: `category must be one of: ${CATEGORY_SLUGS.join(", ")}`,
  }),
  thumbnail: z
    .string()
    .startsWith("/", 'thumbnail must be a site-relative path starting with "/"')
    .optional(),
});

type Frontmatter = z.infer<typeof frontmatterSchema>;

function validateFrontmatter(filename: string, data: unknown): Frontmatter {
  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in posts/${filename}:\n${issues}`);
  }
  return result.data;
}

function validateSlug(filename: string, slug: string): void {
  if (DATE_PREFIX_PATTERN.test(slug)) {
    throw new Error(
      `Invalid filename posts/${filename}: slugs must not start with a date. ` +
        `The date belongs in frontmatter, not the URL. Rename the file to "${slug.replace(DATE_PREFIX_PATTERN, "")}.md".`
    );
  }
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `Invalid filename posts/${filename}: slugs must contain only lowercase letters, ` +
        `digits, and single hyphens (e.g. "my-post-title.md").`
    );
  }
}

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
  const filenames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
  const posts = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    validateSlug(filename, slug);
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = validateFrontmatter(filename, data);
    return {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      category: frontmatter.category,
      thumbnail: frontmatter.thumbnail,
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
// written as **Question**\nAnswer, and removes that section from the
// returned content so it can be rendered separately as a styled component
// instead of running together as plain prose. Anything after the FAQ
// section (like a "Related reading" footer line) is preserved.
// Returns the content unchanged with faq: [] if there's no FAQ section,
// or if it exists but doesn't match the expected Q&A pattern — we never
// fabricate FAQ content that isn't actually in the post.
function extractFaq(markdownContent: string): { faq: FaqItem[]; content: string } {
  const faqHeadingMatch = markdownContent.match(/^##\s+Frequently asked questions\s*$/im);
  if (!faqHeadingMatch || faqHeadingMatch.index === undefined) {
    return { faq: [], content: markdownContent };
  }

  const headingStart = faqHeadingMatch.index;
  const afterHeading = faqHeadingMatch.index + faqHeadingMatch[0].length;
  const rest = markdownContent.slice(afterHeading);
  const nextHeadingMatch = rest.match(/\n##\s+/);
  const section = nextHeadingMatch ? rest.slice(0, nextHeadingMatch.index) : rest;

  const items: FaqItem[] = [];
  const qaRegex = /\*\*(.+?)\*\*\s*\n([\s\S]+?)(?=\n\*\*|\n---|\s*$)/g;
  let m;
  let lastMatchEnd = 0;
  while ((m = qaRegex.exec(section)) !== null) {
    const question = m[1].trim();
    const answer = m[2].trim();
    if (question && answer) {
      items.push({ question, answer });
      lastMatchEnd = m.index + m[0].length;
    }
  }

  if (items.length === 0) return { faq: [], content: markdownContent };

  const trueEndIdx = afterHeading + lastMatchEnd;
  const strippedContent = (
    markdownContent.slice(0, headingStart) + markdownContent.slice(trueEndIdx)
  ).trim();

  return { faq: items, content: strippedContent };
}

export async function getPostBySlug(slug: string): Promise<PostWithToc> {
  const filename = `${slug}.md`;
  const fullPath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content: rawContent } = matter(fileContents);
  const frontmatter = validateFrontmatter(filename, data);

  const toc = extractToc(rawContent);
  const { faq, content } = extractFaq(rawContent);

  const processed = await remark()
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    category: frontmatter.category,
    thumbnail: frontmatter.thumbnail,
    content: processed.toString(),
    toc,
    faq,
  };
}