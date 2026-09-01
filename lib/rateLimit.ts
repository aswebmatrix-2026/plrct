/**
 * Minimal in-memory rate limiter, keyed by an arbitrary string (usually IP+route).
 *
 * NOTE: this resets per server instance/cold-start. It is sufficient for a
 * single-instance deployment or as defense-in-depth alongside the OTP
 * resend-cooldown (which IS persisted in Mongo). If you deploy on multiple
 * serverless instances and need strict global rate limiting, swap this for
 * a Redis-backed limiter (e.g. Upstash) — the call sites don't need to change.
 */
const store = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0, resetInSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
