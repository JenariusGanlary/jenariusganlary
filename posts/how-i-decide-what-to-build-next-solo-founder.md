---
title: "How I Decide What to Build Next as a Solo Founder"
description: "My actual filters for solo founder feature prioritization — not a framework, the real reasoning I use before touching code, including where I got it wrong."
date: "2026-07-27"
category: "startups-indie-hacking"
thumbnail: "/images/solo-founder-feature-prioritization-cover.png"
---

Every few weeks someone asks me how I decide what to build next, and I used to feel a little embarrassed that my answer wasn't a framework. No MoSCoW matrix, no RICE score spreadsheet, no weighted scoring model. Just a set of questions I've built up from getting it wrong enough times that the wrong answer started to hurt in a specific, memorable way.

That's the part most feature-prioritization content skips. It's written like the person prioritizing features and the person building them are different people with different incentives — the PM wants everything, the engineer wants to say no to everything, and the framework exists to referee between them. When you're solo, there's no referee. You're both people at once, and you have to live with whichever one wins the argument in your head.

## Why Frameworks Fall Apart When You're Solo

Most prioritization frameworks assume you have slack somewhere — a backlog groomed by someone else, a roadmap review meeting, a PM who filters requests before they reach you. As a solo developer, every request arrives raw. A client emails you directly. A user replies to your own email address. There's no buffer, which means there's no time built in for "let me score this against our quarterly OKRs."

I tried running a lightweight scoring system for about a month, early on with a freelance client project. Impact, effort, confidence, each rated 1–5, multiplied together into a single number. It felt rigorous. It also took me longer to score requests than to just build the small ones, and the big ones always scored high regardless of the math because I was the one filling in the numbers, and I already had a gut feeling I was rationalizing. The framework wasn't wrong, it was just solving a coordination problem I didn't have.

![Solo founder feature prioritization decision filter shown as a simple flowchart on a desk with a laptop and notebook](/images/solo-founder-feature-decision-filter.png)

## The Filters I Actually Use

What replaced the scoring system wasn't a better framework. It was a shorter list of questions, asked in order, where an early "no" ends the conversation before I waste time on the later ones.

### Did they ask for the feature, or did they describe the problem?

This is the first filter and it catches more than half of incoming requests. Someone asking for "an export to CSV button" and someone saying "I need to show my manager weekly numbers without logging into your dashboard" might resolve to the same feature, or they might not. The second phrasing gives me room to solve it more cheaply — a scheduled email with a summary, say — instead of building the literal thing they asked for.

Early on with my own SaaS, I built a CSV export because three users asked for it in the same week. Two of them never used it after the first export. What they actually wanted was a lighter-weight status update they could forward, not a raw data dump. I'd built the feature they named instead of the outcome they wanted, and I only figured that out by asking the fourth person who requested it what they were actually going to do with the file.

### Will this still matter in three months?

Feature requests that show up because of one specific, timely event — a client's board meeting, a one-off integration need, a competitor's launch — feel urgent in the moment and often aren't durable. I've learned to ask whether the need is structural (this user's workflow will always require this) or situational (this user needs this once, for a reason that won't recur). Structural requests go on the actual list. Situational ones usually get a manual workaround, or an honest "not right now."

### Is this easy because it's right, or easy because it's easy?

This is the filter that's saved me the most time, and it's uncomfortable to apply honestly. The trap isn't the feature that's hard to build — you naturally hesitate on those and think them through. It's the one that's trivial to ship. A new toggle, a config option, a small UI tweak someone asked for in a support thread. Because it's fast, it gets built before anyone checks whether it actually solves the underlying problem, and it quietly adds to the surface area you now have to maintain forever.

I say this as someone who has a settings page with options that maybe four people have ever touched, each one added in under an hour, each one now permanent because removing a setting someone might be using feels riskier than it should.

### Can I explain, in one sentence, who this is for and why?

If I can't finish that sentence without hedging, I'm not ready to build it. "This is for users who need X because Y" should come out cleanly. When it turns into "well, it's mostly for this one client, but other people might also want it eventually, probably," that's usually a sign I'm building a one-off and telling myself it's a platform feature.

![SCREENSHOT NEEDED: A real Notion or Trello board showing a backlog of feature requests with tags/labels for prioritization](/images/placeholder-feature-request-board.png)

## Where I Got This Wrong

The clearest example was a permissions system I built for my own SaaS, based on a single client's request to restrict certain team members from seeing billing data. Reasonable request, reasonably built. Except I generalized it — instead of a narrow "hide billing from this role" toggle, I built a full role-based permission matrix with custom roles, because it felt like the "proper" way to solve it and I didn't want to build the narrow version twice.

That decision cost me roughly two extra weeks, and the general version has been used by exactly one other account since, configured almost identically to the original request. I'd have been better off shipping the narrow toggle, shipping it again for the next specific request if one came, and only generalizing once I had two or three real, different use cases to generalize from — not one request and my own guess about future ones.

The lesson wasn't "don't build permissions systems." It was that generalizing early, before you've seen the shape of a second real case, is a bet you're making with your own time, and I was making it because building the interesting version felt better than building the boring one twice.

## When Saying No Is the Right Call

The hardest version of this isn't a stranger's feature request — it's a paying client or an active user asking for something reasonable, where saying no risks the relationship. I don't have a clean trick for making that feel good. What I do have is a habit of separating "no" from "not now" and being specific about which one I mean.

A flat no, with a reason, has held up better for me than a vague "maybe later" that both of us know is a no. If a request doesn't fit the product's actual direction, I say that directly — what the product is for, why this falls outside it, and where else they might get it solved. People push back less on a specific no than a soft maybe, because the soft maybe leaves them checking back in a month, and that follow-up conversation is worse than the original one would have been.

The requests I do say "not now" to are the structural ones I believe in but don't have room for yet. Those go somewhere I'll actually see again — not a mental note, an actual list — because the fastest way to lose trust with a client or user is to tell them "great idea, I'll get to it" and then never mention it again.

If you're earlier in figuring out how to run the business side of this decision-making — what a feature is actually worth building relative to what you can charge for it — I wrote about that tradeoff in more detail in [How to Price a Freelance SaaS MVP](/blog/how-to-price-a-freelance-saas-mvp). The pricing conversation and the feature conversation turn out to be the same conversation more often than I expected when I started freelancing.

## The Actual Takeaway

None of this is a system you could hand to someone else and expect the same results, which is probably why it doesn't read like the usual prioritization content. It's closer to a set of habits built from specific mistakes — the export nobody used, the permission system built for an audience of one, the settings page that only grows. If you're solo, your prioritization framework is going to look like your mistakes eventually, whether you plan for that or not. Mine just got there a little faster than I'd have liked.

For more posts on the reasoning behind building and running a one-person software business, [see more Startups & Indie Hacking posts](/blog/category/startups-indie-hacking).

## Frequently asked questions

**How do solo founders prioritize features without a product team?**
Solo founders generally replace formal scoring frameworks with a small set of fast filters applied at the moment a request comes in — separating the stated feature from the underlying problem, checking whether the need is structural or one-time, and being honest about whether something is being built because it's right or simply because it's quick to ship.

**What is the biggest mistake solo developers make when prioritizing features?**
The most common mistake is generalizing a feature too early — building a broad, configurable version of something after only one specific request, instead of shipping the narrow version first and generalizing only once a second or third real use case appears.

**Should I say yes to every feature request from a paying client?**
No. Saying a clear, specific no with a reason tends to preserve the relationship better than a vague "maybe later," because a soft maybe leaves the request open indefinitely and the eventual follow-up conversation is usually worse than an honest no would have been upfront.

**How do you know if a feature request is worth building?**
A useful test is whether you can describe who the feature is for and why in a single, unhedged sentence. If the explanation requires qualifiers like "mostly for this one client, but maybe others too," it's often a one-off request being mistaken for a platform feature.