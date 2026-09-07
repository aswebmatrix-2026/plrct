import { NextResponse } from "next/server";
import dbConnect from "../../../../../../lib/mongodb";
import StudentApplication from "../../../../../../models/StudentApplication";
import { requireAdmin } from "../../../../../../lib/requireAdmin";
import { sendIdCardRejectedEmail } from "../../../../../../lib/mail";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { authorized } = await requireAdmin();
  if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { rejectionReason } = await req.json();
  if (!rejectionReason || typeof rejectionReason !== "string" || !rejectionReason.trim()) {
    return NextResponse.json({ error: "Rejection reason is required" }, { status: 400 });
  }

  await dbConnect();
  const application = await StudentApplication.findById(params.id);
  if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });

  application.status = "REJECTED";
  application.rejectionReason = rejectionReason.trim();
  await application.save();

  await sendIdCardRejectedEmail({
    studentName: application.studentName,
    email: application.email,
    applicationId: application.applicationId,
    rejectionReason: application.rejectionReason,
  });

  application.lastEmailSentAt = new Date();
  await application.save();

  return NextResponse.json(application);
}
