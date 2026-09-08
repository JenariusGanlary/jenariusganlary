// Resizes/crops image(s) to the site's 1200x675 thumbnail standard, in
// place (same file, same format). Cover-crop, centered — fills the full
// 1200x675 frame and crops off whatever doesn't fit, rather than
// letterboxing.
//
// Usage:
//   node scripts/normalize-thumbnail.mjs public/images/some-cover.png
//   node scripts/normalize-thumbnail.mjs --all
//
// --all reads every post's frontmatter thumbnail (same logic as
// validate-thumbnails.mjs) and fixes only the ones that don't already
// match 1200x675 — already-correct thumbnails are left untouched so
// re-running this doesn't recompress images that don't need it.
//
// IMPORTANT: sharp is only ever given an in-memory Buffer here, never a
// file path. sharp(path) opens that path natively (via libvips), and on
// Windows that native handle can outlive the point where the script
// "looks" done with it, blocking a later write/rename to the same path
// with an EPERM error — this happened repeatedly with an earlier version
// of this script that passed paths directly to sharp(). Reading the file
// ourselves with a plain fs.readFileSync first (which opens and closes
// its own handle immediately) and handing sharp only the resulting bytes
// means sharp never touches the file path at all, so there's nothing left
// for Windows to lock when we write the result back.

import fs from "fs";
import path from "path";
import sharp from "sharp";
import matter from "gray-matter";

const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 675;
const TOLERANCE_PX = 2;

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "posts");
const PUBLIC_DIR = path.join(ROOT, "public");

function withinTolerance(actual, expected) {
  return Math.abs(actual - expected) <= TOLERANCE_PX;
}

async function normalizeOne(target) {
  if (!fs.existsSync(target)) {
    console.error(`  skip   ${target}  (file not found)`);
    return false;
  }
  if (target.toLowerCase().endsWith(".svg")) {
    console.error(`  skip   ${target}  (svg, vector, doesn't need normalizing)`);
    return false;
  }

  // Plain fs read into memory — sharp never sees the file path.
  const inputBuffer = fs.readFileSync(target);

  const before = await sharp(inputBuffer).metadata();
  const outputBuffer = await sharp(inputBuffer)
    .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: "cover", position: "centre" })
    .toBuffer();

  // Ordinary write, no temp file or rename needed — nothing else has (or
  // ever had) a handle on `target` at this point.
  fs.writeFileSync(target, outputBuffer);

  const after = await sharp(outputBuffer).metadata();

  console.log(`  done   ${target}: ${before.width}x${before.height} -> ${after.width}x${after.height}`);
  return true;
}

async function runAll() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`No posts directory found at ${POSTS_DIR}`);
    process.exitCode = 1;
    return;
  }

  const filenames = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  let fixed = 0;
  let alreadyOk = 0;
  let failed = 0;

  for (const filename of filenames) {
    const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, filename), "utf8"));
    const thumbnail = data.thumbnail;
    if (!thumbnail || thumbnail.endsWith(".svg")) continue;

    const diskPath = path.join(PUBLIC_DIR, thumbnail.replace(/^\//, ""));
    if (!fs.existsSync(diskPath)) {
      console.error(`  skip   posts/${filename}: thumbnail "${thumbnail}" does not exist on disk`);
      continue;
    }

    // Same buffer-only approach for the pre-check.
    const meta = await sharp(fs.readFileSync(diskPath)).metadata();
    const alreadyCorrect =
      withinTolerance(meta.width ?? 0, TARGET_WIDTH) && withinTolerance(meta.height ?? 0, TARGET_HEIGHT);

    if (alreadyCorrect) {
      alreadyOk++;
      continue;
    }

    try {
      const didFix = await normalizeOne(diskPath);
      if (didFix) fixed++;
    } catch (err) {
      console.error(`  FAILED ${diskPath}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n${fixed} thumbnail(s) fixed, ${alreadyOk} already correct, ${failed} failed.`);
  if (failed > 0) process.exitCode = 1;
}

async function main() {
  const arg = process.argv[2];

  if (arg === "--all") {
    await runAll();
    return;
  }

  if (!arg) {
    console.error("Usage: node scripts/normalize-thumbnail.mjs <path-to-image>");
    console.error("   or: node scripts/normalize-thumbnail.mjs --all");
    process.exitCode = 1;
    return;
  }

  await normalizeOne(arg);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
