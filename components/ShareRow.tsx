"use client";

import { useState } from "react";

export default function ShareRow({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const xUrl =
    "https://x.com/intent/post?text=" +
    encodeURIComponent(title) +
    "&url=" +
    encodeURIComponent(url);

  const linkedinUrl =
    "https://www.linkedin.com/sharing/share-offsite/?url=" +
    encodeURIComponent(url);

  return (
    <div className="flex items-center gap-3 mt-10 pt-8 border-t border-line">
      <span className="text-xs font-mono text-mute mr-1">SHARE</span>
      <button
        onClick={copyLink}
        className="text-sm border border-line rounded-md px-3 py-1.5 text-foreground/80 hover:border-accent hover:text-foreground transition-colors"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
      <a href={xUrl} target="_blank" rel="noreferrer" className="text-sm border border-line rounded-md px-3 py-1.5 text-foreground/80 hover:border-accent hover:text-foreground transition-colors">
        X
      </a>
      <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-sm border border-line rounded-md px-3 py-1.5 text-foreground/80 hover:border-accent hover:text-foreground transition-colors">
        LinkedIn
      </a>
    </div>
  );
}