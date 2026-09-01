import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import StudentApplication from "@/models/StudentApplication";
import { requireAdmin } from "@/lib/requireAdmin";
import { sendIdCardVerifiedEmail, sendIdCardRejectedEmail } from "@/lib/mail";
import { generateIdCardPdf } from "@/lib/pdf";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { authResponse } = await requireAdmin();
  if (authResponse) return authResponse;

  // Prevent accidental repeat-click spam to the same student.
  const limited = rateLimit(`resend-email:${params.id}`, 5, 10 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Please wait before resending again." }, { status: 429 });
  }

  await dbConnect();
  const application = await StudentApplication.findById(params.id);
  if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (application.status === "VERIFIED") {
    if (!application.pdfUrl || !application.rollNumber) {
      return NextResponse.json({ error: "Card is not fully generated yet" }, { status: 400 });
    }

    // Re-render the PDF to attach (Cloudinary URL isn't fetched back in here to keep this fast/simple).
    const pdfBuffer = await generateIdCardPdf({
      studentName: application.studentName,
      fatherName: application.fatherName,
      course: application.course,
      discipline: application.discipline,
      rollNumber: application.rollNumber,
      session: application.session,
      mobile: application.mobile,
      address: application.address,
      photoUrl: application.photoUrl,
      applicationId: application.applicationId,
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
    const downloadLink = `${baseUrl}/student/id-card/${application.secureToken}`;

    await sendIdCardVerifiedEmail({
      studentName: application.studentName,
      email: application.email,
      applicationId: application.applicationId,
      course: application.course,
      discipline: application.discipline,
      rollNumber: application.rollNumber,
      session: application.session,
      downloadLink,
      pdfBuffer,
    });
  } else if (application.status === "REJECTED") {
    await sendIdCardRejectedEmail({
      studentName: application.studentName,
      email: application.email,
      applicationId: application.applicationId,
      rejectionReason: application.rejectionReason || "Not specified",
    });
  } else {
    return NextResponse.json(
      { error: "Nothing to resend for a pending application" },
      { status: 400 }
    );
  }

  application.lastEmailSentAt = new Date();
  await application.save();

  return NextResponse.json({ ok: true });
}
