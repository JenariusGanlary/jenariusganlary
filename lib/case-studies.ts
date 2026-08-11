export type CaseStudyStatus = "live" | "pilot" | "building";

export interface CaseStudy {
  slug: string;
  name: string;
  status: CaseStudyStatus;
  statusLabel: string;
  problem: string;
  build: string;
  stack: string[];
  outcome: string;
  url?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "creatorbit",
    name: "CreatorBit",
    status: "building",
    statusLabel: "247+ waitlisted",
    problem:
      "Content creators were juggling 5+ separate tools across their workflow — one for ideation, another for scripting, another for scheduling, another for cross-platform distribution, and yet another for analytics. Switching between disconnected tools broke focus and made it hard to see the full picture of what was actually working.",
    build:
      "CreatorBit is architected as a unified operating system for content creators — replacing the scattered toolchain of idea generation, scripting, scheduling, cross-platform publishing, and analytics with one connected platform. The vision: creators go from idea to published content in a single workflow, instead of losing hours a week switching between five disconnected apps. Ganlary Labs is actively building out the platform, with the core AI-driven modules — idea generation, script writing, and automated multi-platform publishing — in active development.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Supabase",
      "Clerk",
      "Claude Sonnet",
      "Claude Haiku",
      "Stripe",
      "Resend",
      "Vercel",
      "Cloudflare",
    ],
    outcome:
      "247+ creators have joined the waitlist ahead of launch, validating demand for a unified content creation platform before the core product has even shipped. Ganlary Labs is continuing active development on the AI-driven modules, with founding-member pricing locked in for early waitlist signups at launch.",
  },
  {
    slug: "schedullr",
    name: "Schedullr",
    status: "live",
    statusLabel: "Live — NIC internal",
    problem:
      "Govt officials needed a way to manage meetings — scheduling, participant coordination, document handling, and meeting minutes — without relying on scattered emails, paper trails, and disconnected tools. Existing generic scheduling apps weren't built for the specific workflow of Govt meetings: multiple participants with defined roles, official documentation requirements, and formal meeting records that need to be tracked and referenced later.",
    build:
      "A full meeting management platform purpose-built for Govt officials, replacing manual, paper-based meeting processes end-to-end. Officials can schedule meetings, assign assistants by email invite, and manage participants with defined roles — including automated reminders sent directly to a PA when a meeting is scheduled on their official's behalf. All meeting-related documents are stored securely in the cloud instead of physical files, with an AI-powered document summarizer built directly into the app so officials can get the gist of lengthy documents without reading them in full. Meeting minutes and action items can be written directly within the platform by assigned assistants, and automated email notifications handle invitations and cancellations — giving officials a complete digital record in place of scattered paperwork and email threads.",
    stack: [
      "Next.js 15.2",
      "React 18",
      "Tailwind CSS",
      "shadcn/ui",
      "MongoDB",
      "JWT Auth",
      "Google Gemini API",
      "Brevo API",
      "React Hook Form",
      "Zod",
    ],
    outcome:
      "Schedullr is live and actively hosted under NIC (National Informatics Centre) for internal Govt use. As an internal Govt system, it's not publicly accessible — which itself reflects the level of trust and security requirements the platform was built to meet.",
  },
  {
    slug: "serviceman-ai",
    name: "Serviceman AI",
    status: "building",
    statusLabel: "200+ waitlisted",
    problem:
      "Students preparing for Govt exams needed a way to practice that actually built competitive exam-day readiness — not just static question banks. Most exam prep tools are passive (read, memorize, repeat) and don't recreate the pressure or competitive edge that helps students perform under real exam conditions.",
    build:
      "Serviceman AI is designed as a gamified, competitive exam prep platform for Govt exam aspirants — across categories including UPSC, SSC, Banking, Defense, Teaching, and State PSC. The vision centers on mock tests, leaderboards, and game-like competitive elements that recreate real exam pressure, moving students beyond passive memorization toward active, competitive practice. Ganlary Labs is currently building out the platform, starting with waitlist validation across exam categories.",
    stack: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "MongoDB",
      "Mongoose",
      "Claude API",
    ],
    outcome:
      "200+ students preparing for Govt exams have joined the waitlist, spanning categories including UPSC, SSC, Banking, Defense, Teaching, and State PSC — signaling strong demand for a more competitive, engaging approach to exam prep. Ganlary Labs is continuing development on the core platform, including mock tests, leaderboards, and Claude-powered personalized study plans for Pro users.",
  },
  {
    slug: "site-ai-chatbot",
    name: "jenariusganlary.com AI Chatbot",
    status: "building",
    statusLabel: "In development",
    problem:
      "Visitors to jenariusganlary.com — potential clients evaluating Ganlary Labs — often have quick questions about pricing, availability, or project fit that either go unanswered or require a full contact form and a wait for a reply. A static site has no way to give instant, contextual answers.",
    build:
      "An AI-powered chatbot embedded directly into jenariusganlary.com, capable of answering visitor questions about services, pricing, past projects, and general Q&A — in real time, without needing to submit a contact form and wait. Beyond serving visitors, it doubles as a live, working demonstration of the exact \u201cWebsite + AI Chatbot\u201d service tier offered through Ganlary Labs — visitors don't just read about the offering, they experience it directly on this site.",
    stack: ["Next.js", "TypeScript", "Google Gemini API"],
    outcome:
      "Currently in active development. Once live, this will be the flagship example for the AI Chatbot service tier — proof-of-concept and case study in one, running right here on this site.",
  },
  {
    slug: "sahayog-mis",
    name: "Sahayog MIS",
    status: "pilot",
    statusLabel: "Piloting — Citizens Foundation",
    problem:
      "NGOs running multi-location development programmes typically manage field data through scattered Excel sheets, WhatsApp photo threads, and manually compiled reports. This creates no single source of truth, delayed visibility for leadership, inconsistent reporting across project areas, and reactive scrambling whenever a funder audit or utilization request comes in — when that evidence should already be organized.",
    build:
      "Sahayog MIS is a multi-tenant platform that digitizes how NGOs capture and report field data — replacing scattered Excel sheets, WhatsApp photo threads, and manually compiled reports with one structured system. Data flows through a clear four-role approval chain: Field Mobilizers submit GPS and date-stamped photo reports from the field, an MIS coordinator verifies and previews each submission, a Project Manager gives final approval, and once approved, the data automatically appears on the Org Admin's dashboard — no manual roll-up step required. Leadership gets a real-time view of every project area's progress, with one-click funder-ready exports on demand instead of scrambling to assemble evidence when an audit or utilization request comes in.",
    stack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
    outcome:
      "Sahayog MIS is being piloted at Citizens Foundation's HRDP Sagalee Block programme in Arunachal Pradesh — chosen as the first deployment because I work there directly as a Data Analyst, giving Ganlary Labs firsthand insight into the exact reporting problems the platform solves. The full submission chain — Field Mobilizer → MIS → Project Manager → Org Admin — is designed to work end to end, with funder-ready exports built for CSR compliance reporting. Once validated internally, the same platform is intended to be offered as a multi-tenant SaaS to other CSR-funded NGOs facing the same reporting challenges.",
  },
];