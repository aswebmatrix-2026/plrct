"use client";

import { DEPARTMENTS } from "@/lib/validation/admissionSchema";
import styles from "./StepCourse.module.css";

export default function StepCourse({ register, watch, errors }) {
  const programType = watch("programType");
  const departments = DEPARTMENTS[programType] || [];

  return (
    <div className={styles.wrapper}>
      <div>
        <label className={styles.label}>Program Type *</label>
        <div className={styles.radioGrid}>
          {[
            { value: "diploma", label: "Diploma Engineering" },
            { value: "btech", label: "B.Tech Engineering" },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`${styles.radioOption} ${
                programType === opt.value ? styles.radioOptionActive : styles.radioOptionInactive
              }`}
            >
              <input type="radio" value={opt.value} {...register("programType")} className={styles.hiddenInput} />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.programType && <p className={styles.errorText}>{errors.programType.message}</p>}
      </div>

      <div>
        <label className={styles.label}>Department *</label>
        <select {...register("department")} className={`${styles.inputField} ${errors.department ? styles.inputError : ""}`}>
          <option value="">Select department</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {errors.department && <p className={styles.errorText}>{errors.department.message}</p>}
      </div>

      <div>
        <label className={styles.label}>Admission Session</label>
        <input value="2026–2027" disabled className={`${styles.inputField} ${styles.inputDisabled}`} />
        <input type="hidden" value="2026-2027" {...register("admissionSession")} />
      </div>

      <div>
        <label className={styles.label}>Admission Mode *</label>
        <select {...register("admissionMode")} className={`${styles.inputField} ${errors.admissionMode ? styles.inputError : ""}`}>
          <option value="">Select admission mode</option>
          <option value="direct">Direct Admission</option>
          <option value="counseling">Counseling Admission</option>
          <option value="lateral_entry">Lateral Entry</option>
        </select>
        {errors.admissionMode && <p className={styles.errorText}>{errors.admissionMode.message}</p>}
      </div>
    </div>
  );
}