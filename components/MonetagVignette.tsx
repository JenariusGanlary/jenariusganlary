"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const EXCLUDED_PATHS = ["/about", "/contact"];

export default function MonetagVignette() {
  const pathname = usePathname();

  if (process.env.NEXT_PUBLIC_MONETAG_VIGNETTE_ENABLED !== "true") {
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
      id="monetag-vignette"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(s){s.dataset.zone='11753925',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
      }}
    />
  );
}