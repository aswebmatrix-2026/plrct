"use client";
import { useState } from "react";

const DEPARTMENTS = [
  "Computer Science Engineering","Electrical Engineering","Mechanical Engineering","Civil Engineering",
  "Electronics & Communication Engineering","Artificial Intelligence & Machine Learning","Data Science","Information Technology",
];
const PROGRAMS = ["B.Tech", "Diploma", "M.Tech"];

export default function PlacementModal({ initial, onClose, onSaved }) {
  const [form, setForm] = useState({
    companyName: initial?.companyName || "",
    jobRole: initial?.jobRole || "",
    department: initial?.department || DEPARTMENTS[0],
    program: initial?.program || PROGRAMS[0],
    eligibility: initial?.eligibility || "",
    minimumPercentage: initial?.minimumPercentage || "",
    salaryPackage: initial?.salaryPackage || "",
    jobType: initial?.jobType || "Full-time",
    location: initial?.location || "",
    lastDate: initial?.lastDate ? initial.lastDate.slice(0, 10) : "",
    driveDate: initial?.driveDate ? initial.driveDate.slice(0, 10) : "",
    driveTime: initial?.driveTime || "",
    description: initial?.description || "",
    selectionProcess: initial?.selectionProcess || "",
    documents: initial?.documents || "",
    applyLink: initial?.applyLink || "",
    featured: initial?.featured || false,
    status: initial?.status || "upcoming",
  });
  const [companyLogo, setCompanyLogo] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(key, val) { setForm((f) => ({ ...f, [key]: val })); }

  async function submit(publishStatus) {
    setSaving(true);
    setError("");
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.set("published", publishStatus ? "true" : "false");
    if (companyLogo) fd.append("companyLogo", companyLogo);
    if (pdfFile) fd.append("pdfFile", pdfFile);

    const url = initial ? `/api/placements/${initial._id}` : "/api/placements";
    const method = initial ? "PUT" : "POST";

    const res = await fetch(url, { method, body: fd });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) { setError(data.error || "Something went wrong"); return; }
    onSaved();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initial ? "Edit" : "Add"} Placement Drive</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-form">
          {error && <p className="full" style={{ color: "#B91C1C" }}>{error}</p>}

          <div><label>Company Name</label><input value={form.companyName} onChange={(e) => update("companyName", e.target.value)} required /></div>
          <div><label>Company Logo</label><input type="file" accept="image/*" onChange={(e) => setCompanyLogo(e.target.files[0])} /></div>

          <div><label>Job Role</label><input value={form.jobRole} onChange={(e) => update("jobRole", e.target.value)} required /></div>
          <div><label>Department</label>
            <select value={form.department} onChange={(e) => update("department", e.target.value)}>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div><label>Program</label>
            <select value={form.program} onChange={(e) => update("program", e.target.value)}>
              {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div><label>Eligibility</label><input value={form.eligibility} onChange={(e) => update("eligibility", e.target.value)} /></div>

          <div><label>Minimum % / CGPA</label><input type="number" step="0.01" value={form.minimumPercentage} onChange={(e) => update("minimumPercentage", e.target.value)} /></div>
          <div><label>Salary Package</label><input value={form.salaryPackage} onChange={(e) => update("salaryPackage", e.target.value)} /></div>

          <div><label>Internship / Full-time</label>
            <select value={form.jobType} onChange={(e) => update("jobType", e.target.value)}>
              <option>Internship</option><option>Full-time</option><option>Internship + Full-time</option>
            </select>
          </div>
          <div><label>Job Location</label><input value={form.location} onChange={(e) => update("location", e.target.value)} /></div>

          <div><label>Last Date</label><input type="date" value={form.lastDate} onChange={(e) => update("lastDate", e.target.value)} required /></div>
          <div><label>Drive Date</label><input type="date" value={form.driveDate} onChange={(e) => update("driveDate", e.target.value)} /></div>

          <div><label>Drive Time</label><input value={form.driveTime} onChange={(e) => update("driveTime", e.target.value)} /></div>
          <div><label>Status</label>
            <select value={form.status} onChange={(e) => update("status", e.target.value)}>
              <option value="upcoming">Upcoming</option><option value="active">Active</option><option value="closed">Closed</option>
            </select>
          </div>

          <div className="full"><label>Description</label><textarea rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} /></div>
          <div className="full"><label>Selection Process</label><textarea rows={2} value={form.selectionProcess} onChange={(e) => update("selectionProcess", e.target.value)} /></div>
          <div className="full"><label>Required Documents</label><input value={form.documents} onChange={(e) => update("documents", e.target.value)} /></div>
          <div className="full"><label>Apply Link</label><input value={form.applyLink} onChange={(e) => update("applyLink", e.target.value)} /></div>
          <div className="full"><label>PDF Notification Upload</label><input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} /></div>

          <div className="full checkbox-row">
            <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} id="featured" />
            <label htmlFor="featured" style={{ margin: 0 }}>Featured Placement</label>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-outline" disabled={saving} onClick={() => submit(false)}>Save Draft</button>
          <button className="btn btn-primary" disabled={saving} onClick={() => submit(true)}>{initial ? "Update" : "Publish"}</button>
        </div>
      </div>
    </div>
  );
}
