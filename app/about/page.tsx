import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">About</h1>
      <div className="prose-body text-mute space-y-5">
        <p>
          I'm Jenarius Ganlary — a software engineer, SaaS founder, and
          technical writer based in Arunachal Pradesh, India.
        </p>
        <p>
          By day, I manage MIS and documentation for a Holistic Rural
          Development Programme in Sagalee, coordinating field data,
          government convergence strategy, and programme monitoring for a
          CSR-funded initiative. It's not a typical "tech job" on paper, but
          it's taught me more about building resilient systems, honest
          documentation, and working within real constraints than most
          engineering roles do.
        </p>
        <p>
          Outside of that, I'm building <strong className="text-foreground">CreatorBit</strong>,
          a SaaS platform for the creator economy, using Next.js, Supabase,
          and the Claude API. This blog is where I write about that build —
          the tech decisions, the failures, the finance side of running a
          product — alongside broader notes on SaaS, AI tools, and startups
          for other founders and indie hackers.
        </p>
        <p>
          I hold an MCA from the University of Science and Technology
          Meghalaya, and before this I worked at NIC/MeitY in Guwahati,
          MetaMorphose, and Headstarter AI.
        </p>
        <p>
          When I'm not building or writing, I'm usually out on my Royal
          Enfield, tinkering with a recording setup, or losing an hour to
          Mobile Legends.
        </p>
        <p>
          If you're building something similar — or just want to talk shop —
          reach out through the <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}