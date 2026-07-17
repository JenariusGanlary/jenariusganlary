"use client";

import { useEffect, useState } from "react";

type Line = { type: "command" | "output"; text: string };

const LINES: Line[] = [
  { type: "command", text: "whoami" },
  { type: "output", text: "jenarius — builder, writer, indie hacker" },
  { type: "command", text: "cat stack.json" },
  { type: "output", text: '{ "frontend": "Next.js", "backend": "Supabase", "ai": "Claude API" }' },
  { type: "command", text: "echo $STATUS" },
  { type: "output", text: "Building in public, one post at a time." },
];

export default function TerminalCard() {
  const [displayed, setDisplayed] = useState<{ type: string; text: string }[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= LINES.length) return;
    const current = LINES[lineIndex];

    if (current.type === "output") {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => [...prev, current]);
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 250);
      return () => clearTimeout(timeout);
    }

    if (charIndex < current.text.length) {
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), 45);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => [...prev, current]);
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex]);

  const currentTyping =
    lineIndex < LINES.length && LINES[lineIndex].type === "command"
      ? LINES[lineIndex].text.slice(0, charIndex)
      : null;

  return (
    <div className="relative w-full max-w-sm">
      {/* soft accent glow behind the card, cheap radial-gradient instead of blur filter */}
      <div
        className="absolute -inset-6 rounded-2xl pointer-events-none opacity-40 dark:opacity-25"
        style={{ background: "radial-gradient(circle, #2B6FFF 0%, transparent 70%)" }}
      />

      <div className="relative rounded-xl border border-line bg-surface overflow-hidden shadow-lg hover:border-accent/50 transition-colors">
        <div className="flex gap-1.5 px-4 py-3 border-b border-line bg-black/5 dark:bg-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="p-5 text-[13px] leading-relaxed font-mono min-h-[200px]">
          {displayed.map((line, i) =>
            line.type === "command" ? (
              <p key={i} className="text-foreground mb-1">
                <span className="text-accent">$</span> {line.text}
              </p>
            ) : (
              <p key={i} className="text-mute mb-3">{line.text}</p>
            )
          )}
          {currentTyping !== null && (
            <p className="text-foreground mb-1">
              <span className="text-accent">$</span> {currentTyping}
              <span className="inline-block w-[2px] h-[12px] bg-accent ml-0.5 align-middle animate-pulse" />
            </p>
          )}
          {lineIndex >= LINES.length && (
            <p className="text-foreground">
              <span className="text-accent">$</span>
              <span className="inline-block w-[2px] h-[12px] bg-accent ml-1.5 align-middle animate-pulse" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}