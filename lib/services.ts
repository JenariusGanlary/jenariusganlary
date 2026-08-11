export interface ServiceTier {
  tier: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
}

export const SERVICE_TIERS: ServiceTier[] = [
  {
    tier: "01",
    name: "Full-Stack Website",
    price: "$1,500",
    description:
      "A custom-built 6–8 page site — responsive, SEO-optimized, and built to actually convert, not just look nice.",
    features: [
      "Custom design, no templates",
      "6–8 pages, fully responsive",
      "SEO foundation — metadata, sitemap, structured data",
      "Built on Next.js for real performance",
    ],
    cta: "Start with a website",
  },
  {
    tier: "02",
    name: "Website + AI Chatbot",
    price: "$2,000",
    description:
      "Everything in the Full-Stack tier, plus an AI chatbot that answers visitor questions in real time — no more waiting on a contact form.",
    features: [
      "Everything in Tier 01",
      "Custom AI chatbot trained on your business",
      "Real-time Q&A for visitors, day or night",
      "See it live on this very site — the chat widget in the corner",
    ],
    cta: "Add an AI chatbot",
  },
  {
    tier: "03",
    name: "Full AI + Booking System",
    price: "$2,500",
    description:
      "The complete package — AI chatbot plus an integrated booking system, so visitors go from question to booked appointment without leaving the site.",
    features: [
      "Everything in Tier 02",
      "Integrated AI-assisted booking & scheduling",
      "End-to-end automation from inquiry to booked call",
      "Priority build & support",
    ],
    cta: "Go fully automated",
  },
];