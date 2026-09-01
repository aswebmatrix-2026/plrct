import mongoose from "mongoose";

const DEPARTMENTS = [
  "Computer Science Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics & Communication Engineering",
  "Artificial Intelligence & Machine Learning",
  "Data Science",
  "Information Technology",
];

const PROGRAMS = ["B.Tech", "Diploma", "M.Tech"];

const PlacementSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    companyLogo: { type: String, default: "" },
    slug: { type: String, required: true, unique: true, index: true },
    jobRole: { type: String, required: true },
    department: { type: String, enum: DEPARTMENTS, required: true },
    program: { type: String, enum: PROGRAMS, required: true },
    eligibility: { type: String, default: "" },
    minimumPercentage: { type: Number, default: 0 },
    salaryPackage: { type: String, default: "" },
    jobType: { type: String, enum: ["Internship", "Full-time", "Internship + Full-time"], default: "Full-time" },
    location: { type: String, default: "" },
    lastDate: { type: Date, required: true },
    driveDate: { type: Date },
    driveTime: { type: String, default: "" },
    description: { type: String, default: "" },
    selectionProcess: { type: String, default: "" },
    documents: { type: String, default: "" },
    applyLink: { type: String, default: "" },
    pdfFile: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    status: { type: String, enum: ["upcoming", "active", "closed"], default: "upcoming" },
    studentsPlaced: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PlacementSchema.index({ companyName: "text", jobRole: "text", department: "text" });

export const PLACEMENT_DEPARTMENTS = DEPARTMENTS;
export const PLACEMENT_PROGRAMS = PROGRAMS;

export default mongoose.models.Placement || mongoose.model("Placement", PlacementSchema);
