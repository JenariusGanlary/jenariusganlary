"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  CONSENT_CHANGE_EVENT,
  getStoredConsent,
} from "@/lib/cookie-consent";

const GA_MEASUREMENT_ID = "G-YWGV9NL8Q0";

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
    </>
  );
}