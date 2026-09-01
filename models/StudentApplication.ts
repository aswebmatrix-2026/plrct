import mongoose, { Schema, models, model } from "mongoose";

/**
 * A single Student I-Card application.
 * This is intentionally a separate collection from any existing
 * general "Admission" model — it captures only the fields needed
 * for the Digital I-Card, not the full admissions workflow.
 */
const StudentApplicationSchema = new Schema(
  {
    applicationId: { type: String, required: true, unique: true, index: true }, // PTLR-2026-000001
    studentName: { type: String, required: true, trim: true },
    fatherName: { type: String, required: true, trim: true },
    course: { type: String, required: true },
    discipline: { type: String, required: true },
    admissionYear: { type: String, required: true },
    session: { type: String, required: true }, // e.g. "2026-2030"
    mobile: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    emailVerified: { type: Boolean, default: false },

    photoUrl: { type: String, required: true },
    photoPublicId: { type: String, required: true },

    rollNumber: { type: String, default: null, trim: true }, // e.g. BCA/2K26/001

    status: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
      index: true,
    },
    rejectionReason: { type: String, default: null },
    verifiedAt: { type: Date, default: null },
    verifiedBy: { type: String, default: null }, // admin email/name from session

    // Long random token used for the student's private I-Card URL.
    // Never derived from applicationId/_id so the URL can't be guessed/enumerated.
    secureToken: { type: String, required: true, unique: true, index: true },

    pdfUrl: { type: String, default: null },
    pdfPublicId: { type: String, default: null },

    lastEmailSentAt: { type: Date, default: null },
  },
  { timestamps: true }
);

StudentApplicationSchema.index({ studentName: "text", email: "text", mobile: "text" });

export default models.StudentApplication || model("StudentApplication", StudentApplicationSchema);
