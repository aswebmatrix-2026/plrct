"use client";

import { Controller } from "react-hook-form";
import FileUploadField from "@/components/admission/FileUploadField";
import styles from "./StepDocuments.module.css";

const DOCS = [
  { name: "signature", label: "Signature", required: true },
  { name: "aadhaarFile", label: "Aadhaar Card", required: true },
  { name: "marksheet10", label: "10th Marksheet", required: true },
  { name: "marksheet12", label: "12th Marksheet", required: false },
  { name: "diplomaMarksheet", label: "Diploma Marksheet", required: false },
  { name: "categoryCertificate", label: "Category Certificate", required: false },
  { name: "migrationCertificate", label: "Migration Certificate", required: false },
  { name: "characterCertificate", label: "Character Certificate", required: false },
];

export default function StepDocuments({ control, draftId }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.helperText}>
        Passport photo was already uploaded in the Personal Information step. Upload the remaining
        documents below (JPG, PNG or PDF, max 5MB each).
      </p>
      {DOCS.map((doc) => (
        <Controller
          key={doc.name}
          name={`documents.${doc.name}`}
          control={control}
          render={({ field }) => (
            <FileUploadField
              label={doc.label}
              required={doc.required}
              docType={doc.name}
              draftId={draftId}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      ))}
    </div>
  );
}