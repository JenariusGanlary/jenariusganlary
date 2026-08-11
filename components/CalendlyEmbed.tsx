"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CALENDLY_URL =
  "https://calendly.com/ganlarylabs/discovery-call?hide_event_type_details=1&hide_gdpr_banner=1";
const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const SCRIPT_ID = "calendly-widget-script";

type CalendlyGlobal = {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

export default function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    function renderWidget() {
      if (cancelled || !containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: containerRef.current,
      });
    }

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (window.Calendly) {
      renderWidget();
    } else if (existingScript) {
      existingScript.addEventListener("load", renderWidget);
    } else {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = renderWidget;
      script.onerror = () => !cancelled && setFailed(true);
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      existingScript?.removeEventListener("load", renderWidget);
    };
  }, []);

  if (failed) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6 text-center">
        <p className="text-sm text-mute mb-3">
          The scheduler couldn&apos;t load. You can book directly instead:
        </p>
        <Link
          href="https://calendly.com/ganlarylabs/discovery-call"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-white text-sm font-semibold px-5 py-3 rounded-md hover:opacity-90 transition"
        >
          Open Calendly
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-line overflow-hidden bg-surface"
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
