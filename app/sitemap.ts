import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { SITE_URL } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes with no tracked edit date get lastModified omitted
  // entirely rather than a fresh `new Date()` on every build — a
  // fabricated "modified today" on every deploy is a false signal to
  // crawlers and worse than no signal at all. If/when a page's last
  // real edit date starts being tracked, add it here explicitly.
  const staticPages = [
    "",
    "/blog",
    "/about",
    "/contact",
    "/resources",
    "/newsletter",
    "/privacy-policy",
    "/affiliate-disclosure",
    "/cookie-policy",
    "/terms-and-conditions",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  // Topic-hub pages — generated from CATEGORIES so a future pillar is
  // included automatically, same as its route is.
  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/blog/category/${cat.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Posts have a real, accurate date from frontmatter — keep lastModified here.
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...posts];
}