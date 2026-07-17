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
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Contact</h1>
      <p className="text-mute mb-8">Have a question, feedback, or want to work together? Send a message directly.</p>

      {status === "sent" ? (
        <p className="text-accent font-medium">Thanks — your message has been sent. I'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-mute mb-1">Name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border border-line rounded-md px-4 py-2.5 text-foreground focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-mute mb-1">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-line rounded-md px-4 py-2.5 text-foreground focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-mute mb-1">Message</label>
            <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent border border-line rounded-md px-4 py-2.5 text-foreground focus:outline-none focus:border-accent transition-colors resize-none" />
          </div>
          <button type="submit" disabled={status === "sending"}
            className="bg-accent text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50">
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
          {status === "error" && <p className="text-red-500 text-sm">Something went wrong — please try again.</p>}
        </form>
      )}
    </div>
  );
}