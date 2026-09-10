import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

const subscribeSchema = z.object({
  email: z.string().email().max(200),
  source: z.enum(["starter_kit", "newsletter"]),
  sourcePage: z.string().max(300).optional(),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmContent: z.string().max(200).optional(),
  company: z.string().max(200).optional(),
});

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const SEGMENT_ID = process.env.RESEND_SEGMENT_ID;

const STARTER_KIT_EVENT_NAME = "starter_kit_signup";

type Properties = Record<string, string>;

function buildProperties(input: {
  source: string;
  sourcePage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
}): Properties {
  const properties: Properties = {
    source: input.source,
    createdAt: new Date().toISOString(),
  };
  if (input.sourcePage) properties.sourcePage = input.sourcePage;
  if (input.utmSource) properties.utmSource = input.utmSource;
  if (input.utmMedium) properties.utmMedium = input.utmMedium;
  if (input.utmCampaign) properties.utmCampaign = input.utmCampaign;
  if (input.utmContent) properties.utmContent = input.utmContent;
  return properties;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(`subscribe:${ip}`, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a bit." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = subscribeSchema.safeParse(body);

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

    const { email, source, sourcePage, utmSource, utmMedium, utmCampaign, utmContent, company } = parsed.data;

    if (company && company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log("Subscribe request (RESEND_API_KEY not set):", { email, source });
      return NextResponse.json({ ok: true, note: "Logged only — Resend not configured yet." });
    }

    const properties = buildProperties({ source, sourcePage, utmSource, utmMedium, utmCampaign, utmContent });
    const payload: Record<string, unknown> = {
      email,
      unsubscribed: false,
      properties,
    };
    if (SEGMENT_ID) payload.segments = [{ id: SEGMENT_ID }];

    let res = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      const looksLikeDuplicate = res.status === 409 || /already exists/i.test(errText);

      if (looksLikeDuplicate) {
        res = await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            unsubscribed: false,
            properties,
            ...(SEGMENT_ID ? { segments: [{ id: SEGMENT_ID }] } : {}),
          }),
        });
      } else {
        console.error("Resend error (create contact):", errText);
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
      }
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error (update contact):", errText);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    if (source === "starter_kit") {
      const eventRes = await fetch("https://api.resend.com/events/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: STARTER_KIT_EVENT_NAME,
          email,
        }),
      });

      if (!eventRes.ok) {
        const errText = await eventRes.text();
        console.error("Resend error (trigger automation event):", errText);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}