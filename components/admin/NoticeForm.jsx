"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/notice-form.css";

const CATEGORIES = ["Admission", "Examination", "Academic", "Placement", "Scholarship", "Circular", "Tender", "Recruitment"];
const PRIORITIES = ["Normal", "Important", "Urgent", "Featured"];
const STATUSES = ["Draft", "Scheduled", "Published", "Archived"];

function toInputDate(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export default function NoticeForm({ initialNotice, noticeId }) {
  const router = useRouter();
  const isEdit = Boolean(noticeId);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: initialNotice?.title || "",
    id: initialNotice?.id || "",
    category: initialNotice?.category || "Admission",
    shortDescription: initialNotice?.shortDescription || "",
    content: initialNotice?.content || "",
    publishDate: toInputDate(initialNotice?.publishDate) || toInputDate(new Date()),
    expiryDate: toInputDate(initialNotice?.expiryDate),
    priority: initialNotice?.priority || "Normal",
    status: initialNotice?.status || "Draft",
    showOnHomepage: initialNotice?.showOnHomepage ?? true,
    showInTicker: initialNotice?.showInTicker ?? true,
    pinned: initialNotice?.pinned ?? false,
    featured: initialNotice?.featured ?? false,
    pdfUrl: initialNotice?.pdfUrl || "",
    pdfPublicId: initialNotice?.pdfPublicId || "",
    pdfFileName: initialNotice?.pdfFileName || "",
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleFile(file) {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Only PDF files are accepted.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/notices/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      update("pdfUrl", data.pdfUrl);
      update("pdfPublicId", data.pdfPublicId);
      update("pdfFileName", data.pdfFileName);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch(isEdit ? `/api/notices/${noticeId}` : "/api/notices", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save notice.");
      router.push("/admin/notices");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="notice-form" onSubmit={handleSubmit}>
      <div className="notice-form__header">
        <h1 className="notice-form__title">{isEdit ? "Edit Notice" : "Create Notice"}</h1>
      </div>

      {error && <div className="form-error">{error}</div>}

      <section className="form-section">
        <h2 className="form-section__title">Notice Information</h2>
        <div className="form-grid">
          <div className="form-field form-field--full">
            <label htmlFor="title">Notice Title</label>
            <input id="title" type="text" required value={form.title} onChange={(e) => update("title", e.target.value)} />
          </div>

          <div className="form-field">
            <label htmlFor="id">Notice id</label>
            <input
              id="id"
              type="text"
              placeholder="auto-generated from title if left blank"
              value={form.id}
              onChange={(e) => update("id", e.target.value)}
            />
            <span className="form-field__hint">Used in the URL: /notice-board/your-id</span>
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select id="category" value={form.category} onChange={(e) => update("category", e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="shortDescription">Short Description</label>
            <textarea
              id="shortDescription"
              required
              maxLength={400}
              value={form.shortDescription}
              onChange={(e) => update("shortDescription", e.target.value)}
              placeholder="Shown on notice cards and the homepage (max 400 characters)"
            />
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="content">Full Notice Content</label>
            <textarea
              id="content"
              required
              style={{ minHeight: 220 }}
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              placeholder="Full notice text shown on the notice detail page"
            />
          </div>
        </div>
      </section>

      <section className="form-section">
        <h2 className="form-section__title">Dates</h2>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="publishDate">Publish Date</label>
            <input id="publishDate" type="date" value={form.publishDate} onChange={(e) => update("publishDate", e.target.value)} />
            <span className="form-field__hint">A future date schedules the notice automatically.</span>
          </div>
          <div className="form-field">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input id="expiryDate" type="date" value={form.expiryDate} onChange={(e) => update("expiryDate", e.target.value)} />
            <span className="form-field__hint">Notice moves to the archive automatically after this date.</span>
          </div>
        </div>
      </section>

      <section className="form-section">
        <h2 className="form-section__title">Priority &amp; Status</h2>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="priority">Priority</label>
            <select id="priority" value={form.priority} onChange={(e) => update("priority", e.target.value)}>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="status">Status</label>
            <select id="status" value={form.status} onChange={(e) => update("status", e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="form-section">
        <h2 className="form-section__title">Display Options</h2>
        <div className="form-toggles">
          <label className="form-toggle">
            <input type="checkbox" checked={form.showOnHomepage} onChange={(e) => update("showOnHomepage", e.target.checked)} />
            <span>Show on Homepage</span>
          </label>
          <label className="form-toggle">
            <input type="checkbox" checked={form.showInTicker} onChange={(e) => update("showInTicker", e.target.checked)} />
            <span>Show in Scrolling Ticker</span>
          </label>
          <label className="form-toggle">
            <input type="checkbox" checked={form.pinned} onChange={(e) => update("pinned", e.target.checked)} />
            <span>Pin to Top</span>
          </label>
          <label className="form-toggle">
            <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
            <span>Featured Notice</span>
          </label>
        </div>
      </section>

      <section className="form-section">
        <h2 className="form-section__title">PDF Upload</h2>
        {!form.pdfUrl ? (
          <div
            className={`pdf-dropzone${dragActive ? " pdf-dropzone--active" : ""}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
          >
            <svg className="pdf-dropzone__icon" width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M15 2v5h5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span className="pdf-dropzone__label">{uploading ? "Uploading..." : "Click or drag a PDF here"}</span>
            <span className="pdf-dropzone__hint">Notice, circular, examination schedule, admission notice, or scholarship document — up to 15MB</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
        ) : (
          <div className="pdf-preview">
            <span className="pdf-preview__name">{form.pdfFileName || "Notice.pdf"}</span>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                update("pdfUrl", "");
                update("pdfPublicId", "");
                update("pdfFileName", "");
              }}
            >
              Remove
            </button>
          </div>
        )}
      </section>

      <div className="notice-form__footer">
        <button type="button" className="btn btn--ghost" onClick={() => router.push("/admin/notices")}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" disabled={saving || uploading}>
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Notice"}
        </button>
      </div>
    </form>
  );
}