import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { FILE_CONSTRAINTS } from "@/lib/validation/admissionSchema";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

// POST /api/upload
// multipart/form-data: file, docType (e.g. "photo"), applicationDraftId
export async function POST(request) {
  // 🔍 TEMPORARY DEBUG LOG — env vars load ho rahe hain ya nahi check karne ke liye
  console.log("ENV CHECK:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? "present" : "MISSING",
  });

  const ip = getClientIp(request);
  const { allowed } = await checkRateLimit(`upload:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "Too many upload attempts, slow down." }, { status: 429 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const docType = formData.get("docType") || "document";
  const folderId = formData.get("applicationDraftId") || "unassigned";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!FILE_CONSTRAINTS.allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: `File type ${file.type} is not allowed. Use JPG, PNG, WEBP or PDF.` },
      { status: 400 }
    );
  }

  if (file.size > FILE_CONSTRAINTS.maxSizeBytes) {
    return NextResponse.json(
      { error: `File exceeds ${FILE_CONSTRAINTS.maxSizeBytes / (1024 * 1024)}MB limit.` },
      { status: 400 }
    );
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;

    const result = await uploadToCloudinary(base64, `admissions/${folderId}`, docType);

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
      originalName: file.name,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}