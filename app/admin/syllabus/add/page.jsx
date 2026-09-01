"use client";

// app/admin/syllabus/add/page.jsx
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // ASSUMPTION: swap for your existing toast system if different
import {
  PROGRAM_OPTIONS,
  DEPARTMENT_OPTIONS,
  getSemestersForProgram,
  formatFileSize,
} from "@/constants/syllabus";
import "../admin-syllabus-form.css";

function uploadWithProgress(url, formData, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(json);
        else reject(new Error(json.message || "Request failed"));
      } catch {
        reject(new Error("Unexpected server response"));
      }
    };
    xhr.onerror = () => reject(new Error("Network error while uploading"));
    xhr.send(formData);
  });
}

export default function AddSyllabusPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [program, setProgram] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [syllabusYear, setSyllabusYear] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const semesterOptions = useMemo(
    () => (program ? getSemestersForProgram(program) : []),
    [program]
  );

  function handleFileSelect(selected) {
    if (!selected) return;
    if (selected.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }
    setFile(selected);
  }

  function validate() {
    const next = {};
    if (!title.trim()) next.title = "Title is required";
    if (!program) next.program = "Program is required";
    if (!department) next.department = "Department is required";
    if (!semester) next.semester = "Semester is required";
    if (!academicYear.trim()) next.academicYear = "Academic year is required";
    if (!syllabusYear) next.syllabusYear = "Syllabus year is required";
    if (!file) next.file = "Please upload a syllabus PDF";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("program", program);
      formData.append("department", department);
      formData.append("semester", semester);
      formData.append("academicYear", academicYear.trim());
      formData.append("syllabusYear", syllabusYear);
      formData.append("description", description.trim());
      formData.append("featured", String(featured));
      formData.append("published", String(published));
      formData.append("pdf", file);

      const json = await uploadWithProgress("/api/syllabus", formData, setUploadProgress);
      if (!json.success) throw new Error(json.message || "Failed to create syllabus");

      toast.success("Syllabus published successfully");
      router.push("/admin/syllabus");
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="syl-form-page">
      <h1 className="syl-form-page__title">Add New Syllabus</h1>
      <p className="syl-form-page__subtitle">
        Upload a new syllabus document for an engineering program.
      </p>

      <form className="syl-form-card" onSubmit={handleSubmit} noValidate>
        <div className="syl-form-grid">
          <div className="syl-field syl-form-grid--full">
            <label htmlFor="title">Syllabus Title <span className="required">*</span></label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="B.Tech Computer Science Engineering — Semester 1 Syllabus"
            />
            {errors.title && <span className="syl-field-error">{errors.title}</span>}
          </div>

          <div className="syl-field">
            <label htmlFor="program">Program <span className="required">*</span></label>
            <select
              id="program"
              value={program}
              onChange={(e) => {
                setProgram(e.target.value);
                setSemester("");
              }}
            >
              <option value="">Select program</option>
              {PROGRAM_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.program && <span className="syl-field-error">{errors.program}</span>}
          </div>

          <div className="syl-field">
            <label htmlFor="department">Department <span className="required">*</span></label>
            <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select department</option>
              {DEPARTMENT_OPTIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.department && <span className="syl-field-error">{errors.department}</span>}
          </div>

          <div className="syl-field">
            <label htmlFor="semester">Semester <span className="required">*</span></label>
            <select
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              disabled={!program}
            >
              <option value="">{program ? "Select semester" : "Select program first"}</option>
              {semesterOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.semester && <span className="syl-field-error">{errors.semester}</span>}
          </div>

          <div className="syl-field">
            <label htmlFor="academicYear">Academic Year <span className="required">*</span></label>
            <input
              id="academicYear"
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              placeholder="2026-2027"
            />
            {errors.academicYear && <span className="syl-field-error">{errors.academicYear}</span>}
          </div>

          <div className="syl-field">
            <label htmlFor="syllabusYear">Syllabus Year <span className="required">*</span></label>
            <input
              id="syllabusYear"
              type="number"
              value={syllabusYear}
              onChange={(e) => setSyllabusYear(e.target.value)}
              placeholder="2026"
            />
            {errors.syllabusYear && <span className="syl-field-error">{errors.syllabusYear}</span>}
          </div>

          <div className="syl-field syl-form-grid--full">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief overview of this syllabus (optional)"
            />
          </div>

          <div className="syl-field syl-form-grid--full">
            <label>Syllabus PDF <span className="required">*</span></label>
            <div
              className={`syl-upload ${dragging ? "syl-upload--dragging" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFileSelect(e.dataTransfer.files?.[0]);
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload syllabus PDF"
            >
              <p>Drag & drop your PDF here, or click to browse</p>
              <p className="syl-upload__hint">PDF only</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />
            </div>
            {errors.file && <span className="syl-field-error">{errors.file}</span>}

            {file && (
              <div className="syl-upload-file">
                <div>
                  <div className="syl-upload-file__name">{file.name}</div>
                  <div className="syl-upload-file__size">{formatFileSize(file.size)}</div>
                </div>
                <button
                  type="button"
                  className="syl-upload-file__remove"
                  onClick={() => setFile(null)}
                  disabled={submitting}
                >
                  Remove
                </button>
              </div>
            )}

            {submitting && (
              <div className="syl-progress-bar">
                <div className="syl-progress-bar__fill" style={{ width: `${uploadProgress}%` }} />
              </div>
            )}
          </div>

          <div className="syl-field">
            <div className="syl-toggle-row">
              <button
                type="button"
                className="syl-toggle"
                role="switch"
                aria-checked={featured}
                aria-label="Toggle featured"
                onClick={() => setFeatured((v) => !v)}
              />
              <span>{featured ? "Featured" : "Not Featured"}</span>
            </div>
          </div>

          <div className="syl-field">
            <div className="syl-toggle-row">
              <button
                type="button"
                className="syl-toggle"
                role="switch"
                aria-checked={published}
                aria-label="Toggle published"
                onClick={() => setPublished((v) => !v)}
              />
              <span>{published ? "Published" : "Draft"}</span>
            </div>
          </div>
        </div>

        <div className="syl-form-actions">
          <button type="submit" className="syl-btn-primary" disabled={submitting}>
            {submitting ? `Uploading ${uploadProgress}%...` : "Publish Syllabus"}
          </button>
        </div>
      </form>
    </div>
  );
}