"use client";
import { useEffect, useState, useCallback } from "react";
import PlacementModal from "@/components/PlacementModal";
import "@/styles/placements.css";

export default function AdminPlacementsPage() {
  const [data, setData] = useState({ items: [], stats: {}, page: 1, pages: 1 });
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const load = useCallback(async () => {
    const params = new URLSearchParams({ page, limit: 10, admin: "1" });
    if (q) params.set("q", q);
    const res = await fetch(`/api/placements?${params.toString()}`);
    const json = await res.json();
    setData(json);
  }, [page, q]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id) {
    if (!confirm("Delete this placement drive?")) return;
    const res = await fetch(`/api/placements/${id}`, { method: "DELETE" });
    if (!res.ok) { const j = await res.json().catch(() => ({})); alert(j.error || "Delete failed"); return; }
    load();
  }
  async function handleTogglePublish(id) {
    const res = await fetch(`/api/placements/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "toggle-publish" }) });
    if (!res.ok) { const j = await res.json().catch(() => ({})); alert(j.error || "Action failed"); return; }
    load();
  }
  async function handleDuplicate(id) {
    const res = await fetch(`/api/placements/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "duplicate" }) });
    if (!res.ok) { const j = await res.json().catch(() => ({})); alert(j.error || "Action failed"); return; }
    load();
  }

  const s = data.stats || {};

  return (
    <div>
      <div className="admin-topbar">
        <h1>Placements</h1>
        <button className="btn btn-primary" onClick={() => { setEditItem(null); setModalOpen(true); }}>+ Add Placement Drive</button>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-card"><div className="value">{s.totalDrives ?? "—"}</div><div className="label">Total Drives</div></div>
        <div className="glass-card stat-card"><div className="value">{s.activeDrives ?? "—"}</div><div className="label">Active Drives</div></div>
        <div className="glass-card stat-card"><div className="value">{s.upcomingDrives ?? "—"}</div><div className="label">Upcoming Drives</div></div>
        <div className="glass-card stat-card"><div className="value">{s.closedDrives ?? "—"}</div><div className="label">Closed Drives</div></div>
        <div className="glass-card stat-card"><div className="value">{s.totalRecruiters ?? "—"}</div><div className="label">Total Recruiters</div></div>
        <div className="glass-card stat-card"><div className="value">{s.totalStudentsPlaced ?? "—"}</div><div className="label">Students Placed</div></div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input placeholder="Search company or role..." value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} style={{ maxWidth: 320 }} />
      </div>

      <div className="data-table-wrap">
        <table className="data-table">
          <thead><tr>
            <th>Company</th><th>Job Role</th><th>Department</th><th>Package</th><th>Last Date</th><th>Status</th><th>Published</th><th>Actions</th>
          </tr></thead>
          <tbody>
            {data.items?.map((p) => (
              <tr key={p._id}>
                <td>{p.companyName}</td>
                <td>{p.jobRole}</td>
                <td>{p.department}</td>
                <td>{p.salaryPackage}</td>
                <td>{p.lastDate ? new Date(p.lastDate).toLocaleDateString() : "—"}</td>
                <td><span className={`badge badge-${p.status}`}>{p.status}</span></td>
                <td><span className={`badge ${p.published ? "badge-published" : "badge-draft"}`}>{p.published ? "Published" : "Draft"}</span></td>
                <td className="row-actions">
                  <a className="btn btn-ghost btn-sm" href={`/placements/${p.slug}`} target="_blank" rel="noreferrer">View</a>
                  <button className="btn btn-outline btn-sm" onClick={() => { setEditItem(p); setModalOpen(true); }}>Edit</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleDuplicate(p._id)}>Duplicate</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleTogglePublish(p._id)}>{p.published ? "Unpublish" : "Publish"}</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {data.items?.length === 0 && <tr><td colSpan={8}>No placement drives yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {data.pages > 1 && (
        <div className="pagination">
          {Array.from({ length: data.pages }, (_, i) => i + 1).map((n) => (
            <button key={n} className={n === page ? "active" : ""} onClick={() => setPage(n)}>{n}</button>
          ))}
        </div>
      )}

      {modalOpen && (
        <PlacementModal
          initial={editItem}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); load(); }}
        />
      )}
    </div>
  );
}