# public/

Static assets served as-is at the site root.

## d57a05759ee544d4be6afa531dc1d30a.txt

**Confirmed: this is the IndexNow API key file**, used to let Bing (and
other IndexNow-participating search engines) verify this site owns the key
used when pushing instant-indexing notifications for new/updated posts.

The naming convention is the tell: IndexNow requires a file named exactly
after the key itself, with a `.txt` extension, hosted at the site root —
and its content must be nothing but the key string. This file's content
(`d57a05759ee544d4be6afa531dc1d30a`) is identical to its own filename minus
the extension, which is the defining signature of an IndexNow key file and
doesn't match any other verification convention (Google Search Console uses
`google<code>.html`; Bing's older method uses `BingSiteAuth.xml`). This also
lines up with IndexNow already being active on this site.

**Do not delete this file.** If it goes missing, IndexNow submissions will
start failing authentication (HTTP 403) the next time a search engine
re-checks the key, silently breaking instant-indexing for new posts — not a
build error, so it wouldn't surface in `npm run build` or deployment logs.

## Image Workflow

### New thumbnail/cover image
Crop/resize to the site's 1200×675 standard, in place:
\`\`\`bash
node scripts/normalize-thumbnail.mjs public/images/your-file.webp
\`\`\`
Or fix every thumbnail across all posts that doesn't already match:
\`\`\`bash
node scripts/normalize-thumbnail.mjs --all
\`\`\`

### New in-content image(s)
Step 1 — preview only, nothing is changed yet:
\`\`\`bash
node scripts/compress-images.mjs
\`\`\`
Step 2 — actually compress + convert to WebP + rewrite references:
\`\`\`bash
node scripts/compress-images.mjs --apply
\`\`\`

### Before every push
\`\`\`bash
npm run build
\`\`\`
This auto-runs a thumbnail validation check (`prebuild`) and fails the build if any thumbnail isn't 1200×675. It does **not** check in-content image size — run `compress-images.mjs` manually for those.