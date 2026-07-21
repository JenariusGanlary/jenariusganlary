import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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