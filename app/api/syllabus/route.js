// app/api/syllabus/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

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

function uploadPdfToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // PDFs are non-image assets in Cloudinary
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

// GET /api/syllabus?program=&department=&semester=&academicYear=&published=&search=&featured=
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const program = searchParams.get("program");
    const department = searchParams.get("department");
    const semester = searchParams.get("semester");
    const academicYear = searchParams.get("academicYear");
    const published = searchParams.get("published");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const query = {};
    if (program && program !== "all") query.program = program;
    if (department && department !== "all") query.department = department;
    if (semester && semester !== "all") query.semester = semester;
    if (academicYear && academicYear !== "all") query.academicYear = academicYear;
    if (published === "true") query.published = true;
    if (published === "false") query.published = false;
    if (featured === "true") query.featured = true;

    if (search && search.trim()) {
      const regex = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$or = [
        { title: regex },
        { department: regex },
        { program: regex },
        { academicYear: regex },
      ];
    }

    const docs = await Syllabus.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    console.error("GET /api/syllabus error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch syllabus list" },
      { status: 500 }
    );
  }
}

// POST /api/syllabus  (multipart/form-data)
export async function POST(request) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const formData = await request.formData();
    const title = formData.get("title")?.toString().trim();
    const program = formData.get("program")?.toString();
    const department = formData.get("department")?.toString();
    const semester = formData.get("semester")?.toString();
    const academicYear = formData.get("academicYear")?.toString().trim();
    const syllabusYear = formData.get("syllabusYear")?.toString();
    const description = formData.get("description")?.toString().trim() || "";
    const featured = formData.get("featured") === "true";
    const published = formData.get("published") === "true";
    const file = formData.get("pdf");

    if (!title || !program || !department || !semester || !academicYear || !syllabusYear) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "A syllabus PDF is required." },
        { status: 400 }
      );
    }

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
        { success: false, message: "PDF upload failed. Please try again." },
        { status: 502 }
      );
    }

    const syllabus = await Syllabus.create({
      title,
      program,
      department,
      semester,
      academicYear,
      syllabusYear: Number(syllabusYear),
      description,
      pdfUrl: uploadResult.secure_url,
      pdfPublicId: uploadResult.public_id,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      featured,
      published,
    });

    return NextResponse.json({ success: true, data: syllabus }, { status: 201 });
  } catch (error) {
    console.error("POST /api/syllabus error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: Object.values(error.errors)[0]?.message || "Invalid data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create syllabus" },
      { status: 500 }
    );
  }
}