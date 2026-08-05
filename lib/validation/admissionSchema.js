import { z } from "zod";

export const DEPARTMENTS = {
  diploma: [
    "Computer Science Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electronics & Communication Engineering",
    "Artificial Intelligence & Data Science",
    "Information Technology",
  ],
  btech: [
    "Computer Science Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electronics & Communication Engineering",
    "Artificial Intelligence & Machine Learning",
    "Data Science",
    "Information Technology",
  ],
};

const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers
const aadhaarRegex = /^\d{12}$/;
const pincodeRegex = /^\d{6}$/;

// Step 1: Course selection
export const courseStepSchema = z.object({
  programType: z.enum(["diploma", "btech"], { required_error: "Select a program type" }),
  department: z.string().min(1, "Select a department"),
  admissionSession: z.string().default("2026-2027"),
  admissionMode: z.enum(["direct", "counseling", "lateral_entry"], {
    required_error: "Select an admission mode",
  }),
});

// Step 2: Personal information
export const personalStepSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  fatherName: z.string().min(2, "Father's name is required"),
  motherName: z.string().min(2, "Mother's name is required"),
  gender: z.enum(["male", "female", "other"]),
  dob: z.string().refine((v) => !isNaN(Date.parse(v)), "Enter a valid date of birth"),
  aadhaar: z.string().regex(aadhaarRegex, "Aadhaar number must be 12 digits"),
  nationality: z.string().default("Indian"),
  category: z.enum(["general", "obc", "sc", "st", "ews", "other"]),
  bloodGroup: z.string().optional(),
});

// Step 3: Contact details
export const contactStepSchema = z.object({
  phone: z.string().regex(phoneRegex, "Enter a valid 10-digit mobile number"),
  alternatePhone: z.string().regex(phoneRegex, "Enter a valid 10-digit mobile number").optional().or(z.literal("")),
  email: z.string().email("Enter a valid email address"),
  permanentAddress: z.string().min(5, "Permanent address is required"),
  currentAddress: z.string().optional(),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  pincode: z.string().regex(pincodeRegex, "PIN code must be 6 digits"),
});

const academicRecordSchema = z.object({
  board: z.string().min(1, "Board is required"),
  schoolOrCollege: z.string().min(1, "This field is required"),
  passingYear: z.coerce.number().min(1990).max(2026),
  percentage: z.coerce.number().min(0).max(100),
  pcmPercentage: z.coerce.number().min(0).max(100).optional(),
  rollNumber: z.string().min(1, "Roll number is required"),
});

// Step 4: Academic qualification
export const academicStepSchema = z.object({
  class10: academicRecordSchema,
  class12: academicRecordSchema.optional(),
  lateralEntry: z
    .object({
      diplomaCollege: z.string().min(1),
      branch: z.string().min(1),
      percentage: z.coerce.number().min(0).max(100),
    })
    .optional(),
});

// Step 5: Document upload — validated as Cloudinary result objects
const documentFileSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
  originalName: z.string().optional(),
});

export const documentsStepSchema = z.object({
  photo: documentFileSchema,
  signature: documentFileSchema,
  aadhaarFile: documentFileSchema,
  marksheet10: documentFileSchema,
  marksheet12: documentFileSchema.optional(),
  diplomaMarksheet: documentFileSchema.optional(),
  categoryCertificate: documentFileSchema.optional(),
  migrationCertificate: documentFileSchema.optional(),
  characterCertificate: documentFileSchema.optional(),
});

// Step 6: Declaration
export const declarationStepSchema = z.object({
  declarationAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the declaration to submit" }),
  }),
});

// Full submission schema (merges all steps) — used server-side on final submit
export const fullAdmissionSchema = courseStepSchema
  .merge(personalStepSchema)
  .merge(contactStepSchema)
  .merge(z.object({ class10: academicRecordSchema, class12: academicRecordSchema.optional(), lateralEntry: z.any().optional() }))
  .merge(z.object({ documents: documentsStepSchema }))
  .merge(declarationStepSchema);

// File constraints used by upload route + client dropzone
export const FILE_CONSTRAINTS = {
  maxSizeBytes: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
};
