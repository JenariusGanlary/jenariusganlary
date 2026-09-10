"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Attribution = {
  sourcePage: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

function readAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { sourcePage: "" };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    sourcePage: window.location.pathname,
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
  };
}

export default function StarterKitForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "rateLimited">("idle");
  const [attribution] = useState<Attribution>(readAttribution);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          source: "starter_kit",
          ...attribution,
        }),
      });
      if (res.ok) {
        router.push("/starter-kit/thanks");
      } else if (res.status === 429) {
        setStatus("rateLimited");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <label htmlFor="starter-kit-email" className="sr-only">Email address</label>
          <input
            id="starter-kit-email"
            required
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-line rounded-md px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
          <label htmlFor="starter-kit-company">Company</label>
          <input
            id="starter-kit-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-accent text-white px-5 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Get the Free Starter Kit"}
        </button>
      </form>
      <div role="status" aria-live="polite" className="mt-2">
        {status === "error" && <p className="text-red-500 text-xs">Something went wrong — please try again.</p>}
        {status === "rateLimited" && <p className="text-red-500 text-xs">Too many attempts — please try again in a bit.</p>}
      </div>
    </div>
  );
}