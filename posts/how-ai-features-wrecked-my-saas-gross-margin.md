---
title: "How AI Features Wrecked My SaaS Gross Margin"
description: "Adding AI features to my SaaS quietly cut my gross margin in half. Here's the real math, and what I'm doing about it as a solo builder."
date: "2026-08-01"
category: "finance-builders"
thumbnail: "/images/ai-saas-gross-margin-cover.png"
---

For most of the time I've run my SaaS, gross margin wasn't something I thought about often. It was just high, the way SaaS margins are supposed to be — hosting was cheap, the marginal cost of a new user was close to nothing, and the number took care of itself. Then I added AI features, and somewhere in the last few months I looked at the actual cost per active user and realized the number hadn't taken care of itself at all. It had quietly moved, and I hadn't been watching.

This isn't a "AI is expensive" complaint. It's the specific math of what changed, why the old mental model of SaaS margins stopped applying the moment a live model call became part of the product, and what I've actually done about it as someone running this alone with no CFO to catch it for me.

## What My Margin Used to Look Like

Traditional SaaS economics are almost boringly good once you understand them. You write software once, you serve it to as many customers as your servers can handle, and the cost of serving customer number 500 is barely different from the cost of serving customer number one. Hosting, storage, and support scale slowly and predictably. That's why 70–80% gross margin has been the assumed baseline for a healthy SaaS business for the better part of two decades, and why investors and benchmarking reports treat anything below that as a flag worth asking about.

I built on that assumption without really questioning it, because it had always just been true. Add a customer, cost barely moves, margin stays fat.

## Where the Assumption Broke

Adding AI features broke it, and the mechanism is simple even if the consequences weren't obvious to me until I actually did the math: every AI feature is a live model call, and every live model call has a direct, variable cost attached to it. That's a completely different cost structure than "software you already wrote running on a server you already pay a flat rate for." It behaves more like a utility bill than a software cost — it scales with usage, not with time.

Industry benchmarks bear this out at a scale much bigger than mine. ICONIQ's 2026 State of AI report put average AI product gross margin at roughly 52%, up from the low 40s in prior years but still well under the 80–90% ceiling that defined SaaS economics before AI features became standard. Bessemer Venture Partners' research put LLM-native company margins around 65%. Even the improving end of that range is a meaningfully different business than the one most SaaS founders, myself included, built our pricing assumptions around.

The part that actually got me wasn't the average — it was realizing that a chunk of my own cost structure had shifted from "fixed cost I already accounted for" to "variable cost tied to how heavily a given user actually uses the AI features," and I hadn't updated how I was tracking any of it. I was still mentally filing AI infrastructure spend under "hosting," a semi-fixed cost, when it had actually become something closer to a second COGS line that moves with usage in a way hosting never did.

![A simplified profit and loss breakdown showing a software product's cost stack split into traditional hosting costs and a separate AI inference cost layer](/images/saas-pnl-ai-cost-layer.png)

## The Line Item I Was Ignoring

Once I actually separated it out, the fix wasn't complicated conceptually — it was just work I'd been putting off. I split my cost tracking into what's effectively two layers: the traditional cost of running the product, which barely moves per user, and the AI inference layer, which moves directly with how much a given customer actually uses the AI-powered parts of the product. Once those are separate, you can calculate an AI-adjusted gross margin instead of one blended number that hides which part of the business is actually compressing.

That distinction matters more than it sounds like it should, because a blended margin number can look fine on average while masking the fact that your heaviest users are the ones quietly costing you the most to serve — the opposite of how SaaS unit economics are supposed to work, where a heavier user is usually just a happier customer, not a more expensive one to keep.

## What I Actually Changed

Once I could see the AI cost layer clearly, a few changes were obvious in hindsight, even though none of them were things I'd bothered to prioritize before the margin got uncomfortable enough to force the issue.

The first was routing. Not every request a user makes needs the most capable model available — a meaningful share of what any AI feature handles is genuinely simple, and a smaller, cheaper model handles it just as well. Reserving the expensive model for the requests that actually need it, instead of defaulting every call to the top-tier option, was the single change that moved the number the most.

The second was caching. A lot of AI features reuse the same system prompt and similar context across requests, and both major model providers now offer steep discounts — often in the range of 90% — on cached input tokens. That's not a minor optimization; for a product with a stable prompt structure, it's close to a full pricing tier of difference for what amounts to an engineering afternoon of work.

The third was the harder one: actually deciding what to do about pricing. A flat monthly seat price assumes usage is roughly uniform across customers, which was mostly true before AI features and stopped being true the moment usage started driving cost directly. I didn't move to a fully usage-based model — for a small, solo-run product, the billing complexity wasn't worth it yet — but I did stop pretending a flat price could absorb unlimited usage variance forever. Some form of usage awareness, even a soft cap or a tiered ceiling, is what makes flat pricing sustainable again.

None of this required a board meeting or a finance team, which is the part I'd want another solo builder to actually take from this: the tools to fix this are genuinely available at small scale. What's missing at small scale isn't the ability to fix it — it's someone whose job it is to notice before it's a real problem. That someone is you.

![A simple decision flowchart showing a cheap model handling most requests and an expensive model handling only complex edge cases](/images/model-routing-decision-flow.png)

## What I'd Tell Myself a Year Ago

If I could go back to the point where I first added AI features to the product, I'd track the AI cost layer separately from day one instead of waiting until the blended number felt uncomfortable. It's a much smaller task to build that habit early than to retrofit it once a year of usage data is tangled up in a single hosting line item. The infrastructure decisions you make early — which provider, how the backend is structured — end up mattering here too, and it's part of why I've been deliberate about the stack choices behind the product, something I've written about separately in more depth.

The uncomfortable truth is that the old SaaS margin assumption isn't coming back for products with real AI features in them. The direction of travel — cheaper per-token pricing offset by features that call the model more often, not less — means this is closer to a permanent shift in what a healthy margin looks like than a temporary growing pain. Better to build your pricing and your habits around that reality now than to keep budgeting for a margin your product doesn't actually have anymore.

For more on the money side of building alone, [see more Finance for Builders posts](https://www.jenariusganlary.com/blog/category/finance-builders).

## Frequently asked questions

**Why do AI features hurt SaaS gross margins?**
AI features typically call a language model for each request, and that call has a direct, variable cost tied to usage rather than the flat, largely fixed cost structure traditional SaaS hosting has. As usage grows, the cost grows with it, which compresses gross margin in a way that adding more traditional software users historically didn't.

**What is a normal gross margin for an AI SaaS product in 2026?**
Industry benchmarks from ICONIQ put average AI product gross margin at around 52% in 2026, and Bessemer Venture Partners' research places LLM-native company margins closer to 65%. Both are meaningfully below the 70–90% range that's long been considered standard for traditional SaaS.

**How can a solo founder reduce AI infrastructure costs without a big engineering team?**
Two of the highest-impact changes are model routing — sending simple requests to a cheaper, smaller model and reserving expensive models for genuinely complex requests — and prompt caching, which can cut costs substantially on repeated context. Both are achievable without a dedicated infrastructure team.

**Should I switch to usage-based pricing if AI costs are compressing my margin?**
Not necessarily right away. Full usage-based pricing adds real billing complexity that may not be worth it for a small or solo-run product. A useful middle step is adding soft usage caps or tiered ceilings to a flat price, which limits the worst-case cost exposure without requiring a full pricing model overhaul.