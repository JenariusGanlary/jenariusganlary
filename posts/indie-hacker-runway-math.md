---
title: "The Indie Hacker's Guide to Runway Math"
description: "The three numbers that actually tell you how much time you have left, and why most founders track the wrong one."
date: "2026-06-15"
category: "finance-builders"
thumbnail: "/images/runway-math-cover.png"
---

Most solo founders track their bank balance and call it runway. That number lies to you.

It lied to me for longer than I'd like to admit. I've got a day job — I work as an MIS & Data Analyst on a rural development programme — and I freelance on the side through client work, while also chipping away at a SaaS side project in whatever hours are left. That combination means my "runway" was never one clean number. It was three overlapping ones, and for a while I was only watching the easiest one to check.

## Why "Money in the Bank" Isn't Your Runway

Almost every runway guide is written for a funded startup with a board and a fixed burn rate: cash on hand divided by monthly spend, reported in a deck, watched by investors. That math assumes your income is zero and your spend is predictable. Neither of those was true for me.

My bank balance moves for reasons that have nothing to do with the side project — a freelance invoice clears, my salary lands, a client pays late. Watching that number alone told me almost nothing about how much runway the side project actually had, because most of the money moving through that account wasn't earmarked for it at all.

The number that actually matters isn't cash in the bank. It's cash in the bank divided by your actual monthly burn — and "actual" is doing a lot of work in that sentence. Annual subscriptions averaged monthly. Taxes you'll owe later but haven't set aside yet. Your own living costs, if you're not paying yourself a real salary out of the project yet. I was forgetting all three at different points, and each one made my runway look longer than it really was.

## The Three Numbers I Track Every Month

Once a month, I write down three numbers:

1. **Cash on hand** — but only the portion I've mentally set aside for the side project, not my whole account balance. Mixing freelance income and personal spending money into the same figure was the single biggest reason my early runway math was wrong.
2. **Average monthly burn over the last quarter**, not last month. A single cheap month — one where I skipped a tool renewal or didn't pay a contractor — will make your runway look better than it is. A single expensive month does the opposite. Three months smooths both out.
3. **Expected revenue growth rate**, which for me has mostly meant freelance income through client work, not the side project's own revenue, since that hasn't been consistent enough yet to build a forecast on.

Divide the first by the second, adjust for the third. That's the real runway — and it's a smaller number than my bank balance would suggest almost every time I run it.

![A monthly budget spreadsheet showing cash on hand, average burn, and revenue growth tracked in separate rows](/images/runway-tracking-spreadsheet.png)

## What Changes When a Day Job Is Funding the Runway

Most runway advice assumes the founder isn't earning anything else. My situation is the opposite of the "burn through savings until you find product-market fit" story — my day job and freelance work through Ganlary Labs cover my actual living costs, and the side project's runway is really a question of how much of my own time and spare cash I'm willing to keep funneling into it before deciding whether it's working.

That changes the stakes but doesn't remove them. It's tempting to treat a self-funded side project as risk-free because you're not going to starve if it fails. But time and spare cash are still finite, and "I have a day job so it doesn't matter" is exactly the kind of thinking that lets a project drag on for years without ever getting a real verdict. I set myself a rule after getting this wrong once: if the runway math says I'm three months from the point where continuing means cutting into money I need for something else, that's a decision point, not a "figure it out later" moment.

This is also where a lot of the cost decisions I make elsewhere feed back into runway. Choosing tools with predictable, low fixed costs matters more when you're self-funding out of freelance income than it does when you've got a year of runway sitting in a startup bank account. Part of why I wrote about [why I picked Supabase over Firebase](/blog/why-i-picked-supabase) came down to exactly this — a pricing model I could actually predict a quarter out, instead of one that could spike based on usage I didn't fully control.

## The Danger of Early Revenue

Early revenue changes your risk tolerance in ways that feel good and are dangerous. The first month a client project or a small trickle of side-project revenue covers even a fraction of your monthly burn, it's tempting to relax — to stop tracking the three numbers as carefully, because things finally feel like they're working.

That's exactly the wrong moment to loosen up. A few hundred dollars of recurring revenue, or one good freelance month, doesn't tell you whether you've found something repeatable. It tells you that one month went well. I've had freelance months through Ganlary Labs that looked like a trend and turned out to be a single good client relationship that didn't repeat the next quarter. Extending runway — staying disciplined about burn even when revenue starts trickling in — is what buys you the time to find out whether early revenue is a real pattern or a fluke, instead of betting the whole timeline on it being the former.

## How I Actually Do the Monthly Check

I don't use a fundraising-style spreadsheet built for board reporting. It's a simple recurring note: three numbers, updated on the same day every month, with a short line underneath about what changed and why. That last part turned out to matter as much as the numbers themselves — writing one sentence about *why* burn went up or revenue dipped forces me to actually notice the reason, instead of just watching a number drift and shrugging.

If you're building something on the side without outside funding, the version of runway math that matters isn't the one written for a board meeting. It's the one that tells you, honestly, how much longer you can keep funding this out of your own time and money before you need either a real answer or a real change. You can read more of what that tradeoff looks like in practice in [see more Finance for Builders posts](/blog/category/finance-builders).

## Frequently asked questions

**How do I calculate runway if I have a day job funding my side project?**
Separate the cash you've earmarked for the project from your total bank balance, since mixing salary or living expenses into the same number makes the runway look longer than it really is. Divide that earmarked cash by your average monthly spend on the project over the last quarter, not just the last month, to get a realistic figure.

**What's the difference between startup runway and self-funded side project runway?**
Startup runway usually assumes zero outside income and a fixed burn tracked for a board or investors. Self-funded runway has to account for other income sources covering your living costs, and it measures how much spare time and cash you're willing to keep committing before deciding whether the project is working.

**Why does early revenue make founders relax on runway discipline?**
A small amount of recurring or client revenue feels like proof the idea works, which makes tracking burn feel less urgent. But one good month doesn't confirm a repeatable pattern — staying disciplined about burn during that period is what gives you time to find out whether the revenue is a trend or a one-off.

**How often should I recalculate my runway?**
Monthly is usually enough for a side project, using a 3-month trailing average for burn so a single unusually cheap or expensive month doesn't distort the number. Recalculating more often than that tends to react to noise rather than a real change in your numbers.