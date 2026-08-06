---
title: "Market Research Reports Are Not a Business Plan"
description: "I built a SaaS feature nobody asked for, then finally did the market research. Here's what backwards validation taught me about picking what to build."
date: "2026-08-06"
category: "startups-indie-hacking"
thumbnail: "/images/market-research-reports-not-a-business-plan-cover.png"
---

I built a scheduling feature nobody used. The idea was simple: let creators using my SaaS coordinate content drops with collaborators — set a date, tag who's involved, get a nudge before it's due. I built it over a long weekend because I was excited, shipped it, and then watched the usage numbers for six weeks. A handful of people opened it once. Almost nobody came back to it a second time.

My first instinct was that people hadn't found it yet. So I added an onboarding tooltip pointing at it. Then a banner on the dashboard. Then I moved it higher in the nav. None of that changed anything, because the problem was never discovery. The problem was that I never asked anyone if they wanted it before I built it.

Last week, in a moment of "let me finally do this properly," I ran three separate AI-generated market research reports through Claude — one on general software pain points, one on spreadsheet-dependent industries, one on the current AI startup funding landscape. Thousands of words of synthesized Reddit complaints, G2 reviews, funding data, and market sizing. All of it useful. None of it something I needed before I built the wrong thing — except it absolutely was, and I just hadn't looked.

This is the part nobody tells you when you're solo and moving fast: doing the research after you've already built something doesn't just sting because of the wasted time. It shows you, in painfully specific terms, exactly which questions you skipped and why skipping them felt reasonable at the time.

## The Feature Nobody Asked For

I didn't build the scheduling feature because a user asked for it. I built it because I personally found it annoying to track content drop dates across a few different collaborators of my own, and I assumed that annoyance was universal enough to be worth solving. That assumption never got tested. I didn't message the handful of active users I had and ask how they currently handled this, or whether they even coordinated content with collaborators often enough for it to matter. I skipped straight to building because building felt like the productive thing to do, and asking felt like it would slow me down.

Looking back, the signs that this wasn't a real pain point were available the whole time. Nobody had mentioned scheduling friction in support messages. Nobody had asked for anything close to it in the handful of feedback conversations I'd had. I wasn't ignoring evidence that it mattered — there simply wasn't any, and I never checked for its absence before I started building.

That's the part that stings most in hindsight. It wasn't a case of misreading ambiguous signals. It was a case of not looking for signals at all.

![SCREENSHOT NEEDED: A real analytics dashboard screenshot showing near-flat usage on an underused feature over several weeks](/images/placeholder-feature-usage-flatline.png)

## What I Skipped, And Why It Felt Fine At The Time

When you're solo, "shipping" feels like the only legible form of progress. A finished feature is something you can point to. A conversation with five potential users, and a page of notes about what you learned, doesn't feel like progress in the same visceral way — even though it's very likely the higher-leverage activity.

I skipped three specific things, and I can name them clearly now because the research forced me to:

- I never asked whether this was a top-five daily frustration for my users or a top-fifty one they'd barely notice.
- I never checked whether they'd pay for it as a standalone thing, or whether they expected it bundled into a tool they already used and wouldn't value it as new.
- I never asked what they were currently doing instead — a spreadsheet, a shared doc, nothing at all — which would have told me whether this was actually removing friction or just adding a new thing to learn.

None of these questions require a market research report. They require five short conversations. I had access to exactly the users who could have answered them, and I didn't ask, because asking felt like delay and building felt like momentum.

## What the Research Would Have Told Me

Going back through the reports now, with the benefit of hindsight, is a strange experience. The market pain-point research I ran covers categories like CRM frustration, project visibility, and the "one-person business stack" problem — small teams stitching together five disconnected tools because nothing fits their scale cleanly. None of that is exactly what I built. But the pattern underneath it is the same pattern I ignored: people don't want more software, they want fewer, better-integrated pieces of software that solve one specific job well.

My feature added a piece. It didn't remove friction from an existing workflow — it created a new thing to learn, configure, and remember to open. If I'd read even a summary of "subscription fatigue" and "why people abandon tools with a learning curve" before building, I would have asked a different first question: not "can I build this?" but "does this remove a step, or add one?"

That's the gap between interesting data and a decision-making filter. The report told me the pattern existed. It couldn't force me to apply it to my own idea — I had to go looking for the pattern on purpose, which is the part I skipped.

## The Gap Between "Real Pain Point" and "Buildable By One Person"

Here's the thing that took me the longest to actually internalize, and it's the reason I'm writing this post instead of just quietly killing the feature and moving on.

A market research report — even a genuinely good one — tells you a pain point is real. It does not tell you whether you, alone, right now, can capture it. Those are different questions, and conflating them is its own failure mode, separate from but related to the one I just described.

| Signal in the report | What it actually tells you | What it doesn't tell you |
|---|---|---|
| "$X billion market, growing at Y% CAGR" | The category has money in it | Whether a solo founder can get a first customer without a sales team |
| "Users report spending N hours a week on a manual workaround" | The pain is real and measurable | Whether those users will pay you specifically, today, for a fix |
| "Vertical SaaS company reached $100M ARR in this space" | Proof the model can work at scale | That company likely raised capital and hired — not evidence of a solo path |
| "73% of successful products target a micro-niche" | Narrow beats broad | Doesn't tell you which micro-niche, or whether you have real access to it |

The reports I read were full of genuinely exciting numbers — freight brokerage software growing into a multi-billion dollar market, healthcare compliance tooling expanding fast, the EU AI Act creating urgent demand for compliance products. All true. All also describing markets that need domain expertise, long sales cycles, or regulatory trust I don't have and can't fake. Reading market size as opportunity, without checking it against "can I actually reach the first ten customers alone," is the same mistake as skipping user conversations — just dressed up in better data.

## The Filter I Use Now

I don't think the answer is "do more research before building." I actually think that's slightly the wrong lesson — research alone wouldn't have stopped me, because I could easily have read those same reports and still talked myself into building the scheduling feature, just with more confidence going in. The actual fix is a short list of questions I now force myself through before I write a line of code, and none of them require a market report:

- Who, by name or by very specific description, wants this right now? Not "creators" — an actual person I could message today.
- Does this remove a step from something they already do, or add a new thing to learn?
- Could I get this in front of five real users this week, not after I build it — before?
- If I can't reach the first ten customers without paid ads or a sales team, do I actually have a plan, or am I hoping the market size covers for that?

That last one is the filter I skipped most consistently. It's easy to look at a report and see a huge, painful, well-documented market and stop there, as if market size were the same thing as founder fit. It isn't. My day job doing MIS and reporting work on a rural development programme has actually made this obvious in a different context — the pain points in that world are enormous and completely real, and still, most of them aren't things I could solve alone as a side project, because the actual constraint isn't the size of the problem. It's whether I have a real, specific point of access into it.

That's the filter that would have stopped me from building the scheduling feature. Not more data. A sharper question about my own reach.

## What Changed In How I Work Now

The scheduling feature is still live, quietly, for the handful of people who did use it. I haven't ripped it out — that would just be a second decision made without asking anyone. But it's the last feature I built that way. Before I start anything now, I write down the specific person I think wants it, by name if I can, and what they're doing instead today. If I can't fill in both blanks, I don't start building yet. I go find the answer first.

That single change is a lot less exciting than "I ran a market analysis." But it's the one that would have actually stopped me.

## Where This Leaves Me

I'm not throwing out the reports. They're genuinely useful for spotting patterns and ruling out saturated categories — I now know not to build another AI writing wrapper, for instance, and that's worth knowing before you start. But I've stopped treating "the market research says this is a real pain point" as a green light on its own. It's one input. The other input, the one I used to skip, is asking whether I specifically have a shot at reaching the people who feel that pain — before I build anything for them.

If you want more on how I actually decide what to work on next as a solo builder, I wrote about the process in more detail in [how I decide what to build next as a solo founder](/blog/how-i-decide-what-to-build-next-solo-founder). And if you're working through similar decisions, there's more in [Startups & Indie Hacking](/blog/category/startups-indie-hacking).

## Frequently asked questions

**Should I do market research before building a SaaS product as a solo founder?**
Market research is useful for spotting saturated categories and understanding general pain points, but it isn't a substitute for talking directly to potential users. A report can tell you a problem is real and widespread; it can't tell you whether you specifically have a way to reach the people who have it. Treat research as a filter for what to avoid, not a green light for what to build.

**How do I know if a market opportunity is realistic for a solo founder to pursue?**
Look past market size and growth percentage. Ask whether you can reach your first ten customers without a sales team, whether the category requires domain expertise or regulatory trust you don't have, and whether you have a specific, non-obvious point of access to the people experiencing the pain. Large, well-documented markets are often the hardest for one person to break into precisely because they've attracted venture-backed competitors with sales teams.

**What's the difference between a real pain point and a buildable opportunity?**
A pain point becomes a buildable opportunity when it's narrow enough for one person to solve, when the people experiencing it are reachable without paid acquisition or enterprise sales, and when solving it removes a step from an existing workflow rather than adding a new tool to learn. A pain point can be completely real and still be the wrong fit for a solo founder.

**What should I do if I've already built something and nobody's using it?**
Talk to the handful of users you do have, or people who match your target user, before building anything else. Ask specifically what they'd need to be true for this to be worth using, rather than assuming more features or better marketing will fix low adoption. Sometimes the honest answer is that the core idea needs to change, not the execution around it.