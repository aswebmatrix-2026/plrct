import { NextResponse } from "next/server";

import { dbConnect } from "@/lib/mongodb.js";
import Placement from "@/models/Placement";
import { requireAdmin } from "@/lib/requireAdmin";
import { saveUploadedFile } from "@/lib/upload";
import slugify from "slugify";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";
  const department = searchParams.get("department");
  const program = searchParams.get("program");
  const status = searchParams.get("status");
  const publishedParam = searchParams.get("published");
  const featured = searchParams.get("featured");
  const isAdminRequest = searchParams.get("admin") === "1";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, parseInt(searchParams.get("limit") || "10", 10));
  const sort = searchParams.get("sort") || "-createdAt";

  const filter = {};
  if (q) filter.$text = { $search: q };
  if (department) filter.department = department;
  if (program) filter.program = program;
  if (status) filter.status = status;
  if (featured) filter.featured = featured === "true";

  if (publishedParam !== null && publishedParam !== undefined) {
    filter.published = publishedParam === "true";
  } else if (isAdminRequest) {
    const authError = await requireAdmin();
    if (authError) return authError;
    // admin sees drafts + published together, no filter applied
  } else {
    filter.published = true;
  }

  const [items, total] = await Promise.all([
    Placement.find(filter).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
    Placement.countDocuments(filter),
  ]);

  const [totalDrives, activeDrives, upcomingDrives, closedDrives, recruiters, placedAgg] = await Promise.all([
    Placement.countDocuments({}),
    Placement.countDocuments({ status: "active" }),
    Placement.countDocuments({ status: "upcoming" }),
    Placement.countDocuments({ status: "closed" }),
    Placement.distinct("companyName"),
    Placement.aggregate([{ $group: { _id: null, total: { $sum: "$studentsPlaced" } } }]),
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    pages: Math.ceil(total / limit) || 1,
    stats: {
      totalDrives,
      activeDrives,
      upcomingDrives,
      closedDrives,
      totalRecruiters: recruiters.length,
      totalStudentsPlaced: placedAgg[0]?.total || 0,
    },
  });
}

export async function POST(req) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await dbConnect();
  const form = await req.formData();

  const data = Object.fromEntries(form.entries());
  const logoFile = form.get("companyLogo");
  const pdfFile = form.get("pdfFile");

  let logoPath = "";
  let pdfPath = "";
  try {
    if (logoFile && logoFile.size > 0) logoPath = await saveUploadedFile(logoFile, "image");
    if (pdfFile && pdfFile.size > 0) pdfPath = await saveUploadedFile(pdfFile, "pdf");
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

  let baseSlug = slugify(`${data.companyName}-${data.jobRole}`, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;
  while (await Placement.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const placement = await Placement.create({
    companyName: data.companyName,
    companyLogo: logoPath,
    slug,
    jobRole: data.jobRole,
    department: data.department,
    program: data.program,
    eligibility: data.eligibility,
    minimumPercentage: Number(data.minimumPercentage) || 0,
    salaryPackage: data.salaryPackage,
    jobType: data.jobType,
    location: data.location,
    lastDate: data.lastDate,
    driveDate: data.driveDate || undefined,
    driveTime: data.driveTime,
    description: data.description,
    selectionProcess: data.selectionProcess,
    documents: data.documents,
    applyLink: data.applyLink,
    pdfFile: pdfPath,
    featured: data.featured === "true",
    published: data.published === "true",
    status: data.status || "upcoming",
  });

  return NextResponse.json({ placement }, { status: 201 });
}