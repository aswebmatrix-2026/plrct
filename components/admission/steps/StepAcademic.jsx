"use client";

import "./StepAcademic.css";

export default function StepAcademic({ register, errors, watch }) {
  const admissionMode = watch("admissionMode");

  const Field = ({ prefix, name, label, required, type = "text" }) => {
    const path = `${prefix}.${name}`;
    const err = errors[prefix]?.[name];
    return (
      <div>
        <label className="sa-field-label">
          {label} {required && <span className="sa-field-required">*</span>}
        </label>
        <input type={type} {...register(path)} className={`input-field ${err ? "input-error" : ""}`} />
        {err && <p className="sa-field-error-text">{err.message}</p>}
      </div>
    );
  };

  return (
    <div className="sa-wrapper">
      <div>
        <h4 className="sa-section-title font-display">10th Details</h4>
        <div className="sa-grid">
          <Field prefix="class10" name="board" label="Board" required />
          <Field prefix="class10" name="schoolOrCollege" label="School" required />
          <Field prefix="class10" name="passingYear" label="Passing Year" required type="number" />
          <Field prefix="class10" name="percentage" label="Percentage" required type="number" />
          <Field prefix="class10" name="rollNumber" label="Roll Number" required />
        </div>
      </div>

      <div>
        <h4 className="sa-section-title font-display">12th / Diploma Details</h4>
        <div className="sa-grid">
          <Field prefix="class12" name="board" label="Board" />
          <Field prefix="class12" name="schoolOrCollege" label="School / College" />
          <Field prefix="class12" name="passingYear" label="Passing Year" type="number" />
          <Field prefix="class12" name="percentage" label="Percentage" type="number" />
          <Field prefix="class12" name="pcmPercentage" label="PCM Percentage" type="number" />
          <Field prefix="class12" name="rollNumber" label="Roll Number" />
        </div>
      </div>

      {admissionMode === "lateral_entry" && (
        <div>
          <h4 className="sa-section-title font-display">Lateral Entry Details</h4>
          <div className="sa-grid">
            <Field prefix="lateralEntry" name="diplomaCollege" label="Diploma College" required />
            <Field prefix="lateralEntry" name="branch" label="Branch" required />
            <Field prefix="lateralEntry" name="percentage" label="Percentage" required type="number" />
          </div>
        </div>
      )}
    </div>
  );
}