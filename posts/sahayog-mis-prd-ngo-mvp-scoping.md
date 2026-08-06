---
title: "The PRD Behind a 5-Day NGO MIS Build: Scoping Sahayog MIS for a Real CSR Pilot"
description: "A build-in-public breakdown of the PRD behind Sahayog MIS, a multi-tenant NGO reporting platform scoped for a real CSR pilot with Citizens Foundation, and the tradeoffs behind its 5-day MVP."
date: "2026-08-06"
category: "building-in-public"
thumbnail: "/images/sahayog-mis-prd-cover.png"
---

Before I wrote a line of Next.js for Sahayog MIS, I spent a full day writing the PRD. Not a one-pager, a complete one: problem statement, org hierarchy, role permissions, data model, approval workflow, MVP scope, tech stack, and a business model. This post is that PRD, walked through, with the reasoning behind each decision — because the decisions were harder than the code turned out to be.

Sahayog MIS is a multi-tenant platform for NGOs to capture field data, route it through an approval chain, and hand leadership a live dashboard instead of a quarterly Excel scramble. I'm currently at Citizens Foundation, and this came out of watching how their HRDP (Holistic Rural Development Programme) actually reports progress today — which is to say, manually.

## Why I Wrote a Full PRD Before Touching Next.js

The instinct with a 5-day build is to skip planning and start shipping screens. I did the opposite, and it's worth explaining why.

A single-tenant internal tool tolerates a sloppy data model. You can always add a column later. A multi-tenant platform with four distinct user roles and a sequential approval chain does not — get the hierarchy or the permission boundaries wrong on day one, and you're migrating live approval data on day three. Writing the PRD first was slower on paper and faster in practice: every screen I built afterward already had a clear owner, a clear scope, and a clear "what happens when this is approved."

## The Problem: NGOs Are Drowning in Excel, WhatsApp, and Paper

The starting complaint, from talking to people who actually run these programmes, wasn't "we need a dashboard." It was narrower and more specific than that:

Field data lives across Excel sheets, WhatsApp photo threads, and paper forms, and someone has to manually stitch it into a report every time leadership or a funder asks for one. There's no single source of truth — reports, photos, meeting minutes, and field visit notes sit in disconnected folders and inboxes. Leadership only sees real project status at reporting deadlines, not as it happens. Every project area reports slightly differently, which makes org-level aggregation slow and error-prone. And when a CSR funder audit or utilization request lands, staff scramble to assemble evidence that should already have been organized as it came in.

None of these are unusual problems. What makes them worth building for is who's forced to solve them on a recurring, mandatory basis.

## Why CSR-Funded NGOs Are the Right First Customer

The beachhead isn't "NGOs" broadly — it's CSR-funded NGOs running multi-location, multi-year development programmes. Citizens Foundation's HRDP, funded by HDFC Bank Parivartan, is the design model. The first pilot is scoped even narrower: HRDP Sagalee Block, Papum Pare District, Arunachal Pradesh, Project Code P0757.

The reason this segment first: Section 135 of India's Companies Act makes CSR reporting mandatory and recurring, not optional and occasional. That turns "faster, cleaner funder reporting" from a nice-to-have into a compliance necessity, which makes the value proposition easy to justify to a decision-maker without a lot of persuasion. A tool that's merely convenient competes with inertia. A tool that reduces compliance risk competes with almost nothing.

## Modeling the Org Hierarchy: Multi-Tenant From Day One

Even though the pilot is one organization, the platform is multi-tenant from the schema up. Any NGO can register as an Organization — Citizens Foundation's real structure is the design reference, not a hardcoded assumption.

The hierarchy is three levels:

**Organization** — the NGO itself (e.g., Citizens Foundation), registered with org name, funder info, and a primary contact.

**Project Area** — a location or programme under the org (e.g., Sagalee HRDP, P0757). Citizens Foundation alone runs project areas across Assam, Arunachal Pradesh, Sikkim, Jammu & Kashmir, Jharkhand, and more.

**Self-contained execution unit** — each Project Area has its own Project Manager, its own MIS user, and its own Field Mobilizers, with no cross-visibility between Project Areas except at the Org Admin level.

That last rule — no cross-visibility — was a deliberate constraint, not an oversight. A Field Mobilizer in Arunachal Pradesh has no business seeing submissions from a project area in Jharkhand, and building that isolation into the data model early means I never have to bolt on row-level security as an afterthought.

## The Four-Role Approval Chain, and Why Each Gate Exists

Every submission passes through four gates before it counts as "real" at the org level. Here's the full role table from the PRD:

| Role | Created By | Scope | Key Actions |
|---|---|---|---|
| Org Admin | Registers the Org (root) | All Project Areas, org-wide | Create Project Areas; assign Project Managers; view aggregated dashboard with progress bars; export funder-ready reports |
| Project Manager | Org Admin | One Project Area | Define each year's activities; create MIS + Field Mobilizer accounts for their area; give final approval before Org visibility |
| MIS | Project Manager | Same one Project Area | Write/upload meeting minutes; preview Field Mobilizer submissions; verify photos, locations, and dates before passing to Project Manager |
| Field Mobilizer | Project Manager | Own submissions only | Submit field visit reports and GPS-camera photos (event name + location + GPS/date-stamped image) |
| Funder (future phase) | Org Admin | Assigned Project Area(s), read-only | View approved reports/progress; download funder-ready export on demand |

The chain isn't arbitrary. Each gate is solving a different failure mode from the problem statement:

The **MIS review** is a data-quality gate — someone checks that a photo's GPS stamp, location, and date actually line up before anything moves forward. The **Project Manager review** is a business gate — did this activity actually happen the way it's being reported, does it match what was planned for the year. Only after both gates pass does the item hit the **Org Admin dashboard**, automatically, with no separate manual roll-up step. That's the detail that kills the original problem: leadership isn't waiting for someone to compile a report, they're looking at data that already cleared two independent reviews.

All five roles share one login page. After authentication, the system reads the user's role and redirects to the correct dashboard — no separate login screen per role, which sounds trivial but removes an entire class of "which portal do I use" support questions before they start.

![Four-stage sequential approval chain from field submission to organization dashboard](/images/sahayog-mis-approval-chain-diagram.png)

[SCREENSHOT NEEDED: MIS preview queue showing a pending Field Mobilizer submission with photo, GPS location, and date awaiting verification]

## The Data Model: Organization → Project Area → Year → Activity → Upload

The data model mirrors the hierarchy, with one addition that took longer to get right than everything else: **Year/Phase**.

A Project Area's multi-year duration (say, Year 1: March 2025–April 2026) is split into yearly phases, and each phase gets its own set of activities defined fresh by the Project Manager. Activities are not fixed categories — they change year to year, because what a rural development programme does in Year 1 (say, infrastructure assessment) is not what it does in Year 3 (say, livelihood training). Every Field Mobilizer and MIS submission ties back to a specific activity within a specific year, which is what makes the "drill into a Project Area, see full approved history by year and activity" view on the Org Admin dashboard possible without any post-hoc reorganization.

![Five-level data model tree from Organization down to Upload](/images/sahayog-mis-data-model-diagram.png)

A simplified version of the core schema:

```sql
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  funder_info text,
  primary_contact text
);

create table project_areas (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id),
  name text not null,
  project_code text not null,
  project_type text not null, -- HRDP, Disaster Management, Education, Livelihood, Health, Other
  state text,
  district text,
  start_date date,
  end_date date
);

create table year_phases (
  id uuid primary key default gen_random_uuid(),
  project_area_id uuid references project_areas(id),
  label text not null, -- e.g. "Year 1"
  start_date date,
  end_date date
);

create table activities (
  id uuid primary key default gen_random_uuid(),
  year_phase_id uuid references year_phases(id),
  title text not null,
  created_by uuid references users(id)
);

create table uploads (
  id uuid primary key default gen_random_uuid(),
  activity_id uuid references activities(id),
  event_name text,
  location text,
  photo_url text,
  submitted_by uuid references users(id),
  mis_status text default 'pending',   -- pending, approved, rejected
  pm_status text default 'pending'
);
```

The two separate status columns on `uploads` — `mis_status` and `pm_status` — exist because the approval chain is sequential and each stage needs its own record, not a single overloaded status field that gets ambiguous the moment someone asks "approved by whom, exactly."

## Why Field Photos Are GPS-Stamped Instead of Captured In-App

One detail I almost got wrong: field visit photos aren't captured live inside the app. Field Mobilizers use a dedicated GPS camera app that stamps coordinates, location, and date directly onto the image, then upload that image to Sahayog MIS.

The alternative — building in-app camera capture — is more "native app" polished, but it also means owning camera permissions, GPS accuracy edge cases, and image compression across a range of low-end Android devices used in the field, for a 5-day build. Using an existing GPS camera app for capture and just verifying the stamped output shifts that entire surface of complexity out of scope, while still giving the MIS reviewer everything they need to check authenticity. It's a smaller, less impressive feature — and it's also the one that ships on time.

## What Made the Cut for a 5-Day MVP (and What Didn't)

Scoping decisions are where most of the actual product judgment in this PRD lives. Here's the split:

| In Scope for MVP | Stubbed / Future Phase |
|---|---|
| Org Admin dashboard: Project Areas, progress bars, status flags, drill-down | Public self-service Org registration (CF is seeded directly for the pilot) |
| Project Manager view: yearly activities, uploads queue, approval toggle, team creation | Multi-year historical comparison views |
| MIS view: preview queue, minutes upload, approve/verify photos-locations-dates | Funder read-only portal (mocked as a slide/screenshot for the CF pitch) |
| Field Mobilizer view: submission form, photo upload, own submission history | Offline queue/retry for weak-connectivity field submission |
| One unified login page with role-based redirect | Derived/metric-based progress — MVP uses manual % entry |
| Basic one-click export (PDF/Excel) for a Project Area | Multi-tenant public onboarding flow for other NGOs |

A few of these cuts are worth defending specifically, because they're the ones a less experienced version of me would have insisted on keeping in scope.

**Manual progress percentage instead of derived metrics.** The "correct" version of a progress bar computes percent-complete from targets versus actuals. That requires a targets data model that doesn't exist yet and won't be validated until real usage tells me what a "target" even looks like for six different project types. A Project Manager typing in a percentage is not elegant, but it ships a working dashboard on day one instead of a target-tracking system nobody's validated.

**Offline queue deferred, not ignored.** Field Mobilizers work in low-connectivity areas — Arunachal Pradesh is not a place you assume 4G. Building a robust offline-first sync layer is a real engineering project on its own, and doing it badly in 5 days is worse than not doing it and being upfront that submissions currently need connectivity. It's on the roadmap; it's not a day-three feature.

**Funder portal mocked as a screenshot.** The funder role exists in the PRD's permission table because the design needs to account for it structurally, but nobody's building a read-only funder portal for a pilot with one funder relationship. A slide showing what it would look like does the job for the pitch.

## The Tech Stack: Next.js, Supabase, Tailwind, Vercel

Frontend and backend: Next.js with the App Router. Database, auth, and file storage: Supabase, on Postgres. Styling: Tailwind CSS. Deployment: Vercel.

There's no exotic reasoning here, and that's deliberate. For a 5-day build with a hard role-based auth requirement, Supabase collapsing auth, Postgres, row-level security, and file storage into one service removes an entire category of integration work — no separate auth provider to wire up, no separate object storage bucket to configure permissions for. Next.js App Router keeps the role-based redirect logic (below) server-side and simple:

```ts
const { data: profile } = await supabase
  .from("users")
  .select("role")
  .eq("id", session.user.id)
  .single();

switch (profile.role) {
  case "org_admin":
    redirect("/dashboard/org");
  case "project_manager":
    redirect("/dashboard/pm");
  case "mis":
    redirect("/dashboard/mis");
  case "field_mobilizer":
    redirect("/dashboard/submit");
}
```

Boring stack, on purpose. The interesting part of this build was never going to be the framework choice.

## Reverse-Engineering the Business Model From CSR Grant Cycles

The business model section of the PRD came last, and it's shaped entirely by how CSR money actually moves, not by generic SaaS pricing conventions.

**Annual billing only, no monthly plans.** CSR grant funding arrives annually against approved budgets, not as a monthly discretionary spend. A monthly subscription forces an NGO's finance team to justify a recurring line item that doesn't map cleanly to how their funding is structured. Annual billing matches the shape of the money.

**Tiered by number of Project Areas**, not by seats or usage: Starter (1 area), Growth (2–5), Multi-district (6–15), Enterprise (15+, custom pricing). Project Areas are the unit that actually correlates with an NGO's operational complexity and reporting burden — an organization running 12 project areas across five states has a fundamentally different problem than one running a single site, and the pricing should track that, not headcount.

**Discount for multi-year upfront commitment**, matching typical multi-year CSR grant cycles. If a funder has already committed three years of funding to a programme, there's no reason the NGO's software vendor should force annual renegotiation on a shorter cycle than the grant itself.

None of this is validated yet. It's a hypothesis built from understanding the customer's cash flow, not from a pricing page template — and it's exactly the kind of thing the pilot should either confirm or break.

## What Success Actually Looks Like for This Pilot

The PRD defines success narrowly, on purpose:

Citizens Foundation leadership can view real (or realistic) HRDP Sagalee project data in a single live dashboard. The full submission chain — Field Mobilizer to MIS to Project Manager to Org Admin — works end to end, not just in the demo path. A funder-ready export generates in one click. And leadership agrees to a pilot period on one or two Project Areas before any wider or commercial conversation happens.

Notice what's not in that list: no revenue target, no user count, no "NGOs love it" sentiment. A pilot's job is to prove the workflow holds up against a real approval chain with real people in it, not to prove product-market fit for a multi-tenant SaaS. Those are different questions, and conflating them is how pilots turn into scope creep.

[SCREENSHOT NEEDED: Org Admin dashboard showing the HRDP Sagalee Project Area with progress bar, status flag, and drill-down into approved activity history]

## What This PRD Taught Me About Scoping Niche B2B Tools

The generalizable lesson, if there is one: the hardest part of this PRD wasn't the feature list, it was figuring out which real-world process to encode as a hard rule (the approval chain, the org isolation) versus which one to leave loose (manual progress percentages, GPS-stamped photos instead of native capture). Get that split wrong in either direction — over-engineer the loose stuff, under-build the hard rules — and a 5-day build turns into either a fragile demo or a three-week slog.

For a niche B2B tool built around a compliance-driven customer, the PRD work is mostly about understanding the customer's existing process well enough to know exactly where it can't bend. Everything downstream of that — the framework, the styling, the deploy target — is comparatively easy.

If you want more of this kind of build-in-public breakdown, [see more Building in Public posts](/blog/category/building-in-public).

## Frequently asked questions

**What is Sahayog MIS?**
Sahayog MIS is a multi-tenant web platform that lets NGOs capture field data through a structured, multi-level approval chain and gives leadership a live dashboard instead of manually compiled reports. It's being piloted with Citizens Foundation's HRDP programme in Sagalee Block, Arunachal Pradesh.

**Why does the approval chain have four separate roles instead of a simpler two-step review?**
Each stage catches a different failure mode. The MIS role verifies data quality — that photo GPS stamps, locations, and dates are accurate — while the Project Manager role verifies business accuracy, confirming the reported activity actually matches what was planned. Splitting these into separate gates means a data error and a planning error get caught by the person best positioned to catch each one, rather than relying on a single reviewer to check everything at once.

**Why is the pricing model annual-only instead of offering monthly plans?**
CSR grant funding is disbursed annually against approved budgets, not as ongoing discretionary spend. An annual-only model matches how the money actually arrives for the target customer, so finance teams don't have to justify a recurring monthly line item that doesn't correspond to their funding structure.

**What happens after the Citizens Foundation pilot?**
If the pilot proves the submission chain works end to end and leadership signs off on expanding beyond the initial one or two Project Areas, the plan is to open the platform to other CSR-funded NGOs as a multi-tenant SaaS, using the same tiered, annual-billing model. Features currently stubbed for the MVP — like a self-service funder portal and multi-year historical comparisons — would move into scope at that point.

---
