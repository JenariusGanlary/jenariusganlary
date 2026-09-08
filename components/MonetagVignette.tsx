"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const EXCLUDED_PATHS = ["/about", "/contact"];

export default function MonetagVignette() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MONETAG_VIGNETTE_ENABLED !== "true") {
      return;
    }

    const isExcluded = EXCLUDED_PATHS.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );

    if (isExcluded) {
      return;
    }

    const target = [document.documentElement, document.body]
      .filter(Boolean)
      .pop();

    if (!target) return;

    const script = document.createElement("script");
    script.dataset.zone = "11753925";
    script.src = "https://n6wxm.com/vignette.min.js";
    target.appendChild(script);

    return () => {
      script.remove();
    };
  }, [pathname]);

  return null;
}