---
title: "Using Claude Code on Freelance Client Projects: What I Tell Clients, What I Review, and What I Still Write Myself"
description: "How I use Claude Code on real client work through Ganlary Labs — the disclosure conversation, my review process before anything ships, how billing changed, and where the '3x more clients' promise falls apart."
date: "2026-07-21"
category: "tech-dev-life"
thumbnail: "/images/claude-code-client-work-cover.png"
---

Yes, I use Claude Code on freelance client projects, and yes, I tell my clients. That answer surprises people on both sides of the argument — the developers quietly using AI and hoping nobody asks, and the ones convinced that disclosure kills deals. After running client work through Ganlary Labs with an AI coding agent in the loop, my experience is that neither camp has it right.

Most of what ranks for "Claude Code for freelancers" is arithmetic fantasy: take on 3x more clients, deliver a two-week site in three days, print money. What almost nobody writes about is the professional side — what you say to a client whose invoice has your name on it, what you're now responsible for reviewing, and which parts of the job didn't get faster at all. That's the post I wanted to read before I started, so here it is.

## Why I Tell Clients I Use AI Coding Agents

I disclose because hiding it is a trust time bomb with a short fuse. Clients in 2026 are not naive about AI — many of the small business owners and founders I work with are already using ChatGPT or Claude themselves, and some ask directly during scoping. If a client asks and the honest answer contradicts what I implied earlier, the relationship is damaged in a way no delivery speed repairs.

There's a second reason that took me longer to articulate: my value was never typing. Clients don't pay me to produce keystrokes. They pay me to decide what should be built, catch what shouldn't ship, and be accountable when something breaks. Disclosure forces that framing into the open, and it's a better framing for me, not a worse one. If a freelancer's entire value proposition collapses the moment they admit an AI wrote the first draft of the code, the problem isn't the disclosure.

The freelance writing world has been fighting about this for two years, and most of the advice ("clients only care about results") is written by people whose deliverable is prose. Code is different. Prose that's slightly off embarrasses you; code that's slightly off leaks data or takes payments incorrectly. That asymmetry is exactly why disclosure paired with a visible review process works better for developers than silence does.

## The Conversation I Actually Have With New Clients

It's one paragraph in the kickoff call, delivered the same way I'd mention using any other professional tool. The shape of it is:

> "I use AI coding tools — mainly Claude Code — as part of how I build. It's part of why I can move at the pace I quoted. Two things I want to be clear about: every line that ships is reviewed by me and I'm fully accountable for it, and I don't put your credentials or your customers' data into any AI tool. If you'd rather I not use AI on your project at all, tell me now and we'll re-scope the timeline and price."

Three things are doing work in that paragraph. First, it frames the tool as the reason for the quoted pace, so speed reads as competence rather than corner-cutting. Second, it names the two things clients actually worry about — accountability and data — before they have to ask. Third, it gives them an exit. In my experience, offering the exit is what makes people comfortable not taking it. The clients who care enough to ask follow-up questions are usually the technically literate ones, and those conversations tend to go *better* once the tooling is on the table, because now we can talk about process like professionals instead of dancing around it.

What I don't do is itemize AI usage per task or perform some elaborate transparency ritual. Nobody asks their accountant which formulas Excel calculated. The disclosure is about accountability and data handling, not a running commentary.

## What I Review Before Anything Ships to a Client

Everything — but not everything equally, and being honest about that distinction is the whole discipline. Claude Code is genuinely good at scaffolding, CRUD flows, refactors, and test coverage. It is also confidently wrong in ways that compile, pass a happy-path test, and fail in production. So my review time concentrates where the blast radius is largest.

![Flow diagram showing AI-generated code passing through four review gates — security and auth, data handling, dependencies, and business logic — before shipping to the client](/images/claude-code-review-gates.png)

The four gates every piece of generated code passes through before a client sees it:

**Security and auth.** Anything touching authentication, authorization, or session handling gets read line by line, every time, no exceptions. I've written before about [why I chose Supabase over Firebase](/blog/why-i-picked-supabase), and one underrated reason is that Row Level Security policies are declarative and reviewable — I can read an RLS policy and know exactly who can see what. I never let an agent write or modify RLS policies unattended, because a policy that's subtly too permissive is invisible until it's a breach.

**Data handling.** Where does client data flow? What gets logged? What ends up in error messages? Generated code loves to log entire request objects, which is fine in a tutorial and a liability in an app handling real customer records.

**Dependencies.** Agents will happily add a package to solve a problem the standard library already solves, and occasionally reach for something unmaintained. Every new dependency gets a manual look: maintenance status, weekly downloads, what it actually pulls in. This is also a cost discipline — I wrote about subscription creep in [The AI Tool Stack Tax](/blog/the-ai-tool-stack-tax), and dependency creep is the same disease at the codebase level.

**Business logic.** The most dangerous category, because it's where "plausible" and "correct" diverge. Pricing calculations, date handling, edge cases around empty states. The agent doesn't know your client's business rules; it knows what similar code usually looks like. Those aren't the same thing.

Here's the honest breakdown of where the tool changes my time and where it doesn't:

| Task type | Time with Claude Code | The catch |
|---|---|---|
| Greenfield scaffolding, CRUD | Dramatically faster | Review is quick because patterns are standard |
| Refactors across many files | Much faster | Diff review still takes real time |
| Test writing | Faster | Tests can pass while testing the wrong thing |
| Auth, payments, data access | Marginally faster at best | Line-by-line review eats most of the savings |
| Debugging unfamiliar issues | Sometimes faster, sometimes slower | Confident wrong hypotheses cost hours |
| Client communication, scoping, revisions | Unchanged | This was always the real bottleneck |

## What I Still Write Myself

Anything I couldn't confidently review, I write by hand — because review requires understanding, and understanding comes from having built the thing at least once. That's the rule underneath all the specifics.

In practice that means: initial database schema design, because the schema is the one decision that gets more expensive to change every week it exists. Payment integration boundaries, because "the money code" is where a subtle bug becomes a refund spreadsheet and an apology email. And the first implementation of anything using a pattern I haven't personally shipped before. Once I've built one version myself, I can safely delegate variations of it — I know what wrong looks like.

This is the part the "3x more clients" crowd skips: an agent amplifies whatever judgment you bring to it. Delegating code you couldn't have written is not leverage, it's outsourcing your accountability to a system that doesn't carry any.

## How Claude Code Changed My Billing (and How It Didn't)

I didn't lower my prices, and I don't bill fewer hours apologetically — because I moved off hourly framing before AI tools made it untenable. I priced projects as scoped deliverables already, using the tiered structure I laid out in [How to Price a Freelance SaaS MVP](/blog/pricing-a-freelance-saas-mvp), and that framework absorbed AI tooling without breaking. The client buys an outcome at a price; how efficiently I produce it is my business, the same way my editor choice or my keyboard is.

What did change: the tool subscriptions became a real line in my cost of doing business, and faster builds shifted where my time goes. A larger share of every project is now review, client communication, and deployment — the parts that were never the bottleneck AI removes. If you're still billing hourly for freelance dev work, AI coding agents don't just squeeze your margins, they make your entire pricing model adversarial: you're now financially punished for using better tools. Fix the pricing model first.

## Where the "3x More Clients" Promise Falls Apart

The promise fails because code generation was never the constraint on a solo freelancer's capacity — attention was, and still is. Claude Code compresses build time, sometimes dramatically. It does not compress discovery calls, requirement changes, the client who takes six days to send the logo, revision rounds, or the cognitive load of holding three different codebases' contexts in your head. I compared the current agent options in [my coding agents breakdown for solo devs](/blog/2026-07-20-ai-coding-agents-solo-devs), and the conclusion applies here too: these tools change what a work session produces, not how many clients your brain can responsibly serve.

There's also a quality floor that faster delivery pushes against. Shipping in four days what used to take two weeks only helps if the four-day version survives contact with real users. My name is on the invoice either way. The freelancers who will do badly in this era aren't the ones who refuse AI — it's the ones who let delivery speed outrun their review capacity, ship something they never actually read, and find out in production what it does.

So my honest math isn't 3x more clients. It's the same number of clients, served better: faster first versions, more iteration inside the same budget, more of my attention on the decisions that needed it all along. That's a less viral headline. It's also the version that keeps clients for year two.

## Frequently asked questions

### Should freelance developers tell clients they use AI to write code?

Yes, in most cases. A short disclosure at kickoff — covering accountability for the shipped code and how client data is handled — builds more trust than it risks, and it protects you if the client discovers it later or their contract restricts AI use. The exception is when a signed agreement explicitly prohibits AI tooling, in which case the answer is to honor the contract or renegotiate it, not to hide the tool.

### Who owns the code generated by Claude Code on a client project?

Under Anthropic's commercial terms, the outputs you generate belong to you, not to Anthropic — but ownership of *delivered* work is decided by your client contract, exactly as it was before AI. If your contract assigns work product to the client on payment, AI-assisted code transfers the same way handwritten code does. Check both documents rather than assuming; some enterprise clients now include AI-specific clauses.

### Can freelancers charge the same rates when using AI coding tools?

Yes, if you price the outcome rather than the hours. Fixed-scope or value-based pricing lets efficiency gains stay with you, which is the entire economic point of adopting better tools. Hourly billing is where AI creates a genuine conflict: working faster directly reduces your invoice, which quietly punishes you for competence.

### Do clients care if freelance developers use AI?

Most clients care about three things: whether the work is correct, whether their data is safe, and whether someone accountable reviewed it. In practice, objections to AI use are usually objections to unreviewed AI use. A freelancer who says "an agent drafts, I review every line, and I'm responsible for what ships" answers the real concern; a freelancer who says nothing leaves the client to imagine the worst version.