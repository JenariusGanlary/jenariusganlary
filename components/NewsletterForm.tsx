"use client";

import { useState } from "react";
import { readAttribution, type Attribution } from "@/lib/attribution";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "rateLimited">("idle");
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
          source: "newsletter",
          ...attribution,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setEmail("");
        setCompany("");
      } else if (res.status === 429) {
        setStatus("rateLimited");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" aria-live="polite" className="max-w-md mx-auto">
        <p className="text-accent font-semibold text-sm">You&apos;re subscribed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            required
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-line rounded-md px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
          <label htmlFor="newsletter-company">Company</label>
          <input
            id="newsletter-company"
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
          {status === "sending" ? "Sending..." : "Subscribe"}
        </button>
      </form>
      <div role="status" aria-live="polite" className="mt-2">
        {status === "error" && <p className="text-red-500 text-xs">Something went wrong — please try again.</p>}
        {status === "rateLimited" && <p className="text-red-500 text-xs">Too many attempts — please try again in a bit.</p>}
      </div>
    </div>
  );
}