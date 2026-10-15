"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import StudentIdCard from "@/components/id-card/StudentIdCard";
import "./StudentApplicationView.css";

interface Application {
  _id: string;
  applicationId: string;
  studentName: string;
  fatherName: string;
  course: string;
  discipline: string;
  admissionYear: string;
  session: string;
  mobile: string;
  address: string;
  email: string;
  rollNumber: string | null;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  rejectionReason: string | null;
  photoUrl: string;
  pdfUrl: string | null;
  createdAt: string;
}

export default function StudentApplicationViewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [rollInput, setRollInput] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/student-applications/${id}`);
    if (res.ok) {
      const data = await res.json();
      setApplication(data);
      setRollInput(data.rollNumber || "");
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSaveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!application) return;
    setSaving(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const updates = Object.fromEntries(formData.entries());
    const res = await fetch(`/api/admin/student-applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) return setError(data.error || "Save failed");
    setApplication(data);
    setEditMode(false);
  }

  async function handleAssignRoll() {
    if (!rollInput.trim()) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/admin/student-applications/${id}/assign-roll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rollNumber: rollInput.trim() }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) return setError(data.error || "Could not assign roll number");
    setApplication(data);
  }

  async function handleVerify() {
    if (!confirm("Verify this application and generate the Digital I-Card?")) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/admin/student-applications/${id}/verify`, { method: "POST" });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) return setError(data.error || "Verification failed");
    setApplication(data);
  }

  async function handleReject() {
    if (!rejectReason.trim()) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/admin/student-applications/${id}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rejectionReason: rejectReason.trim() }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) return setError(data.error || "Rejection failed");
    setApplication(data);
    setShowRejectModal(false);
    setRejectReason("");
  }

  async function handleResendEmail() {
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/admin/student-applications/${id}/resend-email`, { method: "POST" });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) return setError(data.error || "Could not resend email");
    alert("Email resent.");
  }

  if (loading) return <div className="sav-page">Loading…</div>;
  if (!application) return <div className="sav-page">Application not found.</div>;

  return (
    <div className="sav-page">
      <button className="sav-back" onClick={() => router.push("/admin/student-applications")}>
        ← Back to list
      </button>

      <div className="sav-grid">
        <div className="sav-details">
          <div className="sav-header">
            <h1>{application.applicationId}</h1>
            <span className={`sav-badge sav-badge--${application.status.toLowerCase()}`}>
              {application.status}
            </span>
          </div>

          {error && <div className="sav-error">{error}</div>}

          {!editMode ? (
            <div className="sav-fields">
              <Field label="Student Name" value={application.studentName} />
              <Field label="Father's Name" value={application.fatherName} />
              <Field label="Course" value={application.course} />
              <Field label="Discipline" value={application.discipline} />
              <Field label="Admission Year" value={application.admissionYear} />
              <Field label="Session" value={application.session} />
              <Field label="Mobile" value={application.mobile} />
              <Field label="Address" value={application.address} />
              <Field label="Email" value={application.email} />
              {application.status === "REJECTED" && (
                <Field label="Rejection Reason" value={application.rejectionReason || "—"} />
              )}
              <button className="sav-btn sav-btn--secondary" onClick={() => setEditMode(true)}>
                Edit Application
              </button>
            </div>
          ) : (
            <form className="sav-fields" onSubmit={handleSaveEdit}>
              <EditField name="studentName" label="Student Name" defaultValue={application.studentName} />
              <EditField name="fatherName" label="Father's Name" defaultValue={application.fatherName} />
              <EditField name="course" label="Course" defaultValue={application.course} />
              <EditField name="discipline" label="Discipline" defaultValue={application.discipline} />
              <EditField name="admissionYear" label="Admission Year" defaultValue={application.admissionYear} />
              <EditField name="session" label="Session" defaultValue={application.session} />
              <EditField name="mobile" label="Mobile" defaultValue={application.mobile} />
              <EditField name="address" label="Address" defaultValue={application.address} textarea />
              <EditField name="email" label="Email" defaultValue={application.email} />
              <div className="sav-edit-actions">
                <button type="submit" className="sav-btn" disabled={saving}>
                  Save Changes
                </button>
                <button type="button" className="sav-btn sav-btn--secondary" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="sav-section">
            <h2>Roll Number</h2>
            <div className="sav-roll-row">
              <input
                placeholder="e.g. BCA/2K26/001"
                value={rollInput}
                onChange={(e) => setRollInput(e.target.value)}
              />
              <button className="sav-btn" onClick={handleAssignRoll} disabled={saving || !rollInput.trim()}>
                {application.rollNumber ? "Update Roll No." : "Assign Roll No."}
              </button>
            </div>
          </div>

          <div className="sav-section sav-actions">
            <h2>Actions</h2>
            <div className="sav-action-buttons">
              {application.status !== "VERIFIED" && (
                <button className="sav-btn" onClick={handleVerify} disabled={saving || !application.rollNumber}>
                  Verify
                </button>
              )}
              {application.status !== "REJECTED" && (
                <button
                  className="sav-btn sav-btn--danger"
                  onClick={() => setShowRejectModal(true)}
                  disabled={saving}
                >
                  Reject
                </button>
              )}
              {application.pdfUrl && (
                <a className="sav-btn sav-btn--secondary" href={application.pdfUrl} target="_blank" rel="noreferrer">
                  Download PDF
                </a>
              )}
              {application.status !== "PENDING" && (
                <button className="sav-btn sav-btn--secondary" onClick={handleResendEmail} disabled={saving}>
                  Resend Email
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="sav-preview">
          <div className="sav-preview__label">Digital I-Card</div>
          <StudentIdCard
            studentName={application.studentName}
            fatherName={application.fatherName}
            course={application.course}
            discipline={application.discipline}
            rollNumber={application.rollNumber}
            session={application.session}
            admissionYear={application.admissionYear}
            mobile={application.mobile}
            address={application.address}
            photo={application.photoUrl}
            applicationId={application.applicationId}
          />
        </div>
      </div>

      {showRejectModal && (
        <div className="sav-modal-overlay">
          <div className="sav-modal">
            <h2>Reject Application</h2>
            <textarea
              rows={4}
              placeholder="Enter rejection reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="sav-modal-actions">
              <button className="sav-btn sav-btn--danger" onClick={handleReject} disabled={!rejectReason.trim() || saving}>
                Confirm Reject
              </button>
              <button className="sav-btn sav-btn--secondary" onClick={() => setShowRejectModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="sav-field">
      <span className="sav-field__label">{label}</span>
      <span className="sav-field__value">{value}</span>
    </div>
  );
}

function EditField({
  name,
  label,
  defaultValue,
  textarea,
}: {
  name: string;
  label: string;
  defaultValue: string;
  textarea?: boolean;
}) {
  return (
    <label className="sav-edit-field">
      <span>{label}</span>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue} rows={3} />
      ) : (
        <input name={name} defaultValue={defaultValue} />
      )}
    </label>
  );
}
