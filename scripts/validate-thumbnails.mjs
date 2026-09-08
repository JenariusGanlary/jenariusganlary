// Enforces the 1200x675 (16:9) thumbnail standard. Reads every post's
// frontmatter thumbnail, checks its real pixel dimensions, and fails loudly
// (non-zero exit) if anything is missing, unreadable, or the wrong size.
//
// Wired in as an npm "prebuild" script (see package.json), so `npm run
// build` always runs this first and a bad thumbnail fails the build before
// it ever reaches Vercel — not a pre-commit hook someone can bypass with
// --no-verify.
//
// SVG thumbnails are skipped: they're vector, so "1200x675px" doesn't apply
// the same way, and the site's cover-image convention is raster (PNG/WebP)
// per the existing generation prompts.

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { imageSize } from "image-size";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "posts");
const PUBLIC_DIR = path.join(ROOT, "public");

const EXPECTED_WIDTH = 1200;
const EXPECTED_HEIGHT = 675;
const TOLERANCE_PX = 2;

function withinTolerance(actual, expected) {
  return Math.abs(actual - expected) <= TOLERANCE_PX;
}

function main() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`No posts directory found at ${POSTS_DIR}`);
    process.exitCode = 1;
    return;
  }

  const filenames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const errors = [];
  let checked = 0;

  for (const filename of filenames) {
    const fullPath = path.join(POSTS_DIR, filename);
    const { data } = matter(fs.readFileSync(fullPath, "utf8"));
    const thumbnail = data.thumbnail;

    if (!thumbnail) continue; // no thumbnail is allowed (falls back to ticker/default)
    if (thumbnail.endsWith(".svg")) continue; // vector, standard doesn't apply

    const diskPath = path.join(PUBLIC_DIR, thumbnail.replace(/^\//, ""));
    if (!fs.existsSync(diskPath)) {
      errors.push(`posts/${filename}: thumbnail "${thumbnail}" does not exist at ${path.relative(ROOT, diskPath)}`);
      continue;
    }

    let dims;
    try {
      dims = imageSize(fs.readFileSync(diskPath));
    } catch (err) {
      errors.push(`posts/${filename}: could not read dimensions of "${thumbnail}" (${err.message})`);
      continue;
    }

    checked++;
    const widthOk = withinTolerance(dims.width, EXPECTED_WIDTH);
    const heightOk = withinTolerance(dims.height, EXPECTED_HEIGHT);
    if (!widthOk || !heightOk) {
      errors.push(
        `posts/${filename}: thumbnail "${thumbnail}" is ${dims.width}x${dims.height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT} (tolerance ${TOLERANCE_PX}px). ` +
          `Fix with: node scripts/normalize-thumbnail.mjs public${thumbnail}`
      );
    }
  }

  if (errors.length > 0) {
    console.error(`\nThumbnail validation failed — ${errors.length} of ${checked} checked thumbnail(s) don't match the standard:\n`);
    for (const e of errors) console.error(`  - ${e}`);
    console.error("");
    process.exitCode = 1;
    return;
  }

  console.log(`Thumbnail validation passed — ${checked} thumbnail(s) checked, all ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}.`);
}

main();