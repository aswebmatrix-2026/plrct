import mongoose from "mongoose";

const StatusHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: String },
    note: { type: String },
  },
  { _id: false }
);

const DocumentFileSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    originalName: String,
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const AcademicRecordSchema = new mongoose.Schema(
  {
    board: String,
    schoolOrCollege: String,
    passingYear: Number,
    percentage: Number,
    pcmPercentage: Number, // only relevant for 12th/diploma
    rollNumber: String,
  },
  { _id: false }
);

const LateralEntrySchema = new mongoose.Schema(
  {
    diplomaCollege: String,
    branch: String,
    percentage: Number,
  },
  { _id: false }
);

const AdmissionSchema = new mongoose.Schema(
  {
    // --- Application meta ---
    applicationNumber: { type: String, required: true, unique: true, index: true },
    applicationStatus: {
      type: String,
      enum: [
        "new",
        "under_review",
        "documents_pending",
        "approved",
        "rejected",
        "admission_confirmed",
      ],
      default: "new",
      index: true,
    },
    statusHistory: { type: [StatusHistorySchema], default: [] },
    isDraft: { type: Boolean, default: false },

    // --- Course information ---
    programType: {
      type: String,
      enum: ["diploma", "btech"],
      required: true,
      index: true,
    },
    department: { type: String, required: true, index: true },
    admissionSession: { type: String, default: "2026-2027" },
    admissionMode: {
      type: String,
      enum: ["direct", "counseling", "lateral_entry"],
      required: true,
    },

    // --- Personal information ---
    fullName: { type: String, required: true, index: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dob: { type: Date, required: true },
    aadhaar: { type: String, required: true },
    nationality: { type: String, default: "Indian" },
    category: {
      type: String,
      enum: ["general", "obc", "sc", "st", "ews", "other"],
      required: true,
    },
    bloodGroup: { type: String },

    // --- Contact information ---
    phone: { type: String, required: true, index: true },
    alternatePhone: { type: String },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    permanentAddress: { type: String, required: true },
    currentAddress: { type: String },
    state: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },

    // --- Academic information ---
    class10: AcademicRecordSchema,
    class12: AcademicRecordSchema,
    lateralEntry: LateralEntrySchema,

    // --- Documents ---
    documents: {
      photo: DocumentFileSchema,
      signature: DocumentFileSchema,
      aadhaarFile: DocumentFileSchema,
      marksheet10: DocumentFileSchema,
      marksheet12: DocumentFileSchema,
      diplomaMarksheet: DocumentFileSchema,
      categoryCertificate: DocumentFileSchema,
      migrationCertificate: DocumentFileSchema,
      characterCertificate: DocumentFileSchema,
    },

    // --- Declaration ---
    declarationAccepted: { type: Boolean, required: true, default: false },
    declarationAcceptedAt: { type: Date },

    // --- Admin fields ---
    remarks: [{ text: String, addedBy: String, addedAt: { type: Date, default: Date.now } }],
    counselorAssigned: { type: String },
    followUpDate: { type: Date },

    // --- Draft support (partial data saved before final submit) ---
    draftData: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

AdmissionSchema.index({ fullName: "text", email: "text", phone: "text", applicationNumber: "text" });

export default mongoose.models.Admission || mongoose.model("Admission", AdmissionSchema);
