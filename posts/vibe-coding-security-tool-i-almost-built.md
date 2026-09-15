---
title: "The Vibe Coding Bug I Almost Built a Security Tool For"
description: "I looked into building a scanner for the Supabase bug now linked to the Tea app panic and a real CVE. Here's what needs checking before you ship."
date: "2026-09-15"
category: "building-in-public"
thumbnail: "/images/vibe-coding-security-tool-cover.webp"
---

The Tea app breach that leaked 72,000 selfies and government IDs last year wasn't caused by vibe coding. I know that's not the story that went viral, but it's the story Tea itself told, and it checks out. The actual vibe-coding breach — the one that should worry you if you've shipped anything with Lovable, Bolt, or Cursor on top of Supabase — happened separately, hit 170 live apps, and got a CVE number almost nobody outside security circles has heard of. I know the mechanics of that second one uncomfortably well, because I spent a few weeks last year scoping a tool to catch it before I decided not to build it.

## What Actually Happened at Tea

Tea, a women-only dating safety app that required a selfie and a government ID to join, had a Firebase storage bucket sitting open with no authentication. In July 2025, someone found the URL on 4chan and pulled 72,000 images out of it: roughly 13,000 verification selfies and IDs, and 59,000 images from posts, comments, and DMs. Some of the selfies still had location data attached, and people started mapping where users lived from their own verification photos. A second breach days later exposed 1.1 million private messages.

It's a genuinely bad breach, and it deserved the coverage it got. But the vulnerable system was legacy code from before February 2024 — Tea had already migrated to more secure infrastructure by the time this data was stolen, and the exposed bucket was old code nobody had gone back to secure or delete. Tea's own statement puts the vulnerable code before February 2024. Outside commentators who dug into that timeline — Simon Willison among them — have pointed out that vibe coding, as a practice, wasn't really viable for building something like this yet at that point. Either way, this reads as an ordinary case of an old, unsecured cloud bucket, the same failure mode that's been showing up in breach reports for over a decade.

I'm not saying this to defend anyone's security practices. I'm saying it because if you're a founder using AI tools to build fast, the wrong lesson here is "don't use AI tools." The right lesson is buried in a different incident that actually was about AI-generated code, and it's the one you should be checking your own app against.

## The Breach That Actually Is About Vibe Coding

In March 2025, security researcher Matt Palmer reported a Row Level Security (RLS) problem in Lovable-built apps. A Palantir engineer independently found and tweeted the same issue around the same time. By the time Palmer and a collaborator, Kody Low, ran a broader scan, they'd checked 1,645 public Lovable apps and found 170 of them — about 10% — had RLS disabled across 303 endpoints. The data sitting behind those open endpoints included emails, home addresses, personal debt amounts, payment records, and API keys for services like Stripe, Google Maps, and Gemini. It was eventually filed as CVE-2025-48757, rated 9.3 out of 10 on severity.

That's the actual shape of the problem: not one dramatic data dump from a single app, but a structural default that shipped across hundreds of apps built the same way. And it's not isolated to one tool — later scans of thousands of AI-generated apps by other researchers kept finding the same pattern, with one 2026 study putting the share of AI-generated apps leaking sensitive data at over 40%.

[SCREENSHOT NEEDED: Supabase dashboard Table Editor view showing the RLS toggle in the "on" and "off" states on a table, for illustrating exactly what to check]

## Why This Keeps Happening

Supabase's Row Level Security is the thing standing between "logged-in users see their own rows" and "logged-in users see everyone's rows through the same public API key that's sitting in your frontend bundle." When RLS is off, or on with no policies attached, that public key is enough to read or write any row in any table — no password, no login needed.

This isn't really a Supabase design flaw. It's a defaults-and-tutorials problem. Supabase historically auto-enabled RLS on tables you created through its own Table Editor UI, but SQL migrations — which is how AI coding tools generate schema changes — skip that auto-enable step entirely. And a lot of the public tutorials these models were trained on demonstrate simple table queries without ever touching RLS, because for a demo, an open table looks exactly the same as a secured one. The AI isn't going rogue here. It's reproducing the most common pattern in its training data, and the most common pattern is insecure by default.

That's also why this bug is so easy to miss as a solo founder. A misconfigured RLS policy produces zero errors, zero warnings, and a working app in every test you're likely to run yourself, because you're always testing as a logged-in user looking at your own data. The failure mode only shows up when someone else's account, or no account at all, queries the same table — which is exactly the scenario founders skip when they're moving fast.

## I Almost Built a Tool for This Exact Bug

Around the time I was reading through writeups of the Lovable CVE, I started scoping out a security linter aimed specifically at this problem: Supabase-backed apps built with tools like Lovable, Bolt, or v0. Not a live-URL black-box scanner that pokes at a deployed app from the outside, but something that reads your actual migration files and repo before you ever deploy.

I planned it phase by phase, Supabase first, with Firebase and plain Postgres/MySQL as later phases. I wanted it CLI-first rather than a GitHub Action, on the theory that a founder should be able to run one command against their repo, get findings printed straight to the terminal, and get a fix prompt formatted to paste directly into Claude or Cursor — rather than waiting on a bot comment in a pull request they might not even open. Node and TypeScript, commander.js for the CLI itself, and for the first version, regex-based parsing of Supabase migration files instead of a full SQL parser, since the four checks I actually needed didn't require one: RLS disabled on a table, RLS enabled with zero policies attached, policies using `USING (true)` that grant access to everyone, and service-role keys leaking into files that ship to the browser.

Then I did what I should have done before writing a line of code, and actually went looking for what already existed. There's an open-source tool, SupaShield, doing more advanced live-database RLS testing than what I'd scoped for a v1. Supabase has also been closing the gap with its own native RLS testing tooling. Between the two, the specific problem I wanted to solve was already reasonably well covered, and building a third, weaker version of the same thing wasn't worth my time. I've written before about [how I decide what's actually worth building](/blog/how-i-decide-what-to-build-next-solo-founder) as a solo founder, and this was a clean example of the process working the way it's supposed to: the research killed the idea before I'd sunk real time into it, which is exactly the point of doing the research first.

I'm not bringing this up to sell you on a tool I didn't build. I'm bringing it up because scoping that linter meant reading a lot of real migration files, a lot of real RLS policies, and a lot of real postmortems, and the checklist below is what actually came out of that — not a generic list assembled from other people's checklists.

## What I'd Actually Check Before Shipping

Most "vibe coding security checklist" content I've seen runs 25 to 47 items long, which is thorough and also close to useless, because nobody finishes a 47-item list before a launch they're excited about. Here's the shorter version, ordered by how often each one is the actual cause of a real breach:

**1. RLS is enabled on every table that touches user data.** Check this directly in the Supabase dashboard under Table Editor, per table. This is the CVE-2025-48757 bug, and it's the single most common failure across every scan of AI-built apps I found while researching this.

```sql
-- Enable RLS on a table
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;

-- A policy that actually restricts access, not just exists
CREATE POLICY "Users can only see their own rows"
ON your_table FOR SELECT
USING (auth.uid() = user_id);
```

**2. Every table with RLS enabled actually has a policy attached.** Enabling RLS with no policy locks everyone out by default in Postgres, which is safe but usually means someone added a policy later to make the app work — and that's the moment a `USING (true)` or similarly loose policy sneaks in. Read the actual policy text, not just whether one exists.

**3. Your service-role key never ships to the browser.** It should only ever exist in server-side environment variables. If you can find it by opening dev tools and searching your app's JS bundle, it's already leaked.

**4. Test logged out, and test as a second, unrelated user.** Open your app in an incognito window with no session, and separately create a throwaway second account. If either one can read data that isn't theirs, you've found the gap before someone else does.

**5. API keys for third-party services (Stripe, Google Maps, email providers) live server-side, not in client code.** This is the second most common thing showing up in these scans after RLS — keys that were fine in a local prototype ending up in a deployed frontend bundle.

**6. Run an actual scan before launch, not after.** Whether that's Supabase's own RLS testing tooling, an open-source scanner, or a manual pass through every table — do it once, deliberately, before you tell anyone the app is live, not as a reaction to a support ticket.

If you're also running MCP servers as part of your stack, the failure modes are related but not identical — I wrote a separate [MCP server security checklist](/blog/mcp-server-security-checklist) that's worth a look too.

## The Checklist Isn't Really the Point

The uncomfortable part of researching this for a few weeks was realizing how little of it is about the AI tools being untrustworthy, and how much of it is about founders — including me, at various points — treating "it works when I test it" as the finish line. RLS misconfigurations don't throw errors. They don't fail your build. They just sit there quietly until someone who isn't you opens the wrong URL.

I've written elsewhere about [why the fundamentals still matter even when an AI is writing most of the code](/blog/vibe-coding-fundamentals-matter), and this is the sharpest example I've come across: the tool can generate a working schema in seconds, but it can't tell you what "working" is supposed to mean for your specific users' data. That part is still on you, five minutes before you ship, every time — not just the first time.

For more on how I think through build-or-don't-build decisions like this one, [see more Building in Public posts](/blog/category/building-in-public).

## Frequently asked questions

**Was the Tea app data breach caused by vibe coding?**
No. Tea's own postmortem states the vulnerable system was legacy code written before February 2024, and independent analysis of the timeline agrees it predates vibe coding as a practice. The breach was caused by an unsecured, unauthenticated Firebase storage bucket left over from an old system that hadn't been wiped or secured after migration.

**What is Row Level Security (RLS) and why does it matter for AI-built apps?**
Row Level Security is a Postgres feature, used by Supabase, that controls which rows in a database table a given user is allowed to read or write. When it's disabled or misconfigured, the same public API key visible in your app's frontend code can be used to read or write every row in the table, not just the requesting user's own data. This was the root cause behind CVE-2025-48757, which affected 170 of 1,645 scanned Lovable apps.

**How do I check if my Supabase app is leaking data?**
Open the Supabase dashboard, go to Table Editor, and check whether RLS is enabled on every table containing user data, then read the actual policy attached to each one rather than just confirming a policy exists. Separately, test your live app logged out and as a second unrelated user account to confirm neither can access data that isn't theirs.

**Is vibe coding safe enough for a production app handling real user data?**
It can be, but only if someone reviews the generated database configuration, authentication, and API key handling before launch — the AI tool itself won't flag these gaps, since a misconfigured RLS policy produces no errors and looks identical to a secure one in normal testing. Treat the generated code as a fast first draft that still needs a security pass, not a finished product.