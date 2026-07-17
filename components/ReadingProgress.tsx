"use client";

import { useEffect, useRef } from "react";

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${progress}%`;
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[3px] bg-accent z-[100] transition-[width] duration-100 ease-out"
      style={{ width: "0%" }}
    />
  );
}