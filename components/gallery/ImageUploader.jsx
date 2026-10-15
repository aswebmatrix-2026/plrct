"use client";

import { useState, useRef } from "react";

/**
 * Handles multi-file selection, drag-and-drop, client-side preview,
 * reordering, and delegates the actual upload to /api/gallery/upload
 * (which pushes to Cloudinary with auto WebP + compression).
 *
 * Props:
 *   images: [{ url, publicId, altText, caption, displayOrder, _localPreview? }]
 *   onChange: (images) => void
 */
export default function ImageUploader({ images, onChange, label = "Gallery Images" }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  async function uploadFiles(fileList) {
    const files = Array.from(fileList);
    if (!files.length) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/gallery/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      const newImages = data.images.map((img, i) => ({
        url: img.url,
        publicId: img.publicId,
        width: img.width,
        height: img.height,
        altText: "",
        caption: "",
        displayOrder: images.length + i,
      }));

      onChange([...images, ...newImages]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    uploadFiles(e.dataTransfer.files);
  }

  function removeImage(index) {
    const next = images.filter((_, i) => i !== index).map((img, i) => ({ ...img, displayOrder: i }));
    onChange(next);
  }

  function moveImage(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next.map((img, i) => ({ ...img, displayOrder: i })));
  }

  function replaceImage(index) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setUploading(true);
      const formData = new FormData();
      formData.append("files", file);
      try {
        const res = await fetch("/api/gallery/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        const next = [...images];
        next[index] = { ...next[index], url: data.images[0].url, publicId: data.images[0].publicId };
        onChange(next);
      } catch (err) {
        setError(err.message);
      } finally {
        setUploading(false);
      }
    };
    input.click();
  }

  return (
    <div className="image-uploader">
      <label className="form-label">{label}</label>

      <div
        className={`upload-dropzone ${dragging ? "dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => uploadFiles(e.target.files)}
        />
        <p>{uploading ? "Uploading..." : "Drag & drop images here, or click to select"}</p>
        <span className="upload-hint">JPG, PNG, WebP — auto-compressed &amp; converted to WebP on delivery</span>
      </div>

      {error ? <p className="upload-error">{error}</p> : null}

      {images.length > 0 && (
        <div className="upload-preview-grid">
          {images
            .slice()
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((img, index) => (
              <div key={img.publicId || index} className="upload-preview-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.altText || "preview"} />
                <div className="upload-preview-controls">
                  <button type="button" onClick={() => moveImage(index, -1)} title="Move left">
                    &larr;
                  </button>
                  <button type="button" onClick={() => replaceImage(index)} title="Replace">
                    &#8635;
                  </button>
                  <button type="button" onClick={() => moveImage(index, 1)} title="Move right">
                    &rarr;
                  </button>
                  <button type="button" className="danger" onClick={() => removeImage(index)} title="Delete">
                    &times;
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Alt text"
                  value={img.altText}
                  onChange={(e) => {
                    const next = [...images];
                    next[index] = { ...next[index], altText: e.target.value };
                    onChange(next);
                  }}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}