import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Google occasionally probes the common WordPress search pattern
      // (?s=...) even on sites that never ran WordPress. This app has no
      // search route — /?s=anything just serves the homepage — so leaving
      // it crawlable creates duplicate-feeling homepage variants in GSC for
      // zero benefit. Disallowing the pattern keeps it out of the index
      // going forward without needing per-request logic anywhere else.
      disallow: "/?s=*",
    },
    // Derived from SITE_URL so robots.txt can never drift from the canonical
    // www host used by canonicals, OG URLs, and the sitemap's own contents.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}