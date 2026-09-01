import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import StudentApplication from "@/models/StudentApplication";
import { requireAdmin } from "@/lib/requireAdmin";

const EDITABLE_FIELDS = [
  "studentName",
  "fatherName",
  "course",
  "discipline",
  "admissionYear",
  "session",
  "mobile",
  "address",
  "email",
] as const;

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _req: Request,
  { params }: RouteContext
) {
  try {
    const authResponse = await requireAdmin();

    if (authResponse) {
      return authResponse;
    }

    await dbConnect();

    // Next.js dynamic params are async
    const { id } = await params;

    const application = await StudentApplication.findById(id).lean();

    if (!application) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error(
      "GET /api/admin/student-applications/[id] error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to fetch student application",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: RouteContext
) {
  try {
    const authResponse = await requireAdmin();

    if (authResponse) {
      return authResponse;
    }

    await dbConnect();

    // Next.js dynamic params are async
    const { id } = await params;

    const body = await req.json();

    const updates: Record<string, any> = {};

    for (const field of EDITABLE_FIELDS) {
      if (field in body) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        {
          error: "No editable fields provided",
        },
        { status: 400 }
      );
    }

    const application =
      await StudentApplication.findByIdAndUpdate(
        id,
        updates,
        {
          new: true,
          runValidators: true,
        }
      ).lean();

    if (!application) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error(
      "PATCH /api/admin/student-applications/[id] error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update student application",
      },
      { status: 500 }
    );
  }
}