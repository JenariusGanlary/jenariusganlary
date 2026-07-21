---
title: "What Managing a Rural Development Programme Taught Me About Building Products"
description: "Lessons on MIS design, stakeholder convergence, documentation discipline, and systems thinking from running field operations in rural India — and why every SaaS founder should think like a programme manager."
date: "2026-07-17"
category: "building-in-public"
thumbnail: "/images/citizens-foundation-cover.png"
---

Most lessons about building products come from other builders. Mine came from a place nobody expects: managing MIS and documentation for a rural development programme in Sagalee, Arunachal Pradesh — a role that has almost nothing to do with SaaS on paper, and almost everything to do with it underneath.

![Rural terrain illustration representing a development programme in Sagalee, Arunachal Pradesh](/images/citizens-foundation-cover.png)

## The day job that isn't a "tech" job

By day, I manage information systems and documentation for a Holistic Rural Development Programme — tracking field activities, coordinating with government departments, and keeping a programme's data honest enough to survive an external evaluation. By night, and in whatever hours are left, I build CreatorBit, a SaaS product for the creator economy.

For a long time I treated these as two unrelated lives. They aren't. The muscles are the same, and once I noticed that, both jobs got easier.

## Lesson 1: Every system fails at the data-entry layer first

The biggest failure mode in any information system — a government MIS or a SaaS dashboard — isn't the architecture. It's the moment a human has to type something in. Field data that's inconvenient to log gets logged late, wrong, or not at all. The same is true of your onboarding flow, your billing form, your support ticket intake.

![Diagram showing that systems fail at the data-entry stage, not the architecture](/images/data-entry-diagram.svg)

The fix is identical in both worlds: reduce the number of fields a human has to fill honestly under time pressure, and design for the messiest real input, not the clean demo case. A form that works perfectly for your test data and falls apart on a real user's actual mess isn't finished — it's just untested against reality.

## Lesson 2: Convergence is just integration with worse APIs

A large part of programme work is "convergence" — getting a rural development initiative to actually connect with government schemes, departments, and existing infrastructure instead of duplicating it. There's no API for a government department. There's a person, a process, and a form, and your job is to make the connection work anyway, on their timeline, not yours.

![Diagram showing convergence between a programme, government departments, and community as a form of integration](/images/convergence-diagram.svg)

This maps directly onto building a SaaS product that needs to survive contact with the real world: payment processors, email deliverability, a customer's existing tools. The unglamorous work of making systems talk to each other — waiting on someone else's release schedule, working around undocumented behavior, following up for the third time this month — is the same skill whether the "department" is a government office or a third-party API with no changelog.

## Lesson 3: Documentation is a product, not an afterthought

Programme documentation exists so that a stranger — an evaluator, a new team member, a funder — can understand what happened without you in the room to explain it. That's a strange discipline to bring to founder life, where documentation usually means a half-finished README nobody reads.

Writing documentation as if a skeptical stranger will audit it later changes how you write it. It forces a clarity you don't get from writing purely for yourself, because you already know what you meant. The same habit that survives an external programme evaluation is the habit that makes a codebase, a support doc, or an onboarding email actually usable by someone who isn't you — including future-you, six months from now, who has forgotten every assumption you're currently making.

## Lesson 4: Field reality always outranks the plan

Plans get written in offices. They get executed in villages, on unreliable connectivity, by people with constraints the plan didn't anticipate. The instinct to defend the plan instead of updating it in response to what's actually happening on the ground is the same instinct that kills product roadmaps — clinging to a feature spec instead of paying attention to what users are actually doing with, or quietly ignoring in, your product.

A plan is a hypothesis, not a commitment to reality. The moment the field disagrees with the spreadsheet, the field wins, and the job is to update the spreadsheet, not to argue with the field.

## Lesson 5: Monitoring beats motivation

Programme management runs on monitoring frameworks — indicators, timelines, checkpoints that don't rely on anyone "feeling motivated" to check progress. Motivation is unreliable by design; it comes and goes with sleep, weather, and mood. A monitoring system doesn't care how you feel. It just tells you, on a fixed schedule, whether things are actually on track.

Solo founders romanticize discipline and willpower far more than they build monitoring systems. A simple weekly checkpoint — real numbers, not vibes — does more for a SaaS product's survival than any amount of motivation ever will, for the same reason it does more for a rural programme than any pep talk to field staff.

## Lesson 6: Constraints are the real teacher

Working in a programme with a fixed grant, a fixed timeline, and a fixed community makes you resourceful in ways that infinite budget never would. You can't outsource your way out of a hard problem, so you learn to solve it directly, and that skill compounds.

Indie hackers talk about constraints as a virtue in theory — "ship with what you have" — but rarely experience genuinely non-negotiable ones. Programme work removes the theoretical part. The constraint is real, the deadline is real, and the only way through is getting better at the actual work.

## Why this matters if you're building alone

If you're a solo founder or indie hacker, you don't have a programme team, a monitoring officer, or an external evaluator checking your assumptions. You have to build that discipline into yourself: systems that fail gracefully at the human layer, integration patience, documentation for a future stranger who might just be future-you, a willingness to let reality overrule the plan, monitoring that doesn't depend on motivation, and a habit of treating constraints as the thing that makes you sharper, not the thing stopping you.

I didn't learn any of this from a startup book. I learned it managing field data in Papum Pare District. The lesson underneath is simple: rigor is rigor, wherever you find it. If your day job looks nothing like tech, look again — the transferable skill is usually sitting in plain sight.

## Frequently asked questions

**Does NGO or programme management experience actually transfer to SaaS building?**
Yes — the core skills (systems design under messy human input, cross-organization integration, documentation discipline, and monitoring independent of motivation) are directly transferable, even though the domains look unrelated on the surface.

**What is "convergence" in rural development work?**
Convergence means connecting a development programme with existing government schemes and departments instead of duplicating their work — functionally similar to API integration in software, except negotiated through people and process rather than documentation.

**Why does documentation matter so much in programme management?**
Because programmes are externally evaluated by people who weren't present for the work. Documentation has to stand on its own for a stranger to audit it, which is a much higher bar than notes written only for yourself.

**How can a solo founder replicate programme-style monitoring without a team?**
Set a fixed weekly or monthly checkpoint with real numbers — signups, revenue, churn, whatever matters for the product — reviewed on schedule regardless of mood or momentum, the same way a monitoring framework doesn't wait for anyone to feel like checking in.
