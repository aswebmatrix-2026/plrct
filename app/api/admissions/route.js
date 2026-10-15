import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/mongodb";
import Admission from "@/models/Admission";
import { authOptions } from "@/lib/authOptions";
import { fullAdmissionSchema } from "@/lib/validation/admissionSchema";
import { generateApplicationNumber } from "@/lib/generateApplicationNumber";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sendConfirmationEmail } from "@/lib/mail";

// POST /api/admissions — public submission endpoint (called from the Apply Now modal)
export async function POST(request) {
  const ip = getClientIp(request);
  const { allowed } = await checkRateLimit(`submit:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // 🔍 TEMPORARY DEBUG — incoming payload dekhne ke liye
  console.log("INCOMING BODY:", JSON.stringify(body, null, 2));

  const parsed = fullAdmissionSchema.safeParse(body);
  if (!parsed.success) {
    // 🔍 TEMPORARY DEBUG — exact validation errors dekhne ke liye
    console.log("VALIDATION FAILED:", JSON.stringify(parsed.error.flatten(), null, 2));

    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  try {
    await dbConnect();

    let applicationNumber;
    let attempts = 0;
    let exists;
    // Guarantee uniqueness even under rare collision
    do {
      applicationNumber = generateApplicationNumber(data.programType);
      attempts++;
      // eslint-disable-next-line no-await-in-loop
      exists = await Admission.exists({ applicationNumber });
    } while (exists && attempts < 5);

    const admission = await Admission.create({
      ...data,
      applicationNumber,
      isDraft: false,
      declarationAcceptedAt: new Date(),
      statusHistory: [{ status: "new", changedBy: "system", note: "Application submitted" }],
    });

    sendConfirmationEmail(admission).catch((err) =>
      console.error("Confirmation email failed:", err)
    );

    return NextResponse.json(
      {
        success: true,
        applicationNumber: admission.applicationNumber,
        id: admission._id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Admission creation error:", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

// GET /api/admissions — admin-only, list with filters, search, pagination
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, parseInt(searchParams.get("limit") || "20", 10));

  const filter = {};
  const programType = searchParams.get("programType");
  const department = searchParams.get("department");
  const status = searchParams.get("status");
  const admissionMode = searchParams.get("admissionMode");
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const search = searchParams.get("search");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");

  if (programType) filter.programType = programType;
  if (department) filter.department = department;
  if (status) filter.applicationStatus = status;
  if (admissionMode) filter.admissionMode = admissionMode;
  if (city) filter.city = new RegExp(city, "i");
  if (state) filter.state = new RegExp(state, "i");
  if (dateFrom || dateTo) {
    filter.createdAt = {};
    if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
    if (dateTo) filter.createdAt.$lte = new Date(dateTo);
  }
  if (search) {
    filter.$or = [
      { fullName: new RegExp(search, "i") },
      { phone: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { applicationNumber: new RegExp(search, "i") },
    ];
  }
  filter.isDraft = { $ne: true };

  await dbConnect();

  const [items, total] = await Promise.all([
    Admission.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-draftData")
      .lean(),
    Admission.countDocuments(filter),
  ]);

  return NextResponse.json({
    items,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}