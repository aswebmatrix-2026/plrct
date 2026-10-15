/**
 * Single source of truth for Course -> Discipline options.
 * Used by both the public application form and (eventually) an admin
 * settings screen, so course/branch lists stay in one place and are
 * easy to edit later — no branch/seat/duration data is invented here,
 * only what was provided.
 */
export const COURSES = [
  "M.Tech",
  "B.Tech",
  "Diploma",
  "B.Voc",
  "D.Pharmacy",
  "B.Pharmacy",
  "BBA",
  "BCA",
  "MBA",
] as const;

export type Course = (typeof COURSES)[number];

export const DISCIPLINES_BY_COURSE: Record<Course, string[]> = {
  "M.Tech": ["Computer Science & Engineering", "Civil Engineering", "Mechanical Engineering"],
  "B.Tech": [
    "Computer Science Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Communication Engineering",
    "Mechanical Engineering",
  ],
  Diploma: [
    "Computer Science Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Communication Engineering",
    "Mechanical Engineering",
    "DMLT",
  ],
  "B.Voc": [],
  "D.Pharmacy": [],
  "B.Pharmacy": [],
  BBA: [],
  BCA: [],
  MBA: [],
};

export function getDisciplinesForCourse(course: string): string[] {
  return DISCIPLINES_BY_COURSE[course as Course] ?? [];
}
