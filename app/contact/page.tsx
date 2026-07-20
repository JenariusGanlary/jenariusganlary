"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12 animate-fade-up">
        <div className="inline-flex items-center gap-2 mb-5 text-xs font-mono text-mute border border-line rounded-full px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          AVAILABLE FOR FREELANCE WORK
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
          Let's build<br />something.
        </h1>
        <p className="text-lg text-mute max-w-lg">
          Whether it's a SaaS MVP, a freelance project through Ganlary Labs,
          or just swapping notes on indie hacking — I read every message
          myself.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_0.75fr] gap-10">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {status === "sent" ? (
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-8">
              <p className="text-accent font-semibold text-lg mb-1">Message sent.</p>
              <p className="text-mute text-sm">I'll get back to you soon — usually within a day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-mute mb-2">Name</label>
                <input required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface border border-line rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-mute mb-2">Email</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-line rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-mute mb-2">What are you building?</label>
                <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-surface border border-line rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-accent transition-colors resize-none" />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-accent text-white px-7 py-3.5 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 w-full sm:w-auto"
              >
                {status === "sending" ? "Sending..." : "Send message →"}
              </button>
              {status === "error" && <p className="text-red-500 text-sm">Something went wrong — please try again.</p>}
            </form>
          )}
        </div>

        <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-surface border border-line rounded-xl p-6">
            <p className="text-xs font-mono text-mute mb-4">WHAT I TAKE ON</p>
            <ul className="space-y-3 text-sm text-foreground/90">
              <li className="flex gap-2"><span className="text-accent">→</span> SaaS MVP builds</li>
              <li className="flex gap-2"><span className="text-accent">→</span> AI feature integration</li>
              <li className="flex gap-2"><span className="text-accent">→</span> Small business websites</li>
              <li className="flex gap-2"><span className="text-accent">→</span> Sponsorships & collabs</li>
            </ul>
          </div>

          <div className="bg-surface border border-line rounded-xl p-6">
            <p className="text-xs font-mono text-mute mb-2">PREFER EMAIL?</p>
            <a href="mailto:hello@jenariusganlary.com" className="text-accent font-semibold hover:opacity-80 transition break-all">
              hello@jenariusganlary.com
            </a>
          </div>

          <div className="bg-surface border border-line rounded-xl p-6">
            <p className="text-xs font-mono text-mute mb-2">RESPONSE TIME</p>
            <p className="text-sm text-foreground/90">Usually within a day, wherever in the world you're writing from.</p>
          </div>
        </div>
      </div>
    </div>
  );
}