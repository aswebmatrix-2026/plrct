import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import StudentApplication from "@/models/StudentApplication";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req: Request) {
  try {
    // Admin authentication
    const authResponse = await requireAdmin();

    // If not authenticated, return 401 response
    if (authResponse) {
      return authResponse;
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search")?.trim();
    const status = searchParams.get("status");
    const course = searchParams.get("course");
    const admissionYear = searchParams.get("admissionYear");
    const session = searchParams.get("session");

    const page = Math.max(
      1,
      parseInt(searchParams.get("page") || "1", 10)
    );

    const pageSize = Math.min(
      100,
      Math.max(
        1,
        parseInt(searchParams.get("pageSize") || "20", 10)
      )
    );

    const query: Record<string, any> = {};

    if (status) {
      query.status = status;
    }

    if (course) {
      query.course = course;
    }

    if (admissionYear) {
      query.admissionYear = admissionYear;
    }

    if (session) {
      query.session = session;
    }

    if (search) {
      const regex = new RegExp(
        search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      query.$or = [
        { studentName: regex },
        { applicationId: regex },
        { email: regex },
        { rollNumber: regex },
        { mobile: regex },
      ];
    }

    const [items, total] = await Promise.all([
      StudentApplication.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),

      StudentApplication.countDocuments(query),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/student-applications error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch student applications",
      },
      { status: 500 }
    );
  }
}