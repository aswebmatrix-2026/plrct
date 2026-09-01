import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import StudentApplication from "@/models/StudentApplication";
import { requireAdmin } from "@/lib/requireAdmin";
import { generateIdCardPdf } from "@/lib/pdf";
import { uploadToCloudinary } from "@/lib/cloudinary";

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
    // Admin authentication
    const authResponse = await requireAdmin();

    if (authResponse) {
      return authResponse;
    }

    // Next.js dynamic params are async
    const { id } = await params;

    const { rollNumber } = await req.json();

    if (
      !rollNumber ||
      typeof rollNumber !== "string" ||
      !rollNumber.trim()
    ) {
      return NextResponse.json(
        { error: "Roll number is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const application = await StudentApplication.findById(id);

    if (!application) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    application.rollNumber = rollNumber.trim();

    await application.save();

    /*
     * The live card (form preview / student page) already reads
     * rollNumber directly from the DB, so it updates immediately.
     *
     * If this student was already verified, regenerate the stored
     * PDF so the downloadable ID card stays in sync.
     *
     * We intentionally do NOT resend the email here.
     * Admin can use RESEND EMAIL when needed.
     */
    if (application.status === "VERIFIED") {
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

      const dataUri = `data:application/pdf;base64,${pdfBuffer.toString(
        "base64"
      )}`;

      const uploaded = await uploadToCloudinary(
        dataUri,
        "ptlr/student-icard/pdfs",
        `id-card-${application.applicationId}`
      );

      application.pdfUrl = uploaded.url;
      application.pdfPublicId = uploaded.publicId;

      await application.save();
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error(
      "POST /api/admin/student-applications/[id]/assign-roll error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to assign roll number",
      },
      { status: 500 }
    );
  }
}