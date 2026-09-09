import { RateLimiterMemory } from "rate-limiter-flexible";

// NOTE:
// RateLimiterMemory is per-instance.
// For multi-instance/serverless deployments, use RateLimiterRedis
// with Redis/Upstash if you need global rate limiting.

const limiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per 60 seconds
});

/**
 * Check rate limit using rate-limiter-flexible.
 *
 * @param {string} identifier
 * @returns {Promise<{allowed: boolean}>}
 */
export async function checkRateLimit(identifier) {
  try {
    await limiter.consume(identifier);

    return {
      allowed: true,
    };
  } catch {
    return {
      allowed: false,
    };
  }
}

/**
 * Get client IP from request headers.
 *
 * @param {Request} request
 * @returns {string}
 */
export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return "unknown";
}

/**
 * Simple in-memory rate limiter.
 *
 * @param {string} key
 * @param {number} limit
 * @param {number} windowMs
 * @returns {{
 *   ok: boolean,
 *   remaining: number,
 *   resetInSeconds?: number
 * }}
 */
const store = new Map();

export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const entry = store.get(key);

  // First request or expired window
  if (!entry || now > entry.resetAt) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      ok: true,
      remaining: Math.max(0, limit - 1),
    };
  }

  // Rate limit exceeded
  if (entry.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      resetInSeconds: Math.ceil(
        (entry.resetAt - now) / 1000
      ),
    };
  }

  // Increment request count
  entry.count += 1;

  return {
    ok: true,
    remaining: Math.max(0, limit - entry.count),
  };
}