"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const EXCLUDED_PATHS = ["/about", "/contact"];

export default function MonetagAds() {
  const pathname = usePathname();

  if (process.env.NEXT_PUBLIC_MONETAG_ENABLED !== "true") {
    return null;
  }

  const isExcluded = EXCLUDED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isExcluded) {
    return null;
  }

  return (
    <Script
      src="https://5gvci.com/act/files/tag.min.js?z=11753773"
      strategy="afterInteractive"
      data-cfasync="false"
    />
  );
}