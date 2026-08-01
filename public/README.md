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
