---
title: "Gemini CLI Shut Down: How I Pick AI Tools Now"
description: "Gemini CLI shut down on June 18, 2026, despite 100k GitHub stars. Here's the framework I now use to pick AI coding tools that won't die under me."
date: "2026-07-21"
category: "saas-ai-tools"
thumbnail: "/images/gemini-cli-shut-down-cover.png"
---

I didn't use Gemini CLI every day. I want to be upfront about that, because this isn't a "Google broke my workflow" rant. But I watched it die on June 18, 2026 — a tool with over 100,000 GitHub stars and thousands of community contributions, switched off for individual users with no grace period — and it permanently changed how I evaluate every tool in my own stack.

I make tool bets constantly. CreatorBit runs on Next.js, Supabase, and the Claude API. Through Ganlary Labs, I make those same bets on behalf of freelance clients who will live with the consequences long after my invoice is paid. When a tool dies, it's not an abstract industry story for me. It's a question of whose production app breaks.

So this post does two things. First, it lays out what actually happened to Gemini CLI, because a lot of people searching for it right now are landing on comparison articles written before it was discontinued. Second, and more importantly, it walks through the four questions I now ask before betting on any AI coding tool — questions I wish had been obvious to me earlier.

## What Actually Happened to Gemini CLI

Google shut down Gemini CLI for free, Google AI Pro, and Ultra individual accounts on June 18, 2026, replacing it with Antigravity CLI — a closed-source terminal tool announced at Google I/O 2026. Enterprise users with Gemini Code Assist licenses kept their access. Everyone else got a hard cutoff: on shutdown day, the old tool simply stopped serving requests for personal accounts.

The details are what make this worth studying rather than just shrugging at.

There was no grace period. Any CI/CD pipeline, cron job, or shell script that called the `gemini` command against a personal account broke on June 18 with nothing to catch it. Google itself acknowledged that Antigravity CLI would not have 1:1 feature parity with Gemini CLI at launch. And the open-source repository — Apache 2.0 licensed, with more than 6,000 merged pull requests from external contributors — stayed public, but a repo without a backend willing to serve it is source code, not a tool.

One nuance that most of the angry threads skip: Gemini CLI technically still works if you point it at a paid Gemini API key. What died was the free and subscription-tier personal login backend. That distinction matters, and I'll come back to why.

Here's the part of the shutdown that I keep turning over:

| What survived June 18 | What got cut |
| --- | --- |
| Enterprise Gemini Code Assist licenses | Free tier individual accounts |
| Paid Gemini API key access | Google AI Pro personal accounts |
| The public source repository | Google AI Ultra personal accounts |
| Enterprise GitHub integrations | Every personal-account automation built on the tool |

Read that table as a message about who the actual customer was. Enterprises with contracts were unaffected. Individuals — including paying Pro and Ultra subscribers — were not.

## Why 100,000 GitHub Stars Didn't Save It

The uncomfortable lesson is that open source only protects you as far as the backend does. Gemini CLI was genuinely open: Apache 2.0, public repo, active external contributors. None of that mattered on shutdown day, because the thing that made the tool useful — Google's model serving behind the personal-account login — was never open and never going to be.

I had internalized "open source = safe bet" as a heuristic somewhere along the way, and this killed it for me. The correct heuristic is narrower: open source protects you when the open part is the part you depend on. A fully self-hostable database is a real hedge. An open-source client for a proprietary API is a convenience that can be revoked.

This is the same reasoning I worked through when I wrote about [why I picked Supabase over Firebase](/blog/why-i-picked-supabase-over-firebase) — Supabase's self-hostable Postgres core was a genuine exit hatch in a way that Firebase's open SDKs never were. I got that one right partly by luck. The Gemini CLI shutdown turned the luck into a rule I can apply deliberately.

![Diagram contrasting an open-source client connected to a proprietary backend against a fully self-hostable tool, showing where the dependency actually lives](/images/open-client-proprietary-backend.png)

There's a second, more cynical lesson in Google's own announcement. It cited the community's contributions and the project's success as part of the justification for consolidating into a closed replacement. Your stars, issues, and merged PRs are evidence of demand — and demand can be migrated to whatever product the vendor prefers you use next. Community traction is a signal of a tool's popularity, not its longevity. Those are different things, and I used to conflate them.

## The Gemini CLI vs Claude Code Comparison Is Now Obsolete

If you searched "Gemini CLI vs Claude Code" recently, most of what you found was written before June 18 and is now comparing a living tool against a discontinued one. The honest current answer: for individual developers, that comparison no longer exists. The choice today is between Claude Code, Antigravity CLI, and open alternatives like Aider — and several of the big comparison sites have quietly appended editor's notes redirecting readers to new articles.

I'm not going to write a fresh head-to-head here, partly because the review sites have that covered and partly because I think the comparison framing is what got people burned in the first place. Feature tables compare what tools do today. Nobody's comparison table had a row for "will still be serving your account in twelve months." That row turned out to be the only one that mattered.

Which is exactly why my evaluation process changed.

## The Four Questions I Ask Before Betting on an AI Coding Tool

The framework is four questions, and the answer to each one is knowable before you adopt anything. None of them require predicting the future — they only require looking at structure and incentives that already exist.

![Four-panel framework diagram showing the questions: is the backend open, am I the customer, what breaks on death, and what is the exit cost](/images/ai-tool-evaluation-framework.png)

### 1. Is the backend as open as the code?

Trace where the actual capability lives. If the model serving, auth, or sync layer is proprietary, the open-source license on the client is close to irrelevant for longevity purposes. Ask: if the vendor disappeared tomorrow, could a competent stranger run this end-to-end from the public repo? For Gemini CLI the answer was always no. For something like Aider pointed at a local model, the answer is yes. Most tools sit somewhere between, and it's worth knowing exactly where.

### 2. Am I the customer, or am I the churn?

Look at who kept access on June 18: enterprise license holders. Look at who lost it: individuals, including paying subscribers. When a vendor's revenue concentration is in enterprise contracts, individual-tier products are marketing expense, and marketing expenses get cut when strategy shifts. This isn't a moral judgment — it's just where the money points. I now explicitly check whether the tier I'm on is a business line or a funnel. If it's a funnel, I plan accordingly.

### 3. What breaks the day it dies?

Inventory the blast radius before adopting, not after. For a tool I only use interactively, death costs me some muscle memory and an afternoon of migration. For a tool wired into CI/CD, scheduled automations, or a client's deployment pipeline, death is an outage. The Gemini CLI shutdown broke personal-account automations overnight because there was no grace period — and vendors don't owe you one. My rule now: anything embedded in automation must either be self-hostable or trivially swappable behind an abstraction I control.

### 4. What's my exit cost, in hours?

Estimate, in actual hours, what it takes to move off the tool. Not "is there an alternative" — how long does the switch take, including retraining habits, rewriting configs, and revalidating output quality. If the answer is under a day, I'll adopt almost anything and enjoy it while it lasts. If the answer is a week of client-billable time, the tool needs to clear a much higher bar on questions one and two. Exit cost is the multiplier on every other risk.

## What This Changes for Client Work

For my own projects, a dead tool is an annoyance. For Ganlary Labs client work, it's a liability I'd be handing to someone who trusted my judgment — so the framework applies with the dials turned up. A client's MVP might not get touched by a developer for six months after handover. Every tool choice in that build is a bet that has to survive unattended.

Concretely, this changed two habits. I now document, in the handover notes, which parts of a client's stack depend on vendor-hosted AI services and what the fallback is if any of them changes terms or dies. And for anything AI-powered in a client build, the integration goes behind a thin abstraction layer — not because abstraction is free (it isn't, and I've written about paying for good tools rather than contorting around them in [5 Tools Every Solo Developer Should Actually Pay For](/blog/5-tools-every-solo-developer-should-actually-pay-for)), but because the exit cost calculation is different when the person paying it isn't you.

The Gemini CLI shutdown wasn't unusual, and that's the point. Tools in this space are being launched, pivoted, and killed faster than any ecosystem I've worked in — faster than the JavaScript framework churn people used to joke about, because this time the churn includes the serving infrastructure, not just the API surface. The developers who came out of June 18 fine weren't the ones who predicted it. They were the ones whose setups didn't care.

That's the property I'm optimizing for now: not picking winners, but building a stack where being wrong about a tool costs an afternoon instead of a quarter. If you're weighing your own AI tooling bets, that's the frame I'd steal — and you can [see more SaaS & AI Tools posts](/blog/category/saas-ai-tools) where I work through these decisions on real projects.

## Frequently asked questions

**What happened to Gemini CLI?**
Google shut down Gemini CLI for individual accounts on June 18, 2026, as part of a transition to Antigravity CLI, announced at Google I/O 2026. On that date, Gemini CLI stopped serving requests for free tier, Google AI Pro, and Google AI Ultra personal accounts. Enterprise users with Gemini Code Assist licenses were unaffected, and the open-source repository remains publicly available.

**Is Gemini CLI discontinued completely?**
No. Gemini CLI is discontinued for personal-account logins, but it still works when authenticated with a paid Gemini API key, and enterprise Gemini Code Assist license holders retain full access. What ended on June 18, 2026 was the free and subscription-tier personal backend, not the tool binary itself.

**Can I still use Gemini CLI after the shutdown?**
Yes, with a paid Gemini API key generated through Google AI Studio. The open-source binary continues to function when pointed at API key authentication; only the personal-account login backend was retired. For most individual developers, though, the practical choices are migrating to Antigravity CLI, Claude Code, or an open-source alternative like Aider.

**Is Antigravity CLI open source?**
No. Antigravity CLI is a closed-source binary written in Go, which is one of the main reasons the transition frustrated Gemini CLI's community — the tool it replaced was Apache 2.0 licensed with over 6,000 merged external pull requests. Google has stated the new CLI shares its architecture with the Antigravity desktop platform.