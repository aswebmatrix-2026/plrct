// app/api/syllabus/[id]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

// ASSUMPTION: adjust these three import paths to match your existing project.
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

import Syllabus from "@/models/Syllabus";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return session;
}

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function uploadPdfToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "plrct/syllabus",
        format: "pdf",
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

// GET /api/syllabus/[id]
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params; // Next.js 15: params is now a Promise, must await it

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid syllabus ID" },
        { status: 400 }
      );
    }

    const doc = await Syllabus.findById(id).lean();
    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Syllabus not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: doc });
  } catch (error) {
    console.error("GET /api/syllabus/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch syllabus" },
      { status: 500 }
    );
  }
}

// PUT /api/syllabus/[id]  (multipart/form-data; "pdf" field optional)
export async function PUT(request, { params }) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await params; // Next.js 15: params is now a Promise, must await it

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid syllabus ID" },
        { status: 400 }
      );
    }

    const existing = await Syllabus.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Syllabus not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title")?.toString().trim();
    const program = formData.get("program")?.toString();
    const department = formData.get("department")?.toString();
    const semester = formData.get("semester")?.toString();
    const academicYear = formData.get("academicYear")?.toString().trim();
    const syllabusYear = formData.get("syllabusYear")?.toString();
    const description = formData.get("description");
    const featured = formData.get("featured");
    const published = formData.get("published");
    const file = formData.get("pdf");

    const update = {};
    if (title) update.title = title;
    if (program) update.program = program;
    if (department) update.department = department;
    if (semester) update.semester = semester;
    if (academicYear) update.academicYear = academicYear;
    if (syllabusYear) update.syllabusYear = Number(syllabusYear);
    if (description !== null) update.description = description?.toString().trim() || "";
    if (featured !== null) update.featured = featured === "true";
    if (published !== null) update.published = published === "true";

    // Replace PDF only if a new file was actually provided
    if (file && typeof file !== "string") {
      if (file.type !== "application/pdf") {
        return NextResponse.json(
          { success: false, message: "Only PDF files are allowed." },
          { status: 400 }
        );
      }

      let uploadResult;
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        uploadResult = await uploadPdfToCloudinary(buffer);
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError);
        return NextResponse.json(
          { success: false, message: "New PDF upload failed. Existing PDF was kept." },
          { status: 502 }
        );
      }

      const previousPublicId = existing.pdfPublicId;

      update.pdfUrl = uploadResult.secure_url;
      update.pdfPublicId = uploadResult.public_id;
      update.fileName = file.name;
      update.fileSize = file.size;
      update.fileType = file.type;

      // Only remove the old file once the new one is safely uploaded,
      // so we never end up with a broken/missing PDF.
      if (previousPublicId) {
        try {
          await cloudinary.uploader.destroy(previousPublicId, { resource_type: "raw" });
        } catch (cleanupError) {
          console.error("Failed to remove previous Cloudinary file (non-fatal):", cleanupError);
        }
      }
    }

    const updated = await Syllabus.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PUT /api/syllabus/[id] error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: Object.values(error.errors)[0]?.message || "Invalid data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update syllabus" },
      { status: 500 }
    );
  }
}

// DELETE /api/syllabus/[id]
export async function DELETE(request, { params }) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await params; // Next.js 15: params is now a Promise, must await it

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid syllabus ID" },
        { status: 400 }
      );
    }

    const doc = await Syllabus.findById(id);
    if (!doc) {
      return NextResponse.json(
        { success: false, message: "Syllabus not found" },
        { status: 404 }
      );
    }

    if (doc.pdfPublicId) {
      try {
        await cloudinary.uploader.destroy(doc.pdfPublicId, { resource_type: "raw" });
      } catch (cloudinaryError) {
        console.error("Cloudinary delete failed (continuing with DB delete):", cloudinaryError);
      }
    }

    await Syllabus.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Syllabus deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/syllabus/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete syllabus" },
      { status: 500 }
    );
  }
}