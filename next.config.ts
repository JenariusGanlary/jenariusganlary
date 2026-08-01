import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Non-www -> www, at the framework level. This is a safety-net
      // duplicate of whatever's configured in Vercel's Domains settings
      // (the primary place this should live, since it redirects at
      // Vercel's edge before even reaching this app) — having it here too
      // means the redirect still works correctly even if the Vercel
      // dashboard config ever changes or is misconfigured. Without a
      // canonical host redirect, Google can index the same page under both
      // hosts as if they were two separate sites, splitting ranking signal
      // between them instead of consolidating it onto one.
      //
      // EXCEPTION: /ads.txt is excluded from this redirect (via the negative
      // lookahead below) so it resolves with a direct 200 on BOTH
      // jenariusganlary.com and www.jenariusganlary.com. AdSense's ads.txt
      // crawler checks the exact registered domain and does not reliably
      // follow redirects for this file — a 308 here was causing AdSense to
      // report "ads.txt not found" even though the file existed one hop away.
      {
        source: "/:path((?!ads\\.txt$).*)",
        has: [{ type: "host", value: "jenariusganlary.com" }],
        destination: "https://www.jenariusganlary.com/:path",
        permanent: true,
      },
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