"use client";

import { useState } from "react";

export default function ContactForm() {
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
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-8">
        <p className="text-accent font-semibold text-lg mb-1">Message sent.</p>
        <p className="text-mute text-sm">I&apos;ll get back to you soon — usually within a day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-mute mb-2">Name</label>
        <input
          id="contact-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-surface border border-line rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-mute mb-2">Email</label>
        <input
          id="contact-email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-surface border border-line rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-mute mb-2">What are you building?</label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-surface border border-line rounded-lg px-4 py-3.5 text-foreground focus:outline-none focus:border-accent transition-colors resize-none"
        />
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
  );
}