// constants/syllabus.js
// Single source of truth for Program / Department / Semester options.
// Kept free of any server-only imports (mongoose, etc.) so both the
// Mongoose model AND client-side form/filter components can import it.

export const PROGRAM_OPTIONS = [
  "Diploma Engineering",
  "B.Tech Engineering",
  "M.Tech Engineering",
];

export const DEPARTMENT_OPTIONS = [
  "Computer Science Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics & Communication Engineering",
  "Artificial Intelligence & Machine Learning",
  "Data Science",
  "Information Technology",
  "Applied Science",
];

export const SEMESTER_OPTIONS = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
];

// Which semesters are valid for each program.
// Diploma Engineering: 6 semesters, B.Tech: 8, M.Tech: 4.
// Used to hide irrelevant semesters in dropdowns/filters.
export const PROGRAM_SEMESTER_MAP = {
  "Diploma Engineering": SEMESTER_OPTIONS.slice(0, 6),
  "B.Tech Engineering": SEMESTER_OPTIONS.slice(0, 8),
  "M.Tech Engineering": SEMESTER_OPTIONS.slice(0, 4),
};

// Short codes used for stat cards / badges / filter chips.
export const PROGRAM_SHORT_LABELS = {
  "Diploma Engineering": "Diploma",
  "B.Tech Engineering": "B.Tech",
  "M.Tech Engineering": "M.Tech",
};

export const DEPARTMENT_SHORT_LABELS = {
  "Computer Science Engineering": "CSE",
  "Electrical Engineering": "EE",
  "Mechanical Engineering": "ME",
  "Civil Engineering": "CE",
  "Electronics & Communication Engineering": "ECE",
  "Artificial Intelligence & Machine Learning": "AIML",
  "Data Science": "Data Science",
  "Information Technology": "IT",
  "Applied Science": "Applied Science",
};

export function getSemestersForProgram(program) {
  return PROGRAM_SEMESTER_MAP[program] || SEMESTER_OPTIONS;
}

export function formatFileSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}