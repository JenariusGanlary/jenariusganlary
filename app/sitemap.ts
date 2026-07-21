import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.jenariusganlary.com";

  const staticPages = [
    "",
    "/blog",
    "/about",
    "/contact",
    "/resources",
    "/newsletter",
    "/privacy-policy",
    "/affiliate-disclosure",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  // Topic-hub pages — generated from CATEGORIES so a future pillar is
  // included automatically, same as its route is.
  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...posts];
}