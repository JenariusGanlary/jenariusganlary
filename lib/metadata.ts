import type { Metadata } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for site-wide metadata values.
// Every page's metadata is generated through buildPageMetadata() below so that
// canonical URLs, Open Graph, and Twitter cards can never drift apart again.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = "https://www.jenariusganlary.com";
export const SITE_NAME = "Jenarius Ganlary";
export const SITE_TITLE =
  "Jenarius Ganlary — Tech, Finance & Startups for Indie Hackers";
export const SITE_DESCRIPTION =
  "Practical writing on SaaS, AI tools, indie hacking, and finance for builders — from a full-stack developer building in public from Northeast India.";
export const DEFAULT_OG_IMAGE = "/images/og-default.png";

type PageMetadataInput = {
  /** Page title WITHOUT the site name — e.g. "Resources". Omit for the homepage. */
  title?: string;
  /** Page-specific description, ideally 120–160 characters. */
  description: string;
  /** Route path starting with "/" — e.g. "/resources", "/blog", "/". */
  path: string;
  /** Optional page-specific OG image path. Falls back to the site default. */
  ogImage?: string;
  /** Alt text for the OG image. Falls back to the full page title. */
  ogImageAlt?: string;
  /** "article" for blog posts, "website" for everything else. */
  type?: "website" | "article";
  /** ISO 8601 date-time for articles, e.g. "2026-07-21T18:30:00+05:30". */
  publishedTime?: string;
};

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const fullTitle = input.title ? `${input.title} | ${SITE_NAME}` : SITE_TITLE;
  const url = input.path === "/" ? SITE_URL : `${SITE_URL}${input.path}`;
  const image = input.ogImage ?? DEFAULT_OG_IMAGE;
  const imageAlt = input.ogImageAlt ?? fullTitle;
  const isArticle = input.type === "article";

  // We only assert width/height for the default OG image, because we know its
  // real dimensions. Custom article images pass through without invented sizes.
  const imageObject =
    image === DEFAULT_OG_IMAGE
      ? { url: image, width: 1200, height: 630, alt: imageAlt }
      : { url: image, alt: imageAlt };

  const openGraph: Metadata["openGraph"] = isArticle
    ? {
        type: "article",
        siteName: SITE_NAME,
        title: fullTitle,
        description: input.description,
        url,
        publishedTime: input.publishedTime,
        images: [imageObject],
      }
    : {
        type: "website",
        siteName: SITE_NAME,
        title: fullTitle,
        description: input.description,
        url,
        images: [imageObject],
      };

  return {
    // { absolute } prevents the root layout's "%s | Jenarius Ganlary" template
    // from being applied a second time on top of the title we build here.
    title: { absolute: fullTitle },
    description: input.description,
    alternates: { canonical: input.path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: input.description,
      images: [image],
    },
  };
}