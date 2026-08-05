"use client";

import FileUploadField from "@/components/admission/FileUploadField";
import { Controller } from "react-hook-form";
import styles from "./StepPersonal.module.css";

export default function StepPersonal({ register, errors, control, draftId }) {
  const Field = ({ name, label, required, type = "text" }) => (
    <div>
      <label className={styles.label}>
        {label} {required && <span className={styles.requiredMark}>*</span>}
      </label>
      <input
        type={type}
        {...register(name)}
        className={`${styles.inputField} ${errors[name] ? styles.inputError : ""}`}
      />
      {errors[name] && <p className={styles.errorText}>{errors[name].message}</p>}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <Field name="fullName" label="Full Name" required />
        <Field name="fatherName" label="Father's Name" required />
        <Field name="motherName" label="Mother's Name" required />

        <div>
          <label className={styles.label}>Gender *</label>
          <select {...register("gender")} className={`${styles.inputField} ${errors.gender ? styles.inputError : ""}`}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className={styles.errorText}>{errors.gender.message}</p>}
        </div>

        <Field name="dob" label="Date of Birth" required type="date" />
        <Field name="aadhaar" label="Aadhaar Number" required />
        <Field name="nationality" label="Nationality" />

        <div>
          <label className={styles.label}>Category *</label>
          <select {...register("category")} className={`${styles.inputField} ${errors.category ? styles.inputError : ""}`}>
            <option value="">Select category</option>
            <option value="general">General</option>
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
            <option value="ews">EWS</option>
            <option value="other">Other</option>
          </select>
          {errors.category && <p className={styles.errorText}>{errors.category.message}</p>}
        </div>

        <div>
          <label className={styles.label}>Blood Group</label>
          <select {...register("bloodGroup")} className={styles.inputField}>
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Controller
        name="documents.photo"
        control={control}
        render={({ field }) => (
          <FileUploadField
            label="Passport-size Photo"
            required
            docType="photo"
            draftId={draftId}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}