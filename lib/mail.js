import nodemailer from "nodemailer";

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

const STATUS_LABELS = {
  new: "Received",
  under_review: "Under Review",
  documents_pending: "Documents Pending",
  approved: "Approved",
  rejected: "Rejected",
  admission_confirmed: "Admission Confirmed",
};

export async function sendConfirmationEmail(admission) {
  if (!process.env.SMTP_HOST) return; // no-op if email isn't configured yet
  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: admission.email,
    subject: `PLRCT Admission Received — ${admission.applicationNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto">
        <h2 style="color:#C8102E">PLRCT</h2>
        <p>Dear ${admission.fullName},</p>
        <p>Thank you for applying. Your application has been received successfully.</p>
        <p><strong>Application Number:</strong> ${admission.applicationNumber}</p>
        <p><strong>Program:</strong> ${admission.programType.toUpperCase()} — ${admission.department}</p>
        <p>You can use your application number to track status on the college portal.</p>
        <p>Regards,<br/>Admissions Office, PLRCT</p>
      </div>
    `,
  });
}

export async function sendStatusUpdateEmail(admission) {
  if (!process.env.SMTP_HOST) return;
  const transporter = getTransporter();
  const label = STATUS_LABELS[admission.applicationStatus] || admission.applicationStatus;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: admission.email,
    subject: `Application Status Update — ${admission.applicationNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto">
        <h2 style="color:#C8102E">PLRCT</h2>
        <p>Dear ${admission.fullName},</p>
        <p>Your application <strong>${admission.applicationNumber}</strong> status has been updated to:</p>
        <p style="font-size:18px;font-weight:bold;color:#C8102E">${label}</p>
        <p>Regards,<br/>Admissions Office, PLRCT</p>
      </div>
    `,
  });
}
