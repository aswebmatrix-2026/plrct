import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "../../../../lib/mongodb";
import Admission from "../../../../models/Admission";
import { authOptions } from "../../../../lib/authOptions";
import { sendStatusUpdateEmail } from "../../../../lib/mail";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return session;
}

function isValidId(id) {
  return typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);
}

export async function GET(request, { params }) {
  const { id } = await params;

  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isValidId(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await dbConnect();
  const admission = await Admission.findById(id).lean();
  if (!admission) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ admission });
}

const VALID_STATUSES = [
  "new",
  "under_review",
  "documents_pending",
  "approved",
  "rejected",
  "admission_confirmed",
];

export async function PATCH(request, { params }) {
  const { id } = await params;

  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!isValidId(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const body = await request.json();
  await dbConnect();

  const admission = await Admission.findById(id);
  if (!admission) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Status change
  if (body.status && VALID_STATUSES.includes(body.status)) {
    admission.applicationStatus = body.status;
    admission.statusHistory.push({
      status: body.status,
      changedBy: session.user.email,
      note: body.note || "",
    });
  }

  // Add remark
  if (body.remark) {
    admission.remarks.push({ text: body.remark, addedBy: session.user.email });
  }

  // Assign counselor
  if (body.counselorAssigned !== undefined) {
    admission.counselorAssigned = body.counselorAssigned;
  }

  // Schedule follow-up
  if (body.followUpDate !== undefined) {
    admission.followUpDate = body.followUpDate ? new Date(body.followUpDate) : null;
  }

  await admission.save();

  if (body.status && body.notifyApplicant) {
    sendStatusUpdateEmail(admission).catch((err) =>
      console.error("Status email failed:", err)
    );
  }

  return NextResponse.json({ success: true, admission });
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  const session = await requireAdmin();
  if (!session || session.user.role !== "superadmin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isValidId(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await dbConnect();
  const deleted = await Admission.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}