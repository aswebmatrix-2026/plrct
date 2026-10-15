import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789", 5);

/**
 * Format: Pt. L.R. College of Technology-<YEAR>-<PROGRAM_CODE>-<5 digit random>
 * e.g. Pt. L.R. College of Technology-2026-BT-48213
 */
export function generateApplicationNumber(programType) {
  const year = new Date().getFullYear();
  const code = programType === "btech" ? "BT" : "DP";
  return `Pt. L.R. College of Technology-${year}-${code}-${nanoid()}`;
}
