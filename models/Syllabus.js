// models/Syllabus.js
import mongoose from "mongoose";
import {
  PROGRAM_OPTIONS,
  DEPARTMENT_OPTIONS,
  SEMESTER_OPTIONS,
} from "@/constants/syllabus";

const SyllabusSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Syllabus title is required"],
      trim: true,
    },
    program: {
      type: String,
      required: [true, "Program is required"],
      enum: PROGRAM_OPTIONS,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: DEPARTMENT_OPTIONS,
    },
    semester: {
      type: String,
      required: [true, "Semester is required"],
      enum: SEMESTER_OPTIONS,
    },
    academicYear: {
      type: String, // e.g. "2026-2027"
      required: [true, "Academic year is required"],
      trim: true,
    },
    syllabusYear: {
      type: Number, // e.g. 2026
      required: [true, "Syllabus year is required"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    pdfUrl: {
      type: String,
      required: [true, "PDF URL is required"],
    },
    pdfPublicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number, // bytes
      required: true,
    },
    fileType: {
      type: String,
      default: "application/pdf",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

SyllabusSchema.index({ title: "text", department: "text", program: "text" });
SyllabusSchema.index({ program: 1, department: 1, semester: 1, academicYear: 1 });
SyllabusSchema.index({ published: 1, featured: 1 });

export default mongoose.models.Syllabus ||
  mongoose.model("Syllabus", SyllabusSchema);