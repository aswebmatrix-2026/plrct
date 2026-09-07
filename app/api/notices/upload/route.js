import { NextResponse } from "next/server";
import { uploadToCloudinary } from "../../../../lib/cloudinary";
import { requireAdmin } from "../../../../lib/requireAdmin";

export const runtime = "nodejs";

// POST /api/notices/upload — multipart/form-data with a single "file" field.
// Used by the admin "Create Notice" and "Edit Notice" forms for PDF uploads.
export async function POST(request) {
  const unauthorized = await requireAdmin();

  if (unauthorized) {
    return unauthorized;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file received." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are accepted." },
        { status: 400 }
      );
    }

    const MAX_SIZE = 1* 1024 * 1024;

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "PDF must be smaller than 15MB." },
        { status: 400 }
      );
    }

    // uploadToCloudinary expects a base64 data URI (same as your images
    // pipeline), not a raw buffer — convert here so we can reuse it as-is.
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const fileBase64 = `data:application/pdf;base64,${base64}`;

    // Unique public_id so two notices uploading a same-named file (e.g.
    // "circular.pdf") don't overwrite each other — uploadToCloudinary
    // passes overwrite: true straight through to Cloudinary.
    const safeName = file.name.replace(/\.pdf$/i, "").replace(/[^a-zA-Z0-9-_]/g, "-");
    const publicIdSuffix = `${safeName}-${Date.now()}`;

    const result = await uploadToCloudinary(fileBase64, "notices", publicIdSuffix);

    return NextResponse.json({
      success: true,
      pdfUrl: result.url,
      pdfPublicId: result.publicId,
      pdfFileName: file.name,
    });
  } catch (err) {
    console.error("PDF upload failed:", err);

    return NextResponse.json(
      {
        success: false,
        error: "PDF upload failed. Please try again.",
      },
      { status: 500 }
    );
  }
}