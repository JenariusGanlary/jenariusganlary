import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // Derived from SITE_URL so robots.txt can never drift from the canonical
    // www host used by canonicals, OG URLs, and the sitemap's own contents.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}