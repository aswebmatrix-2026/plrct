// app/api/contact/route.js
// POST  -> save a new inquiry from the public contact form
// GET   -> list inquiries for the admin dashboard (paginated + filterable)
//
// ⚠️ Adjust the "@/lib/dbConnect" import below to match whatever your
// existing Mongo connection helper is actually called (the one your
// /api/admissions routes already use).

import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import ContactInquiry from "../../../models/ContactInquiry";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { fullName, email, mobile, course } = body;

    if (!fullName || !email || !mobile || !course) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const inquiry = await ContactInquiry.create({
      fullName,
      email,
      mobile,
      city: body.city || "",
      state: body.state || "",
      course,
      subject: body.subject || "",
      message: body.message || "",
    });

    return NextResponse.json({ inquiry }, { status: 201 });
  } catch (err) {
    console.error("Contact form submission failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const search = searchParams.get("search");
    const course = searchParams.get("course");
    const status = searchParams.get("status");

    const query = {};
    if (course) query.course = course;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    const total = await ContactInquiry.countDocuments(query);
    const items = await ContactInquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      items,
      pagination: { page, pages: Math.ceil(total / limit) || 1, total },
    });
  } catch (err) {
    console.error("Fetching contact inquiries failed:", err);
    return NextResponse.json(
      { error: "Could not load inquiries." },
      { status: 500 }
    );
  }
}