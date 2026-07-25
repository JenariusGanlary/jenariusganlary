"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  CONSENT_CHANGE_EVENT,
  getStoredConsent,
} from "@/lib/cookie-consent";

const GA_MEASUREMENT_ID = "G-YWGV9NL8Q0";
const ADSENSE_CLIENT_ID = "ca-pub-4240391525576407";

export default function AnalyticsScripts() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(getStoredConsent() === "accepted");

    function handleChange(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      setAllowed(detail === "accepted");
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, handleChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handleChange);
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      {/* AdSense only ever mounts once consent === "accepted" (the `allowed`
          check above already gates this whole component's return). Moved
          from layout.tsx and switched from beforeInteractive to
          afterInteractive — it doesn't need to block hydration, and
          Google's crawler/site-verification doesn't require it either. */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}