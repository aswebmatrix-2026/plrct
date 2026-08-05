import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789", 5);

/**
 * Format: PLRCT-<YEAR>-<PROGRAM_CODE>-<5 digit random>
 * e.g. PLRCT-2026-BT-48213
 */
export function generateApplicationNumber(programType) {
  const year = new Date().getFullYear();
  const code = programType === "btech" ? "BT" : "DP";
  return `PLRCT-${year}-${code}-${nanoid()}`;
}
