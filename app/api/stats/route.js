import { NextResponse } from "next/server";
import { dbConnect
 } from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { requireAdmin } from "@/lib/requireAdmin";

// GET /api/stats — powers the Admin Dashboard overview cards and charts.
export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect
();
  await Notice.syncLifecycle();

  const [
    total,
    published,
    draft,
    urgent,
    expired,
    downloadAgg,
    viewAgg,
    popular,
    categoryEngagement,
  ] = await Promise.all([
    Notice.countDocuments({}),
    Notice.countDocuments({ status: "Published" }),
    Notice.countDocuments({ status: "Draft" }),
    Notice.countDocuments({ priority: "Urgent", status: "Published" }),
    Notice.countDocuments({ status: "Archived" }),
    Notice.aggregate([{ $group: { _id: null, total: { $sum: "$downloads" } } }]),
    Notice.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
    Notice.find({}).sort({ views: -1 }).limit(5).select("title views downloads id").lean(),
    Notice.aggregate([
      { $group: { _id: "$category", views: { $sum: "$views" }, downloads: { $sum: "$downloads" }, count: { $sum: 1 } } },
      { $sort: { views: -1 } },
    ]),
  ]);

  return NextResponse.json({
    totals: {
      totalNotices: total,
      publishedNotices: published,
      draftNotices: draft,
      urgentNotices: urgent,
      expiredNotices: expired,
      totalDownloads: downloadAgg[0]?.total || 0,
      totalViews: viewAgg[0]?.total || 0,
    },
    popularNotices: popular,
    categoryEngagement,
  });
}