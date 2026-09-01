import dbConnect from "@/lib/mongodb";
import StudentApplication from "@/models/StudentApplication";
import StudentIdCard from "@/components/id-card/StudentIdCard";
import "./StudentIdCardPage.css";

export const dynamic = "force-dynamic";

async function getApplicationByToken(token: string) {
  await dbConnect();
  // secureToken is a long random hex string, not the Mongo _id or the
  // human-readable applicationId, so this URL cannot be guessed/enumerated.
  const application = await StudentApplication.findOne({ secureToken: token }).lean();
  return application;
}

export default async function StudentIdCardPage({ params }: { params: { token: string } }) {
  const application = await getApplicationByToken(params.token);

  if (!application) {
    return (
      <main className="sicp-page">
        <div className="sicp-card">
          <h1>Not Found</h1>
          <p>This link is invalid or has expired.</p>
        </div>
      </main>
    );
  }

  if (application.status === "PENDING") {
    return (
      <main className="sicp-page">
        <div className="sicp-card">
          <h1>Application Received</h1>
          <p>Your application is under review.</p>
        </div>
      </main>
    );
  }

  if (application.status === "REJECTED") {
    return (
      <main className="sicp-page">
        <div className="sicp-card sicp-card--rejected">
          <h1>Application Not Approved</h1>
          <p>
            <strong>Reason:</strong> {application.rejectionReason || "Not specified"}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="sicp-page">
      <div className="sicp-card">
        <h1>Your Digital I-Card</h1>
        <StudentIdCard
          studentName={application.studentName}
          fatherName={application.fatherName}
          course={application.course}
          discipline={application.discipline}
          rollNumber={application.rollNumber}
          session={application.session}
          admissionYear={application.admissionYear}
          mobile={application.mobile}
          address={application.address}
          photo={application.photoUrl}
          applicationId={application.applicationId}
        />
        <div className="sicp-actions">
          {application.pdfUrl && (
            <a className="sicp-btn" href={application.pdfUrl} target="_blank" rel="noreferrer">
              Download PDF
            </a>
          )}
          <button className="sicp-btn sicp-btn--secondary" data-print-trigger>
            Print Card
          </button>
        </div>
        {/* Minimal inline script for the Print Card button — no extra client bundle needed for one action. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.querySelector('[data-print-trigger]')?.addEventListener('click', () => window.print());`,
          }}
        />
      </div>
    </main>
  );
}
