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
  "Java", "Spring Boot",
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
    "https://x.com/jenariusdev",
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
          I began my academic career studying zoology. Today, I build
          software professionally. It is not a conventional path, but it
          reflects a consistent principle: I follow what is genuinely
          interesting rather than what is expected to come next.
        </p>
        <p>
          What connects the two disciplines is a focus on how systems
          behave under real conditions rather than how they appear on
          paper. That focus has taken me from building an AI-powered
          meeting system for district government staff, to shipping five
          client applications on tight deadlines at a startup, to working
          with a fully remote U.S. team, to teaching data structures in a
          classroom — and now to a rural development programme in
          Arunachal Pradesh, where I ensure field data holds up against
          unreliable internet, overextended staff, and real deadlines.
        </p>
        <p>
          That last role has taught me more about building resilient
          systems than any traditional engineering position. Keeping an
          NGO&apos;s MIS accurate under pressure requires the same discipline
          it takes to keep a SaaS product from quietly degrading after
          launch.
        </p>
        <p>
          That discipline currently goes into two things: <strong className="text-foreground">CreatorBit</strong>,
          a SaaS platform for the creator economy built with Next.js,
          Supabase, and the Claude API — and <strong className="text-foreground">Ganlary Labs</strong>,
          where I take on freelance work building SaaS MVPs, integrating AI
          features into existing products, and developing websites for
          businesses that need something functional and well-built, not
          another template.
        </p>
        <p>
          This blog documents that work in progress — lessons from building
          CreatorBit, insights freelance clients bring that no course ever
          covered, and the occasional intersection between rural
          development work and software engineering.
        </p>
        <p>
          If any of this overlaps with what you&apos;re building — or you need
          something built — the <Link href="/contact">contact page</Link> works.
        </p>
      </div>
    </div>
  );
}