import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadToCloudinary(
  fileBase64,
  folder,
  publicIdSuffix
) {
  const result = await cloudinary.uploader.upload(fileBase64, {
    folder,
    public_id: publicIdSuffix,
    overwrite: true,
    resource_type: "auto",
    // NEW: auto quality + format so gallery images deliver as WebP/AVIF
    // and get compressed automatically. Safe no-op for non-image uploads.
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
    // NEW: needed by the gallery uploader for image previews/aspect ratio.
    width: result.width,
    height: result.height,
  };
}

export async function deleteFromCloudinary(publicId, resourceType = "image") {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}

export default cloudinary;