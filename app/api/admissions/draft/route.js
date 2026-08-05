import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Admission from "@/models/Admission";
import { generateApplicationNumber } from "@/lib/generateApplicationNumber";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

// POST /api/admissions/draft
// body: { draftId?: string, data: {...partial form data...}, programType?: string }
// Returns a draftId the client stores (e.g. in localStorage) to resume later.
export async function POST(request) {
  const ip = getClientIp(request);
  const { allowed } = await checkRateLimit(`draft:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  await dbConnect();

  if (body.draftId) {
    const draft = await Admission.findOne({ applicationNumber: body.draftId, isDraft: true });
    if (draft) {
      draft.draftData = body.data;
      await draft.save();
      return NextResponse.json({ draftId: draft.applicationNumber });
    }
  }

  const draftId = generateApplicationNumber(body.programType || "diploma") + "-DRAFT";
  await Admission.create({
    applicationNumber: draftId,
    isDraft: true,
    draftData: body.data,
    programType: body.programType || "diploma",
    department: "N/A",
    admissionMode: "direct",
    fullName: "Draft",
    fatherName: "Draft",
    motherName: "Draft",
    gender: "other",
    dob: new Date("2000-01-01"),
    aadhaar: "000000000000",
    category: "general",
    phone: "0000000000",
    email: "draft@placeholder.local",
    permanentAddress: "N/A",
    state: "N/A",
    district: "N/A",
    city: "N/A",
    pincode: "000000",
    declarationAccepted: false,
  });

  return NextResponse.json({ draftId });
}

// GET /api/admissions/draft?draftId=xxx — restore a saved draft
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const draftId = searchParams.get("draftId");
  if (!draftId) return NextResponse.json({ error: "draftId is required" }, { status: 400 });

  await dbConnect();
  const draft = await Admission.findOne({ applicationNumber: draftId, isDraft: true }).lean();
  if (!draft) return NextResponse.json({ error: "Draft not found" }, { status: 404 });

  return NextResponse.json({ data: draft.draftData, programType: draft.programType });
}
