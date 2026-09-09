import { NextResponse } from "next/server";
import { issueOtp } from "@/lib/otp";
import { sendStudentOtpEmail } from "@/lib/mail";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (
      !email ||
      typeof email !== "string" ||
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Max 5 OTP requests per IP per 10 minutes.
    const ip = getClientIp(req);

    const limited = rateLimit(
      `send-otp:${ip}`,
      5,
      10 * 60 * 1000
    );

    if (!limited.ok) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    const result = await issueOtp(email);

    if (!result.ok) {
      if (result.error === "COOLDOWN") {
        return NextResponse.json(
          {
            error: "Please wait before requesting another code.",
            waitSeconds: result.waitSeconds,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "Could not send code" },
        { status: 400 }
      );
    }

    // OTP is never returned to the client.
    await sendStudentOtpEmail(email, result.otp);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-otp error:", err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}