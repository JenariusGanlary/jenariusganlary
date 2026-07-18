import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

const stats = [
  { label: "Building", value: "CreatorBit & Ganlary Labs" },
  { label: "Based in", value: "Guwahati, Assam" },
  { label: "Background", value: "Zoology → Code" },
  { label: "Stack", value: "React · Node.js · Next.js" },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground">About</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pb-10 border-b border-line">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-xs font-mono text-mute mb-1">{s.label.toUpperCase()}</p>
            <p className="text-sm font-semibold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="prose-body text-mute space-y-5">
        <p>
          I started a bachelor's degree studying zoology. I now build
          software for a living. Nobody plans that path — it just happens
          when you follow whatever's genuinely interesting instead of
          whatever's supposed to come next.
        </p>
        <p>
          What actually connects the two: I've always been more interested
          in how systems behave under real conditions than how they look on
          paper. That instinct is what took me from a government office
          building an AI-powered meeting system for district staff, to a
          startup shipping five client apps on tight deadlines, to a fully
          remote US team, to a classroom teaching data structures — and now
          to a rural development programme in Arunachal Pradesh, where I
          spend my days making sure field data survives contact with spotty
          internet, tired staff, and real deadlines.
        </p>
        <p>
          That last one taught me more about building resilient systems
          than any of the "real" engineering jobs did. Turns out the
          discipline required to keep an NGO's MIS honest under pressure is
          the exact same discipline that keeps a SaaS product from quietly
          rotting after launch.
        </p>
        <p>
          These days that discipline goes into two places: <strong className="text-foreground">CreatorBit</strong>,
          a SaaS platform for the creator economy I'm building with Next.js,
          Supabase, and the Claude API — and <strong className="text-foreground">Ganlary Labs</strong>,
          where I take on freelance work building SaaS MVPs, adding AI
          features to existing products, and shipping websites for small
          businesses who need something that actually works, not another
          template.
        </p>
        <p>
          This blog is the running commentary on all of it — what I'm
          learning building CreatorBit, what freelance clients teach me
          that no course ever did, and the occasional detour into whatever
          my day job in rural development happens to teach a software
          engineer that week.
        </p>
        <p>
          If any of this overlaps with what you're building — or you need
          something built — the <a href="/contact">contact page</a> works.
        </p>
      </div>
    </div>
  );
}