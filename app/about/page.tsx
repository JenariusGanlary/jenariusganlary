import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Full-stack developer and data analyst — from zoology to code, building CreatorBit and Ganlary Labs while working in rural development in Northeast India.",
  path: "/about",
});

const stats = [
  { label: "Building", value: "CreatorBit & Ganlary Labs" },
  { label: "Based in", value: "Guwahati, Assam" },
  { label: "Background", value: "Zoology → Code" },
  { label: "Stack", value: "React · Node.js · Next.js" },
];

const skills = [
  "Next.js", "React", "TypeScript", "Node.js", "Supabase",
  "Claude API", "SaaS Development", "SaaS Architecture",
  "MIS & Data Systems", "Artificial Intelligence", "Startups", "Indie Hacking",
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/JenariusGanlary", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jenarius-ganlary/", external: true },
  { label: "Email", href: "mailto:hello@jenariusganlary.com", external: false },
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.jenariusganlary.com/#person",
  name: "Jenarius Ganlary",
  alternateName: "Zen",
  url: "https://www.jenariusganlary.com/about",
  jobTitle: "Full-Stack Developer & Data Analyst",
  description:
    "Full-stack developer and data analyst writing about SaaS, AI tools, startups, and indie hacking. Building CreatorBit and running Ganlary Labs.",
  email: "mailto:hello@jenariusganlary.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Guwahati",
    addressRegion: "Assam",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/JenariusGanlary",
    "https://www.linkedin.com/in/jenarius-ganlary/",
  ],
  knowsAbout: skills,
  worksFor: [
    {
      "@type": "Organization",
      name: "Ganlary Labs",
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <script
        id="about-person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <h1 className="text-3xl font-bold mb-6 text-foreground">About</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            className="text-xs font-mono border border-line rounded-full px-3 py-1.5 text-foreground/80 hover:border-accent hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-line">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-xs font-mono text-mute mb-1">{s.label.toUpperCase()}</p>
            <p className="text-sm font-semibold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-10 pb-10 border-b border-line">
        <p className="text-xs font-mono text-mute mb-3">AREAS OF EXPERTISE</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-medium bg-surface border border-line rounded-full px-3 py-1.5 text-foreground/80"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="prose-body text-mute space-y-5">
        <p>
          I started a bachelor&apos;s degree studying zoology. I now build
          software for a living. Nobody plans that path — it just happens
          when you follow whatever&apos;s genuinely interesting instead of
          whatever&apos;s supposed to come next.
        </p>
        <p>
          What actually connects the two: I&apos;ve always been more interested
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
          than any of the &quot;real&quot; engineering jobs did. Turns out the
          discipline required to keep an NGO&apos;s MIS honest under pressure is
          the exact same discipline that keeps a SaaS product from quietly
          rotting after launch.
        </p>
        <p>
          These days that discipline goes into two places: <strong className="text-foreground">CreatorBit</strong>,
          a SaaS platform for the creator economy I&apos;m building with Next.js,
          Supabase, and the Claude API — and <strong className="text-foreground">Ganlary Labs</strong>,
          where I take on freelance work building SaaS MVPs, adding AI
          features to existing products, and shipping websites for small
          businesses who need something that actually works, not another
          template.
        </p>
        <p>
          This blog is the running commentary on all of it — what I&apos;m
          learning building CreatorBit, what freelance clients teach me
          that no course ever did, and the occasional detour into whatever
          my day job in rural development happens to teach a software
          engineer that week.
        </p>
        <p>
          If any of this overlaps with what you&apos;re building — or you need
          something built — the <Link href="/contact">contact page</Link> works.
        </p>
      </div>
    </div>
  );
}