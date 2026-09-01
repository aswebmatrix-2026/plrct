import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "@/lib/authOptions";
import { dbConnect as dbConnect } from "@/lib/mongodb";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import GalleryEvent, { GALLERY_CATEGORIES } from "@/models/GalleryEvent";

async function findEvent(idOrSlug) {
  if (mongoose.isValidObjectId(idOrSlug)) {
    const byId = await GalleryEvent.findById(idOrSlug);
    if (byId) return byId;
  }
  return GalleryEvent.findOne({ slug: idOrSlug });
}

/** GET /api/gallery/[slug] — public detail view, increments views for published albums. */
export async function GET(request, { params }) {
  const { slug } = await params;
  await dbConnect();
  const event = await findEvent(slug);

  if (!event) return NextResponse.json({ error: "Album not found" }, { status: 404 });

  const session = await getServerSession(authOptions);
  if (event.status !== "published" && !session?.user) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  if (event.status === "published") {
    event.views += 1;
    await event.save();
  }

  return NextResponse.json({ event: event.toObject({ virtuals: true }) });
}

/** PUT /api/gallery/[slug] — full update. Admin only. */
export async function PUT(request, { params }) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const event = await findEvent(slug);
  if (!event) return NextResponse.json({ error: "Album not found" }, { status: 404 });

  const body = await request.json();

  if (body.category && !GALLERY_CATEGORIES.includes(body.category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const editable = [
    "eventName",
    "year",
    "eventDate",
    "category",
    "location",
    "shortDescription",
    "description",
    "coverImage",
    "images",
    "featured",
    "showOnHomepage",
    "status",
    "metaTitle",
    "metaDescription",
  ];

  for (const field of editable) {
    if (body[field] !== undefined) event[field] = body[field];
  }

  if (body.slug && body.slug !== event.slug) {
    const clash = await GalleryEvent.findOne({ slug: body.slug, _id: { $ne: event._id } });
    if (clash) return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    event.slug = body.slug;
  }

  await event.save();
  return NextResponse.json({ event });
}

/** DELETE /api/gallery/[slug] — removes album + its Cloudinary images. Admin only. */
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const event = await findEvent(params.slug);
  if (!event) return NextResponse.json({ error: "Album not found" }, { status: 404 });

  const publicIds = [event.coverImage?.publicId, ...event.images.map((i) => i.publicId)].filter(Boolean);
  const results = await Promise.allSettled(publicIds.map((id) => deleteFromCloudinary(id, "image")));

  const failed = results
    .map((r, i) => (r.status === "rejected" ? publicIds[i] : null))
    .filter(Boolean);
  if (failed.length) {
    console.error("Cloudinary delete failed for:", failed);
  }

  await event.deleteOne();
  return NextResponse.json({ success: true });
}

/**
 * PATCH /api/gallery/[slug] — quick actions: publish, unpublish, feature, unfeature,
 * archive, duplicate. Body: { action: "publish" | "unpublish" | "feature" | "unfeature" | "archive" | "duplicate" }
 */
export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const event = await findEvent(params.slug);
  if (!event) return NextResponse.json({ error: "Album not found" }, { status: 404 });

  const { action } = await request.json();

  switch (action) {
    case "publish":
      event.status = "published";
      await event.save();
      return NextResponse.json({ event });
    case "unpublish":
      event.status = "draft";
      await event.save();
      return NextResponse.json({ event });
    case "archive":
      event.status = "archived";
      await event.save();
      return NextResponse.json({ event });
    case "feature":
      event.featured = true;
      await event.save();
      return NextResponse.json({ event });
    case "unfeature":
      event.featured = false;
      await event.save();
      return NextResponse.json({ event });
    case "duplicate": {
      const clone = event.toObject();
      delete clone._id;
      delete clone.createdAt;
      delete clone.updatedAt;
      clone.eventName = `${clone.eventName} (Copy)`;
      clone.slug = `${clone.slug}-copy-${Date.now()}`;
      clone.status = "draft";
      clone.views = 0;
      const newEvent = await GalleryEvent.create(clone);
      return NextResponse.json({ event: newEvent }, { status: 201 });
    }
    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}