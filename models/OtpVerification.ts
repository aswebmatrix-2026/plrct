import mongoose, { Schema, models, model } from "mongoose";

/**
 * Short-lived email OTP records for Student Application email verification.
 * One active record per email at a time (upserted on resend).
 * The raw OTP is never stored — only a SHA-256 hash.
 */
const OtpVerificationSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true, index: true, unique: true },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
    lastSentAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.OtpVerification || model("OtpVerification", OtpVerificationSchema);
