// app/api/contact/[id]/route.js
// PATCH -> update an inquiry's status (new / contacted / resolved) from the dashboard

import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import ContactInquiry from "../../../../models/ContactInquiry";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();

    const inquiry = await ContactInquiry.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ inquiry });
  } catch (err) {
    console.error("Updating inquiry failed:", err);
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}