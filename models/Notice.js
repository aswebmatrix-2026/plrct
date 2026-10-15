import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

export const NOTICE_CATEGORIES = [
  "Admission",
  "Examination",
  "Academic",
  "Placement",
  "Scholarship",
  "Circular",
  "Tender",
  "Recruitment",
];

export const NOTICE_PRIORITIES = ["Normal", "Important", "Urgent", "Featured"];

export const NOTICE_STATUSES = ["Draft", "Scheduled", "Published", "Archived"];

const NoticeSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 300 },
    id: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    category: { type: String, required: true, enum: NOTICE_CATEGORIES },
    shortDescription: { type: String, required: true, maxlength: 400 },
    content: { type: String, required: true },

    pdfUrl: { type: String, default: null },
    pdfPublicId: { type: String, default: null },
    pdfFileName: { type: String, default: null },

    priority: { type: String, enum: NOTICE_PRIORITIES, default: "Normal" },

    featured: { type: Boolean, default: false },
    pinned: { type: Boolean, default: false },
    showOnHomepage: { type: Boolean, default: true },
    showInTicker: { type: Boolean, default: true },

    status: { type: String, enum: NOTICE_STATUSES, default: "Draft" },

    publishDate: { type: Date, required: true, default: Date.now },
    expiryDate: { type: Date, default: null },

    downloads: { type: Number, default: 0 },
    views: { type: Number, default: 0 },

    createdBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
  },
  { timestamps: true } // adds createdAt, updatedAt
);

// Useful compound indexes for the public board's filter/sort/search UI.
NoticeSchema.index({ status: 1, publishDate: -1 });
NoticeSchema.index({ category: 1, status: 1 });
NoticeSchema.index({ pinned: -1, priority: 1, publishDate: -1 });
NoticeSchema.index({ title: "text", shortDescription: "text", content: "text" });

// Auto-archive notices whose expiryDate has passed, and auto-publish
// scheduled notices whose publishDate has arrived. Call this before any
// public read so the board always reflects current state without a cron job.
NoticeSchema.statics.syncLifecycle = async function () {
  const now = new Date();
  await this.updateMany(
    { status: "Scheduled", publishDate: { $lte: now } },
    { $set: { status: "Published" } }
  );
  await this.updateMany(
    { status: "Published", expiryDate: { $ne: null, $lte: now } },
    { $set: { status: "Archived" } }
  );
};

export default models.Notice || model("Notice", NoticeSchema);