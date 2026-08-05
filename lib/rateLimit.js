import { RateLimiterMemory } from "rate-limiter-flexible";

// NOTE: RateLimiterMemory is per-instance. For a multi-instance deployment
// (e.g. Vercel serverless), swap this for RateLimiterRedis backed by
// Upstash/Redis so limits are enforced across all instances.
const limiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per 60 seconds
});

export async function checkRateLimit(identifier) {
  try {
    await limiter.consume(identifier);
    return { allowed: true };
  } catch {
    return { allowed: false };
  }
}

export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}
