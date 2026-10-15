import "./examination-cell.css";
import { NoticeBoard } from "./notice-board";

// ============================================================================
// SITE CONSTANTS
// ============================================================================
const SITE_URL = "https://ptlrct.com";
const PAGE_URL = `${SITE_URL}/academics/resources/examination-cell`;

// ============================================================================
// SEO METADATA — Next.js App Router
// ============================================================================
export const metadata = {
  title: "Examination Cell | Pt. L.R. College of Technology, Faridabad",
  description:
    "Examination notices, student guidelines and support information from the Examination Cell at Pt. L.R. College of Technology, Faridabad.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Examination Cell | Pt. L.R. College of Technology, Faridabad",
    description:
      "Latest examination notices and student guidelines from the Examination Cell at Pt. L.R. College of Technology, Faridabad.",
    url: PAGE_URL,
    siteName: "Pt. L.R. College of Technology",
    locale: "en_IN",
    type: "website",
    // Add `images: [{ url, width: 1200, height: 630, alt }]` once an OG image exists.
  },
  twitter: {
    card: "summary_large_image",
    title: "Examination Cell | Pt. L.R. College of Technology, Faridabad",
    description:
      "Latest examination notices and student guidelines from the Examination Cell at Pt. L.R. College of Technology, Faridabad.",
  },
};

// ============================================================================
// CONFIGURATION
// ============================================================================

const BREADCRUMBS = [
  { name: "Home", href: "/" },
  { name: "Academics", href: "/academics" },
  { name: "Resources", href: "/academics/resources" }, // confirm this route exists
  { name: "Examination Cell", href: null },
];

/**
 * Examination Cell contact details.
 * Fill in ONLY real, confirmed details. A card appears for each field you
 * fill; empty (null) fields are not shown at all.
 */
const CONTACT = {
  office: null, // e.g. "Room 12, Admin Block"
  email: null, // e.g. "exam@ptlrct.com"
  phone: null, // e.g. "+91 98XXXXXXXX"
  hours: null, // e.g. "Mon–Sat, 10 AM – 4 PM"
  incharge: null, // e.g. "Dr. Name Surname"
};
const hasContactDetails = Object.values(CONTACT).some(Boolean);

/** Filter chips on the notice board (matched from notice titles). */
const NOTICE_CATEGORIES = [
  "Forms",
  "Results",
  "Re-evaluation",
  "Schedule & Admit Card",
  "Internal & Practical",
  "General",
];

const SECTION_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "notices", label: "Notices" },
  { id: "guidelines", label: "Student Guidelines" },
  { id: "support", label: "Support" },
  { id: "faq", label: "FAQ" },
];

const GUIDELINE_CARDS = [
  {
    title: "Examination forms",
    text: "Fill and submit examination forms only as described in the official notice. Check your name, roll number, programme, semester and subject codes before submitting, and keep your receipt and acknowledgement.",
  },
  {
    title: "Admit card",
    text: "Check your admit card for your name, roll number, subjects and centre. Report any error to the college before the examination begins, and carry your admit card and the identification named in the instructions.",
  },
  {
    title: "Results and re-evaluation",
    text: "Results, and any re-evaluation or rechecking process, are communicated through official notices. Apply only within the window and by the procedure given in the notice.",
  },
];

const CONDUCT = [
  "Report at the examination centre within the time stated.",
  "Occupy only the seat allotted to you and follow the invigilator's instructions.",
  "Carry only materials that are explicitly permitted. Mobile phones and other electronic devices are generally not allowed in examination halls unless specifically permitted.",
  "Copying, impersonation or possessing unauthorised material is treated as unfair means and is subject to action under the applicable regulations.",
  "Write only in the answer book provided and hand it to the invigilator before leaving.",
];

const FAQS = [
  {
    q: "Where will examination notices appear?",
    a: "Examination notices appear in the notice board on this page as soon as they are published by the college through the official notice system.",
  },
  {
    q: "How do I find my examination dates?",
    a: "Examination dates are communicated through official notices. Check the notices section on this page or the college notice board for the latest date sheet.",
  },
  {
    q: "Can I check my individual result on this page?",
    a: "No. This page does not host a result portal and does not retrieve individual student results. Use the official channel named in the result notice.",
  },
  {
    q: "How do I apply for re-evaluation or rechecking?",
    a: "Apply only when an official notice announces it, and follow the window, fee and procedure given in that notice.",
  },
  {
    q: "What should I do if my admit card has an error?",
    a: "Contact the college as soon as you notice the error and before the examination begins, using the contact page linked in the support section.",
  },
  {
    q: "Where can I find subject details and syllabus?",
    a: "Subject and curriculum information is available on the curriculum page of this website.",
  },
];

const RELATED = [
  {
    title: "Academic Calendar",
    description: "Check the academic year plan alongside examination notices.",
    href: "/academics/resources/academic-calendar", // confirm this route exists
  },
  {
    title: "Curriculum",
    description: "Semester-wise subjects, credits and electives for each programme.",
    href: "/academics/resources/curriculum",
  },
  {
    title: "Laboratories",
    description: "Laboratory facilities that support practical examinations.",
    href: "/academics/resources/laboratories",
  },
  {
    title: "Workshops",
    description: "Workshop facilities used for hands-on engineering practice.",
    href: "/academics/resources/workshops",
  },
  {
    title: "Industrial Training",
    description: "Training and internship information for engineering students.",
    href: "/academics/resources/industrial-training",
  },
];

// ============================================================================
// STRUCTURED DATA (JSON-LD)
// ============================================================================
const toJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: BREADCRUMBS.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: b.name,
    item: b.href ? `${SITE_URL}${b.href}` : PAGE_URL,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================
function SectionHeader({ id, eyebrow, title, intro }) {
  return (
    <div className="ec-section-head">
      <p className="ec-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {intro ? <p className="ec-section-head__intro">{intro}</p> : null}
    </div>
  );
}

function InfoPanel({ title, children }) {
  return (
    <div className="ec-panel">
      <div className="ec-panel__head">
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ResourceCard({ title, description, href, linkLabel }) {
  return (
    <div className="ec-card">
      <h3>{title}</h3>
      <p>{description}</p>
      {href ? (
        <a className="ec-text-link" href={href}>
          {linkLabel || "Open"}
          <span className="ec-sr-only">: {title}</span>
        </a>
      ) : null}
    </div>
  );
}

function ContactCard({ label, value, href }) {
  return (
    <div className="ec-card ec-card--contact">
      <h3>{label}</h3>
      {href ? (
        <a className="ec-text-link" href={href}>
          {value}
        </a>
      ) : (
        <p className="ec-card__value">{value}</p>
      )}
    </div>
  );
}

// ============================================================================
// PAGE
// ============================================================================
export default function ExaminationCellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }}
      />

      <main className="examination-cell">
        {/* ---------------- BREADCRUMBS + HERO ---------------- */}
        <header className="ec-hero">
          <div className="ec-hero__grid" aria-hidden="true" />
          <div className="ec-container ec-hero__inner">
            <nav className="ec-breadcrumbs" aria-label="Breadcrumb">
              <ol>
                {BREADCRUMBS.map((b) => (
                  <li key={b.name}>
                    {b.href ? (
                      <a href={b.href}>{b.name}</a>
                    ) : (
                      <span aria-current="page">{b.name}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="ec-hero__content">
              <div className="ec-hero__text">
                <p className="ec-eyebrow ec-eyebrow--light">
                  RESOURCES · EXAMINATION CELL
                </p>
                <h1>Examination Cell</h1>
                <p className="ec-hero__lede">
                  The Examination Cell at Pt. L.R. College of Technology, Faridabad,
                  is the reference point for students on examination notices,
                  forms, admit cards, results and examination conduct. Find the
                  latest official notices and general student guidelines on this
                  page.
                </p>
                <div className="ec-hero__cta">
                  <a href="#notices" className="ec-btn ec-btn--primary">
                    View Notices
                  </a>
                  <a href="#support" className="ec-btn ec-btn--ghost-light">
                    Student Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ---------------- ON THIS PAGE ---------------- */}
        <div className="ec-jump">
          <div className="ec-container">
            <nav aria-label="On this page">
              <ul className="ec-jump__list">
                {SECTION_LINKS.map((l) => (
                  <li key={l.id}>
                    <a href={`#${l.id}`}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* ---------------- OVERVIEW ---------------- */}
        <section id="overview" className="ec-section" aria-labelledby="overview-h">
          <div className="ec-container ec-two-col">
            <div>
              <SectionHeader
                id="overview-h"
                eyebrow="OVERVIEW"
                title="Purpose of the Examination Cell"
              />
              <p>
                The Examination Cell is the college&apos;s reference point for
                examination-related matters. This page brings the latest
                examination notices and general guidance for students together in
                one place.
              </p>
              <p>
                Examination processes follow the regulations of the relevant
                affiliating university or board and the college&apos;s own
                assessment scheme. For any specific date, form, fee or procedure,
                the official notice is the final reference.
              </p>
            </div>

            <InfoPanel title="On this page">
              <ul className="ec-checklist">
                <li>Latest examination notices from the college notice board</li>
                <li>General guidelines on forms, admit cards and results</li>
                <li>Examination conduct guidelines</li>
                <li>Student support and frequently asked questions</li>
                <li>Links to related academic resources</li>
              </ul>
            </InfoPanel>
          </div>
        </section>

        {/* ---------------- NOTICES (live from /api/notices) ---------------- */}
        <section
          id="notices"
          className="ec-section ec-section--white"
          aria-labelledby="notices-h"
        >
          <div className="ec-container">
            <SectionHeader
              id="notices-h"
              eyebrow="NOTICES"
              title="Examination-related notices"
              intro="Latest examination notices from the college notice board. Search or filter by category."
            />
            <NoticeBoard categories={NOTICE_CATEGORIES} />
          </div>
        </section>

        {/* ---------------- STUDENT GUIDELINES ---------------- */}
        <section id="guidelines" className="ec-section" aria-labelledby="guidelines-h">
          <div className="ec-container">
            <SectionHeader
              id="guidelines-h"
              eyebrow="STUDENT GUIDELINES"
              title="General guidelines for students"
              intro="This is general guidance. Always follow the specific instructions in the official notice and the applicable university and college regulations."
            />
            <div className="ec-card-grid">
              {GUIDELINE_CARDS.map((c) => (
                <ResourceCard key={c.title} title={c.title} description={c.text} />
              ))}
            </div>
            <div className="ec-stack">
              <InfoPanel title="Examination conduct">
                <ul className="ec-checklist">
                  {CONDUCT.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </InfoPanel>
            </div>
          </div>
        </section>

        {/* ---------------- SUPPORT ---------------- */}
        <section
          id="support"
          className="ec-section ec-section--white"
          aria-labelledby="support-h"
        >
          <div className="ec-container">
            <SectionHeader
              id="support-h"
              eyebrow="STUDENT SUPPORT"
              title="Student support and contact information"
              intro={
                hasContactDetails
                  ? "Reach the Examination Cell using the details below."
                  : "For examination-related queries, please contact the college through the contact page."
              }
            />
            <div className="ec-card-grid">
              {CONTACT.office ? (
                <ContactCard label="Examination Cell office" value={CONTACT.office} />
              ) : null}
              {CONTACT.email ? (
                <ContactCard
                  label="Email"
                  value={CONTACT.email}
                  href={`mailto:${CONTACT.email}`}
                />
              ) : null}
              {CONTACT.phone ? (
                <ContactCard
                  label="Phone"
                  value={CONTACT.phone}
                  href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                />
              ) : null}
              {CONTACT.hours ? (
                <ContactCard label="Office hours" value={CONTACT.hours} />
              ) : null}
              {CONTACT.incharge ? (
                <ContactCard label="In-charge / Controller" value={CONTACT.incharge} />
              ) : null}
              <ResourceCard
                title="College contact page"
                description="Send your examination query to the college through its general contact page."
                href="/contact"
                linkLabel="Go to Contact page"
              />
            </div>
            <div className="ec-stack">
              <InfoPanel title="When you write to the college about an examination matter">
                <ul className="ec-checklist">
                  <li>Include your full name, roll number, programme and semester.</li>
                  <li>Mention the subject code or notice you are asking about.</li>
                  <li>Describe the issue clearly and attach relevant acknowledgements.</li>
                </ul>
              </InfoPanel>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section id="faq" className="ec-section" aria-labelledby="faq-h">
          <div className="ec-container">
            <SectionHeader
              id="faq-h"
              eyebrow="FREQUENTLY ASKED QUESTIONS"
              title="Examination Cell: quick answers"
            />
            <div className="ec-faq-list">
              {FAQS.map((f) => (
                <details className="ec-faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- RELATED LINKS ---------------- */}
        <section
          className="ec-section ec-section--white"
          aria-labelledby="related-h"
        >
          <div className="ec-container">
            <SectionHeader
              id="related-h"
              eyebrow="RELATED LINKS"
              title="Explore related resources"
            />
            <div className="ec-link-grid">
              {RELATED.map((l) => (
                <a className="ec-link-card" href={l.href} key={l.title}>
                  <h3>{l.title}</h3>
                  <p>{l.description}</p>
                  <span className="ec-link-card__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section className="ec-final-cta" aria-labelledby="cta-h">
          <div className="ec-container ec-final-cta__inner">
            <div>
              <p className="ec-eyebrow ec-eyebrow--light">EXAMINATION INFORMATION</p>
              <h2 id="cta-h">Need examination information?</h2>
              <p>
                For confirmed dates, forms, results and procedures, refer to the
                official notices and contact the college.
              </p>
            </div>
            <div className="ec-final-cta__actions">
              <a href="/contact" className="ec-btn ec-btn--gold">
                Contact the College
              </a>
              <a href="#notices" className="ec-btn ec-btn--outline-light">
                View Notices
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}