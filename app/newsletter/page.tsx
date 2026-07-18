"use client";

import { motion } from "framer-motion";

const benefits = [
  "One email, roughly weekly — no daily noise",
  "What's actually working (and not) building CreatorBit and freelancing",
  "SaaS, AI, and finance notes before they hit the blog",
  "No spam, unsubscribe in one click",
];

export default function NewsletterPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-mono text-mute mb-4">$SUBSCRIBE</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
          Join the newsletter.
        </h1>
        <p className="text-lg text-mute max-w-md mx-auto mb-10">
          Building SaaS, freelancing through Ganlary Labs, and writing about
          both — straight to your inbox.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl border border-line bg-surface p-8 md:p-10 mb-10"
      >
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mb-2">
          <input
            placeholder="you@company.com"
            className="flex-1 bg-transparent border border-line rounded-md px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
          />
          <button className="bg-accent text-white px-5 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition">
            Subscribe
          </button>
        </div>
        <p className="text-xs text-mute">No spam. Unsubscribe anytime.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-left max-w-sm mx-auto space-y-3"
      >
        {benefits.map((b) => (
          <div key={b} className="flex gap-3 items-start">
            <span className="text-accent mt-0.5">&rarr;</span>
            <p className="text-sm text-mute">{b}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}