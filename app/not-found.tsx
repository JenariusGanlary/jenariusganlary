import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <p className="font-mono text-sm text-mute mb-4">404</p>
      <h1 className="text-3xl font-bold mb-4 text-foreground">
        This page doesn&apos;t exist
      </h1>
      <p className="text-mute mb-8">
        The page you&apos;re looking for may have been moved, renamed, or
        never existed in the first place. Here are a few places to go
        instead.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-md bg-foreground text-background hover:opacity-90 transition text-sm font-medium"
        >
          Go to Homepage
        </Link>
        <Link
          href="/blog"
          className="px-5 py-2.5 rounded-md border border-line text-foreground hover:bg-foreground/5 transition text-sm font-medium"
        >
          Read Articles
        </Link>
      </div>
    </div>
  );
}