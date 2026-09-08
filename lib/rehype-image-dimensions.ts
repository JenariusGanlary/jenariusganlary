// Injects real width/height (and loading="lazy" / decoding="async") into
// every in-content <img> that resolves to a local file under public/.
//
// Why this exists: post bodies render via dangerouslySetInnerHTML straight
// from this remark/rehype pipeline (see getPostBySlug below) — the
// generated <img> tags have no dimensions at all, so the browser can't
// reserve layout space before the image loads, which shows up as CLS
// (Cumulative Layout Shift) in Lighthouse/PageSpeed. Thumbnails already
// avoid this because they go through next/image; this plugin gets
// in-content images the same protection without a full migration to
// next/image (that's the phase-2 fix — full MDX migration — this is the
// same-day one).
//
// Pairs with the `.prose-body img { max-width: 100%; height: auto; }` CSS
// rule in app/globals.css — that rule is what keeps the image responsive
// despite having fixed width/height attributes; without it, images would
// render at their native pixel width and could overflow the article
// column. That CSS rule did not exist before this change.

import fs from "fs";
import path from "path";
import { visit } from "unist-util-visit";
import { imageSize } from "image-size";
import type { Root, Element } from "hast";

const PUBLIC_DIR = path.join(process.cwd(), "public");

type Dimensions = { width: number; height: number };

// Cache across images in the same build to avoid re-reading a file that's
// used more than once in a post (or across posts — this runs per-post but
// the process is long-lived during `next build`).
const dimensionCache = new Map<string, Dimensions | null>();

function resolveLocalDimensions(src: string | undefined): Dimensions | null {
  if (!src || !src.startsWith("/")) return null; // skip external/absolute URLs
  if (dimensionCache.has(src)) return dimensionCache.get(src) ?? null;

  const diskPath = path.join(PUBLIC_DIR, src.replace(/^\//, ""));
  let dims: Dimensions | null = null;
  try {
    if (fs.existsSync(diskPath)) {
      const { width, height } = imageSize(fs.readFileSync(diskPath));
      if (width && height) dims = { width, height };
    }
  } catch {
    dims = null; // fall through — image just won't get explicit dimensions
  }

  dimensionCache.set(src, dims);
  return dims;
}

export function rehypeImageDimensions() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") return;
      const props = node.properties ?? (node.properties = {});
      if (props.width && props.height) return; // already has explicit dims

      const src = typeof props.src === "string" ? props.src : undefined;
      const dims = resolveLocalDimensions(src);
      if (!dims) return; // external image, or file not found — leave as-is

      props.width = dims.width;
      props.height = dims.height;
      props.loading = props.loading || "lazy";
      props.decoding = props.decoding || "async";
    });
  };
}