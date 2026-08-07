import { NextResponse } from "next/server";
import { dbConnect
 } from "@/lib/mongodb";
import Notice from "@/models/Notice";

// GET /api/notices/download/:id
// Increments the download counter, then redirects the browser straight to
// the Cloudinary-hosted PDF so the "Download PDF" button both tracks
// analytics and triggers the file download in one click.
export async function GET(_request, { params }) {
  await dbConnect
();

  const notice = await Notice.findOneAndUpdate(
    { id: params.id },
    { $inc: { downloads: 1 } },
    { new: true }
  ).lean();

  if (!notice || !notice.pdfUrl) {
    return NextResponse.json({ error: "PDF not found for this notice." }, { status: 404 });
  }

  return NextResponse.redirect(notice.pdfUrl);
}