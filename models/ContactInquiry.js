// lib/models/ContactInquiry.js
// Mongoose model for inquiries submitted from the public /contact page.
// Follows the same shape/conventions as your existing Admission model.

import mongoose from "mongoose";

const ContactInquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobile: { type: String, required: true, trim: true },
    city: { type: String, trim: true, default: "" },
    state: { type: String, trim: true, default: "" },
    course: { type: String, required: true, trim: true },
    subject: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "resolved"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.models.ContactInquiry ||
  mongoose.model("ContactInquiry", ContactInquirySchema);