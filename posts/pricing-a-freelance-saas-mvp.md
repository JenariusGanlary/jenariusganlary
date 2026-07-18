---
title: "How to Price a Freelance SaaS MVP (A Framework, Not Just 'Charge What You're Worth')"
description: "A practical, tiered pricing framework for freelance MVP builds — how to scope it, quote it, and protect yourself from scope creep."
date: "2026-07-18"
category: "finance-builders"
thumbnail: "/images/pricing-tiers-cover.svg"
---

"Charge what you're worth" is useless advice. It tells you nothing about how to actually arrive at a number, and it's exactly the kind of platitude that leaves freelance developers either underpricing out of fear or overpricing out of guesswork — both of which lose the client. What actually works is a repeatable framework you can run every single time a new MVP request lands in your inbox.

![Three ascending pricing tiers labeled Starter, Core MVP, and Full Build, representing a freelance SaaS MVP pricing framework](/images/pricing-tiers-cover.svg)

This is the framework I actually use through Ganlary Labs, refined over enough client conversations to know exactly where it breaks down and where it holds.

## Why hourly billing fails for MVPs specifically

Hourly billing seems fair on the surface — you get paid for time worked, the client only pays for what happens. In practice, it fails for MVP-stage work for a specific reason: **the client cannot evaluate your hourly rate against anything.** They have no reference point for whether 40 hours or 400 hours is reasonable for "a working SaaS product," so every invoice becomes a negotiation instead of a transaction.

Fixed pricing flips this. The client evaluates one number against their budget once, up front, and every invoice after that is just a receipt, not a re-negotiation.

## The three-tier framework

Instead of quoting one number, quote three. This does two things: it anchors the client's expectations around scope rather than price alone, and it lets them self-select into a budget they're actually comfortable with, rather than you guessing.

### Tier 1 — Starter

The absolute minimum that counts as "working." One core user flow, no auth complexity beyond basic email/password, no admin dashboard, no integrations beyond what's structurally necessary. This tier exists mainly as an anchor — most serious clients skip it, but it makes Tier 2 look reasonable by comparison, and it catches the rare client who genuinely just needs a proof of concept.

### Tier 2 — Core MVP

This is where most real engagements land. Full auth (including password reset, not just login), a real database schema built to survive adding features later, one or two genuine integrations (Stripe, an email provider, a single third-party API), and a basic admin view so the client isn't blind to their own data. This tier should be priced to reflect that it's your default recommendation, not your cheapest option.

### Tier 3 — Full Build

Everything in Tier 2, plus whatever makes this specific client's product actually differentiated — a more complex permissions model, multiple integrations, a polished onboarding flow, admin analytics. This tier exists for clients who already know Tier 2 isn't enough; you're not selling them on it, you're pricing what they've already asked for.

## The scope triangle: the actual conversation to have

![A triangle diagram with FAST, CHEAP, and GOOD at each vertex, illustrating that a client can only choose two](/images/scope-triangle.svg)

Every client, at some point, will ask for something fast, cheap, and high-quality — all three, simultaneously. This is the single most useful diagram in freelance work, because it turns an abstract disagreement into a concrete choice. When a client pushes back on price, you're not defending your rate — you're asking which corner of the triangle they're willing to give up. That reframes the conversation from "can you do it cheaper" to "which constraint matters least to you," which is a question they can actually answer.

## Running the discovery call properly

The discovery call is where most freelance pricing mistakes actually happen — not in the quote itself, but in what you fail to ask before writing it.

**Ask about existing assets, not just the idea.** A client with a Figma file and a competitor they can point to is a fundamentally different scoping conversation than a client with a one-paragraph idea. The second one needs you to make product decisions, which is real work that belongs in the quote, not something you absorb for free because "it's just a small thing."

**Ask what happens after launch.** A client who plans to iterate weekly needs a codebase built for that from day one — more structure, more tests, more documentation. A client shipping once and walking away needs none of that. Pricing the same way for both is how you end up either overbuilding for a client who didn't need it, or underbuilding for one who did.

**Get scope changes in writing, even informally.** A single line in a follow-up email — "just to confirm, this also includes X" — is enough to catch scope creep before it becomes a dispute. You don't need a formal change-order process for a $3,000 project, but you do need a paper trail.

## Red flags worth pricing around, not ignoring

A few patterns are worth treating as pricing signals, not just personality quirks:

- **"It should be simple, right?"** — usually means the client hasn't thought through the actual complexity, and you're about to become their product manager for free unless the quote accounts for that.
- **Comparison to a product built by a funded team of ten** — "just build me something like Notion" is not a scoping request, it's a scope you need to actively push back on before quoting anything.
- **Reluctance to commit to a single point of contact** — a client with three stakeholders who all have opinions will cost you real time in alignment meetings that a solo founder client won't.

None of these should end the conversation. They should raise the number, or narrow the scope until the number makes sense again.

## What this actually protects you from

The real value of a tiered framework isn't the pricing itself — it's that it removes you from having to make a fresh judgment call, under social pressure, in every single client conversation. When a client pushes for a discount, you're not negotiating your own worth in the moment. You're pointing at a tier definition and asking which line items they'd like to remove. That's a much easier conversation to have with confidence, and it's the difference between a freelance practice that scales and one that burns you out one underpriced project at a time.

## Frequently asked questions

**Should I ever go back to hourly billing for freelance MVP work?**
Hourly billing makes more sense for open-ended maintenance or ongoing feature work after the MVP ships, where scope genuinely can't be defined in advance. For the initial MVP build itself, fixed tiered pricing gives both sides more certainty.

**How do I handle a client who wants Tier 3 features at a Tier 1 price?**
Point back to the scope triangle directly — ask which of fast, cheap, or good they're willing to flex on, rather than defending your price in isolation.

**What if a client's request doesn't fit neatly into any of the three tiers?**
Most real projects don't fit perfectly — the tiers are anchors for the conversation, not a rigid menu. Use Tier 2 as your default starting point and adjust the price up or down based on what's actually different about their scope.

**Is it normal for scope to change after the quote is sent?**
Yes, and it's not a failure of scoping — it's normal. The fix isn't preventing all scope change, it's catching it in writing early enough that adjusting the price doesn't feel like a confrontation later.