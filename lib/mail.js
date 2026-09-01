import nodemailer from "nodemailer";

/* =========================================================
   SMTP TRANSPORTER
   ========================================================= */

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/* =========================================================
   ADMISSION STATUS LABELS
   ========================================================= */

const STATUS_LABELS = {
  new: "Received",
  under_review: "Under Review",
  documents_pending: "Documents Pending",
  approved: "Approved",
  rejected: "Rejected",
  admission_confirmed: "Admission Confirmed",
};

/* =========================================================
   ADMISSION CONFIRMATION EMAIL
   ========================================================= */

export async function sendConfirmationEmail(admission) {
  if (!process.env.SMTP_HOST) {
    console.warn("SMTP_HOST is not configured. Email not sent.");
    return;
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: admission.email,
    subject: `PLRCT Admission Received — ${admission.applicationNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#222">

        <h2 style="color:#C8102E">
          Pt. L. R. College of Technology
        </h2>

        <p>Dear ${admission.fullName},</p>

        <p>
          Thank you for applying. Your admission application has
          been received successfully.
        </p>

        <div style="
          background:#f5f5f5;
          padding:15px;
          border-radius:8px;
          margin:15px 0;
        ">

          <p>
            <strong>Application Number:</strong>
            ${admission.applicationNumber}
          </p>

          <p>
            <strong>Program:</strong>
            ${String(admission.programType || "").toUpperCase()}
          </p>

          <p>
            <strong>Department:</strong>
            ${admission.department}
          </p>

        </div>

        <p>
          You can use your application number to track your
          application status on the college portal.
        </p>

        <p>
          Regards,<br/>
          Admissions Office<br/>
          Pt. L. R. College of Technology
        </p>

      </div>
    `,
  });
}

/* =========================================================
   ADMISSION STATUS UPDATE EMAIL
   ========================================================= */

export async function sendStatusUpdateEmail(admission) {
  if (!process.env.SMTP_HOST) {
    console.warn("SMTP_HOST is not configured. Email not sent.");
    return;
  }

  const transporter = getTransporter();

  const label =
    STATUS_LABELS[admission.applicationStatus] ||
    admission.applicationStatus ||
    "Updated";

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: admission.email,
    subject: `Application Status Update — ${admission.applicationNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#222">

        <h2 style="color:#C8102E">
          Pt. L. R. College of Technology
        </h2>

        <p>Dear ${admission.fullName},</p>

        <p>
          Your application
          <strong>${admission.applicationNumber}</strong>
          status has been updated to:
        </p>

        <div style="
          background:#fff4f4;
          border-left:4px solid #C8102E;
          padding:14px;
          margin:15px 0;
        ">

          <p style="
            font-size:18px;
            font-weight:bold;
            color:#C8102E;
            margin:0;
          ">
            ${label}
          </p>

        </div>

        <p>
          Please log in to the college portal to view the
          latest details regarding your application.
        </p>

        <p>
          Regards,<br/>
          Admissions Office<br/>
          Pt. L. R. College of Technology
        </p>

      </div>
    `,
  });
}

/* =========================================================
   STUDENT OTP EMAIL
   ========================================================= */

export async function sendStudentOtpEmail(email, otp) {
  if (!process.env.SMTP_HOST) {
    console.warn("SMTP_HOST is not configured. OTP email not sent.");
    return;
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Your PTLR College Verification Code",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;color:#222">

        <h2 style="color:#C8102E">
          Pt. L. R. College of Technology
        </h2>

        <p>
          Your verification code for the Student I-Card
          application is:
        </p>

        <p style="
          font-size:28px;
          font-weight:bold;
          letter-spacing:4px;
          color:#1a3a8f;
        ">
          ${otp}
        </p>

        <p>
          This code expires in 5 minutes.
          Do not share it with anyone.
        </p>

        <p>
          Regards,<br/>
          Pt. L. R. College of Technology
        </p>

      </div>
    `,
  });
}

/* =========================================================
   VERIFIED I-CARD EMAIL
   ========================================================= */

export async function sendIdCardVerifiedEmail(input) {
  if (!process.env.SMTP_HOST) {
    console.warn("SMTP_HOST is not configured. Email not sent.");
    return;
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: input.email,
    subject: "Your PTLR College Digital I-Card",

    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#222">

        <h2 style="color:#C8102E">
          Pt. L. R. College of Technology
        </h2>

        <p>
          Dear ${input.studentName},
        </p>

        <p>
          Your Student I-Card application has been
          <strong style="color:green">
            verified
          </strong>.
        </p>

        <table style="
          border-collapse:collapse;
          margin:12px 0;
          width:100%;
        ">

          <tr>
            <td style="padding:6px 12px 6px 0;color:#555">
              Application ID
            </td>
            <td>
              <strong>${input.applicationId}</strong>
            </td>
          </tr>

          <tr>
            <td style="padding:6px 12px 6px 0;color:#555">
              Course
            </td>
            <td>
              ${input.course}
            </td>
          </tr>

          <tr>
            <td style="padding:6px 12px 6px 0;color:#555">
              Discipline
            </td>
            <td>
              ${input.discipline}
            </td>
          </tr>

          <tr>
            <td style="padding:6px 12px 6px 0;color:#555">
              Roll Number
            </td>
            <td>
              <strong>${input.rollNumber}</strong>
            </td>
          </tr>

          <tr>
            <td style="padding:6px 12px 6px 0;color:#555">
              Session
            </td>
            <td>
              ${input.session}
            </td>
          </tr>

        </table>

        <p>
          Your Digital I-Card PDF is attached to this email.
        </p>

        <p>
          You can also view and download it securely here:
        </p>

        <p>
          <a
            href="${input.downloadLink}"
            style="
              color:#ffffff;
              background:#1a3a8f;
              padding:10px 18px;
              text-decoration:none;
              border-radius:5px;
              display:inline-block;
            "
          >
            Download Digital I-Card
          </a>
        </p>

        <p>
          Regards,<br/>
          Pt. L. R. College of Technology
        </p>

      </div>
    `,

    attachments: [
      {
        filename: "student-id-card.pdf",
        content: input.pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
}

/* =========================================================
   REJECTED I-CARD EMAIL
   ========================================================= */

export async function sendIdCardRejectedEmail(input) {
  if (!process.env.SMTP_HOST) {
    console.warn("SMTP_HOST is not configured. Email not sent.");
    return;
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: input.email,
    subject: "Update on Your PTLR College I-Card Application",

    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#222">

        <h2 style="color:#C8102E">
          Pt. L. R. College of Technology
        </h2>

        <p>
          Dear ${input.studentName},
        </p>

        <p>
          Your Student I-Card application
          <strong>${input.applicationId}</strong>
          could not be approved.
        </p>

        <div style="
          background:#fff4f4;
          border-left:4px solid #C8102E;
          padding:14px;
          margin:15px 0;
        ">

          <p style="margin:0">
            <strong>Reason:</strong>
            ${input.rejectionReason}
          </p>

        </div>

        <p>
          Please contact the admissions office if you believe
          this is a mistake, or submit a corrected application.
        </p>

        <p>
          Regards,<br/>
          Pt. L. R. College of Technology
        </p>

      </div>
    `,
  });
}