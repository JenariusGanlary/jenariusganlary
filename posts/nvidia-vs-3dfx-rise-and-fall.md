---
title: "Nvidia Almost Died. 3dfx Actually Did. Why?"
description: "Nvidia was 30 days from bankruptcy in 1996 while 3dfx ruled the market. Four years later, the roles reversed. Here's the decision-by-decision story of why."
date: "2026-09-09"
category: "startups-indie-hacking"
thumbnail: "/images/nvidia-3dfx-rise-and-fall.webp"
---

Every retelling of Nvidia's near-death experience ends the same way: Jensen Huang bets the company on a chip called RIVA 128, it works, Nvidia survives, cut to today's $4 trillion AI empire. It's a good story. It's also an incomplete one, because it treats survival as inevitable once the "right" decision got made.

It wasn't inevitable. In that same eighteen-month window, another company was making decisions too — and at the time, that company looked like the smarter bet. 3dfx Interactive wasn't the underdog in 1996. It was the standard. Voodoo graphics cards were what "3D acceleration" meant to an entire generation of PC gamers. 3dfx IPO'd in 1997 while Nvidia was still counting down its remaining weeks of payroll. If you'd asked anyone in the industry which of the two companies would exist in 2000, the answer wasn't close.

By 2000, 3dfx was bankrupt and Nvidia bought its patents and engineering talent out of the wreckage.

Same market. Same eighteen months of runway pressure on both sides, just at different points in time. One company treated near-death as a forcing function. The other treated market leadership as a reason to slow down. That difference — not luck, not a single genius chip — is the actual story worth documenting.

## Nvidia's First Bet Was Wrong, and They Knew It

Nvidia's first product, the NV1, wasn't a failure because nobody bought it. It failed because Nvidia bet on the wrong technical foundation entirely. NV1 used quadratic texture mapping, a rendering approach that diverged from where the rest of the industry was heading. When Nvidia signed on to build the graphics chip for Sega's next console, it committed even harder to that same non-standard approach.

Then Microsoft standardized the industry around Direct3D, which was built on triangle-based rendering. Nvidia's entire technical bet was now incompatible with where every major game studio was going to build. Sega pulled the console contract and switched vendors. By late 1996, Nvidia had burned through most of its capital, had a chip architecture nobody wanted, and had no revenue coming from the deal that was supposed to keep the lights on.

This is the part that gets skipped in the highlight-reel version: Sega didn't walk away completely. Sega's board authorized a $5 million investment to keep Nvidia alive, even after killing the console deal — reportedly because they believed enough in Huang and the team to bet on whatever came next, even without knowing what that was yet. That's not a detail about product-market fit. It's a detail about what happens when the people around a founder decide the failure was a strategy mistake, not a character one.

Huang's response to being handed a second chance was not gentle. He cut the company from 100 employees to 40. He killed the proprietary rendering approach entirely and rebuilt around Direct3D — meaning Nvidia abandoned the technical identity it had spent years building. And he set a deadline the company could not survive missing.

## Nine Months, No Time for a Do-Over

Here's the constraint that actually shaped the outcome: a normal chip development cycle at the time ran 18 to 24 months, including physical prototyping on real silicon to catch design errors before mass production. Nvidia had nine months of cash left and could not afford a single failed prototype run.

So they didn't do physical prototyping. They bought a leftover chip emulator from a bankrupt company for roughly half of what remained in their bank account, and used it to simulate the entire chip design in software before ever manufacturing it. If the emulated design worked, they'd commit to fabrication with no dry run. If it didn't, there wouldn't be a second attempt — there wouldn't be enough runway left to build one.

The chip that came out of that process, RIVA 128, was not a complete product by any normal standard. It supported only 8 of the 24 blend modes that a fully-featured 3D accelerator was expected to handle. In a market where feature completeness was a legitimate purchasing criterion, that's a real gap, not a footnote.

It shipped anyway, in August 1997, because Nvidia's actual decision wasn't "build the best possible chip." It was "build the chip that works well enough, on the standard the industry is actually moving to, before the money runs out." RIVA 128 sold a million units in four months. It was Nvidia's first profitable quarter. The company that had 30 days of payroll left a year earlier had just become a real business.

![Split illustration showing two diverging paths from the same starting point, one rising and one collapsing](/images/nvidia-3dfx-diverging-paths.webp)

## Meanwhile, the Market Leader Was Making the Opposite Bet

While Nvidia was cutting staff and killing its own technology roadmap, 3dfx was doing what winning companies usually do: consolidating its position. Voodoo cards were the performance benchmark. Game developers optimized for 3dfx's proprietary Glide API before they optimized for anything else. 3dfx wasn't just leading the market — it had enough leverage that the market adapted to it, not the other way around.

In 1998, 3dfx acquired STB Systems, one of its board manufacturing partners, and shifted its strategy toward building and selling its own cards directly instead of licensing chip designs to a range of manufacturers. On paper, this looked like a reasonable move to capture more margin. In practice, it put 3dfx in direct competition with the same board partners — companies like Diamond Multimedia and Creative Labs — who had previously been its sales channel. Those partners had no reason to keep promoting 3dfx chips once 3dfx became a rival card-seller instead of a component supplier, and several of them shifted toward Nvidia and other chipmakers instead.

At the same time, 3dfx's proprietary Glide API — the thing that had made it dominant — became a liability as Direct3D and OpenGL matured into genuinely competitive, hardware-agnostic standards. Nvidia's RIVA and later TNT-series chips supported the open standards natively. Developers increasingly built for those standards first, which meant Nvidia's hardware got developer attention by default, while 3dfx had to actively work to stay relevant to the same developers.

3dfx also missed a product cycle. The Voodoo3 launch slipped, and by the time it shipped, Nvidia's TNT2 was competitive on both price and performance. A company that had been able to set the pace for the entire industry two years earlier was now reacting to someone else's release schedule.

None of these were catastrophic decisions in isolation. Together, they meant 3dfx spent its dominant years building fewer options for itself — fewer partners, a closing technical standard, slower releases — while Nvidia spent its near-death years building more options: standard compatibility, a leaner cost structure, and a proven ability to ship fast under pressure.

## The Actual Difference Wasn't the Chips

If you compare RIVA 128 and the Voodoo cards of the same era on a spec sheet, neither one is an obviously superior product. That's the part that gets lost when this story gets compressed into "the better chip won." The chips were roughly comparable. The companies behind them were not making comparable decisions.

| | Nvidia (1996–1997) | 3dfx (1998–2000) |
|---|---|---|
| Market position | Near-bankrupt, no leverage | Dominant, full leverage |
| Technical strategy | Killed proprietary tech, adopted open standard (Direct3D) | Kept proprietary tech (Glide) past its useful life |
| Partner strategy | No partners to protect, nothing to lose | Acquired a partner, competed with the rest |
| Development approach | Software emulation to compress timeline under real cash pressure | Missed a product cycle while comfortable |
| Underlying posture | Treated the crisis as evidence the old plan was wrong | Treated dominance as evidence the current plan was right |

Nvidia's constraint forced clarity: there was no cash for a second bad decision, so every decision got scrutinized against "does this get us to revenue before we run out of money." 3dfx's dominance removed that scrutiny. When you're winning, there's no forcing function that makes you question whether your API strategy is aging badly, or whether acquiring your own retail partner is going to alienate the rest of your channel. Nobody inside a company that's clearly winning has the standing to say "we might be making the same mistake that almost killed our biggest competitor."

That's the actual mechanism here, and it's the part worth taking out of this story: **constraint doesn't guarantee good decisions, but it does force decisions to get tested against reality immediately.** Comfort doesn't guarantee bad decisions either — but it removes the pressure that would otherwise catch a bad one early.

## Where They Both Ended Up

3dfx filed for bankruptcy in 2000. Nvidia acquired the core of its remaining assets — patents and a portion of its engineering team — in the fire sale that followed. The company that had been the standard-setter four years earlier didn't survive to see the market it created mature.

Nvidia's story didn't stop at RIVA 128 either, and this is worth being honest about: the CUDA platform, launched in 2006, is the actual foundation of Nvidia's current AI dominance, not the graphics chip business that saved it in 1997. CUDA generated close to no revenue for roughly a decade. It was carried, as an internal cost, by the profitable GeForce gaming business the entire time, while analysts openly questioned why Nvidia kept investing in a developer platform with no clear return. It only became the company's core asset once GPU computing found its actual application in machine learning research years later. That's a second version of the same pattern: a bet made without proof it would pay off, sustained specifically because the company had already learned, the hard way, that waiting for certainty before committing can be exactly what kills you.

## The Lesson, Stated Plainly

The generic version of this story says "believe in your vision and never give up." That's not useful advice, and it's not actually what happened here. What happened is more specific and more applicable if you're building something with limited runway of your own:

Nvidia won not because Huang refused to change course, but because he was willing to abandon a technology the company had already invested years in, the moment the constraint made clear it wasn't going to work. 3dfx lost not because it stopped innovating, but because winning removed the pressure to notice its own strategy was aging. If you're building anything under real resource constraints, the useful takeaway isn't "push through" — it's that the constraint itself is information. It's telling you, faster than comfort ever will, which of your current bets are actually working.

If you've read [Building in Public: What I Learned Shipping My First Waitlist](/blog/building-in-public-waitlist), you've already seen a smaller-scale version of this same idea — decisions made under a visible deadline tend to get tested against reality faster than decisions made with no clock running. Nvidia and 3dfx are just the same principle playing out at a scale most of us will never operate at.

This is the first entry in an ongoing series documenting company journeys from founding struggle to where they are now — you'll find more like it under [Startups & Indie Hacking](/blog/category/startups-indie-hacking).

## Frequently asked questions

**Why did Nvidia almost go bankrupt in 1996?**
Nvidia's first chip, the NV1, was built around a rendering technology called quadratic texture mapping that diverged from the direction the rest of the industry was heading. When Microsoft standardized graphics development around the triangle-based Direct3D standard, Nvidia's technical approach became incompatible with where developers were building, and its console deal with Sega collapsed as a result, leaving the company with almost no revenue and dwindling cash.

**What saved Nvidia from bankruptcy?**
A $5 million investment from Sega's board, made even after Sega canceled its console contract with Nvidia, gave the company enough runway to build one more chip. Nvidia used software emulation instead of physical prototyping to compress a normal 18-to-24-month chip development cycle into nine months, producing the RIVA 128, which sold a million units in four months and gave Nvidia its first profitable quarter.

**Why did 3dfx go bankrupt despite being the market leader?**
3dfx acquired one of its own board-manufacturing partners, which put it in direct competition with the other partners that had been selling its chips, and several shifted to competitors as a result. At the same time, 3dfx kept relying on its proprietary Glide API even as open standards like Direct3D matured into legitimate competitors, and the company missed a product cycle at a point when Nvidia's chips were closing the performance and price gap.

**Is Nvidia's current AI dominance connected to the RIVA 128 story?**
Only indirectly, through company culture rather than technology. The chip that actually underlies Nvidia's current AI business is CUDA, a developer platform launched in 2006 that generated very little revenue for close to a decade before GPU computing became foundational to machine learning research. The willingness to sustain a long, unproven bet on CUDA reflects the same pattern that saved the company in 1997: making a hard, uncertain call before the market confirms it was right.
