"use client";

import Script from "next/script";

const CALENDLY_URL = "https://calendly.com/ganlarylabs/discovery-call";

export default function CalendlyEmbed() {
  return (
    <>
      <div
        className="calendly-inline-widget rounded-xl border border-line overflow-hidden"
        data-url={`${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1`}
        style={{ minWidth: "280px", height: "700px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}