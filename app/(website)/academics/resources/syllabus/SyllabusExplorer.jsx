"use client";

// app/academics/resources/syllabus/SyllabusExplorer.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import {
  PROGRAM_OPTIONS,
  DEPARTMENT_OPTIONS,
  SEMESTER_OPTIONS,
  PROGRAM_SHORT_LABELS,
  DEPARTMENT_SHORT_LABELS,
} from "@/constants/syllabus";

function CardSkeleton() {
  return (
    <div className="syllabus-skeleton-card">
      <div className="syllabus-skeleton-line" style={{ width: "40%" }} />
      <div className="syllabus-skeleton-line" style={{ width: "80%" }} />
      <div className="syllabus-skeleton-line" style={{ width: "60%" }} />
      <div className="syllabus-skeleton-line" style={{ width: "90%", height: 36 }} />
    </div>
  );
}

export default function SyllabusExplorer({ initialProgram = "all" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState(initialProgram);
  const [department, setDepartment] = useState("all");
  const [semester, setSemester] = useState("all");
  const [academicYear, setAcademicYear] = useState("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("published", "true");
      if (search.trim()) params.set("search", search.trim());
      if (program !== "all") params.set("program", program);
      if (department !== "all") params.set("department", department);
      if (semester !== "all") params.set("semester", semester);
      if (academicYear !== "all") params.set("academicYear", academicYear);

      const res = await fetch(`/api/syllabus?${params.toString()}`);
      const json = await res.json();
      if (json.success) setItems(json.data || []);
    } catch (error) {
      console.error("Failed to load syllabus list:", error);
    } finally {
      setLoading(false);
    }
  }, [search, program, department, semester, academicYear]);

  useEffect(() => {
    const handle = setTimeout(fetchData, 300);
    return () => clearTimeout(handle);
  }, [fetchData]);

  const academicYearOptions = useMemo(() => {
    const years = new Set(items.map((i) => i.academicYear));
    return Array.from(years).sort().reverse();
  }, [items]);

  function clearFilters() {
    setSearch("");
    setProgram("all");
    setDepartment("all");
    setSemester("all");
    setAcademicYear("all");
  }

  const hasActiveFilters =
    search || program !== "all" || department !== "all" || semester !== "all" || academicYear !== "all";

  return (
    <section className="syllabus-search-section" id="syllabus-search" aria-label="Search syllabus">
      <input
        type="search"
        className="syllabus-search-bar"
        placeholder="Search syllabus..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search syllabus by title, department or program"
      />

      <div className="syllabus-filters">
        <select value={program} onChange={(e) => setProgram(e.target.value)} aria-label="Filter by program">
          <option value="all">All Programs</option>
          {PROGRAM_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} aria-label="Filter by department">
          <option value="all">All Departments</option>
          {DEPARTMENT_OPTIONS.map((d) => <option key={d} value={d}>{DEPARTMENT_SHORT_LABELS[d] || d}</option>)}
        </select>
        <select value={semester} onChange={(e) => setSemester(e.target.value)} aria-label="Filter by semester">
          <option value="all">All Semesters</option>
          {SEMESTER_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} aria-label="Filter by academic year">
          <option value="all">All Academic Years</option>
          {academicYearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        {hasActiveFilters && (
          <button type="button" className="syllabus-card__btn syllabus-card__btn--secondary" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      {loading ? (
        <div className="syllabus-grid">
          {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="syllabus-empty">
          <p>
            {hasActiveFilters
              ? "No syllabus found for your selected filters."
              : "No syllabus available at the moment. Please check back soon."}
          </p>
          {hasActiveFilters && (
            <button type="button" className="syllabus-empty__clear" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="syllabus-grid">
          {items.map((item) => (
            <article className="syllabus-card" key={item._id}>
              <div className="syllabus-card__icon" aria-hidden="true">📄</div>
              <span className="syllabus-card__badge">{PROGRAM_SHORT_LABELS[item.program] || item.program}</span>
              <h3 className="syllabus-card__title">{item.title}</h3>
              <div className="syllabus-card__meta">{DEPARTMENT_SHORT_LABELS[item.department] || item.department} · {item.semester}</div>
              <div className="syllabus-card__meta">Academic Year: {item.academicYear}</div>
              {item.description && <p className="syllabus-card__desc">{item.description}</p>}
              <div className="syllabus-card__actions">
                <Link href={`/academics/resources/syllabus/${item._id}`} className="syllabus-card__btn syllabus-card__btn--primary">
                  View PDF
                </Link>
                <a href={item.pdfUrl} download className="syllabus-card__btn syllabus-card__btn--secondary">
                  Download
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}