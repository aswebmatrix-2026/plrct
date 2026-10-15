import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/mongodb";
import Admission from "@/models/Admission";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const baseFilter = { isDraft: { $ne: true } };
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [
    total,
    today,
    diploma,
    btech,
    pending,
    approved,
    rejected,
    byDepartment,
    byStatus,
    dailyTrend,
    byState,
  ] = await Promise.all([
    Admission.countDocuments(baseFilter),
    Admission.countDocuments({ ...baseFilter, createdAt: { $gte: startOfToday } }),
    Admission.countDocuments({ ...baseFilter, programType: "diploma" }),
    Admission.countDocuments({ ...baseFilter, programType: "btech" }),
    Admission.countDocuments({
      ...baseFilter,
      applicationStatus: { $in: ["new", "under_review", "documents_pending"] },
    }),
    Admission.countDocuments({ ...baseFilter, applicationStatus: "approved" }),
    Admission.countDocuments({ ...baseFilter, applicationStatus: "rejected" }),
    Admission.aggregate([
      { $match: baseFilter },
      { $group: { _id: "$department", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Admission.aggregate([
      { $match: baseFilter },
      { $group: { _id: "$applicationStatus", count: { $sum: 1 } } },
    ]),
    Admission.aggregate([
      { $match: baseFilter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 30 },
    ]),
    Admission.aggregate([
      { $match: baseFilter },
      { $group: { _id: "$state", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
  ]);

  const conversionRate = total > 0 ? Math.round((approved / total) * 1000) / 10 : 0;

  return NextResponse.json({
    cards: {
      total,
      today,
      diploma,
      btech,
      pending,
      approved,
      rejected,
      inquiries: 0, // wire up to an Inquiry collection if/when one is added
    },
    charts: {
      byDepartment: byDepartment.map((d) => ({ department: d._id, count: d.count })),
      byStatus: byStatus.map((s) => ({ status: s._id, count: s.count })),
      dailyTrend: dailyTrend.map((d) => ({ date: d._id, count: d.count })),
      byState: byState.map((s) => ({ state: s._id, count: s.count })),
    },
    analytics: {
      conversionRate,
      approvalRate: total > 0 ? Math.round((approved / total) * 1000) / 10 : 0,
    },
  });
}
