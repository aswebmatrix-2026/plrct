import { NextResponse } from "next/server";
import { dbConnect
 } from "@/lib/mongodb";
import Notice from "@/models/Notice";

// GET /api/notices/id/:id — powers the public notice detail page.
export async function GET(_request, { params }) {
  await dbConnect
();
  await Notice.syncLifecycle();

  const notice = await Notice.findOneAndUpdate(
    { id: params.id },
    { $inc: { views: 1 } },
    { new: true }
  ).lean();

  if (!notice) {
    return NextResponse.json({ error: "Notice not found." }, { status: 404 });
  }

  const related = await Notice.find({
    _id: { $ne: notice._id },
    category: notice.category,
    status: "Published",
  })
    .sort({ publishDate: -1 })
    .limit(4)
    .lean();

  return NextResponse.json({ notice, related });
}