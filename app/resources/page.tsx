import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources",
  description:
    "Tools I actually use to build SaaS products, ship freelance work, and run this blog.",
  path: "/resources",
});

const groups = [
  {
    label: "Dev Tools",
    items: [
      { name: "Cursor", desc: "AI-powered code editor — where most of the actual coding happens.", url: "https://cursor.com", affiliate: false },
      { name: "Next.js", desc: "The React framework behind this site, CreatorBit, and most client work.", url: "https://nextjs.org", affiliate: false },
      { name: "Tailwind CSS", desc: "Utility-first styling — fast to write, easy to keep consistent.", url: "https://tailwindcss.com", affiliate: false },
    ],
  },
  {
    label: "Hosting & Infra",
    items: [
      { name: "Vercel", desc: "Hosting for this site and CreatorBit — zero-friction deploys straight from GitHub.", url: "https://vercel.com", affiliate: false },
      { name: "Hostinger", desc: "Domain and email hosting — where hello@jenariusganlary.com actually lives.", url: "https://www.hostinger.com/in?REFERRALCODE=N0CJENARIKX5", affiliate: true },
      { name: "Supabase", desc: "Postgres, auth, and storage without managing your own database server.", url: "https://supabase.com", affiliate: false },
      { name: "Resend", desc: "Transactional email that actually lands in the inbox.", url: "https://resend.com", affiliate: false },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { name: "Claude", desc: "Used for writing, coding, and — yes — most of this blog's build process.", url: "https://claude.ai", affiliate: false },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <p className="text-xs font-mono text-mute mb-3">TOOLS I ACTUALLY USE</p>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">Resources</h1>
      <p className="text-mute mb-12 max-w-xl">
        No sponsored placements — this is the actual stack behind CreatorBit,
        Ganlary Labs client work, and this blog itself. I&apos;ll update it as
        things change.
      </p>

      {groups.map((group) => (
        <div key={group.label} className="mb-12">
          <h2 className="text-lg font-bold text-foreground mb-4">{group.label}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {group.items.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel={item.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
                className="rounded-xl bg-surface border border-line p-5 hover:border-accent transition-colors block"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm text-foreground">{item.name}</p>
                  <span className="text-mute text-xs">&rarr;</span>
                </div>
                <p className="text-xs text-mute leading-relaxed">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-xl bg-surface border border-line p-6 mt-8">
        <p className="text-xs font-mono text-mute mb-2">A NOTE ON HONESTY</p>
        <p className="text-sm text-mute">
          The Hostinger link above is an affiliate link, disclosed on the{" "}
          <a href="/affiliate-disclosure" className="text-accent hover:opacity-80 transition">
            Affiliate Disclosure page
          </a>
          . Everything else here is a plain link with no commission. I only
          list tools I&apos;ve personally used and would recommend regardless
          of any payout.
        </p>
      </div>
    </div>
  );
}