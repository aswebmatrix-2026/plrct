"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import StudentIdCard from "@/components/id-card/StudentIdCard";
import { COURSES, getDisciplinesForCourse } from "@/components/id-card/courseData";
import "./StudentApplicationForm.css";

const MAX_PHOTO_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const PASSPORT_RATIO = 3.5 / 4.5; // width / height

type SubmitResult = {
  applicationId: string;
  studentName: string;
  course: string;
  session: string;
  status: string;
};

interface FormState {
  studentName: string;
  fatherName: string;
  course: string;
  discipline: string;
  admissionYear: string;
  session: string;
  mobile: string;
  address: string;
  email: string;
}

const initialState: FormState = {
  studentName: "",
  fatherName: "",
  course: "",
  discipline: "",
  admissionYear: "",
  session: "",
  mobile: "",
  address: "",
  email: "",
};

/** Center-crops an image file to the passport-photo aspect ratio and returns a compressed JPEG data URL. */
function cropToPassportRatio(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => {
      img.onload = () => {
        const srcRatio = img.width / img.height;
        let sx = 0,
          sy = 0,
          sw = img.width,
          sh = img.height;

        if (srcRatio > PASSPORT_RATIO) {
          sw = img.height * PASSPORT_RATIO;
          sx = (img.width - sw) / 2;
        } else {
          sh = img.width / PASSPORT_RATIO;
          sy = (img.height - sh) / 2;
        }

        const targetWidth = 350;
        const targetHeight = Math.round(targetWidth / PASSPORT_RATIO);
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.onerror = () => reject(new Error("Could not read image"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export default function StudentApplicationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoPublicId, setPhotoPublicId] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const disciplines = useMemo(() => getDisciplinesForCourse(form.course), [form.course]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // If email changes after verification, require re-verification.
  useEffect(() => {
    setOtpVerified(false);
    setOtpSent(false);
    setOtpValue("");
  }, [form.email]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "course" ? { discipline: "" } : {}),
    }));
  }

  async function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotoError("Only JPG, PNG or WebP images are allowed.");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError("Photo must be under 2MB.");
      return;
    }

    try {
      const cropped = await cropToPassportRatio(file);
      setPhotoPreview(cropped);
      setPhotoUploading(true);
      const res = await fetch("/api/student-application/upload-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: cropped }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setPhotoUrl(data.url);
      setPhotoPublicId(data.publicId);
    } catch (err: any) {
      setPhotoError(err.message || "Could not process photo. Please try another image.");
      setPhotoPreview(null);
      setPhotoUrl(null);
      setPhotoPublicId(null);
    } finally {
      setPhotoUploading(false);
    }
  }

  function handleReplacePhoto() {
    setPhotoPreview(null);
    setPhotoUrl(null);
    setPhotoPublicId(null);
    setPhotoError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    fileInputRef.current?.click();
  }

  async function handleSendOtp() {
    setOtpError(null);
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setOtpError("Enter a valid email address first.");
      return;
    }
    setOtpSending(true);
    try {
      const res = await fetch("/api/student-application/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.waitSeconds) setCooldown(data.waitSeconds);
        throw new Error(data.error || "Could not send OTP");
      }
      setOtpSent(true);
      setCooldown(60);
    } catch (err: any) {
      setOtpError(err.message);
    } finally {
      setOtpSending(false);
    }
  }

  async function handleVerifyOtp() {
    setOtpError(null);
    if (!/^\d{6}$/.test(otpValue)) {
      setOtpError("Enter the 6-digit code.");
      return;
    }
    setOtpVerifying(true);
    try {
      const res = await fetch("/api/student-application/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: otpValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid code");
      setOtpVerified(true);
    } catch (err: any) {
      setOtpError(err.message);
    } finally {
      setOtpVerifying(false);
    }
  }

  const canSubmit =
    otpVerified &&
    !!photoUrl &&
    form.studentName &&
    form.fatherName &&
    form.course &&
    (disciplines.length === 0 || form.discipline) &&
    form.admissionYear &&
    form.session &&
    form.mobile &&
    form.address &&
    form.email;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/student-application/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          discipline: form.discipline || form.course,
          photoUrl,
          photoPublicId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setResult(data);
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="saf-success">
        <h2>Application Submitted</h2>
        <div className="saf-success__row">
          <span>Application ID</span>
          <strong>{result.applicationId}</strong>
        </div>
        <div className="saf-success__row">
          <span>Student Name</span>
          <strong>{result.studentName}</strong>
        </div>
        <div className="saf-success__row">
          <span>Course</span>
          <strong>{result.course}</strong>
        </div>
        <div className="saf-success__row">
          <span>Session</span>
          <strong>{result.session}</strong>
        </div>
        <div className="saf-success__row">
          <span>Status</span>
          <strong className="saf-success__status">{result.status}</strong>
        </div>
        <p className="saf-success__note">
          Your application is pending admin review. You will receive an email once it is verified.
        </p>
      </div>
    );
  }

  return (
    <div className="saf-layout">
      <form className="saf-form" onSubmit={handleSubmit}>
        <h1 className="saf-title">Student I-Card Application</h1>

        <label className="saf-field">
          <span>Student Name *</span>
          <input
            required
            value={form.studentName}
            onChange={(e) => updateField("studentName", e.target.value)}
          />
        </label>

        <label className="saf-field">
          <span>Father&apos;s Name *</span>
          <input
            required
            value={form.fatherName}
            onChange={(e) => updateField("fatherName", e.target.value)}
          />
        </label>

        <label className="saf-field">
          <span>Course *</span>
          <select required value={form.course} onChange={(e) => updateField("course", e.target.value)}>
            <option value="">Select course</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        {disciplines.length > 0 ? (
          <label className="saf-field">
            <span>Discipline / Branch *</span>
            <select
              required
              value={form.discipline}
              onChange={(e) => updateField("discipline", e.target.value)}
            >
              <option value="">Select discipline</option>
              {disciplines.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
        ) : form.course ? (
          <label className="saf-field">
            <span>Discipline / Branch</span>
            <input
              placeholder={form.course}
              value={form.discipline}
              onChange={(e) => updateField("discipline", e.target.value)}
            />
          </label>
        ) : null}

        <div className="saf-field-row">
          <label className="saf-field">
            <span>Admission Year *</span>
            <input
              required
              placeholder="2026"
              value={form.admissionYear}
              onChange={(e) => updateField("admissionYear", e.target.value)}
            />
          </label>
          <label className="saf-field">
            <span>Session *</span>
            <input
              required
              placeholder="2026-2030"
              value={form.session}
              onChange={(e) => updateField("session", e.target.value)}
            />
          </label>
        </div>

        <label className="saf-field">
          <span>Roll No.</span>
          <input disabled value="Will be assigned by Admin" className="saf-field--readonly" />
        </label>

        <label className="saf-field">
          <span>Mobile Number *</span>
          <input
            required
            type="tel"
            value={form.mobile}
            onChange={(e) => updateField("mobile", e.target.value)}
          />
        </label>

        <label className="saf-field">
          <span>Address *</span>
          <textarea
            required
            rows={3}
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
          />
        </label>

        <label className="saf-field">
          <span>Email *</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            disabled={otpVerified}
          />
        </label>

        <div className="saf-otp">
          {!otpVerified && (
            <button
              type="button"
              className="saf-btn saf-btn--secondary"
              onClick={handleSendOtp}
              disabled={otpSending || cooldown > 0 || !form.email}
            >
              {otpSent ? (cooldown > 0 ? `Resend OTP (${cooldown}s)` : "Resend OTP") : "Send OTP"}
            </button>
          )}
          {otpSent && !otpVerified && (
            <div className="saf-otp__verify-row">
              <input
                className="saf-otp__input"
                placeholder="6-digit code"
                maxLength={6}
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
              />
              <button
                type="button"
                className="saf-btn"
                onClick={handleVerifyOtp}
                disabled={otpVerifying || otpValue.length !== 6}
              >
                Verify OTP
              </button>
            </div>
          )}
          {otpVerified && <div className="saf-otp__verified">✓ Email verified</div>}
          {otpError && <div className="saf-error">{otpError}</div>}
        </div>

        <label className="saf-field">
          <span>Passport Size Photo *</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoSelect}
            style={{ display: photoPreview ? "none" : "block" }}
          />
          {photoPreview && (
            <div className="saf-photo-preview">
              <img src={photoPreview} alt="Passport preview" />
              <button type="button" className="saf-btn saf-btn--secondary" onClick={handleReplacePhoto}>
                Replace Photo
              </button>
              {photoUploading && <span className="saf-photo-status">Uploading…</span>}
              {photoUrl && !photoUploading && <span className="saf-photo-status saf-photo-status--ok">Uploaded ✓</span>}
            </div>
          )}
          {photoError && <div className="saf-error">{photoError}</div>}
        </label>

        {submitError && <div className="saf-error saf-error--block">{submitError}</div>}

        <button type="submit" className="saf-btn saf-btn--primary" disabled={!canSubmit || submitting}>
          {submitting ? "Submitting…" : "Submit Application"}
        </button>
      </form>

      <div className="saf-preview">
        <div className="saf-preview__label">Live ID Card Preview</div>
        <StudentIdCard
          studentName={form.studentName}
          fatherName={form.fatherName}
          course={form.course}
          discipline={form.discipline || (disciplines.length === 0 ? form.course : "")}
          rollNumber={null}
          session={form.session}
          admissionYear={form.admissionYear}
          mobile={form.mobile}
          address={form.address}
          photo={photoPreview}
        />
      </div>
    </div>
  );
}
