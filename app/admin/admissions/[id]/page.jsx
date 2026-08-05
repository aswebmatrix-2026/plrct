"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Download, Mail, Trash2 } from "lucide-react";

const STATUS_OPTIONS = [
  "new",
  "under_review",
  "documents_pending",
  "approved",
  "rejected",
  "admission_confirmed",
];

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-1.5 text-sm border-b border-gray-50">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value ?? "-"}</span>
    </div>
  );
}

export default function AdmissionDetailPage() {
  const { id } = useParams();
  const [admission, setAdmission] = useState(null);
  const [remark, setRemark] = useState("");
  const [counselor, setCounselor] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [saving, setSaving] = useState(false);

  function load() {
    fetch(`/api/admissions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAdmission(data.admission);
        setCounselor(data.admission?.counselorAssigned || "");
        setFollowUp(data.admission?.followUpDate?.slice(0, 10) || "");
      });
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function patch(body, successMsg) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success(successMsg);
      load();
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (!admission) return <div className="p-8 text-gray-400">Loading...</div>;

  return (
    <div className="p-8 space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">{admission.fullName}</h1>
          <p className="text-sm text-gray-500">{admission.applicationNumber}</p>
        </div>
        <div className="flex gap-2">
          <a href={`/api/admissions/${id}/pdf`} className="btn-secondary flex items-center gap-2 text-sm">
            <Download size={15} /> PDF
          </a>
          <button
            onClick={() => patch({ status: admission.applicationStatus, notifyApplicant: true }, "Email sent")}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <Mail size={15} /> Send Email
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card bg-white p-5">
            <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
            <Row label="Father's Name" value={admission.fatherName} />
            <Row label="Mother's Name" value={admission.motherName} />
            <Row label="Gender" value={admission.gender} />
            <Row label="Date of Birth" value={new Date(admission.dob).toLocaleDateString("en-IN")} />
            <Row label="Category" value={admission.category?.toUpperCase()} />
            <Row label="Blood Group" value={admission.bloodGroup} />
          </div>

          <div className="glass-card bg-white p-5">
            <h3 className="font-medium text-gray-700 mb-2">Contact & Course</h3>
            <Row label="Phone" value={admission.phone} />
            <Row label="Email" value={admission.email} />
            <Row label="Address" value={`${admission.city}, ${admission.state} - ${admission.pincode}`} />
            <Row label="Program" value={`${admission.programType?.toUpperCase()} — ${admission.department}`} />
            <Row label="Admission Mode" value={admission.admissionMode} />
          </div>

          <div className="glass-card bg-white p-5">
            <h3 className="font-medium text-gray-700 mb-2">Documents</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(admission.documents || {}).map(([key, doc]) =>
                doc?.url ? (
                  <a
                    key={key}
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-brand underline truncate"
                  >
                    {key}
                  </a>
                ) : null
              )}
            </div>
          </div>

          <div className="glass-card bg-white p-5">
            <h3 className="font-medium text-gray-700 mb-3">Status Timeline</h3>
            <div className="space-y-3">
              {admission.statusHistory?.slice().reverse().map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className={`badge status-${h.status}`}>{h.status.replace("_", " ")}</span>
                  <span className="text-gray-500">
                    {new Date(h.changedAt).toLocaleString("en-IN")} by {h.changedBy}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card bg-white p-5 space-y-3">
            <h3 className="font-medium text-gray-700">Change Status</h3>
            <select
              defaultValue={admission.applicationStatus}
              onChange={(e) => patch({ status: e.target.value }, "Status updated")}
              className="input-field"
              disabled={saving}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s.replace("_", " ")}</option>
              ))}
            </select>
          </div>

          <div className="glass-card bg-white p-5 space-y-3">
            <h3 className="font-medium text-gray-700">Assign Counselor</h3>
            <input
              className="input-field"
              value={counselor}
              onChange={(e) => setCounselor(e.target.value)}
              placeholder="Counselor name"
            />
            <button
              onClick={() => patch({ counselorAssigned: counselor }, "Counselor assigned")}
              className="btn-secondary w-full text-sm"
            >
              Save
            </button>
          </div>

          <div className="glass-card bg-white p-5 space-y-3">
            <h3 className="font-medium text-gray-700">Follow-up Date</h3>
            <input
              type="date"
              className="input-field"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
            />
            <button
              onClick={() => patch({ followUpDate: followUp }, "Follow-up scheduled")}
              className="btn-secondary w-full text-sm"
            >
              Save
            </button>
          </div>

          <div className="glass-card bg-white p-5 space-y-3">
            <h3 className="font-medium text-gray-700">Add Remark</h3>
            <textarea
              rows={3}
              className="input-field"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
            <button
              onClick={() => {
                patch({ remark }, "Remark added");
                setRemark("");
              }}
              className="btn-primary w-full text-sm"
            >
              Add Remark
            </button>
            <div className="space-y-2 pt-2 max-h-40 overflow-y-auto">
              {admission.remarks?.slice().reverse().map((r, i) => (
                <div key={i} className="text-xs bg-gray-50 rounded-lg p-2">
                  <p className="text-gray-700">{r.text}</p>
                  <p className="text-gray-400 mt-1">
                    {r.addedBy} · {new Date(r.addedAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
