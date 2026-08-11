import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import { SITE_URL } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/blog",
    "/about",
    "/work-with-me",
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

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/blog/category/${cat.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...posts];
}