import cloudinary from "@/lib/cloudinary";

const ALLOWED_PDF = ["application/pdf"];
const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

export async function saveUploadedFile(file, type = "image") {
  if (!file || file.size === 0) return "";

  const kind = type === "pdf" ? "pdf" : "image";
  const allowed = kind === "pdf" ? ALLOWED_PDF : ALLOWED_IMAGE;

  // MIME type validation (from local version)
  if (file.type && !allowed.includes(file.type)) {
    throw new Error(
      `Invalid file type for ${kind}. Allowed: ${allowed.join(", ")}`
    );
  }

  // Size validation — env-configurable with sensible defaults
  const maxMB =
    kind === "pdf"
      ? Number(process.env.MAX_PDF_SIZE_MB || 10)
      : Number(process.env.MAX_IMAGE_SIZE_MB || 5);

  if (file.size > maxMB * 1024 * 1024) {
    throw new Error(`File too large. Max ${maxMB}MB allowed.`);
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const resourceType = kind === "pdf" ? "raw" : "image";
  const folder =
    kind === "pdf" ? "plrct/placements/pdfs" : "plrct/placements/logos";

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) return reject(new Error(error.message || "Upload failed"));
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

export async function deleteUploadedFile(url, type = "image") {
  if (!url) return;
  try {
    const afterUpload = url.split("/upload/")[1];
    if (!afterUpload) return;
    const withoutVersion = afterUpload.replace(/^v\d+\//, "");
    const publicId = withoutVersion.replace(/\.[^/.]+$/, "");
    await cloudinary.uploader.destroy(publicId, {
      resource_type: type === "pdf" ? "raw" : "image",
    });
  } catch (e) {
    console.error("Cloudinary delete failed:", e.message);
  }
}