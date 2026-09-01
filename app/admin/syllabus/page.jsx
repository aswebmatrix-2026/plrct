"use client";

// app/admin/syllabus/page.jsx
// Assumes this renders inside your existing app/admin/layout.jsx,
// which already handles admin auth/session checks and the dashboard chrome.

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast"; // ASSUMPTION: swap for your existing toast system if different
import {
  PROGRAM_OPTIONS,
  DEPARTMENT_OPTIONS,
  SEMESTER_OPTIONS,
  PROGRAM_SHORT_LABELS,
  DEPARTMENT_SHORT_LABELS,
} from "@/constants/syllabus";
import "./admin-syllabus.css";

function StatCard({ value, label }) {
  return (
    <div className="syl-stat-card">
      <div className="syl-stat-card__value">{value}</div>
      <div className="syl-stat-card__label">{label}</div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <div className="syl-skeleton-row" key={i}>
          <div className="syl-skeleton" style={{ width: "22%", height: 16 }} />
          <div className="syl-skeleton" style={{ width: "12%", height: 16 }} />
          <div className="syl-skeleton" style={{ width: "16%", height: 16 }} />
          <div className="syl-skeleton" style={{ width: "10%", height: 16 }} />
          <div className="syl-skeleton" style={{ width: "10%", height: 16 }} />
          <div className="syl-skeleton" style={{ width: "10%", height: 16 }} />
        </div>
      ))}
    </div>
  );
}

export default function AdminSyllabusPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("all");
  const [department, setDepartment] = useState("all");
  const [semester, setSemester] = useState("all");
  const [academicYear, setAcademicYear] = useState("all");
  const [status, setStatus] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (program !== "all") params.set("program", program);
      if (department !== "all") params.set("department", department);
      if (semester !== "all") params.set("semester", semester);
      if (academicYear !== "all") params.set("academicYear", academicYear);
      if (status !== "all") params.set("published", status === "published" ? "true" : "false");

      const res = await fetch(`/api/syllabus?${params.toString()}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to load syllabus list");
      setItems(json.data || []);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load syllabus list");
    } finally {
      setLoading(false);
    }
  }, [search, program, department, semester, academicYear, status]);

  useEffect(() => {
    const handle = setTimeout(fetchData, 300); // debounce search/filter changes
    return () => clearTimeout(handle);
  }, [fetchData]);

  const academicYearOptions = useMemo(() => {
    const years = new Set(items.map((i) => i.academicYear));
    return Array.from(years).sort().reverse();
  }, [items]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      published: items.filter((i) => i.published).length,
      draft: items.filter((i) => !i.published).length,
      btech: items.filter((i) => i.program === "B.Tech Engineering").length,
      diploma: items.filter((i) => i.program === "Diploma Engineering").length,
      mtech: items.filter((i) => i.program === "M.Tech Engineering").length,
    };
  }, [items]);

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/syllabus/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Delete failed");
      toast.success("Syllabus deleted successfully");
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (error) {
      toast.error(error.message || "Failed to delete syllabus");
    } finally {
      setDeletingId(null);
    }
  }

  function clearFilters() {
    setSearch("");
    setProgram("all");
    setDepartment("all");
    setSemester("all");
    setAcademicYear("all");
    setStatus("all");
  }

  const hasActiveFilters =
    search || program !== "all" || department !== "all" || semester !== "all" ||
    academicYear !== "all" || status !== "all";

  return (
    <div className="syl-admin">
      <div className="syl-admin__header">
        <div>
          <h1 className="syl-admin__title">Syllabus Management</h1>
          <p className="syl-admin__subtitle">
            Manage academic syllabus documents for all engineering programs.
          </p>
        </div>
        <Link href="/admin/syllabus/add" className="syl-admin__add-btn">
          + Add New Syllabus
        </Link>
      </div>

      <div className="syl-admin__stats">
        <StatCard value={stats.total} label="Total Syllabus" />
        <StatCard value={stats.published} label="Published" />
        <StatCard value={stats.draft} label="Draft" />
        <StatCard value={stats.btech} label="B.Tech" />
        <StatCard value={stats.diploma} label="Diploma" />
        <StatCard value={stats.mtech} label="M.Tech" />
      </div>

      <div className="syl-admin__toolbar">
        <input
          type="search"
          className="syl-admin__search"
          placeholder="Search by title, department, program or academic year..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search syllabus"
        />
        <div className="syl-admin__filters">
          <select value={program} onChange={(e) => setProgram(e.target.value)} aria-label="Filter by program">
            <option value="all">All Programs</option>
            {PROGRAM_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select value={department} onChange={(e) => setDepartment(e.target.value)} aria-label="Filter by department">
            <option value="all">All Departments</option>
            {DEPARTMENT_OPTIONS.map((d) => (
              <option key={d} value={d}>{DEPARTMENT_SHORT_LABELS[d] || d}</option>
            ))}
          </select>

          <select value={semester} onChange={(e) => setSemester(e.target.value)} aria-label="Filter by semester">
            <option value="all">All Semesters</option>
            {SEMESTER_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} aria-label="Filter by academic year">
            <option value="all">All Academic Years</option>
            {academicYearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          {hasActiveFilters && (
            <button type="button" className="syl-icon-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="syl-admin__table-wrap">
          <TableSkeleton />
        </div>
      ) : items.length === 0 ? (
        <div className="syl-admin__empty">
          <p>{hasActiveFilters ? "No syllabus found for your selected filters." : "No syllabus available yet."}</p>
          {hasActiveFilters && (
            <button type="button" className="syl-admin__add-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="syl-admin__table-wrap">
            <table className="syl-admin__table">
              <thead>
                <tr>
                  <th>Syllabus</th>
                  <th>Program</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Academic Year</th>
                  <th>Status</th>
                  <th>PDF</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.title}
                      {item.featured && <span className="syl-badge syl-badge--featured" style={{ marginLeft: 8 }}>Featured</span>}
                    </td>
                    <td><span className="syl-badge syl-badge--program">{PROGRAM_SHORT_LABELS[item.program] || item.program}</span></td>
                    <td>{DEPARTMENT_SHORT_LABELS[item.department] || item.department}</td>
                    <td>{item.semester}</td>
                    <td>{item.academicYear}</td>
                    <td>
                      <span className={`syl-badge ${item.published ? "syl-badge--published" : "syl-badge--draft"}`}>
                        {item.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td>
                      <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">View</a>
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString("en-IN")}</td>
                    <td>
                      <div className="syl-admin__actions">
                        <a className="syl-icon-btn" href={item.pdfUrl} target="_blank" rel="noopener noreferrer" title="View PDF" aria-label={`View PDF for ${item.title}`}>View</a>
                        <Link className="syl-icon-btn" href={`/admin/syllabus/edit/${item._id}`} title="Edit" aria-label={`Edit ${item.title}`}>Edit</Link>
                        <a className="syl-icon-btn" href={item.pdfUrl} download title="Download" aria-label={`Download ${item.title}`}>DL</a>
                        <button
                          type="button"
                          className="syl-icon-btn syl-icon-btn--danger"
                          onClick={() => handleDelete(item._id, item.title)}
                          disabled={deletingId === item._id}
                          aria-label={`Delete ${item.title}`}
                        >
                          {deletingId === item._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card view */}
          <div className="syl-admin__cards">
            {items.map((item) => (
              <div className="syl-admin-card" key={item._id}>
                <div className="syl-admin-card__title">{item.title}</div>
                <div className="syl-admin-card__meta">
                  {PROGRAM_SHORT_LABELS[item.program] || item.program} · {DEPARTMENT_SHORT_LABELS[item.department] || item.department} · {item.semester} · {item.academicYear}
                </div>
                <div className="syl-admin-card__row">
                  <span className={`syl-badge ${item.published ? "syl-badge--published" : "syl-badge--draft"}`}>
                    {item.published ? "Published" : "Draft"}
                  </span>
                  <div className="syl-admin__actions">
                    <a className="syl-icon-btn" href={item.pdfUrl} target="_blank" rel="noopener noreferrer">View</a>
                    <Link className="syl-icon-btn" href={`/admin/syllabus/edit/${item._id}`}>Edit</Link>
                    <a className="syl-icon-btn" href={item.pdfUrl} download>DL</a>
                    <button
                      type="button"
                      className="syl-icon-btn syl-icon-btn--danger"
                      onClick={() => handleDelete(item._id, item.title)}
                      disabled={deletingId === item._id}
                    >
                      {deletingId === item._id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}