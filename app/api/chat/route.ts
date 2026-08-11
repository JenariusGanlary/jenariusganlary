import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SERVICE_TIERS } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const chatSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

// Same in-memory sliding-window pattern as /api/contact — a chat endpoint
// gets many more requests per real visitor than a contact form, so the
// window is tighter and the per-IP cap is higher. Resets on cold start,
// doesn't coordinate across regions — fine for current traffic, move to
// Vercel KV/Upstash if that ever changes.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 30;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recentTimestamps = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  recentTimestamps.push(now);
  requestLog.set(ip, recentTimestamps);
  return recentTimestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return "unknown";
}

// The marker the model is instructed to append when a visitor's need
// clearly matches a service and they seem ready to move forward. Parsed
// out server-side so the client only ever sees a clean boolean + clean text.
const CTA_MARKER = "[[CTA]]";

function buildSystemPrompt(): string {
  const tiersText = SERVICE_TIERS.map(
    (t) => `- Tier ${t.tier}: ${t.name} — ${t.price} onwards. ${t.description}`
  ).join("\n");

  const caseStudiesText = CASE_STUDIES.map(
    (c) => `- ${c.name} (${c.statusLabel}): ${c.build}`
  ).join("\n");

  return `You are the AI assistant embedded on jenariusganlary.com, representing Ganlary Labs — an AI Product Engineering Studio founded by Jenarius "Zen" Ganlary. Ganlary Labs builds AI-powered products, systems, and applications; full-stack websites are one delivery format among several, not the core identity, so lead with "AI product engineering" rather than "web development" when describing what the studio does.

Your job: answer visitor questions about Ganlary Labs' work, services, pricing, and past projects, in a friendly, concise, conversational way.

Ganlary Labs service tiers:
${tiersText}

Real projects (for credibility, if asked "what have you built" or similar):
${caseStudiesText}

Formatting rules — this is a small plain-text chat bubble, not a document:
- Plain sentences only. NEVER use markdown — no **bold**, no bullet points, no numbered lists, no headers.
- Keep every reply under 50 words unless the visitor explicitly asks for more detail. If comparing two options, describe them in one flowing sentence each, not a list.
- Always finish your thought completely. A short, complete answer is far better than a longer one that gets cut off.

Other rules:
- Never invent pricing, features, or claims beyond what's listed above.
- If you don't know something specific (exact timelines, availability, custom scope), say so honestly and suggest they ask on a discovery call.
- If a visitor's need clearly matches one of the service tiers AND they seem genuinely interested in moving forward (not just browsing or asking general questions), end your reply with exactly this on its own line, and nothing after it: ${CTA_MARKER}
- Do not mention the marker itself, or that you're using one. Do not overuse it — only when there's real buying signal.
- You are not able to book calls, send emails, or take any action yourself — only Zen or the visitor booking through the site can do that.`;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please try again in a bit." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = chatSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "Chat isn't configured yet. Please use the contact form instead." },
        { status: 503 }
      );
    }

    // Keep only the most recent messages to bound token usage per request —
    // the client can hold a longer visible history than we actually send.
    const recentMessages = parsed.data.messages.slice(-12);

    const contents = recentMessages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
          contents,
          generationConfig: { maxOutputTokens: 400 },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json(
        { error: "The assistant is having trouble right now. Try again shortly." },
        { status: 502 }
      );
    }

    const data: GeminiResponse = await res.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    const showCta = rawText.includes(CTA_MARKER);
    const reply = rawText.replace(CTA_MARKER, "").trim();

    if (!reply) {
      return NextResponse.json(
        { error: "The assistant didn't return a response. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply, showCta });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}