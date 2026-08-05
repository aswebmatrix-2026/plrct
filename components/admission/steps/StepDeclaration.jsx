"use client";

import styles from "./StepDeclaration.module.css";

export default function StepDeclaration({ register, errors, getValues }) {
  const values = getValues();

  return (
    <div className={styles.wrapper}>
      <div className={`glass-card ${styles.summaryCard}`}>
        <h4 className={styles.summaryTitle}>Application Summary</h4>
        <p className={styles.summaryText}>
          <span className={styles.mutedLabel}>Applicant:</span> {values.fullName} &nbsp;•&nbsp;
          <span className={styles.mutedLabel}> Program:</span> {values.programType?.toUpperCase()} —{" "}
          {values.department}
        </p>
        <p className={styles.summaryText}>
          <span className={styles.mutedLabel}>Contact:</span> {values.phone} &nbsp;•&nbsp; {values.email}
        </p>
      </div>

      <label className={styles.declarationLabel}>
        <input
          type="checkbox"
          {...register("declarationAccepted")}
          className={styles.checkbox}
        />
        <span className={styles.declarationText}>
          I hereby declare that all information provided is true and correct to the best of my
          knowledge, and I understand that any false information may lead to rejection of my
          application.
        </span>
      </label>
      {errors.declarationAccepted && (
        <p className={styles.errorText}>{errors.declarationAccepted.message}</p>
      )}
    </div>
  );
}