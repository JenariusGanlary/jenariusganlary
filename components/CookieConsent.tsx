"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CONSENT_REQUEST_EVENT,
  getStoredConsent,
  setStoredConsent,
} from "@/lib/cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) {
      setVisible(true);
    }

    function handleReopen() {
      setVisible(true);
    }

    window.addEventListener(CONSENT_REQUEST_EVENT, handleReopen);
    return () => window.removeEventListener(CONSENT_REQUEST_EVENT, handleReopen);
  }, []);

  if (!visible) return null;

  function handleAccept() {
    setStoredConsent("accepted");
    setVisible(false);
  }

  function handleReject() {
    setStoredConsent("rejected");
    setVisible(false);
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-line bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-sm text-mute flex-1">
          This site uses cookies for analytics and, where enabled, to serve
          ads. You can accept or reject non-essential cookies. See the{" "}
          <Link href="/cookie-policy" className="underline hover:text-foreground transition">
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={handleReject}
            className="text-sm px-4 py-2 rounded-md border border-line text-foreground hover:bg-foreground/5 transition"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="text-sm px-4 py-2 rounded-md bg-foreground text-background hover:opacity-90 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}