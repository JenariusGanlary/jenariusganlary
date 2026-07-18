import Link from "next/link";

export default function AuthorBio() {
  return (
    <div className="mt-10 pt-8 border-t border-line flex gap-4 items-start">
      <div className="w-12 h-12 rounded-full bg-accent shrink-0 flex items-center justify-center text-white font-bold text-sm">
        JG
      </div>
      <div>
        <p className="font-semibold text-sm text-foreground">Written by Jenarius Ganlary</p>
        <p className="text-sm text-mute leading-relaxed mt-1">
          Full-stack developer and MIS & Data Analyst, building CreatorBit
          and freelancing through Ganlary Labs. Writing about SaaS, AI, and
          startups as it happens.
        </p>
        <Link href="/about" className="text-accent text-sm font-medium hover:opacity-80 transition mt-2 inline-block">
          More about me &rarr;
        </Link>
      </div>
    </div>
  );
}