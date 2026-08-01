import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // NOTE: the apex (jenariusganlary.com) -> www canonical-host redirect
      // used to live here as a redirects() rule with a path-to-regexp
      // negative lookahead excluding /ads.txt. That exclusion never actually
      // worked — next.config.ts redirects() source matching goes through
      // path-to-regexp, a limited path-matching syntax, not a full regex
      // engine, and it doesn't reliably support lookahead assertions nested
      // inside a :path(...) capture. /ads.txt was getting redirected right
      // along with everything else despite the exception being in the code.
      //
      // That logic now lives in middleware.ts instead, as plain conditional
      // JS (if host is the apex domain and path isn't /ads.txt, redirect to
      // www) — no regex trick required, so there's nothing to silently fail
      // to compile. See middleware.ts for the full explanation.

      // The one post that shipped with a date-prefixed slug before the
      // frontmatter/slug contract existed. Permanent (301/308) so search
      // engines transfer any ranking signal to the clean URL.
      {
        source: "/blog/2026-07-20-ai-coding-agents-solo-devs",
        destination: "/blog/ai-coding-agents-solo-devs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;