---
title: "What Changed in My Head When I Moved From IT to Rural Livelihoods Work"
description: "A mindset shift from tech-sector thinking to NGO field work — and why the two aren't as far apart as they look."
date: "2026-07-19"
category: "building-in-public"
thumbnail: "/images/it-to-ngo-cover.png"
---

I've spent the last few years moving between government IT projects, a startup, a fully remote US team, a classroom — and now, a rural development programme in Sagalee, Arunachal Pradesh, coordinating MIS and livelihood data for households I've actually met. Nothing in my computer science degree prepared me for this job. Nothing in this job resembles what I thought "tech work" meant. And somewhere in the middle of that mismatch, my actual thinking changed in ways I didn't expect.

![A laptop icon on one side and hills representing rural livelihoods on the other, connected by a dashed bridge, symbolizing the transition from IT sector to rural development work](/images/it-to-ngo-cover.png)

This isn't a "lessons learned" post about MIS systems — I've written that one already. This is about the actual mindset shift underneath it, because that's the part nobody warns you about when you take a job that looks, on paper, like a step sideways from "real" tech work.

## The first thing that broke: my definition of success

In every IT role I'd held before this, success had a shape I recognized instantly — a feature shipped, a sprint closed, a user-growth number that moved in the right direction. It was measurable in a way that felt objective, almost comforting.

Success in rural livelihoods work looks different, and at first I genuinely didn't know how to recognize it. A household that stopped needing a loan they'd relied on for years. A self-help group that started keeping its own records without being told to. A convergence application that finally got approved after three follow-ups, quietly changing what one family could afford next season. None of this shows up on a dashboard the way a conversion rate does. I had to relearn what "progress" even meant before I could feel like I was doing my job well.

## The second thing: what "the user" actually means

Tech culture talks about "the user" constantly, but there's an unspoken assumption baked into it — the user has a choice. They can close the app, switch to a competitor, ignore your onboarding flow if it's bad enough. That assumption shapes almost every product decision a tech worker makes, even unconsciously.

Field work has no such luxury built in. The people whose data I collect, whose forms I help complete, whose meetings I coordinate — many of them have no alternative system to switch to if mine is confusing or slow. That's not a minor detail; it's a completely different design responsibility. When your "user" can't just leave, the burden of making the system work shifts entirely onto you, not onto their tolerance for a bad interface.

## The third thing: patience stopped being a soft skill

In tech, patience is something you're told to have — with junior developers, with slow-moving stakeholders, with a client who doesn't understand the timeline. It's treated as a personality trait, nice to have but not load-bearing.

In field work, patience is structural. Trust with a community isn't a UX pattern you can A/B test into existence faster. A convergence application moving through a government department has its own pace, and no amount of urgency on my end changes it. I had to stop treating slowness as a problem to be engineered away and start treating it as a genuine constraint to design around — which, looking back, is a skill actual engineering discipline should have taught me all along, and somehow hadn't.

![A two-column comparison showing IT sector assumptions on the left and field reality on the right, covering trust, success metrics, data collection, adaptability, and connectivity](/images/assumptions-vs-reality.svg)

## The moment it actually clicked

There's a specific moment worth describing rather than summarizing. A few months into this role, I was helping coordinate a convergence application — connecting a household to an existing government livelihood scheme instead of the programme funding it separately. In my old life, this would have been an API integration: check the endpoint, map the fields, handle the error states, ship it. In this life, it meant multiple visits to a block office, a physical file that had to move between departments, and a genuine possibility that a signature could sit on someone's desk for weeks with no notification, no status page, no retry logic. The "system" was real, but it ran on people, paper, and goodwill instead of servers and requests.

I remember being frustrated at first, the same reflexive frustration I'd feel watching a slow API in production. Then I realized the frustration itself was the tell — I was still importing tech-world expectations into a context that had never agreed to them. Once I stopped expecting field systems to behave like software systems, I stopped being frustrated by the mismatch and started being useful within it — a tracking spreadsheet that made follow-ups visible instead of relying on memory, a simple checklist that meant nothing got lost between visits. But only once I'd stopped trying to force the field to match my mental model of how systems "should" work.

## Where tech and NGOs actually do align

None of this means tech skills don't matter in this world — they matter enormously, just differently than I expected walking in.

**Documentation discipline transfers directly.** NGOs live or die on donor and government reporting. The instinct to write clearly for a reader who wasn't in the room — the same instinct that makes a good API doc or onboarding email — is exactly what makes a programme's reporting survive an external evaluation.

**Automation is genuinely underused, not overused.** Most of the manual effort in NGO data work isn't complex — it's repetitive. A Python script that saves a field team two hours a week isn't a flashy engineering win, but it's a bigger real-world impact than most feature launches I shipped in my previous roles, measured purely in hours of human time returned to people who had very little of it to spare.

**Systems thinking is the actual shared language.** Whether you're designing a database schema or a convergence strategy connecting a programme to five different government departments, the underlying skill is the same: understanding how parts of a system depend on each other, and where the weak links actually are. NGOs rarely have anyone trained to think this way explicitly — which means it's one of the highest-leverage things a tech background can quietly bring into the room.

**The gap is translation, not capability.** Most NGO staff aren't short on intelligence or dedication — they're short on people who can translate a real operational problem into something a spreadsheet, a script, or a simple tool can actually solve. That translation role is exactly what a lot of tech workers are already good at; it just doesn't look like "tech work" wearing a hoodie in an office.

## The part where I almost quit

I want to be honest about the part of this story that doesn't fit neatly into a lessons-learned framework, because most posts like this skip it. There was a stretch, maybe two months in, where I seriously considered whether this was a mistake — whether I'd traded a legible, well-compensated tech career path for something that felt directionless by comparison. The metrics I knew how to chase weren't available. The peer group that used to validate my work — other developers, a manager doing code review — wasn't there in the same way. It's genuinely disorienting to be good at something and then step into a context where that specific skill barely registers as relevant on a given day.

What got me through it wasn't a mindset hack. It was small, concrete proof that the translation actually worked — watching a Python script I wrote save a colleague real hours in a week, watching a dashboard I built get used unprompted in a stakeholder meeting because it was genuinely easier than the alternative. Those moments were smaller and quieter than shipping a feature to thousands of users, but they were also more legible to me, once I let myself measure them on their own terms instead of my old ones.

## What I'd tell someone considering this move

If you're a developer or IT professional wondering whether a move into NGO or social-impact work is a step back — it isn't, but it will genuinely change how you measure your own competence, and that's uncomfortable before it's useful.

You will not get the fast feedback loops you're used to. You will not always get to use your best tools. You will spend real time on things that have nothing to do with code — coordinating people, chasing signatures, explaining the same process for the fifth time to a new stakeholder. And somewhere in that friction, if you let it, your actual engineering instincts get sharper, not duller — because you're forced to solve real constraints instead of hypothetical ones.

I'm not making the case that everyone should leave a comfortable tech job for field-based NGO work — that's not realistic advice. But I do think there's real value in spending time, even a short stretch, in an environment where your usual tools and metrics don't automatically apply. It's the fastest way I've found to see which of your skills are genuinely transferable versus which were just comfortable within one specific context. There's also a practical career argument buried in here: founders and hiring managers increasingly say they want people who can operate with ambiguity and build for users unlike themselves. Field-based NGO work is one of the few environments that forces this daily, not as a stated value on a careers page, but as an operating condition.

I still write code. I still build CreatorBit on the side, still take on freelance work through Ganlary Labs. But the way I think about what a "good system" even means has been permanently altered by watching what a bad one costs someone who has no way to route around it.

## Frequently asked questions

**Is a background in IT actually useful in NGO or social-impact work?**
Yes, though not always in the obvious ways — documentation discipline, systems thinking, and automation skills transfer directly, even when the day-to-day work looks nothing like a typical tech job.

**What's the biggest mindset shift moving from tech to field-based NGO work?**
Redefining what "success" and "the user" mean — field work rarely offers the fast, measurable feedback loops or user choice that tech culture is built around.

**Does this kind of work slow down a tech career?**
It changes the shape of the experience more than it slows it — systems thinking, resilience, and translating real operational problems into practical solutions are transferable skills that most purely commercial roles don't force you to develop as directly.

**How can NGOs make better use of tech-background staff or volunteers?**
By treating them as translators between operational problems and practical tools — not just "IT support" — since the highest-leverage work is usually automating repetitive manual effort, not building anything flashy.