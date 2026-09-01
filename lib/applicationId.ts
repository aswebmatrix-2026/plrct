import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import Counter from "@/models/Counter";

/**
 * Generates a race-safe sequential Application ID: PTLR-2026-000001
 * Resets the sequence each calendar year (key includes the year).
 */
export async function generateApplicationId(): Promise<string> {
  await dbConnect();
  const year = new Date().getFullYear();
  const key = `student-application-${year}`;

  const counter = await Counter.findOneAndUpdate(
    { key },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );

  const padded = String(counter.seq).padStart(6, "0");
  return `PTLR-${year}-${padded}`;
}

/** Long, unguessable token for the student's private I-Card URL. */
export function generateSecureToken(): string {
  return crypto.randomBytes(24).toString("hex");
}
