"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const CATEGORIES = ["Admission", "Examination", "Academic", "Placement", "Scholarship", "Circular", "Tender", "Recruitment"];
const STATUSES = ["Draft", "Scheduled", "Published", "Archived"];

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function NoticeTable() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ scope: "all", limit: "50" });
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    const res = await fetch(`/api/notices?${params.toString()}`);
    const data = await res.json();
    let list = data.notices || [];
    if (status) list = list.filter((n) => n.status === status);
    setNotices(list);
    setLoading(false);
  }, [category, status, search]);

  useEffect(() => {
    load();
  }, [load]);

  async function runAction(id, action) {
    setBusyId(id);
    try {
      await fetch(`/api/notices/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      await load();
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusyId(id);
    try {
      await fetch(`/api/notices/${id}`, { method: "DELETE" });
      await load();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <div className="table-toolbar">
        <div className="table-toolbar__filters">
          <input
            type="search"
            placeholder="Search notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <Link href="/admin/notices/new" className="btn btn--primary">
          + Create Notice
        </Link>
      </div>

      <div className="notice-table-wrap">
        <table className="notice-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Downloads</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n._id}>
                <td>
                  {n.pinned && "📌 "}
                  {n.title}
                </td>
                <td>{n.category}</td>
                <td>
                  <span className={`status-pill status-pill--${n.status.toLowerCase()}`}>{n.status}</span>
                </td>
                <td>{n.priority}</td>
                <td>{formatDate(n.publishDate)}</td>
                <td>{n.downloads}</td>
                <td>{n.views}</td>
                <td>
                  <div className="table-actions">
                    <Link href={`/notice-board/${n.id}`} target="_blank">View</Link>
                    <Link href={`/admin/notices/edit/${n._id}`}>Edit</Link>
                    {n.status === "Published" ? (
                      <button disabled={busyId === n._id} onClick={() => runAction(n._id, "unpublish")}>Unpublish</button>
                    ) : (
                      <button disabled={busyId === n._id} onClick={() => runAction(n._id, "publish")}>Publish</button>
                    )}
                    <button disabled={busyId === n._id} onClick={() => runAction(n._id, n.pinned ? "unpin" : "pin")}>
                      {n.pinned ? "Unpin" : "Pin"}
                    </button>
                    <button disabled={busyId === n._id} onClick={() => runAction(n._id, "duplicate")}>Duplicate</button>
                    <button className="danger" disabled={busyId === n._id} onClick={() => handleDelete(n._id, n.title)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && notices.length === 0 && <div className="dashboard-empty">No notices match your filters.</div>}
        {loading && <div className="dashboard-empty">Loading notices...</div>}
      </div>
    </>
  );
}