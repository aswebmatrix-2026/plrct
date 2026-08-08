"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Save } from "lucide-react";
import toast from "react-hot-toast";

import {
  courseStepSchema,
  personalStepSchema,
  contactStepSchema,
  academicStepSchema,
  documentsStepSchema,
  declarationStepSchema,
  fullAdmissionSchema, // 👈 poora schema import karo final validation ke liye
} from "@/lib/validation/admissionSchema";

import StepCourse from "./steps/StepCourse";
import StepPersonal from "./steps/StepPersonal";
import StepContact from "./steps/StepContact";
import StepAcademic from "./steps/StepAcademic";
import StepDocuments from "./steps/StepDocuments";
import StepDeclaration from "./steps/StepDeclaration";
import StepSuccess from "./steps/StepSuccess";

import "./AdmissionModal.css";

const STEPS = [
  { key: "course", title: "Course Selection", schema: courseStepSchema, fields: ["programType", "department", "admissionMode"] },
  { key: "personal", title: "Personal Information", schema: personalStepSchema, fields: ["fullName", "fatherName", "motherName", "gender", "dob", "aadhaar", "category"] },
  { key: "contact", title: "Contact Details", schema: contactStepSchema, fields: ["phone", "email", "permanentAddress", "state", "district", "city", "pincode"] },
  { key: "academic", title: "Academic Qualification", schema: academicStepSchema, fields: ["class10"] },
  { key: "documents", title: "Document Upload", schema: documentsStepSchema, fields: ["documents"] },
  { key: "declaration", title: "Declaration", schema: declarationStepSchema, fields: ["declarationAccepted"] },
];

const DRAFT_STORAGE_KEY = "PLRCT_admission_draft_id";

export default function AdmissionModal({ isOpen, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [draftId, setDraftId] = useState(null);
  const [result, setResult] = useState(null); // { applicationNumber, id }

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(STEPS[stepIndex].schema),
    defaultValues: {
      admissionSession: "2026-2027",
      documents: {},
    },
  });

  const { register, trigger, watch, control, getValues, formState, reset, setError, clearErrors } = methods;

  const currentStep = STEPS[stepIndex];

  useEffect(() => {
    if (isOpen) {
      const savedDraftId = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraftId) {
        setDraftId(savedDraftId);
        fetch(`/api/admissions/draft?draftId=${savedDraftId}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data?.data) {
              reset(data.data);
              toast("Restored your saved draft", { icon: "📝" });
            }
          })
          .catch(() => {});
      }
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  async function goNext() {
    const valid = await trigger(currentStep.fields, { shouldFocus: true });
    if (!valid) return;
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1);
    }
  }

  function goBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  async function saveDraft() {
    setSavingDraft(true);
    try {
      const data = getValues();
      const res = await fetch("/api/admissions/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId, data, programType: data.programType }),
      });
      const json = await res.json();
      if (json.draftId) {
        setDraftId(json.draftId);
        localStorage.setItem(DRAFT_STORAGE_KEY, json.draftId);
        toast.success("Draft saved — resume anytime");
      }
    } catch {
      toast.error("Could not save draft");
    } finally {
      setSavingDraft(false);
    }
  }

  // 👇 FIX: ab handleSubmit (step-scoped resolver) use nahi karte.
  // Pehle current (declaration) step field validate karte hain trigger() se,
  // phir POORA form data getValues() se nikal ke fullAdmissionSchema se validate karte hain,
  // taaki koi bhi field silently strip na ho.
  async function handleFinalSubmit() {
    const declarationValid = await trigger(currentStep.fields, { shouldFocus: true });
    if (!declarationValid) return;

    const allData = getValues();
    const parsed = fullAdmissionSchema.safeParse(allData);

    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      console.error("Client-side full validation failed:", flat);

      // Jo bhi step ka field fail hua, wahan jump kar do taaki user fix kar sake
      const failedField = Object.keys(flat)[0];
      const failedStepIndex = STEPS.findIndex((s) => s.fields.includes(failedField));
      if (failedStepIndex !== -1) {
        setStepIndex(failedStepIndex);
      }
      toast.error("Please check earlier steps — some required fields are missing.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data), // 👈 pura validated data bhejo, sirf declaration step ka nahi
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");

      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setResult({ applicationNumber: json.applicationNumber, id: json.id });
    } catch (err) {
      toast.error(err.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    setStepIndex(0);
    setResult(null);
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        className="am-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="am-modal"
        >
          {/* Header */}
          <div className="am-header">
           <div className="am-header-left">
  <div className="am-logo-badge font-display">
    P
  </div>
  <div>
    <p className="am-title font-display">
    <span className="am-title-highlight">  Pt. L.R. College of Engineering and Technology</span>
    </p>
    <span className="am-badge">2026 Admissions Open</span>
  </div>
</div>
            <button onClick={handleClose} className="am-close-btn">
              <X size={22} />
            </button>
          </div>

          {!result ? (
            <>
              {/* Progress indicator */}
              <div className="am-progress-wrap">
                <div className="am-progress-row">
                  <p className="am-progress-title">{currentStep.title}</p>
                  <p className="am-progress-step">
                    Step {stepIndex + 1} of {STEPS.length}
                  </p>
                </div>
                <div className="am-progress-track">
                  <motion.div
                    className="am-progress-fill"
                    animate={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Step body */}
              <div className="am-step-body">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.key}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                  >
                    {currentStep.key === "course" && (
                      <StepCourse register={register} watch={watch} errors={formState.errors} />
                    )}
                    {currentStep.key === "personal" && (
                      <StepPersonal register={register} errors={formState.errors} control={control} draftId={draftId} />
                    )}
                    {currentStep.key === "contact" && (
                      <StepContact register={register} errors={formState.errors} />
                    )}
                    {currentStep.key === "academic" && (
                      <StepAcademic register={register} errors={formState.errors} watch={watch} />
                    )}
                    {currentStep.key === "documents" && (
                      <StepDocuments control={control} draftId={draftId} />
                    )}
                    {currentStep.key === "declaration" && (
                      <StepDeclaration register={register} errors={formState.errors} getValues={getValues} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="am-footer">
                <button
                  onClick={saveDraft}
                  disabled={savingDraft}
                  className="am-draft-btn"
                >
                  <Save size={15} /> {savingDraft ? "Saving..." : "Save Draft"}
                </button>
                <div className="am-footer-actions">
                  {stepIndex > 0 && (
                    <button onClick={goBack} className="btn-secondary">
                      Previous
                    </button>
                  )}
                  {stepIndex < STEPS.length - 1 ? (
                    <button onClick={goNext} className="btn-primary">
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleFinalSubmit}
                      disabled={submitting}
                      className="btn-primary"
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <StepSuccess
              applicationNumber={result.applicationNumber}
              applicationId={result.id}
              onClose={handleClose}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}