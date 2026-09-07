import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import * as XLSX from "xlsx";
import dbConnect from "../../../../lib/mongodb";
import Admission from "../../../../models/Admission";
import { authOptions } from "../../../../lib/authOptions";

// GET /api/admissions/export?format=xlsx|csv&...same filters as list route
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "xlsx";

  const filter = { isDraft: { $ne: true } };
  const programType = searchParams.get("programType");
  const department = searchParams.get("department");
  const status = searchParams.get("status");
  if (programType) filter.programType = programType;
  if (department) filter.department = department;
  if (status) filter.applicationStatus = status;

  await dbConnect();
  const admissions = await Admission.find(filter).sort({ createdAt: -1 }).lean();

  const rows = admissions.map((a) => ({
    "Application Number": a.applicationNumber,
    "Student Name": a.fullName,
    Phone: a.phone,
    Email: a.email,
    Program: a.programType,
    Department: a.department,
    "Admission Mode": a.admissionMode,
    Status: a.applicationStatus,
    City: a.city,
    State: a.state,
    "Submitted On": new Date(a.createdAt).toLocaleDateString("en-IN"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Admissions");

  const bufferFormat = format === "csv" ? "csv" : "xlsx";
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: bufferFormat });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        bufferFormat === "csv"
          ? "text/csv"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="PLRCT-admissions.${bufferFormat}"`,
    },
  });
}
