"use client";

import "./StepContact.css";

export default function StepContact({ register, errors }) {
  const Field = ({ name, label, required, textarea }) => (
    <div>
      <label className="sc-field-label">
        {label} {required && <span className="sc-field-required">*</span>}
      </label>
      {textarea ? (
        <textarea rows={2} {...register(name)} className={`input-field ${errors[name] ? "input-error" : ""}`} />
      ) : (
        <input {...register(name)} className={`input-field ${errors[name] ? "input-error" : ""}`} />
      )}
      {errors[name] && <p className="sc-field-error-text">{errors[name].message}</p>}
    </div>
  );

  return (
    <div className="sc-wrapper">
      <div className="sc-grid">
        <Field name="phone" label="Mobile Number" required />
        <Field name="alternatePhone" label="Alternate Mobile Number" />
        <Field name="email" label="Email Address" required />
      </div>

      <Field name="permanentAddress" label="Permanent Address" required textarea />
      <Field name="currentAddress" label="Current Address" textarea />

      <div className="sc-grid">
        <Field name="state" label="State" required />
        <Field name="district" label="District" required />
        <Field name="city" label="City" required />
        <Field name="pincode" label="PIN Code" required />
      </div>
    </div>
  );
}