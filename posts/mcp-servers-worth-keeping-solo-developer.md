---
title: "MCP Servers Worth Keeping as a Solo Developer"
description: "As a solo developer running client projects, I tried a dozen MCP servers. Here's which ones stayed, and which ones just burned tokens."
date: "2026-07-23"
category: "saas-ai-tools"
thumbnail: "/images/mcp-servers-kept-vs-cut-cover.png"
---

I installed eleven MCP servers over about six weeks. I use four of them now. The other seven are still sitting in my config files, disabled, because I never got around to deleting the entries.

That ratio is the actual story here. Every "best MCP servers" list reads like it was written by someone who installed everything once, took a screenshot, and never checked back in a month later to see what they still opened. I run client work and freelance builds day to day, and the only test that matters to me is whether a tool is still in my daily rotation after the novelty wears off. Most of what I installed didn't survive that test.

## Why I installed a dozen MCP servers in the first place

The pitch for MCP is genuinely good: instead of writing custom API glue every time you want your AI assistant to touch GitHub, a database, or a browser, you point it at a standardized server and it just works across whatever client you're using. Anthropic released the protocol in late 2024, and by the time I started paying attention to it, other providers had adopted it too and the ecosystem had grown into the thousands of servers.

I work across freelance client projects and my own side builds, usually solo, which means I don't have a team to split tool research across. So when a new MCP server showed up in a "top 10" list with a plausible use case, I'd install it, wire it into Claude Code, and move on without really auditing whether it replaced something I already had a faster way to do.

That's how I ended up with servers for browser automation, filesystem access, generic web search, a knowledge-graph memory layer, and a couple of niche API wrappers I genuinely don't remember installing. Some of them I used twice. A few I never used at all.

## The MCP servers I actually kept

Four made it past the trial period. Here's what they have in common: each one replaces a multi-step manual workflow I was doing constantly, not occasionally.

| Server | What it replaced | Why it stuck |
|---|---|---|
| GitHub MCP | Tab-switching to check PR status, diffs, and issue history | Used on nearly every coding session, even solo repos |
| Supabase/Postgres MCP | Opening the Supabase dashboard to write and test SQL by hand | Lets me describe a query in plain English and see real schema-aware results |
| Context7 | Guessing at library APIs from training data that's already stale | Pulls current docs instead of a hallucinated function signature |
| Sequential Thinking | Nothing — this isn't a tool, it's a reasoning aid | Genuinely changes how a multi-step migration gets planned before I touch code |

The common thread: each of these saves me a context switch that I was making constantly, not once a week. GitHub MCP is the one I'd keep if I could only keep one — asking "what did I actually change in this file yesterday" as a one-line question in the same chat window beats opening a browser tab every time.

![A simple comparison chart showing four kept MCP servers on one side and seven removed MCP servers on the other, on a light background](/images/mcp-servers-kept-vs-cut-chart.png)

## The MCP servers I ripped out and why

The browser automation server was the first to go. It worked, technically, but for the kind of quick page checks I actually needed — "does this page still return a 200," "what's the current price on this competitor's pricing page" — a plain fetch was faster and used a fraction of the tokens. I didn't need an agent driving a headless browser to read static text off a page.

The generic web search MCP was next. I already have search built into my regular AI client. Adding a second, separate search tool just meant the model sometimes picked the wrong one, and I'd get search results routed through a tool with worse snippet quality than what I already had.

The filesystem MCP server was the one that surprised me. On paper it should have been useful — git-aware file access sounds exactly like what a solo developer wants. In practice, for a project already open in my editor with the AI assistant already running inside it, the MCP layer was solving a problem I didn't have. I wasn't missing filesystem access. I was adding a second, slower path to something the editor already gave me directly.

The knowledge-graph memory server is the one I feel most conflicted about cutting. The idea — a persistent, queryable memory of project-specific context across sessions — is genuinely appealing for solo work where you don't have a teammate to remind you why a decision was made three weeks ago. But in practice, the setup and query overhead cost more time than just writing a short markdown file of decisions in the repo and letting the AI read that directly.

## The token cost nobody mentions in the listicles

Almost none of the "top MCP servers" content talks about the actual cost of running tool calls through MCP versus just running a command yourself. One benchmark I came across put MCP-routed calls at somewhere between 10 and 32 times more tokens than the equivalent CLI command, depending on the operation. That range is wide, but even at the low end, it matters if you're running a lot of small, repetitive operations.

This is the part that "best MCP servers" content skips, because token cost isn't a good hook for a listicle. But if you're paying for API usage on client work, or you're running a lot of small operations in a session, it adds up in a way that's easy to miss until you look at your usage dashboard and wonder why a routine day cost more than it should have.

Here's a concrete example. Checking whether a specific npm package version is installed:

```bash
# Direct CLI check — cheap, fast, no tool-call overhead
npm list some-package --depth=0
```

versus routing the same check through a filesystem or package-management MCP server, which typically means: a tool definition gets sent to the model, the model formats a tool call, the server responds with a structured payload, and the model parses that payload before it can answer you. For a single version check, that's a lot of round-tripping for information a one-line command already gives you.

None of this means MCP is bad. It means MCP is the right tool for operations that are genuinely multi-step, stateful, or require structured access you don't already have — not a default wrapper for every command you could otherwise just run yourself.

## When a CLI command beats an MCP server

The pattern I've settled into: if the task is a single, stateless lookup — checking a version, reading a file, running a build — I just do it directly, either myself or by letting the AI assistant shell out to a command. If the task requires ongoing context, structured navigation across an API surface, or repeated interaction with the same system across a session, that's when an MCP server earns its overhead.

GitHub is a good example of the second case. Checking PR status once is a single lookup. But a session where I'm reviewing five PRs, cross-referencing issue history, and leaving comments is exactly the kind of repeated, structured interaction MCP is built for.

The mistake I made early on was applying the second logic to the first case. A dashboard-replacement tool is worth it when you'd otherwise be tab-switching constantly. It's not worth it when you'd otherwise just type one command.

## How I decide whether to add a new MCP server now

Before installing anything new, I ask three questions:

1. Is this replacing something I do more than a few times a week, or something I do occasionally?
2. Does this require multi-step, stateful interaction, or is it really a single lookup wearing an MCP costume?
3. Do I already have a faster path to the same result — a CLI command, a built-in feature, an existing tool — that I'm ignoring because the new server looked interesting?

If the honest answer to all three doesn't clearly favor the new server, I don't install it anymore. I used to install first and evaluate later. Now I evaluate first, because cleaning up unused entries in a config file is a worse use of time than just not adding them.

## The actual lesson

The MCP ecosystem is large enough now that "which servers should I use" isn't a research problem, it's a discipline problem. Almost anything you look up will have a plausible-sounding use case attached to it. The question that actually matters isn't whether a server could be useful in theory — it's whether it replaces something you're doing often enough, in a way complex enough, that the token and setup overhead pays for itself. For most solo developers, that's a much shorter list than the listicles suggest.

If you're deciding what to actually build with right now, [5 Tools Every Solo Developer Should Actually Pay For](/blog/five-solo-developer-tools) covers the non-MCP side of that same discipline question — tools worth paying for versus tools that just look good in a roundup. And if you're weighing AI coding agents more broadly, [AI Coding Agents for Solo Developers](/blog/ai-coding-agents-solo-devs) goes into how I picked what's actually in my daily stack. For more like this, see [more SaaS & AI Tools posts](/blog/category/saas-ai-tools).

## Frequently asked questions

**Do I need MCP servers as a solo developer?**
No, not by default. MCP servers are worth adding when they replace a task you do often and that requires multi-step or stateful interaction with an external system, like a codebase or a database. For occasional, single-step lookups, a plain CLI command or built-in feature is usually faster and cheaper.

**Is MCP worth it for solo projects?**
It depends on which servers and which tasks. Servers like GitHub MCP or a database MCP tend to be worth it because they replace constant tab-switching and manual query writing. Servers that just wrap a single command or a search you already have access to usually aren't worth the added setup and token overhead.

**What is the token cost of using MCP servers?**
MCP-routed tool calls can cost significantly more tokens than running the equivalent command directly, with some benchmarks putting the difference at roughly 10 to 32 times more tokens depending on the operation. This is because each call involves sending a tool definition, formatting a structured request, and parsing a structured response, rather than a single direct instruction.

**Which MCP servers are actually worth using?**
Based on daily use rather than a one-time install, the ones that tend to earn a permanent spot are GitHub MCP, a database MCP like Supabase or Postgres, a docs-grounding tool like Context7, and a reasoning aid like Sequential Thinking. Servers that duplicate a feature you already have built in, or that wrap a single-step command, are the most common ones worth removing.