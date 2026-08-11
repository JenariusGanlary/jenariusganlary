import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, SITE_URL } from "@/lib/metadata";
import { SERVICE_TIERS } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";
import ServiceTierCard from "@/components/ServiceTierCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import FAQSection from "@/components/FAQSection";
import type { FaqItem } from "@/lib/posts";

export const metadata: Metadata = buildPageMetadata({
  title: "Work With Me",
  description:
    "AI-powered products, websites, and chatbots from Ganlary Labs — an AI Product Engineering Studio. Starting at $1,500. See real project case studies and book a discovery call.",
  path: "/work-with-me",
});

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What happens after I book a call?",
    answer:
      "We'll spend the call understanding your goals, current setup, and what you actually need built. After that, you get a scoped proposal with a fixed price and timeline before any work begins — no surprise costs.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Full-Stack Website projects usually run 2–3 weeks. The AI Chatbot tier runs 3–4 weeks. Full AI + Booking System projects run 4–6 weeks. Exact timelines depend on scope and how quickly content and assets are ready.",
  },
  {
    question: "Do the listed prices include hosting and domain costs?",
    answer:
      "The listed prices cover the build itself. Hosting (typically Vercel) and domain registration are billed separately, at cost — no markup added on top.",
  },
  {
    question: "What if my project doesn't fit neatly into one of the three tiers?",
    answer:
      "That's normal — the three tiers are starting points, not rigid boundaries. Every project gets scoped individually on the discovery call based on what you actually need.",
  },
  {
    question: "Can I see examples of real projects you've built?",
    answer:
      "Yes — the case studies on this page cover projects at different stages: a live internal Govt platform, an NGO system in active pilot, and products still in development. Each one includes the problem, what was built, the stack used, and the real outcome.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Product Engineering",
  provider: {
    "@id": "https://www.jenariusganlary.com/#person",
  },
  areaServed: "Worldwide",
  url: `${SITE_URL}/work-with-me`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ganlary Labs Service Tiers",
    itemListElement: SERVICE_TIERS.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      description: tier.description,
      priceCurrency: "USD",
      price: tier.price.replace(/[^0-9]/g, ""),
    })),
  },
};

export default function WorkWithMePage() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <script
        id="work-with-me-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-16 text-center max-w-3xl mx-auto">
        <p className="text-xs font-mono text-mute mb-5">
          ~/ganlary-labs/work-with-me
        </p>
        <h1
          className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6 text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          AI products,
          <br />
          engineered and shipped.
        </h1>
        <p className="text-base md:text-lg text-mute leading-relaxed mb-9 max-w-xl mx-auto">
          I&apos;m Zen, founder of Ganlary Labs — an AI Product Engineering
          Studio. We build AI-powered products and systems for businesses,
          from custom websites and AI chatbots to fully automated booking
          flows — production-ready, not proof-of-concept.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="#services"
            className="bg-accent text-white px-5 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition"
          >
            See pricing
          </Link>
          <Link
            href="#book-a-call"
            className="border border-line text-foreground px-5 py-3 rounded-md text-sm font-medium hover:border-accent transition"
          >
            Book a discovery call
          </Link>
        </div>
      </section>

      {/* ── Services / pricing ladder ──────────────────────────────── */}
      <section id="services" className="py-10 md:py-16 border-t border-line scroll-mt-20">
        <p className="text-xs font-mono text-mute mb-3">~/ganlary-labs/services</p>
        <h2
          className="text-2xl md:text-3xl font-bold mb-3 text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Pick your starting point
        </h2>
        <p className="text-mute mb-8 md:mb-10 max-w-xl">
          Three tiers, each building on the last — from a custom website to
          a fully AI-automated client experience.
        </p>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {SERVICE_TIERS.map((tier) => (
            <ServiceTierCard key={tier.tier} tier={tier} />
          ))}
        </div>
      </section>

      {/* ── Case studies ────────────────────────────────────────────── */}
      <section className="py-10 md:py-16 border-t border-line">
        <p className="text-xs font-mono text-mute mb-3">~/ganlary-labs/case-studies</p>
        <h2
          className="text-2xl md:text-3xl font-bold mb-3 text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Real projects, real status
        </h2>
        <p className="text-mute mb-8 md:mb-10 max-w-xl">
          A mix of client work and my own products — live, piloting, and
          actively in development. No mockups, no fake testimonials.
        </p>
        <div className="flex flex-col gap-5 md:gap-6">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      {/* ── Book a call ─────────────────────────────────────────────── */}
      <section id="book-a-call" className="py-10 md:py-16 border-t border-line scroll-mt-20">
        <p className="text-xs font-mono text-mute mb-3">~/ganlary-labs/book-a-call</p>
        <h2
          className="text-2xl md:text-3xl font-bold mb-3 text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Book a discovery call
        </h2>
        <p className="text-mute mb-8 max-w-xl">
          15–20 minutes to talk through what you need. No pressure, no
          obligation — just a straight conversation about scope and fit.
        </p>
        <CalendlyEmbed />
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <FAQSection items={FAQ_ITEMS} />
    </div>
  );
}