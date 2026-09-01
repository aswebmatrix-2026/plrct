import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import OtpVerification from "@/models/OtpVerification";

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds
const MAX_ATTEMPTS = 5;

function hashOtp(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

export function generateOtp(): string {
  // crypto.randomInt is CSPRNG-backed, inclusive-exclusive range
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Creates (or refreshes) an OTP for the given email.
 * Returns the raw OTP so the caller can email it — it is never persisted in plaintext.
 */
export async function issueOtp(email: string) {
  await dbConnect();
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await OtpVerification.findOne({ email: normalizedEmail });

  if (existing) {
    const elapsed = Date.now() - new Date(existing.lastSentAt).getTime();
    if (elapsed < RESEND_COOLDOWN_MS) {
      return {
        ok: false as const,
        error: "COOLDOWN" as const,
        waitSeconds: Math.ceil((RESEND_COOLDOWN_MS - elapsed) / 1000),
      };
    }
  }

  const otp = generateOtp();
  const otpHash = hashOtp(otp);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await OtpVerification.findOneAndUpdate(
    { email: normalizedEmail },
    { otpHash, expiresAt, attempts: 0, lastSentAt: new Date(), verified: false },
    { upsert: true, new: true }
  );

  return { ok: true as const, otp, expiresAt };
}

export async function verifyOtpCode(email: string, otp: string) {
  await dbConnect();
  const normalizedEmail = email.toLowerCase().trim();
  const record = await OtpVerification.findOne({ email: normalizedEmail });

  if (!record) return { ok: false as const, error: "NOT_FOUND" as const };
  if (record.verified) return { ok: true as const };
  if (record.attempts >= MAX_ATTEMPTS) return { ok: false as const, error: "TOO_MANY_ATTEMPTS" as const };
  if (new Date() > new Date(record.expiresAt)) return { ok: false as const, error: "EXPIRED" as const };

  const otpHash = hashOtp(otp);
  if (otpHash !== record.otpHash) {
    record.attempts += 1;
    await record.save();
    return {
      ok: false as const,
      error: "INVALID" as const,
      attemptsLeft: MAX_ATTEMPTS - record.attempts,
    };
  }

  record.verified = true;
  await record.save();
  return { ok: true as const };
}

export async function isEmailVerified(email: string) {
  await dbConnect();
  const normalizedEmail = email.toLowerCase().trim();
  const record = await OtpVerification.findOne({ email: normalizedEmail });
  return !!record?.verified;
}
