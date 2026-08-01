import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Canonical-host redirect: jenariusganlary.com -> www.jenariusganlary.com
//
// This used to live in next.config.ts as a redirects() rule using a
// path-to-regexp negative lookahead to exclude /ads.txt. That didn't work:
// next.config.ts redirects() source matching goes through path-to-regexp,
// which is a limited path-matching syntax, not a full regex engine — nested
// parens like (?!ads\.txt$) inside a :path(...) capture don't compile the
// way they would in real regex, so the exclusion silently never applied and
// /ads.txt got redirected along with everything else.
//
// Middleware doesn't have that limitation: this is plain JS, so excluding a
// specific path is just an if-check, not a regex trick that has to survive
// a non-standard parser.
//
// Why this matters: AdSense's ads.txt crawler checks the exact registered
// domain (jenariusganlary.com, no www) and does not reliably follow a
// redirect for that file. Every other path should still canonicalize to
// www so Google doesn't index the same content under two hosts.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname, search } = request.nextUrl;

  const isApexHost = host === "jenariusganlary.com";
  const isAdsTxt = pathname === "/ads.txt";

  if (isApexHost && !isAdsTxt) {
    const destination = new URL(
      `${pathname}${search}`,
      "https://www.jenariusganlary.com"
    );
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

// Run on every path except Next.js internals and static assets — no need
// to touch those, and skipping them keeps this fast.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};