import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb.js";
import Placement from "@/models/Placement";
import { requireAdmin } from "@/lib/requireAdmin";
import slugify from "slugify";

export async function GET(req) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const companyName = searchParams.get("companyName") || "";
  const jobRole = searchParams.get("jobRole") || "";
  const excludeId = searchParams.get("excludeId");

  if (!companyName || !jobRole) {
    return NextResponse.json({ error: "companyName and jobRole required" }, { status: 400 });
  }

  await dbConnect();
  const base = slugify(`${companyName}-${jobRole}`, { lower: true, strict: true });
  let slug = base;
  let counter = 1;
  while (await Placement.findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${base}-${counter++}`;
  }
  return NextResponse.json({ slug });
}