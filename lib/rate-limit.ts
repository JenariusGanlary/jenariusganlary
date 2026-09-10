import { NextRequest } from "next/server";

const requestLog = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  windowMs: number,
  maxRequests: number
): boolean {
  const now = Date.now();
  const recentTimestamps = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < windowMs
  );
  recentTimestamps.push(now);
  requestLog.set(key, recentTimestamps);
  return recentTimestamps.length > maxRequests;
}

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return "unknown";
}