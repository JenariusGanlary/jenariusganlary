import { NextResponse } from "next/server";

// Declares Google as an authorized seller of ad inventory on this domain —
// required by the industry-wide ads.txt standard, separate from AdSense's
// own site-verification step. Kept as its own route (not a static file in
// public/) so it stays consistent with the dynamic robots.ts/sitemap.ts
// pattern already used for the other well-known text/XML endpoints.
export async function GET() {
  const content = "google.com, pub-4240391525576407, DIRECT, f08c47fec0942fa0";

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}