import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Tools I actually use to build SaaS products, ship freelance work, and run this blog.",
};

const groups = [
  {
    label: "Dev Tools",
    items: [
      { name: "Cursor", desc: "AI-powered code editor — where most of the actual coding happens." },
      { name: "Next.js", desc: "The React framework behind this site, CreatorBit, and most client work." },
      { name: "Tailwind CSS", desc: "Utility-first styling — fast to write, easy to keep consistent." },
    ],
  },
  {
    label: "Hosting & Infra",
    items: [
      { name: "Vercel", desc: "Hosting for this site and CreatorBit — zero-friction deploys straight from GitHub." },
      { name: "Supabase", desc: "Postgres, auth, and storage without managing your own database server." },
      { name: "Resend", desc: "Transactional email that actually lands in the inbox." },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { name: "Claude", desc: "Used for writing, coding, and — yes — most of this blog's build process." },
      { name: "Claude API", desc: "Powers AI features inside CreatorBit and client projects." },
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
        Ganlary Labs client work, and this blog itself. I'll update it as
        things change.
      </p>

      {groups.map((group) => (
        <div key={group.label} className="mb-12">
          <h2 className="text-lg font-bold text-foreground mb-4">{group.label}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {group.items.map((item) => (
              <div
                key={item.name}
                className="rounded-xl bg-surface border border-line p-5 hover:border-accent transition-colors"
              >
                <p className="font-semibold text-sm text-foreground mb-1">{item.name}</p>
                <p className="text-xs text-mute leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-xl bg-surface border border-line p-6 mt-8">
        <p className="text-xs font-mono text-mute mb-2">A NOTE ON HONESTY</p>
        <p className="text-sm text-mute">
          Some links on this site are affiliate links, disclosed on the{" "}
          <a href="/affiliate-disclosure" className="text-accent hover:opacity-80 transition">
            Affiliate Disclosure page
          </a>
          . I only list tools I've personally used and would recommend
          regardless of any commission.
        </p>
      </div>
    </div>
  );
}