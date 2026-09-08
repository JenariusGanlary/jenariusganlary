// Compresses every raster image in public/images down to WebP, and rewrites
// every reference to a renamed file (posts frontmatter, post body, and any
// source file under app/ components/ lib/) so nothing breaks.
//
// Two-phase by design: `--dry-run` (default) only reports what would happen.
// Nothing is written or deleted until you re-run with `--apply`. Originals
// are only deleted after the new file is confirmed valid AND every reference
// to the old path has been rewritten.
//
// Usage:
//   node scripts/compress-images.mjs            (dry run, safe, no changes)
//   node scripts/compress-images.mjs --apply     (writes changes for real)

import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, "public", "images");
const MAX_WIDTH = 1920; // never upscale, only cap runaway-large sources
const WEBP_QUALITY = 80;
const TARGET_BYTES = 300 * 1024;

// Directories to scan for text references to /images/... paths that need
// updating when a file gets renamed (e.g. foo.png -> foo.webp). Kept broad
// on purpose — a missed reference is a broken image in production.
const REFERENCE_DIRS = ["posts", "app", "components", "lib"];
const REFERENCE_EXTENSIONS = new Set([".md", ".mdx", ".ts", ".tsx", ".js", ".mjs"]);
const SKIP_DIR_NAMES = new Set(["node_modules", ".next", ".git"]);

const APPLY = process.argv.includes("--apply");

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIR_NAMES.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

// Finds every text file under the reference dirs that mentions a given
// site-relative image path (e.g. "/images/foo.png"), so we know exactly what
// to rewrite — and can refuse to rename anything we can't fully account for.
function findReferences(relPath) {
  const hits = [];
  for (const dirName of REFERENCE_DIRS) {
    const dirPath = path.join(ROOT, dirName);
    if (!fs.existsSync(dirPath)) continue;
    for (const file of walk(dirPath)) {
      if (!REFERENCE_EXTENSIONS.has(path.extname(file))) continue;
      const text = fs.readFileSync(file, "utf8");
      if (text.includes(relPath)) hits.push(file);
    }
  }
  return hits;
}

async function processImage(absPath) {
  const relFromImages = path.relative(IMAGES_DIR, absPath);
  const relSitePath = `/images/${relFromImages.split(path.sep).join("/")}`;
  const ext = path.extname(absPath).toLowerCase();
  const originalSize = fs.statSync(absPath).size;

  if (ext === ".svg") {
    return { skipped: true, reason: "svg (vector, left as-is)", relSitePath, originalSize };
  }
  if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
    return { skipped: true, reason: `unhandled extension ${ext}`, relSitePath, originalSize };
  }

  const image = sharp(absPath);
  const metadata = await image.metadata();
  const willResize = (metadata.width || 0) > MAX_WIDTH;

  const isAlreadyWebp = ext === ".webp";
  const newAbsPath = isAlreadyWebp
    ? absPath
    : absPath.slice(0, -ext.length) + ".webp";
  const newRelSitePath = isAlreadyWebp
    ? relSitePath
    : relSitePath.slice(0, -ext.length) + ".webp";
  const willRename = newAbsPath !== absPath;

  // If already under the size target and no resize/rename needed, don't
  // touch it — recompressing something already fine just risks quality
  // loss for no benefit.
  if (!willResize && !willRename && originalSize <= TARGET_BYTES) {
    return { skipped: true, reason: "already webp and under target size", relSitePath, originalSize };
  }

  let references = [];
  if (willRename) {
    references = findReferences(relSitePath);
  }

  const plan = {
    absPath,
    newAbsPath,
    relSitePath,
    newRelSitePath,
    willRename,
    willResize,
    originalSize,
    references,
  };

  if (!APPLY) return plan;

  const pipeline = willResize ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true }) : image;
  const buffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();

  // Verify the encode actually worked before touching anything on disk.
  const check = await sharp(buffer).metadata();
  if (!check.width || !check.height) {
    throw new Error(`Re-encoded output for ${relSitePath} failed to validate — aborting this file untouched.`);
  }

  fs.writeFileSync(newAbsPath, buffer);
  plan.newSize = buffer.length;

  if (willRename) {
    for (const file of references) {
      const text = fs.readFileSync(file, "utf8");
      fs.writeFileSync(file, text.split(relSitePath).join(newRelSitePath));
    }
    fs.rmSync(absPath);
  }

  return plan;
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`No public/images directory found at ${IMAGES_DIR}`);
    process.exitCode = 1;
    return;
  }

  const files = walk(IMAGES_DIR).filter((f) => fs.statSync(f).isFile());
  console.log(`${APPLY ? "APPLYING" : "DRY RUN"} — scanning ${files.length} file(s) in public/images\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  const skipped = [];
  const changed = [];

  for (const file of files) {
    const result = await processImage(file);
    totalBefore += result.originalSize;

    if (result.skipped) {
      skipped.push(result);
      totalAfter += result.originalSize;
      continue;
    }

    changed.push(result);
    totalAfter += result.newSize ?? result.originalSize;
  }

  for (const r of skipped) {
    console.log(`  skip   ${r.relSitePath}  (${r.reason})`);
  }
  for (const r of changed) {
    const arrow = r.willRename ? `${r.relSitePath} -> ${r.newRelSitePath}` : r.relSitePath;
    const sizeNote = APPLY
      ? `${formatKb(r.originalSize)} -> ${formatKb(r.newSize)}`
      : `${formatKb(r.originalSize)} -> (pending)`;
    console.log(`  ${APPLY ? "done" : "plan"}   ${arrow}  [${sizeNote}]${r.willResize ? " (resized)" : ""}`);
    if (r.willRename && r.references.length) {
      console.log(`           updates ${r.references.length} reference(s): ${r.references.map((f) => path.relative(ROOT, f)).join(", ")}`);
    }
    if (r.willRename && r.references.length === 0) {
      console.log(`           no references found in posts/app/components/lib — orphan or referenced elsewhere, double-check manually`);
    }
  }

  console.log(`\nTotal: ${formatKb(totalBefore)} -> ${APPLY ? formatKb(totalAfter) : "(run with --apply to write changes)"}`);

  const stillOver = APPLY
    ? changed.filter((r) => (r.newSize ?? 0) > TARGET_BYTES).concat(skipped.filter((r) => r.originalSize > TARGET_BYTES))
    : [];
  if (APPLY && stillOver.length) {
    console.log(`\n${stillOver.length} file(s) still over 300KB after compression — likely need manual attention (very large source or high-detail image):`);
    for (const r of stillOver) console.log(`  - ${r.relSitePath} (${formatKb(r.newSize ?? r.originalSize)})`);
  }

  if (!APPLY) {
    console.log("\nThis was a dry run — nothing was written or deleted. Re-run with --apply to make these changes.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});