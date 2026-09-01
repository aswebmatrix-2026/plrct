import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import dbConnect from "@/lib/mongodb";
import StudentApplication from "@/models/StudentApplication";
import { requireAdmin } from "@/lib/requireAdmin";
import { authOptions } from "@/lib/authOptions";

import { generateIdCardPdf } from "@/lib/pdf";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { sendIdCardVerifiedEmail } from "@/lib/mail";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  req: Request,
  { params }: RouteContext
) {
  try {
    // --------------------------------------------------
    // 1. Admin authentication
    // --------------------------------------------------
    const authResponse = await requireAdmin();

    if (authResponse) {
      return authResponse;
    }

    // requireAdmin() only returns the auth response/null,
    // so get the session separately for verifiedBy.
    const session = await getServerSession(authOptions);

    // --------------------------------------------------
    // 2. Get dynamic route ID
    // --------------------------------------------------
    const { id } = await params;

    // --------------------------------------------------
    // 3. Connect to database
    // --------------------------------------------------
    await dbConnect();

    const application =
      await StudentApplication.findById(id);

    if (!application) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // 4. Roll number is required
    // --------------------------------------------------
    if (!application.rollNumber) {
      return NextResponse.json(
        {
          error:
            "Assign a Roll Number before verifying this application",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 5. Mark application as VERIFIED
    // --------------------------------------------------
    application.status = "VERIFIED";
    application.verifiedAt = new Date();

    application.verifiedBy =
      session?.user?.email ||
      session?.user?.name ||
      "admin";

    // --------------------------------------------------
    // 6. Generate Digital ID Card PDF
    // --------------------------------------------------
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

    // --------------------------------------------------
    // 7. Upload PDF to Cloudinary
    // --------------------------------------------------
    const dataUri =
      `data:application/pdf;base64,${pdfBuffer.toString("base64")}`;

    const uploaded = await uploadToCloudinary(
      dataUri,
      "ptlr/student-icard/pdfs",
      `id-card-${application.applicationId}`
    );

    application.pdfUrl = uploaded.url;
    application.pdfPublicId = uploaded.publicId;

    // Save verification + PDF details before sending email
    await application.save();

    // --------------------------------------------------
    // 8. Create secure student download link
    // --------------------------------------------------
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      new URL(req.url).origin;

    const downloadLink =
      `${baseUrl}/student/id-card/${application.secureToken}`;

    // --------------------------------------------------
    // 9. Send verified email with PDF attachment
    // --------------------------------------------------
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

    // --------------------------------------------------
    // 10. Save email timestamp
    // --------------------------------------------------
    application.lastEmailSentAt = new Date();

    await application.save();

    // --------------------------------------------------
    // 11. Return updated application
    // --------------------------------------------------
    return NextResponse.json(application);
  } catch (error) {
    console.error(
      "POST /api/admin/student-applications/[id]/verify error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to verify student application",
      },
      { status: 500 }
    );
  }
}