import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

const MAX_BASE64_BYTES = 2.8 * 1024 * 1024; // ~2MB image as base64 is larger than raw bytes

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64 || typeof imageBase64 !== "string" || !imageBase64.startsWith("data:image/")) {
      return NextResponse.json({ error: "A valid image is required" }, { status: 400 });
    }
    if (imageBase64.length > MAX_BASE64_BYTES) {
      return NextResponse.json({ error: "Photo must be under 2MB" }, { status: 400 });
    }

    const ip = getClientIp(req);
    const limited = rateLimit(`upload-photo:${ip}`, 20, 10 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json({ error: "Too many uploads. Please try again later." }, { status: 429 });
    }

    const publicId = `student-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const uploaded = await uploadToCloudinary(imageBase64, "ptlr/student-icard/photos", publicId);

    return NextResponse.json({ url: uploaded.url, publicId: uploaded.publicId });
  } catch (err) {
    console.error("upload-photo error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
