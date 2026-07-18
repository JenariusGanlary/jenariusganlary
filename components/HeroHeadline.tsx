"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const THIRD_LINE = "Growing in public.";

export default function HeroHeadline() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const startDelay = 900;
    let i = 0;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setTyped(THIRD_LINE.slice(0, i));
        if (i >= THIRD_LINE.length) clearInterval(interval);
      }, 45);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.06] tracking-tight mb-6 text-foreground">
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
        className="block"
      >
        Building SaaS.
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
        className="block"
      >
        Writing about AI.
      </motion.span>

      {/* Reserves the correct space (and wraps normally if needed) using invisible full text,
          with the actual typed animation layered on top — this can never overflow the viewport. */}
      <span className="relative block">
        <span className="invisible" aria-hidden="true">{THIRD_LINE}</span>
        <span className="absolute inset-0">
          {typed}
          <span className="inline-block w-[3px] h-[0.85em] bg-accent ml-1 align-middle animate-pulse" />
        </span>
      </span>
    </h1>
  );
}