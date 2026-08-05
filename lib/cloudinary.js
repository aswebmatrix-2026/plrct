import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a base64 or buffer file to Cloudinary under a per-application folder.
 * @param {string} fileBase64 - data URI string, e.g. "data:image/png;base64,...."
 * @param {string} folder - e.g. `admissions/PLRCT-2026-BT-48213`
 * @param {string} publicIdSuffix - e.g. "photo", "aadhaar"
 */
export async function uploadToCloudinary(fileBase64, folder, publicIdSuffix) {
  const result = await cloudinary.uploader.upload(fileBase64, {
    folder,
    public_id: publicIdSuffix,
    overwrite: true,
    resource_type: "auto",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

export async function deleteFromCloudinary(publicId) {
  return cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
