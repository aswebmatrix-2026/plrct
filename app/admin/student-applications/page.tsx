"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import "./StudentApplications.css";

interface Application {
  _id: string;
  applicationId: string;
  studentName: string;
  email: string;
  course: string;
  discipline: string;
  admissionYear: string;
  session: string;
  rollNumber: string | null;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  createdAt: string;
}

const STATUS_CLASS: Record<string, string> = {
  PENDING: "sap-badge--pending",
  VERIFIED: "sap-badge--verified",
  REJECTED: "sap-badge--rejected",
};

export default function StudentApplicationsPage() {
  const [items, setItems] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [course, setCourse] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [session, setSessionFilter] = useState("");
  const pageSize = 20;

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (course) params.set("course", course);
    if (admissionYear) params.set("admissionYear", admissionYear);
    if (session) params.set("session", session);

    const res = await fetch(`/api/admin/student-applications?${params.toString()}`);
    const data = await res.json();
    setItems(data.items || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, search, status, course, admissionYear, session]);

  useEffect(() => {
    load();
  }, [load]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="sap-page">
      <h1 className="sap-title">Student I-Card Applications</h1>

      <div className="sap-filters">
        <input
          className="sap-search"
          placeholder="Search name, application ID, email, roll no. or mobile"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="VERIFIED">Verified</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <input
          placeholder="Course"
          value={course}
          onChange={(e) => { setPage(1); setCourse(e.target.value); }}
        />
        <input
          placeholder="Admission Year"
          value={admissionYear}
          onChange={(e) => { setPage(1); setAdmissionYear(e.target.value); }}
        />
        <input
          placeholder="Session"
          value={session}
          onChange={(e) => { setPage(1); setSessionFilter(e.target.value); }}
        />
      </div>

      <div className="sap-table-wrap">
        <table className="sap-table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Discipline</th>
              <th>Admission Year</th>
              <th>Session</th>
              <th>Roll No.</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11} className="sap-empty">Loading…</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={11} className="sap-empty">No applications found.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.applicationId}</td>
                  <td>{item.studentName}</td>
                  <td>{item.email}</td>
                  <td>{item.course}</td>
                  <td>{item.discipline}</td>
                  <td>{item.admissionYear}</td>
                  <td>{item.session}</td>
                  <td>{item.rollNumber || "—"}</td>
                  <td>
                    <span className={`sap-badge ${STATUS_CLASS[item.status]}`}>{item.status}</span>
                  </td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link className="sap-link" href={`/admin/student-applications/${item._id}`}>
                      View / Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="sap-pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
