
import Link from "next/link";
import "./admission-process.css";

const programmes = [
  {
    number: "01",
    title: "B.Tech",
    subtitle: "Bachelor of Technology",
    duration: "4 Years",
    eligibility:
      "Candidates must have passed 10+2 with Physics and Mathematics along with the required subjects as per the applicable admission guidelines.",
    points: [
      "Four-year undergraduate engineering programme.",
      "Admission as per applicable eligibility criteria.",
      "Suitable for students pursuing an engineering career.",
    ],
  },
  {
    number: "02",
    title: "Diploma",
    subtitle: "Engineering Diploma",
    duration: "3 Years",
    eligibility:
      "Candidates should have passed the required qualifying examination and meet the eligibility conditions applicable to the selected diploma programme.",
    points: [
      "Three-year diploma programme.",
      "Practical and technical learning.",
      "Admission subject to eligibility and seat availability.",
    ],
  },
  {
    number: "03",
    title: "M.Tech",
    subtitle: "Master of Technology",
    duration: "2 Years",
    eligibility:
      "Candidates should hold a relevant qualifying degree and satisfy the eligibility requirements applicable to the selected postgraduate engineering programme.",
    points: [
      "Two-year postgraduate programme.",
      "Advanced technical education.",
      "Admission as per applicable eligibility guidelines.",
    ],
  },
];

const admissionSteps = [
  {
    number: "01",
    title: "Choose Your Programme",
    description:
      "Select the programme you want to pursue and review its eligibility requirements.",
  },
  {
    number: "02",
    title: "Fill Out the Application",
    description:
      "Complete the online admission form available on the college homepage, or visit the campus to apply offline.",
  },
  {
    number: "03",
    title: "Submit Required Documents",
    description:
      "Provide the required academic certificates, identity proof, photographs and other applicable documents.",
  },
  {
    number: "04",
    title: "Verification & Admission",
    description:
      "The college will review your application and documents. Admission is subject to eligibility, verification and seat availability.",
  },
];

export default function AdmissionProcedurePage() {
  return (
    <main className="admission-page">
      {/* Hero Section */}
      <section className="admission-hero">
        <div className="admission-container admission-hero-grid">
          <div className="admission-hero-content">
            <span className="admission-eyebrow">
              ADMISSIONS
            </span>

            <h1>
              Admission <span>Procedure</span>
            </h1>

            <p>
              Begin your academic journey with Pandit L.R.
              College of Technology. Explore our programmes,
              check the eligibility requirements and follow
              the admission process to apply.
            </p>

            <div className="admission-hero-actions">
              <Link
                href="https://www.plrct.com"
                className="admission-btn admission-btn-primary"
              >
                Apply Online
                <span aria-hidden="true">↗</span>
              </Link>

              <a
                href="#programmes"
                className="admission-btn admission-btn-outline"
              >
                Explore Programmes
              </a>
            </div>

            <div className="admission-hero-note">
              <span className="admission-note-dot" />
              Online and offline application options available
            </div>
          </div>

          <div className="admission-hero-visual">
            <div className="admission-visual-card">
              <div className="admission-visual-top">
                <span className="admission-visual-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 9L12 4L21 9L12 14L3 9Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 11.5V16C10 18.5 14 18.5 17 16V11.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                    <path
                      d="M21 9V15"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <span className="admission-visual-label">
                  YOUR FUTURE STARTS HERE
                </span>
              </div>

              <h2>Take the First Step</h2>

              <p>
                Choose your programme, prepare your documents
                and submit your admission application.
              </p>

              <div className="admission-visual-divider" />

              <div className="admission-visual-stat">
                <span className="admission-stat-number">03</span>
                <span className="admission-stat-text">
                  Programme Categories
                </span>
              </div>

              <div className="admission-visual-stat">
                <span className="admission-stat-number">₹500</span>
                <span className="admission-stat-text">
                  Application Fee
                </span>
              </div>

              <div className="admission-visual-decoration admission-decoration-one" />
              <div className="admission-visual-decoration admission-decoration-two" />
            </div>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section
        className="admission-section"
        id="programmes"
      >
        <div className="admission-container">
          <div className="admission-section-heading">
            <span className="admission-eyebrow">
              OUR PROGRAMMES
            </span>

            <h2>
              Choose Your <span>Academic Path</span>
            </h2>

            <p>
              Explore the programme options and review the
              relevant eligibility requirements before applying.
            </p>
          </div>

          <div className="admission-programme-grid">
            {programmes.map((programme) => (
              <article
                className="admission-programme-card"
                key={programme.number}
              >
                <div className="admission-programme-top">
                  <span className="admission-programme-number">
                    {programme.number}
                  </span>

                  <span className="admission-duration">
                    {programme.duration}
                  </span>
                </div>

                <h3>{programme.title}</h3>

                <p className="admission-programme-subtitle">
                  {programme.subtitle}
                </p>

                <div className="admission-card-divider" />

                <h4>Eligibility</h4>

                <p className="admission-eligibility">
                  {programme.eligibility}
                </p>

                <ul className="admission-feature-list">
                  {programme.points.map((point) => (
                    <li key={point}>
                      <span
                        className="admission-check"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href="#how-to-apply"
                  className="admission-text-link"
                >
                  How to Apply
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>

          <p className="admission-disclaimer">
            Eligibility requirements may vary by programme
            and applicable admission regulations. Please
            confirm the current requirements with the college
            before applying.
          </p>
        </div>
      </section>

      {/* How to Apply */}
      <section
        className="admission-section admission-apply-section"
        id="how-to-apply"
      >
        <div className="admission-container">
          <div className="admission-section-heading">
            <span className="admission-eyebrow">
              APPLICATION GUIDELINES
            </span>

            <h2>
              How to <span>Apply</span>
            </h2>

            <p>
              Apply online from the college homepage or visit
              the campus to complete the application process offline.
            </p>
          </div>

          <div className="admission-apply-grid">
            <article className="admission-apply-card">
              <div className="admission-apply-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="4"
                    y="3"
                    width="16"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M8 8H16M8 12H16M8 16H13"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <span className="admission-apply-label">
                OPTION 01
              </span>

              <h3>Online Application</h3>

              <p>
                Visit the college homepage and use the online
                admission form to submit your application.
              </p>

              <a
                href="https://www.plrct.com"
                className="admission-btn admission-btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit College Homepage
                <span aria-hidden="true">↗</span>
              </a>
            </article>

            <article className="admission-apply-card">
              <div className="admission-apply-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 21H21M5 21V9L12 4L19 9V21M9 21V15H15V21M8 11H8.01M12 11H12.01M16 11H16.01"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span className="admission-apply-label">
                OPTION 02
              </span>

              <h3>Offline Application</h3>

              <p>
                Visit the college campus to obtain assistance
                with the admission application and document
                submission process.
              </p>

              <a
                href="#admission-process"
                className="admission-btn admission-btn-secondary"
              >
                View Admission Process
                <span aria-hidden="true">→</span>
              </a>
            </article>
          </div>

          <div className="admission-fee-card">
            <div className="admission-fee-content">
              <span className="admission-fee-label">
                APPLICATION FEE
              </span>

              <h3>
                ₹500 <span>per application</span>
              </h3>

              <p>
                The application fee is ₹500. Please confirm
                the applicable payment method and fee details
                with the college before making a payment.
              </p>
            </div>

            <div className="admission-fee-badge">
              <span aria-hidden="true">₹</span>
              <span>Application Fee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section
        className="admission-section admission-process-section"
        id="admission-process"
      >
        <div className="admission-container">
          <div className="admission-section-heading">
            <span className="admission-eyebrow">
              STEP BY STEP
            </span>

            <h2>
              Admission <span>Process</span>
            </h2>

            <p>
              Follow these general steps to complete your
              application and admission process.
            </p>
          </div>

          <div className="admission-steps">
            {admissionSteps.map((step) => (
              <article
                className="admission-step"
                key={step.number}
              >
                <div className="admission-step-number">
                  {step.number}
                </div>

                <div className="admission-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lateral Entry */}
      <section className="admission-section admission-lateral-section">
        <div className="admission-container">
          <div className="admission-lateral-card">
            <div className="admission-lateral-content">
              <span className="admission-eyebrow">
                ADDITIONAL INFORMATION
              </span>

              <h2>
                Lateral Entry <span>Admissions</span>
              </h2>

              <p>
                Eligible candidates may be considered for
                lateral entry into applicable programmes,
                subject to the relevant admission rules,
                qualifications and seat availability.
              </p>

              <p>
                Contact the college to confirm whether lateral
                entry is available for your chosen programme
                and academic session.
              </p>

              <a
                href="https://www.plrct.com"
                className="admission-btn admission-btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit College Website
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="admission-lateral-mark" aria-hidden="true">
              <span>LR</span>
              <div className="admission-lateral-line" />
              <small>YOUR NEXT STEP</small>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="admission-final-section">
        <div className="admission-container admission-final-content">
          <span className="admission-eyebrow">
            START YOUR JOURNEY
          </span>

          <h2>
            Ready to Take the <span>Next Step?</span>
          </h2>

          <p>
            Explore your options and begin your admission
            application through the college homepage.
          </p>

          <a
            href="https://www.plrct.com"
            className="admission-btn admission-btn-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Through Homepage
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
