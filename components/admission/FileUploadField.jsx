"use client";

import { useRef, useState } from "react";
import { UploadCloud, CheckCircle2, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";
import "./FileUploadField.css";

export default function FileUploadField({ label, required, docType, draftId, value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file) {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("docType", docType);
      formData.append("applicationDraftId", draftId || "unassigned");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      onChange({ url: data.url, publicId: data.publicId, originalName: data.originalName });
      toast.success(`${label} uploaded`);
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fu-wrapper">
      <label className="fu-label">
        {label} {required && <span className="fu-required">*</span>}
      </label>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`fu-dropzone ${value ? "fu-dropzone--filled" : ""}`}
      >
        {uploading ? (
          <Loader2 className="fu-icon-spin" size={18} />
        ) : value ? (
          <CheckCircle2 className="fu-icon-success" size={18} />
        ) : (
          <UploadCloud className="fu-icon-idle" size={18} />
        )}
        <span className="fu-text">
          {value ? value.originalName || "File uploaded" : "Click to upload (JPG, PNG or PDF, max 5MB)"}
        </span>
        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            className="fu-remove-btn"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        className="fu-hidden-input"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}