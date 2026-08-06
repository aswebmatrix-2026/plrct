import mongoose from "mongoose";

export const GALLERY_CATEGORIES = [
  "Campus Infrastructure",
  "Engineering Laboratories",
  "Workshops",
  "Technical Events",
  "Cultural Events",
  "Sports",
  "Placement Drives",
  "Industrial Visits",
  "Seminars",
  "Conferences",
  "Innovation & Research",
  "Student Activities",
  "Graduation Ceremony",
];

const EmbeddedImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    altText: { type: String, default: "" },
    caption: { type: String, default: "" },
    displayOrder: { type: Number, default: 0 },
    width: Number,
    height: Number,
  },
  { _id: false }
);

const GalleryEventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    year: { type: Number, required: true, index: true },
    eventDate: { type: Date, required: true },
    category: { type: String, required: true, enum: GALLERY_CATEGORIES, index: true },
    location: { type: String, default: "" },

    shortDescription: { type: String, required: true, maxlength: 240 },
    description: { type: String, default: "" },

    coverImage: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    images: { type: [EmbeddedImageSchema], default: [] },

    featured: { type: Boolean, default: false },
    showOnHomepage: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", index: true },

    views: { type: Number, default: 0 },

    // SEO
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },

    createdBy: { type: String, default: "" },
  },
  { timestamps: true }
);

GalleryEventSchema.index({ eventName: "text", description: "text", category: "text" });
GalleryEventSchema.virtual("photoCount").get(function () {
  return this.images?.length || 0;
});
GalleryEventSchema.set("toJSON", { virtuals: true });
GalleryEventSchema.set("toObject", { virtuals: true });

export default mongoose.models.GalleryEvent || mongoose.model("GalleryEvent", GalleryEventSchema);