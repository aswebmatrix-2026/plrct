import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import StudentApplication from "@/models/StudentApplication";
import { isEmailVerified } from "@/lib/otp";
import { generateApplicationId, generateSecureToken } from "@/lib/applicationId";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

const REQUIRED_FIELDS = [
  "studentName",
  "fatherName",
  "course",
  "discipline",
  "admissionYear",
  "session",
  "mobile",
  "address",
  "email",
  "photoUrl",
] as const;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || typeof body[field] !== "string" || !body[field].trim()) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const ip = getClientIp(req);
    const limited = rateLimit(`submit:${ip}`, 5, 60 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
    }

    const verified = await isEmailVerified(body.email);
    if (!verified) {
      return NextResponse.json({ error: "Email is not verified" }, { status: 400 });
    }

    await dbConnect();

    // Cloudinary public_id was returned alongside the URL by /upload-photo;
    // the client only sends photoUrl back here, so re-derive/accept photoPublicId too.
    const photoPublicId = body.photoPublicId || null;

    const applicationId = await generateApplicationId();
    const secureToken = generateSecureToken();

    const application = await StudentApplication.create({
      applicationId,
      studentName: body.studentName.trim(),
      fatherName: body.fatherName.trim(),
      course: body.course,
      discipline: body.discipline,
      admissionYear: body.admissionYear.trim(),
      session: body.session.trim(),
      mobile: body.mobile.trim(),
      address: body.address.trim(),
      email: body.email.trim().toLowerCase(),
      emailVerified: true,
      photoUrl: body.photoUrl,
      photoPublicId,
      status: "PENDING",
      secureToken,
    });

    return NextResponse.json({
      applicationId: application.applicationId,
      studentName: application.studentName,
      course: application.course,
      session: application.session,
      status: application.status,
    });
  } catch (err: any) {
    console.error("submit application error", err);
    if (err?.code === 11000) {
      return NextResponse.json({ error: "Duplicate application, please try again" }, { status: 409 });
    }
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
