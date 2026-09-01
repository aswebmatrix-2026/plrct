import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongodb.js";
import Placement from "@/models/Placement";
import { requireAdmin } from "@/lib/requireAdmin";
import { saveUploadedFile, deleteUploadedFile } from "@/lib/upload";
import slugify from "slugify";

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = await params;
  const placement = await Placement.findOne(
    isValidId(id) ? { $or: [{ _id: id }, { slug: id }] } : { slug: id }
  ).lean();
  if (!placement) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ placement });
}

export async function PUT(req, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return authError;

    const { id } = await params;
    if (!isValidId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    await dbConnect();
    const existing = await Placement.findById(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const form = await req.formData();
    const data = Object.fromEntries(form.entries());
    const logoFile = form.get("companyLogo");
    const pdfFile = form.get("pdfFile");

    const update = { ...data };
    delete update.companyLogo;
    delete update.pdfFile;
    if (update.minimumPercentage) update.minimumPercentage = Number(update.minimumPercentage);
    if (update.featured !== undefined) update.featured = update.featured === "true";
    if (update.published !== undefined) update.published = update.published === "true";

    if (logoFile && logoFile.size > 0) {
      update.companyLogo = await saveUploadedFile(logoFile, "image");
      if (existing.companyLogo) await deleteUploadedFile(existing.companyLogo, "image");
    }
    if (pdfFile && pdfFile.size > 0) {
      update.pdfFile = await saveUploadedFile(pdfFile, "pdf");
      if (existing.pdfFile) await deleteUploadedFile(existing.pdfFile, "pdf");
    }

    if (data.companyName || data.jobRole) {
      const base = slugify(`${data.companyName || existing.companyName}-${data.jobRole || existing.jobRole}`, { lower: true, strict: true });
      if (base !== existing.slug) {
        let slug = base;
        let counter = 1;
        while (await Placement.findOne({ slug, _id: { $ne: id } })) {
          slug = `${base}-${counter++}`;
        }
        update.slug = slug;
      }
    }

    const placement = await Placement.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    return NextResponse.json({ placement });
  } catch (e) {
    console.error("PUT /api/placements/[id] error:", e);
    return NextResponse.json({ error: e.message || "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return authError;

    const { id } = await params;
    if (!isValidId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    await dbConnect();
    const deleted = await Placement.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (deleted.companyLogo) await deleteUploadedFile(deleted.companyLogo, "image");
    if (deleted.pdfFile) await deleteUploadedFile(deleted.pdfFile, "pdf");

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/placements/[id] error:", e);
    return NextResponse.json({ error: e.message || "Delete failed" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const authError = await requireAdmin();
    if (authError) return authError;

    const { id } = await params;
    if (!isValidId(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    await dbConnect();
    const body = await req.json();

    if (body.action === "duplicate") {
      const original = await Placement.findById(id).lean();
      if (!original) return NextResponse.json({ error: "Not found" }, { status: 404 });
      delete original._id;
      let base = slugify(`${original.companyName}-${original.jobRole}-copy`, { lower: true, strict: true });
      let slug = base;
      let counter = 1;
      while (await Placement.findOne({ slug })) slug = `${base}-${counter++}`;
      const copy = await Placement.create({ ...original, slug, published: false });
      return NextResponse.json({ placement: copy }, { status: 201 });
    }

    if (body.action === "toggle-publish") {
      const placement = await Placement.findById(id);
      if (!placement) return NextResponse.json({ error: "Not found" }, { status: 404 });
      placement.published = !placement.published;
      await placement.save();
      return NextResponse.json({ placement });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (e) {
    console.error("PATCH /api/placements/[id] error:", e);
    return NextResponse.json({ error: e.message || "Action failed" }, { status: 500 });
  }
}