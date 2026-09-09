import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const maxDuration = 60;

const GALLERY_FOLDER = "PLRCT/gallery";

/**
 * POST /api/gallery/upload
 * Accepts multipart/form-data with one or more "files" entries.
 * Converts each file to a data URI and uploads to Cloudinary with
 * automatic quality/format optimization (WebP delivery).
 * Returns [{ url, publicId, width, height }] in upload order.
 */
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files");

  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const MAX_FILES = 40;
  const MAX_SIZE_MB = 15;
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `Max ${MAX_FILES} images per upload` }, { status: 400 });
  }

  try {
    const uploads = await Promise.all(
      files.map(async (file) => {
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          throw new Error(`${file.name} exceeds ${MAX_SIZE_MB}MB limit`);
        }
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        const dataUri = `data:${file.type};base64,${base64}`;
        // publicIdSuffix left undefined so Cloudinary auto-generates a unique id per file
        const result = await uploadToCloudinary(dataUri, GALLERY_FOLDER, undefined);
        return { ...result, originalName: file.name };
      })
    );

    return NextResponse.json({ images: uploads }, { status: 201 });
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}