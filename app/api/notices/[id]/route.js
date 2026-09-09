import { NextResponse } from "next/server";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { dbConnect } from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/requireAdmin";

// GET /api/notices/:id
export async function GET(_request, { params }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();

  const { id } = await params;

  const notice = await Notice.findById(id).lean();

  if (!notice) {
    return NextResponse.json(
      { error: "Notice not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ notice });
}

// PUT /api/notices/:id
export async function PUT(request, { params }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();

  const { id } = await params;
  const body = await request.json();

  const notice = await Notice.findById(id);

  if (!notice) {
    return NextResponse.json(
      { error: "Notice not found." },
      { status: 404 }
    );
  }

  if (body.title) {
    notice.title = body.title;
  }

  if (body.slug && body.slug !== notice.slug) {
    const nextSlug = slugify(body.slug, {
      lower: true,
      strict: true,
    });

    const clash = await Notice.findOne({
      slug: nextSlug,
      _id: { $ne: notice._id },
    });

    notice.slug = clash
      ? `${nextSlug}-${nanoid(6)}`
      : nextSlug;
  }

  if (body.category) {
    notice.category = body.category;
  }

  if (body.shortDescription) {
    notice.shortDescription = body.shortDescription;
  }

  if (body.content) {
    notice.content = body.content;
  }

  if (body.pdfUrl !== undefined) {
    notice.pdfUrl = body.pdfUrl;
  }

  if (body.pdfPublicId !== undefined) {
    notice.pdfPublicId = body.pdfPublicId;
  }

  if (body.pdfFileName !== undefined) {
    notice.pdfFileName = body.pdfFileName;
  }

  if (body.priority) {
    notice.priority = body.priority;
  }

  if (body.featured !== undefined) {
    notice.featured = !!body.featured;
  }

  if (body.pinned !== undefined) {
    notice.pinned = !!body.pinned;
  }

  if (body.showOnHomepage !== undefined) {
    notice.showOnHomepage = !!body.showOnHomepage;
  }

  if (body.showInTicker !== undefined) {
    notice.showInTicker = !!body.showInTicker;
  }

  if (body.status) {
    notice.status = body.status;
  }

  if (body.publishDate) {
    notice.publishDate = new Date(body.publishDate);
  }

  if (body.expiryDate !== undefined) {
    notice.expiryDate = body.expiryDate
      ? new Date(body.expiryDate)
      : null;
  }

  await notice.save();

  return NextResponse.json({ notice });
}

// PATCH /api/notices/:id
export async function PATCH(request, { params }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();

  const { id } = await params;
  const { action } = await request.json();

  const notice = await Notice.findById(id);

  if (!notice) {
    return NextResponse.json(
      { error: "Notice not found." },
      { status: 404 }
    );
  }

  switch (action) {
    case "publish":
      notice.status = "Published";
      notice.publishDate = notice.publishDate || new Date();
      await notice.save();
      break;

    case "unpublish":
      notice.status = "Draft";
      await notice.save();
      break;

    case "pin":
      notice.pinned = true;
      await notice.save();
      break;

    case "unpin":
      notice.pinned = false;
      await notice.save();
      break;

    case "duplicate": {
      const copy = notice.toObject();

      delete copy._id;

      copy.title = `${copy.title} (Copy)`;
      copy.slug = `${copy.slug}-${nanoid(6)}`;
      copy.status = "Draft";
      copy.views = 0;
      copy.downloads = 0;

      const created = await Notice.create(copy);

      return NextResponse.json(
        { notice: created },
        { status: 201 }
      );
    }

    default:
      return NextResponse.json(
        { error: "Unknown action." },
        { status: 400 }
      );
  }

  return NextResponse.json({ notice });
}

// DELETE /api/notices/:id
export async function DELETE(_request, { params }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect();

  const { id } = await params;

  const notice = await Notice.findById(id);

  if (!notice) {
    return NextResponse.json(
      { error: "Notice not found." },
      { status: 404 }
    );
  }

  // Delete PDF from Cloudinary if it exists
  if (notice.pdfPublicId) {
    try {
      await deleteFromCloudinary(notice.pdfPublicId);
    } catch (err) {
      console.error(
        "Cloudinary delete failed:",
        err
      );
    }
  }

  await notice.deleteOne();

  return NextResponse.json({
    success: true,
  });
}