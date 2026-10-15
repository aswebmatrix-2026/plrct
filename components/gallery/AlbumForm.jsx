
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

export default function AlbumForm({
  mode = "create",
  initialEvent = null,
}) {
  const router = useRouter();

  const [form, setForm] = useState(
    initialEvent
      ? {
          ...emptyForm,
          ...initialEvent,
          eventDate: initialEvent.eventDate
            ? initialEvent.eventDate.slice(0, 10)
            : "",
        }
      : emptyForm
  );

  const [coverImage, setCoverImage] = useState(
    initialEvent?.coverImage || null
  );
  const [images, setImages] = useState(initialEvent?.images || []);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCoverUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploadingCover(true);

    try {
      const formData = new FormData();
      formData.append("files", file);

      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Cover upload failed");
      }

      setCoverImage({
        url: data.images[0].url,
        publicId: data.images[0].publicId,
      });
    } catch (err) {
      setError(err.message || "Cover upload failed");
    } finally {
      setUploadingCover(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e, publishOverride) {
    e.preventDefault();

    if (saving || uploadingCover) return;

    setError("");

    if (!coverImage) {
      setError("Please upload a cover image.");
      return;
    }

    if (
      !form.eventName.trim() ||
      !form.shortDescription.trim() ||
      !form.eventDate
    ) {
      setError(
        "Please fill in Event Name, Event Date, and Short Description."
      );
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
      const url =
        mode === "create"
          ? "/api/gallery"
          : `/api/gallery/${initialEvent.slug}`;

      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Save failed");
      }

      router.push("/admin/gallery");
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="gallery-album-form"
      onSubmit={(e) => handleSubmit(e)}
    >
      {error && (
        <div className="gallery-form-error-banner" role="alert">
          {error}
        </div>
      )}

      <fieldset className="gallery-form-section">
        <legend>Event Information</legend>

        <div className="gallery-form-grid">
          <div className="gallery-form-field">
            <label htmlFor="gallery-event-name">Event Name *</label>
            <input
              id="gallery-event-name"
              value={form.eventName}
              onChange={(e) => updateField("eventName", e.target.value)}
              required
            />
          </div>

          <div className="gallery-form-field">
            <label htmlFor="gallery-event-slug">Event Slug</label>
            <input
              id="gallery-event-slug"
              value={form.slug}
              placeholder="Auto-generated if left blank"
              onChange={(e) => updateField("slug", e.target.value)}
            />
          </div>

          <div className="gallery-form-field">
            <label htmlFor="gallery-event-year">Event Year *</label>
            <input
              id="gallery-event-year"
              type="number"
              value={form.year}
              onChange={(e) =>
                updateField("year", Number(e.target.value))
              }
              required
            />
          </div>

          <div className="gallery-form-field">
            <label htmlFor="gallery-event-date">Event Date *</label>
            <input
              id="gallery-event-date"
              type="date"
              value={form.eventDate}
              onChange={(e) => updateField("eventDate", e.target.value)}
              required
            />
          </div>

          <div className="gallery-form-field">
            <label htmlFor="gallery-event-category">Category *</label>
            <select
              id="gallery-event-category"
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
            >
              {GALLERY_CATEGORIES_CLIENT.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="gallery-form-field">
            <label htmlFor="gallery-event-location">Location</label>
            <input
              id="gallery-event-location"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </div>
        </div>

        <div className="gallery-form-field">
          <label htmlFor="gallery-short-description">
            Short Description * (max 240 chars)
          </label>
          <textarea
            id="gallery-short-description"
            maxLength={240}
            rows={2}
            value={form.shortDescription}
            onChange={(e) =>
              updateField("shortDescription", e.target.value)
            }
            required
          />
        </div>

        <div className="gallery-form-field">
          <label htmlFor="gallery-full-description">
            Full Description
          </label>
          <textarea
            id="gallery-full-description"
            rows={6}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>
      </fieldset>

      <fieldset className="gallery-form-section">
        <legend>Album Settings</legend>

        <div className="gallery-form-field">
          <label htmlFor="gallery-cover-image">Cover Image *</label>
          <input
            id="gallery-cover-image"
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            disabled={uploadingCover || saving}
          />

          {uploadingCover && <p>Uploading cover image...</p>}

          {coverImage && (
            <img
              src={coverImage.url}
              alt="Cover preview"
              className="gallery-cover-preview"
            />
          )}
        </div>

        <ImageUploader
          images={images}
          onChange={setImages}
          label="Multiple Gallery Images"
        />

        <div className="gallery-form-toggle-row">
          <label className="gallery-form-toggle">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                updateField("featured", e.target.checked)
              }
            />
            Featured Album
          </label>

          <label className="gallery-form-toggle">
            <input
              type="checkbox"
              checked={form.showOnHomepage}
              onChange={(e) =>
                updateField("showOnHomepage", e.target.checked)
              }
            />
            Show on Homepage
          </label>
        </div>

        <div className="gallery-form-field">
          <label htmlFor="gallery-album-status">Status</label>
          <select
            id="gallery-album-status"
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="gallery-form-section">
        <legend>SEO</legend>

        <div className="gallery-form-field">
          <label htmlFor="gallery-meta-title">Meta Title</label>
          <input
            id="gallery-meta-title"
            value={form.metaTitle}
            onChange={(e) => updateField("metaTitle", e.target.value)}
          />
        </div>

        <div className="gallery-form-field">
          <label htmlFor="gallery-meta-description">
            Meta Description
          </label>
          <textarea
            id="gallery-meta-description"
            rows={2}
            value={form.metaDescription}
            onChange={(e) =>
              updateField("metaDescription", e.target.value)
            }
          />
        </div>
      </fieldset>

      <div className="gallery-form-actions">
        <button
          type="button"
          className="gallery-btn gallery-btn-outline"
          disabled={saving || uploadingCover}
          onClick={(e) => handleSubmit(e, "draft")}
        >
          {saving ? "Saving..." : "Save as Draft"}
        </button>

        <button
          type="button"
          className="gallery-btn gallery-btn-primary"
          disabled={saving || uploadingCover}
          onClick={(e) => handleSubmit(e, "published")}
        >
          {saving ? "Saving..." : "Publish Album"}
        </button>
      </div>
    </form>
  );
}
