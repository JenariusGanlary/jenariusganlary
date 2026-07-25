import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  message: z.string().min(1).max(5000),
  // Honeypot — a field real visitors never see or fill (see the visually
  // hidden input in ContactForm.tsx). Anything non-empty here means the
  // submission almost certainly came from a bot filling every field blindly.
  company: z.string().max(200).optional(),
});

// Simple in-memory sliding-window rate limiter, keyed by IP. This is
// intentionally the simplest viable option: good enough for current traffic
// on a single Vercel region. It resets on cold start and doesn't coordinate
// across regions/instances — if that becomes a real constraint later (high
// traffic, multi-region), move to Vercel KV or Upstash instead of scaling
// this further.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5;
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
  // Vercel sets x-forwarded-for on every request; the first entry is the
  // original client. Falls back to a shared bucket if it's ever missing
  // (e.g. local dev without a proxy in front) rather than throwing.
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a bit." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid submission",
          issues: parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const { name, email, message, company } = parsed.data;

    // Honeypot tripped. Respond exactly like a real success (don't tip the
    // bot off that it was caught) but never actually send an email.
    if (company && company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log("Contact form submission (RESEND_API_KEY not set):", { name, email, message });
      return NextResponse.json({ ok: true, note: "Logged only — email sending not configured yet." });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <contact@jenariusganlary.com>",
        to: "hello@jenariusganlary.com",
        subject: `New message from ${name}`,
        text: `From: ${name} (${email})\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}