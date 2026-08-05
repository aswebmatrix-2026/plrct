"use client";

import { CheckCircle2, Download } from "lucide-react";
import styles from "./StepSuccess.module.css";

export default function StepSuccess({ applicationNumber, applicationId, onClose }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconCircle}>
        <CheckCircle2 className={styles.icon} size={32} />
      </div>
      <h3 className={styles.title}>Application Submitted!</h3>
      <p className={styles.subtitle}>
        Your application has been received. A confirmation email has been sent to your registered
        email address.
      </p>
      <div className={`glass-card ${styles.appNumberCard}`}>
        <p className={styles.appNumberLabel}>Application Number</p>
        <p className={styles.appNumberValue}>{applicationNumber}</p>
      </div>
      <div className={styles.actions}>
        <a href={`/api/admissions/${applicationId}/pdf`} className={`btn-secondary ${styles.actionBtn}`}>
          <Download size={16} /> Download PDF
        </a>
        <button onClick={onClose} className="btn-primary">
          Close
        </button>
      </div>
    </div>
  );
}