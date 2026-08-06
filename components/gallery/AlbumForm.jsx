"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import { GALLERY_CATEGORIES_CLIENT } from "@/lib/constants";
import "@/styles/gallery-form.css";

const emptyForm = {
  eventName: "",
  slug: "",
  year: new Date().getFullYear(),
  eventDate: "",
  category: GALLERY_CATEGORIES_CLIENT[0],
  location: "",
  shortDescription: "",
  description: "",
  featured: false,
  showOnHomepage: false,
  status: "draft",
  metaTitle: "",
  metaDescription: "",
};

/**
 * Props:
 *   mode: "create" | "edit"
 *   initialEvent?: existing event object (edit mode)
 */
export default function AlbumForm({ mode = "create", initialEvent = null }) {
  const router = useRouter();
  const [form, setForm] = useState(
    initialEvent
      ? {
          ...emptyForm,
          ...initialEvent,
          eventDate: initialEvent.eventDate ? initialEvent.eventDate.slice(0, 10) : "",
        }
      : emptyForm
  );
  const [coverImage, setCoverImage] = useState(initialEvent?.coverImage || null);
  const [images, setImages] = useState(initialEvent?.images || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCoverUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("files", file);
    const res = await fetch("/api/gallery/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Cover upload failed");
      return;
    }
    setCoverImage({ url: data.images[0].url, publicId: data.images[0].publicId });
  }

  async function handleSubmit(e, publishOverride) {
    e.preventDefault();
    setError("");

    if (!coverImage) {
      setError("Please upload a cover image.");
      return;
    }
    if (!form.eventName || !form.shortDescription || !form.eventDate) {
      setError("Please fill in Event Name, Event Date, and Short Description.");
      return;
    }

    setSaving(true);
    const payload = {
      ...form,
      status: publishOverride || form.status,
      coverImage,
      images,
    };

    try {
      const url = mode === "create" ? "/api/gallery" : `/api/gallery/${initialEvent.slug}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      router.push("/admin/gallery");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="album-form" onSubmit={(e) => handleSubmit(e)}>
      {error ? <div className="form-error-banner">{error}</div> : null}

      <fieldset className="form-section">
        <legend>Event Information</legend>

        <div className="form-grid">
          <div className="form-field">
            <label>Event Name *</label>
            <input value={form.eventName} onChange={(e) => updateField("eventName", e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Event Slug</label>
            <input
              value={form.slug}
              placeholder="auto-generated if left blank"
              onChange={(e) => updateField("slug", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Event Year *</label>
            <input
              type="number"
              value={form.year}
              onChange={(e) => updateField("year", Number(e.target.value))}
              required
            />
          </div>
          <div className="form-field">
            <label>Event Date *</label>
            <input type="date" value={form.eventDate} onChange={(e) => updateField("eventDate", e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Category *</label>
            <select value={form.category} onChange={(e) => updateField("category", e.target.value)}>
              {GALLERY_CATEGORIES_CLIENT.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>Location</label>
            <input value={form.location} onChange={(e) => updateField("location", e.target.value)} />
          </div>
        </div>

        <div className="form-field">
          <label>Short Description * (max 240 chars)</label>
          <textarea
            maxLength={240}
            rows={2}
            value={form.shortDescription}
            onChange={(e) => updateField("shortDescription", e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Full Description</label>
          <textarea rows={6} value={form.description} onChange={(e) => updateField("description", e.target.value)} />
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Album Settings</legend>

        <div className="form-field">
          <label>Cover Image *</label>
          <input type="file" accept="image/*" onChange={handleCoverUpload} />
          {coverImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={coverImage.url} alt="Cover preview" className="cover-preview" />
          ) : null}
        </div>

        <ImageUploader images={images} onChange={setImages} label="Multiple Gallery Images" />

        <div className="form-toggle-row">
          <label className="toggle">
            <input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} />
            Featured Album
          </label>
          <label className="toggle">
            <input
              type="checkbox"
              checked={form.showOnHomepage}
              onChange={(e) => updateField("showOnHomepage", e.target.checked)}
            />
            Show on Homepage
          </label>
        </div>

        <div className="form-field">
          <label>Status</label>
          <select value={form.status} onChange={(e) => updateField("status", e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>SEO</legend>
        <div className="form-field">
          <label>Meta Title</label>
          <input value={form.metaTitle} onChange={(e) => updateField("metaTitle", e.target.value)} />
        </div>
        <div className="form-field">
          <label>Meta Description</label>
          <textarea rows={2} value={form.metaDescription} onChange={(e) => updateField("metaDescription", e.target.value)} />
        </div>
      </fieldset>

      <div className="form-actions">
        <button type="button" className="btn btn-outline" disabled={saving} onClick={(e) => handleSubmit(e, "draft")}>
          Save as Draft
        </button>
        <button type="button" className="btn btn-primary" disabled={saving} onClick={(e) => handleSubmit(e, "published")}>
          {saving ? "Saving..." : "Publish Album"}
        </button>
      </div>
    </form>
  );
}