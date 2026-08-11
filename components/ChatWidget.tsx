"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hey, I'm Zen's AI assistant. Ask me about services, pricing, or past projects — happy to help you figure out what fits.",
};

const TEASER_TEXT = "Need help finding the right service? Ask me anything — takes 10 seconds.";
const TEASER_DELAY_MS = 4000;
const TEASER_SESSION_KEY = "chatbot-teaser-shown";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCta, setShowCta] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) return;
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(TEASER_SESSION_KEY) === "1";
    } catch {
      return;
    }
    if (alreadyShown) return;

    const timeout = setTimeout(() => {
      setShowTeaser(true);
      try {
        sessionStorage.setItem(TEASER_SESSION_KEY, "1");
      } catch {
        // Non-fatal.
      }
    }, TEASER_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [open]);

  function openChat() {
    setOpen(true);
    setShowTeaser(false);
  }

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      if (data.showCta) setShowCta(true);
    } catch {
      setError("Couldn't reach the assistant. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {!open && showTeaser && (
        <div className="relative animate-fade-up" style={{ animationDuration: "0.4s" }}>
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none opacity-30 dark:opacity-20"
            style={{ background: "radial-gradient(circle, #2B6FFF 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative max-w-[260px] rounded-2xl border-2 border-line bg-background shadow-xl p-4 pr-8">
            <button
              onClick={() => setShowTeaser(false)}
              aria-label="Dismiss"
              className="absolute top-2.5 right-2.5 text-mute hover:text-foreground transition p-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button onClick={openChat} className="flex items-start gap-2.5 text-left">
              <span className="shrink-0 w-7 h-7 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.135 0-2.221-.183-3.22-.517L3 21l1.517-4.28C3.552 15.548 3 13.834 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
              <span className="text-sm text-foreground leading-snug pt-0.5">
                {TEASER_TEXT}
              </span>
            </button>

            <div className="absolute -bottom-[7px] right-6 w-3.5 h-3.5 bg-background border-r-2 border-b-2 border-line rotate-45" aria-hidden="true" />
          </div>
        </div>
      )}

      {open && (
        <div className="w-[min(360px,calc(100vw-2.5rem))] h-[min(520px,calc(100vh-8rem))] flex flex-col rounded-2xl border-2 border-line bg-background shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-surface">
            <div>
              <p className="text-sm font-semibold text-foreground">Ask Zen&apos;s assistant</p>
              <p className="text-xs text-mute font-mono">Usually replies instantly</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-mute hover:text-foreground transition p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "self-end bg-accent text-white"
                    : "self-start bg-surface text-foreground border border-line"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="self-start bg-surface text-mute border border-line rounded-xl px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-mute animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-mute animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-mute animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}

            {error && (
              <p className="text-xs text-red-500 self-start">{error}</p>
            )}

            {showCta && (
              <div className="self-start w-full rounded-xl border-2 border-accent bg-accent/10 p-3.5 flex flex-col gap-2">
                <p className="text-sm text-foreground">
                  Sounds like this could be a good fit — want to see pricing and book a call?
                </p>
                <Link
                  href="/work-with-me"
                  className="text-center bg-accent text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition"
                >
                  View pricing & book a call
                </Link>
              </div>
            )}
          </div>

          <div className="border-t border-line p-3 flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about services, pricing, projects..."
              rows={1}
              className="flex-1 resize-none bg-surface border border-line rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-mute focus:outline-none focus:border-accent max-h-24"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="bg-accent text-white rounded-lg p-2.5 hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? "Close chat" : "Open chat"}
        className="relative w-14 h-14 rounded-full bg-accent text-white shadow-lg flex items-center justify-center hover:opacity-90 transition"
      >
        {!open && showTeaser && (
          <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" aria-hidden="true" />
        )}
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.135 0-2.221-.183-3.22-.517L3 21l1.517-4.28C3.552 15.548 3 13.834 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}