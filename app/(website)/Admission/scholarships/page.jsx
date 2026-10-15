import "./scholarship.css";

const verificationGuidelines = [
  {
    number: "01",
    title: "Student Details Verification",
    description:
      "Check the student's personal and academic information against official records.",
    points: [
      "Student name and father's name",
      "Enrollment number and roll number",
      "Academic session, course and marks",
      "Income and bank account details",
    ],
  },
  {
    number: "02",
    title: "OTR and Application Details",
    description:
      "Verify the One-Time Registration (OTR) number and scholarship application information for accuracy and consistency.",
    points: [
      "Correct OTR and application details",
      "Matching registration information",
      "Accurate details before verification",
    ],
  },
  {
    number: "03",
    title: "Category and Caste Certificate",
    description:
      "Check the relevant category certificate against the documentation and eligibility conditions of the selected scheme.",
    points: [
      "SC, OBC and other applicable categories",
      "Certificate validity and details",
      "EWS requirements where applicable",
    ],
  },
  {
    number: "04",
    title: "Income Certificate Verification",
    description:
      "Review the income certificate and confirm that the declared family income meets the selected scheme's requirements.",
    points: [
      "Certificate validity",
      "Correct annual family income",
      "Consistency with application details",
    ],
  },
  {
    number: "05",
    title: "Bank Account Details",
    description:
      "Ensure bank information is entered accurately to avoid potential issues during subsequent scholarship processing.",
    points: [
      "Bank account number",
      "Bank name and IFSC code",
      "Account holder's name",
    ],
  },
  {
    number: "06",
    title: "Aadhaar and NPCI Bank Seeding",
    description:
      "Check Aadhaar–NPCI mapping or bank-seeding status where required by the scheme and applicable portal process.",
    points: [
      "Confirm applicable bank-seeding requirements",
      "Resolve discrepancies through the bank",
      "Follow official instructions",
    ],
  },
  {
    number: "07",
    title: "Scholarship Scheme Eligibility",
    description:
      "Review the application against the eligibility conditions prescribed for the particular scholarship scheme.",
    points: [
      "Category and income criteria",
      "Course and academic requirements",
      "Scheme-specific conditions",
    ],
  },
  {
    number: "08",
    title: "Uploaded Documents Verification",
    description:
      "Review all uploaded documents for clarity, completeness, validity and consistency with the submitted information.",
    points: [
      "Readable and clear documents",
      "Valid and complete certificates",
      "Matching application information",
    ],
  },
  {
    number: "09",
    title: "Mismatch and Defective Applications",
    description:
      "Identify incorrect, incomplete or mismatched information and follow the prescribed process for correction or clarification.",
    points: [
      "Identify the exact discrepancy",
      "Follow official correction instructions",
      "Submit clarification where required",
    ],
  },
  {
    number: "10",
    title: "Duplicate and Institutional Records",
    description:
      "Cross-check application information with relevant institutional records and identify duplicate or incorrect entries where applicable.",
    points: [
      "Admission register",
      "Attendance and academic records",
      "Fee and other institutional records",
    ],
  },
  {
    number: "11",
    title: "Final Review and Forwarding",
    description:
      "Complete a final review of the application and supporting documents before taking the appropriate verification action.",
    points: [
      "Check completeness and consistency",
      "Review applicable scheme requirements",
      "Follow the prescribed verification process",
    ],
  },
];

const studentChecklist = [
  "Enter accurate personal and academic details.",
  "Keep OTR and application information correct.",
  "Upload clear, valid and complete documents.",
  "Verify category and income eligibility.",
  "Check bank account number, IFSC and account holder name.",
  "Review Aadhaar–NPCI requirements where applicable.",
  "Ensure application details match official documents.",
  "Check application status on the official NSP portal.",
  "Respond promptly to correction or clarification requests.",
  "Follow official scheme deadlines and instructions.",
];

const faqs = [
  {
    question: "What is NSP Institute-Level Verification?",
    answer:
      "It is the review of scholarship applications by the designated Institute Nodal Officer. The process includes checking student details, supporting documents, scheme eligibility and relevant institutional records.",
  },
  {
    question: "Which details should students check before NSP verification?",
    answer:
      "Students should check their name, enrollment number, roll number, academic session, marks, category, income information, OTR details and bank account information.",
  },
  {
    question: "Why is an income certificate required?",
    answer:
      "Where required by the selected scheme, the income certificate helps establish whether family income meets the prescribed eligibility criteria. Its validity and declared income should be checked.",
  },
  {
    question: "Why are bank details important?",
    answer:
      "Correct bank account details, bank name, IFSC code and account holder name help maintain accurate application records and support subsequent scholarship processing.",
  },
  {
    question: "What happens if application details do not match the documents?",
    answer:
      "A mismatch may require correction or clarification through the applicable portal process. Students should follow the instructions provided by the institution or relevant authority.",
  },
  {
    question: "What is Aadhaar–NPCI bank seeding?",
    answer:
      "It refers to the relevant mapping of Aadhaar with a bank account through the banking system. Where required by a scheme, students should confirm their status with their bank or the appropriate official channel.",
  },
  {
    question: "Does institute-level verification guarantee scholarship approval?",
    answer:
      "No. Institute-level verification is only one stage of the process. Final approval and disbursement depend on the scheme rules and decisions of the relevant authorities.",
  },
  {
    question: "Where can students check official NSP information?",
    answer:
      "Students can visit scholarships.gov.in to review available schemes, eligibility conditions, application instructions and relevant status information.",
  },
  {
    question: "Are the same eligibility rules applicable to every scheme?",
    answer:
      "No. Eligibility conditions and required documents can differ between scholarship schemes. Always consult the official guidelines for your selected scheme.",
  },
  {
    question: "Where can students get assistance with scholarship queries?",
    answer:
      "Students should consult the relevant institutional office for institution-related guidance and use the official NSP portal or designated support channels for portal-specific issues.",
  },
];

export default function ScholarshipPage() {
  return (
    <main className="scholarship-page">
      {/* Hero */}
      <section className="scholarship-hero">
        <div className="scholarship-container">
          <div className="scholarship-breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span>Student Resources</span>
            <span>/</span>
            <span>Scholarship Guidelines</span>
          </div>

          <div className="scholarship-hero-grid">
            <div className="scholarship-hero-content">
              <span className="scholarship-eyebrow">
                <span className="status-dot" />
                STUDENT SCHOLARSHIP GUIDANCE
              </span>

              <h1>
                National Scholarship Portal
                <span> Verification Guidelines</span>
              </h1>

              <p className="scholarship-hero-description">
                A practical guide for students on Institute-Level Verification
                (ILV), application accuracy, document checks and scholarship
                eligibility at PT L.R. Group of Institutions, Faridabad.
              </p>

              <div className="scholarship-hero-actions">
                <a
                  href="https://scholarships.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scholarship-btn scholarship-btn-white"
                >
                  Visit Official NSP <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="#verification-guidelines"
                  className="scholarship-btn scholarship-btn-outline"
                >
                  Explore Guidelines <span aria-hidden="true">↓</span>
                </a>
              </div>

              <div className="scholarship-hero-note">
                <span className="note-icon" aria-hidden="true">i</span>
                <p>
                  Always follow the latest official scheme guidelines and
                  applicable deadlines.
                </p>
              </div>
            </div>

            <div className="scholarship-hero-visual">
              <div className="hero-decoration hero-decoration-one" />
              <div className="hero-decoration hero-decoration-two" />

              <div className="scholarship-document-card">
                <div className="document-card-top">
                  <div className="document-icon" aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="none">
                      <path
                        d="M13 5.5h15l9 9V40H13a3 3 0 0 1-3-3V8.5a3 3 0 0 1 3-3Z"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M28 6v10h9M17 24h16M17 30h16M17 36h10"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="document-label">STUDENT RESOURCE</span>
                </div>

                <h2>Scholarship Verification</h2>
                <p>Application review and document checklist</p>

                <div className="document-progress">
                  <div className="document-progress-head">
                    <span>Verification checkpoints</span>
                    <strong>11</strong>
                  </div>
                  <div className="document-progress-track">
                    <span />
                  </div>
                </div>

                <div className="document-check-item">
                  <span className="document-check">✓</span>
                  <div>
                    <strong>Student information</strong>
                    <small>Personal and academic records</small>
                  </div>
                </div>

                <div className="document-check-item">
                  <span className="document-check">✓</span>
                  <div>
                    <strong>Supporting documents</strong>
                    <small>Validity and consistency</small>
                  </div>
                </div>

                <div className="document-check-item">
                  <span className="document-check">✓</span>
                  <div>
                    <strong>Final application review</strong>
                    <small>Scheme-specific requirements</small>
                  </div>
                </div>

                <div className="document-card-footer">
                  <span className="document-footer-seal">✓</span>
                  <span>Review carefully before submission</span>
                </div>
              </div>

              <div className="hero-floating-label">
                <span className="floating-check">✓</span>
                <div>
                  <strong>Stay prepared</strong>
                  <small>Keep documents ready</small>
                </div>
              </div>
            </div>
          </div>

          <div className="scholarship-stats">
            <div className="scholarship-stat">
              <span className="stat-icon" aria-hidden="true">01</span>
              <div>
                <strong>Student Details</strong>
                <span>Accuracy matters</span>
              </div>
            </div>
            <div className="scholarship-stat">
              <span className="stat-icon" aria-hidden="true">02</span>
              <div>
                <strong>Document Review</strong>
                <span>Check every record</span>
              </div>
            </div>
            <div className="scholarship-stat">
              <span className="stat-icon" aria-hidden="true">03</span>
              <div>
                <strong>Scheme Eligibility</strong>
                <span>Follow official rules</span>
              </div>
            </div>
            <div className="scholarship-stat">
              <span className="stat-icon" aria-hidden="true">04</span>
              <div>
                <strong>Application Status</strong>
                <span>Track official updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="scholarship-section scholarship-intro-section">
        <div className="scholarship-container">
          <div className="scholarship-section-heading">
            <span className="scholarship-section-kicker">UNDERSTANDING NSP</span>
            <h2>
              Your guide to <span>scholarship verification</span>
            </h2>
            <p>
              Understand the verification process, prepare your documents and
              make informed decisions throughout your scholarship application.
            </p>
          </div>

          <div className="scholarship-intro-grid">
            <article className="scholarship-info-card">
              <div className="scholarship-card-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none">
                  <rect
                    x="7"
                    y="8"
                    width="34"
                    height="32"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M15 18h18M15 25h18M15 32h10"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3>What is the National Scholarship Portal?</h3>
              <p>
                The National Scholarship Portal (NSP) is an online platform
                through which students can access participating government
                scholarship schemes and submit applications according to
                the eligibility conditions of each scheme.
              </p>
              <a
                href="https://scholarships.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="scholarship-text-link"
              >
                Open official portal <span aria-hidden="true">↗</span>
              </a>
            </article>

            <article className="scholarship-info-card scholarship-info-card-highlight">
              <div className="scholarship-card-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none">
                  <circle
                    cx="24"
                    cy="24"
                    r="17"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <path
                    d="m16 24 5 5 11-12"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>What is Institute-Level Verification?</h3>
              <p>
                Institute-Level Verification (ILV) involves the designated
                Institute Nodal Officer reviewing student information,
                supporting documents, eligibility and institutional records
                before taking the appropriate action on the portal.
              </p>
              <a
                href="#verification-guidelines"
                className="scholarship-text-link"
              >
                Read all 11 checkpoints <span aria-hidden="true">→</span>
              </a>
            </article>
          </div>

          <div className="scholarship-important-banner">
            <span className="important-banner-icon" aria-hidden="true">!</span>
            <div>
              <strong>Important information</strong>
              <p>
                Institute-level verification does not automatically mean that
                a scholarship has been approved. Final decisions depend on the
                relevant scheme rules and authorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verification guidelines */}
      <section
        className="scholarship-section scholarship-guidelines-section"
        id="verification-guidelines"
      >
        <div className="scholarship-container">
          <div className="scholarship-section-heading">
            <span className="scholarship-section-kicker">
              INSTITUTE-LEVEL VERIFICATION
            </span>
            <h2>
              11 essential <span>verification checkpoints</span>
            </h2>
            <p>
              The following checks support a careful review of scholarship
              applications. Apply the requirements relevant to the selected
              scheme and the official verification process.
            </p>
          </div>

          <div className="scholarship-guidelines-grid">
            {verificationGuidelines.map((item) => (
              <article
                className="scholarship-guideline-card"
                key={item.number}
              >
                <div className="guideline-card-top">
                  <span className="guideline-number">{item.number}</span>
                  <span className="guideline-card-mark" aria-hidden="true">
                    ✓
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <span aria-hidden="true">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Student checklist */}
      <section className="scholarship-section scholarship-checklist-section">
        <div className="scholarship-container scholarship-checklist-layout">
          <div className="scholarship-checklist-content">
            <span className="scholarship-section-kicker">
              BEFORE YOU SUBMIT
            </span>
            <h2>
              Student <span>pre-verification checklist</span>
            </h2>
            <p>
              Use this checklist to review your application before submission
              and whenever you are asked to correct or clarify information.
            </p>

            <div className="scholarship-checklist">
              {studentChecklist.map((item, index) => (
                <div className="scholarship-checklist-item" key={item}>
                  <span className="checklist-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="checklist-tick" aria-hidden="true">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <a
              href="https://scholarships.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="scholarship-btn scholarship-btn-primary"
            >
              Check Official NSP Portal <span aria-hidden="true">↗</span>
            </a>
          </div>

          <aside className="scholarship-checklist-aside">
            <div className="checklist-aside-pattern" />
            <div className="checklist-aside-icon" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <rect
                  x="13"
                  y="9"
                  width="38"
                  height="48"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="m21 24 4 4 7-8M36 25h8M21 39l4 4 7-8M36 40h8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="aside-overline">YOUR NEXT STEP</span>
            <h3>Accuracy today. Fewer avoidable errors tomorrow.</h3>
            <p>
              Keep your original records accessible, enter information
              carefully and use official channels whenever clarification
              is required.
            </p>
            <div className="aside-divider" />
            <div className="aside-contact">
              <span className="aside-contact-icon" aria-hidden="true">i</span>
              <p>
                For institution-related queries, contact the relevant office
                at PT L.R. Group of Institutions.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Institution information */}
      <section className="scholarship-section scholarship-institution-section">
        <div className="scholarship-container">
          <div className="scholarship-institution-card">
            <div className="institution-card-accent" />
            <div className="institution-card-content">
              <span className="scholarship-section-kicker">
                INSTITUTIONAL GUIDANCE
              </span>
              <h2>
                Scholarship information at{" "}
                <span>PT L.R. Group of Institutions</span>
              </h2>
              <p>
                Students in Faridabad, Haryana, should carefully review the
                scholarship scheme applicable to their course and circumstances.
                Ensure that the information submitted is accurate and that all
                required supporting documents are complete.
              </p>
              <p>
                For scheme-specific eligibility, application dates, certificate
                requirements and status updates, consult the official NSP portal
                and the relevant institutional office.
              </p>
              <a
                href="https://scholarships.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="scholarship-btn scholarship-btn-primary"
              >
                Visit National Scholarship Portal
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="institution-card-decoration" aria-hidden="true">
              <div className="institution-decoration-circle">
                <svg viewBox="0 0 100 100" fill="none">
                  <path
                    d="M12 37 50 15l38 22-38 22L12 37Z"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M25 46v23c14 12 36 12 50 0V46M88 37v29"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="88" cy="71" r="5" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="scholarship-section scholarship-faq-section">
        <div className="scholarship-container">
          <div className="scholarship-section-heading">
            <span className="scholarship-section-kicker">
              COMMON STUDENT QUERIES
            </span>
            <h2>
              Frequently asked <span>questions</span>
            </h2>
            <p>
              Find answers to common questions about NSP applications and
              institute-level verification.
            </p>
          </div>

          <div className="scholarship-faq-list">
            {faqs.map((faq, index) => (
              <details
                className="scholarship-faq-item"
                key={faq.question}
                open={index === 0}
              >
                <summary>
                  <span className="faq-question-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-question">{faq.question}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="scholarship-final-cta">
        <div className="scholarship-container scholarship-final-cta-inner">
          <div>
            <span className="scholarship-cta-kicker">STAY INFORMED</span>
            <h2>Keep your scholarship application on track.</h2>
            <p>
              Review official announcements, maintain accurate records and
              complete any required corrections within the applicable timelines.
            </p>
          </div>
          <a
            href="https://scholarships.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="scholarship-btn scholarship-btn-white"
          >
            Go to Official NSP <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}