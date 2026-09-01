import { NextResponse } from "next/server";
import { verifyOtpCode } from "@/lib/otp";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
    }

    const ip = getClientIp(req);
    const limited = rateLimit(`verify-otp:${ip}`, 10, 10 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
    }

    const result = await verifyOtpCode(email, otp);
    if (!result.ok) {
      const messages: Record<string, string> = {
        NOT_FOUND: "No code was requested for this email.",
        EXPIRED: "This code has expired. Please request a new one.",
        TOO_MANY_ATTEMPTS: "Too many incorrect attempts. Please request a new code.",
        INVALID: "Incorrect code.",
      };
      return NextResponse.json({ error: messages[result.error] || "Invalid code" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("verify-otp error", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
