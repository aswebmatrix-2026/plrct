"use client";

// app/admin/syllabus/edit/[id]/page.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast"; // ASSUMPTION: swap for your existing toast system if different
import {
  PROGRAM_OPTIONS,
  DEPARTMENT_OPTIONS,
  getSemestersForProgram,
  formatFileSize,
} from "@/constants/syllabus";
import "../../admin-syllabus-form.css";

function uploadWithProgress(url, formData, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
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

export default function EditSyllabusPage() {
  const router = useRouter();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [title, setTitle] = useState("");
  const [program, setProgram] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [syllabusYear, setSyllabusYear] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);

  const [currentPdf, setCurrentPdf] = useState(null); // { url, fileName, fileSize }
  const [newFile, setNewFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/syllabus/${id}`);
        const json = await res.json();
        if (!json.success) {
          setNotFound(true);
          return;
        }
        const doc = json.data;
        setTitle(doc.title);
        setProgram(doc.program);
        setDepartment(doc.department);
        setSemester(doc.semester);
        setAcademicYear(doc.academicYear);
        setSyllabusYear(String(doc.syllabusYear));
        setDescription(doc.description || "");
        setFeatured(doc.featured);
        setPublished(doc.published);
        setCurrentPdf({ url: doc.pdfUrl, fileName: doc.fileName, fileSize: doc.fileSize });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load syllabus details");
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    if (id) load();
  }, [id]);

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
    setNewFile(selected);
  }

  function validate() {
    const next = {};
    if (!title.trim()) next.title = "Title is required";
    if (!program) next.program = "Program is required";
    if (!department) next.department = "Department is required";
    if (!semester) next.semester = "Semester is required";
    if (!academicYear.trim()) next.academicYear = "Academic year is required";
    if (!syllabusYear) next.syllabusYear = "Syllabus year is required";
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
      if (newFile) formData.append("pdf", newFile);

      const json = await uploadWithProgress(`/api/syllabus/${id}`, formData, setUploadProgress);
      if (!json.success) throw new Error(json.message || "Failed to update syllabus");

      toast.success("Syllabus updated successfully");
      router.push("/admin/syllabus");
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="syl-form-page">
        <p>Loading syllabus...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="syl-form-page">
        <p>Syllabus not found. It may have already been deleted.</p>
      </div>
    );
  }

  return (
    <div className="syl-form-page">
      <h1 className="syl-form-page__title">Edit Syllabus</h1>
      <p className="syl-form-page__subtitle">Update details or replace the syllabus PDF.</p>

      <form className="syl-form-card" onSubmit={handleSubmit} noValidate>
        {currentPdf && (
          <div className="syl-current-pdf">
            <div>
              <div className="syl-upload-file__name">{currentPdf.fileName}</div>
              <div className="syl-upload-file__size">{formatFileSize(currentPdf.fileSize)}</div>
            </div>
            <div className="syl-current-pdf__actions">
              <a className="syl-btn-secondary" href={currentPdf.url} target="_blank" rel="noopener noreferrer">
                View Current PDF
              </a>
              <a className="syl-btn-secondary" href={currentPdf.url} download>
                Download Current PDF
              </a>
            </div>
          </div>
        )}

        <div className="syl-form-grid">
          <div className="syl-field syl-form-grid--full">
            <label htmlFor="title">Syllabus Title <span className="required">*</span></label>
            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <span className="syl-field-error">{errors.title}</span>}
          </div>

          <div className="syl-field">
            <label htmlFor="program">Program <span className="required">*</span></label>
            <select
              id="program"
              value={program}
              onChange={(e) => { setProgram(e.target.value); setSemester(""); }}
            >
              <option value="">Select program</option>
              {PROGRAM_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.program && <span className="syl-field-error">{errors.program}</span>}
          </div>

          <div className="syl-field">
            <label htmlFor="department">Department <span className="required">*</span></label>
            <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select department</option>
              {DEPARTMENT_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.department && <span className="syl-field-error">{errors.department}</span>}
          </div>

          <div className="syl-field">
            <label htmlFor="semester">Semester <span className="required">*</span></label>
            <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} disabled={!program}>
              <option value="">{program ? "Select semester" : "Select program first"}</option>
              {semesterOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.semester && <span className="syl-field-error">{errors.semester}</span>}
          </div>

          <div className="syl-field">
            <label htmlFor="academicYear">Academic Year <span className="required">*</span></label>
            <input id="academicYear" type="text" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} />
            {errors.academicYear && <span className="syl-field-error">{errors.academicYear}</span>}
          </div>

          <div className="syl-field">
            <label htmlFor="syllabusYear">Syllabus Year <span className="required">*</span></label>
            <input id="syllabusYear" type="number" value={syllabusYear} onChange={(e) => setSyllabusYear(e.target.value)} />
            {errors.syllabusYear && <span className="syl-field-error">{errors.syllabusYear}</span>}
          </div>

          <div className="syl-field syl-form-grid--full">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="syl-field syl-form-grid--full">
            <label>Replace PDF (optional)</label>
            <div
              className={`syl-upload ${dragging ? "syl-upload--dragging" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); handleFileSelect(e.dataTransfer.files?.[0]); }}
              role="button"
              tabIndex={0}
              aria-label="Upload replacement PDF"
            >
              <p>Drag & drop a new PDF here, or click to browse</p>
              <p className="syl-upload__hint">Leave empty to keep the current PDF</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />
            </div>

            {newFile && (
              <div className="syl-upload-file">
                <div>
                  <div className="syl-upload-file__name">{newFile.name}</div>
                  <div className="syl-upload-file__size">{formatFileSize(newFile.size)}</div>
                </div>
                <button type="button" className="syl-upload-file__remove" onClick={() => setNewFile(null)} disabled={submitting}>
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
              <button type="button" className="syl-toggle" role="switch" aria-checked={featured} onClick={() => setFeatured((v) => !v)} aria-label="Toggle featured" />
              <span>{featured ? "Featured" : "Not Featured"}</span>
            </div>
          </div>

          <div className="syl-field">
            <div className="syl-toggle-row">
              <button type="button" className="syl-toggle" role="switch" aria-checked={published} onClick={() => setPublished((v) => !v)} aria-label="Toggle published" />
              <span>{published ? "Published" : "Draft"}</span>
            </div>
          </div>
        </div>

        <div className="syl-form-actions">
          <button type="submit" className="syl-btn-primary" disabled={submitting}>
            {submitting ? `Saving ${uploadProgress}%...` : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}