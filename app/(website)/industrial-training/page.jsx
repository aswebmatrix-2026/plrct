import Image from "next/image";
import Link from "next/link";
import "./industrial-training.css";

// ============================================================================
// CONFIGURATION — edit this block only. Anything left as null renders the
// fallback text "Contact the college for current details".
// ============================================================================
const SITE_URL = "https://ptlrct.com";
const PAGE_URL = `${SITE_URL}/academics/resources/industrial-training`;
const FALLBACK = "Contact the college for current details";

const TRAINING_CONFIG = {
  // Dates and schedule (plain strings, e.g. "To be announced by the department")
  trainingWindow: null,
  registrationDeadline: null,
  reportSubmissionDeadline: null,

  // Submission requirements: string or array of strings
  reportRequirements: null,

  // Faculty contact
  facultyCoordinator: {
    name: null,
    email: null, // e.g. "training@ptlrct.com"
    phone: null, // e.g. "+91-XXXXXXXXXX"
  },

  // Official documents and links. Use internal paths ("/docs/policy.pdf") or full URLs.
  policyDocument: { label: "Official industrial training policy", href: null },
  reportFormat: { label: "Report format guidelines", href: null },
  applicationLink: { label: "Training application / approval form", href: null },

  // Main contact destination for CTAs
  contactHref: "/contact",
};

// Image paths from /public (e.g. "/images/labs/workshop.jpg"). null = labelled placeholder.
const HERO_BANNER = {
  src: null,
  alt: "Engineering students observing equipment during an industrial training visit",
  label: "Wide banner: students in an industrial or workshop setting",
};

const GALLERY = [
  { src: null, alt: "Students practising on a workshop machine", label: "Workshop practice", note: "Replace with a real workshop photo" },
  { src: null, alt: "Students working in a computer laboratory", label: "Laboratory work", note: "Replace with a real lab photo" },
  { src: null, alt: "Students on a guided industrial visit", label: "Industrial visit", note: "Replace with a real visit photo" },
  { src: null, alt: "Students collaborating on a project", label: "Team project work", note: "Replace with a real project photo" },
  { src: null, alt: "Faculty member guiding students", label: "Faculty guidance", note: "Replace with a real mentoring photo" },
  { src: null, alt: "Students presenting their work", label: "Presentation and viva preparation", note: "Replace with a real presentation photo" },
];

// ============================================================================
// SEO METADATA — Next.js App Router
// ============================================================================
export const metadata = {
  title: "Industrial Training & Internship Guidance | Pt. L.R. College of Technology Faridabad",
  description:
    "Guidance on industrial training and internships at Pt. L.R. College of Technology, Faridabad: objectives, process, skills, project work, report preparation, faculty guidance and interview readiness.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Industrial Training & Internship Opportunities | Pt. L.R. College of Technology",
    description:
      "Understand the purpose, process and preparation for industrial training and internships at Pt. L.R. College of Technology, Faridabad.",
    url: PAGE_URL,
    siteName: "Pt. L.R. College of Technology",
    images: [
      {
        url: `${SITE_URL}/og/industrial-training.jpg`,
        width: 1200,
        height: 630,
        alt: "Industrial Training at Pt. L.R. College of Technology, Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Training & Internship Opportunities | Pt. L.R. College of Technology",
    description:
      "Guidance on training objectives, process, skills, reports and interview readiness at Pt. L.R. College of Technology, Faridabad.",
    images: [`${SITE_URL}/og/industrial-training.jpg`],
  },
};

// ============================================================================
// PAGE CONTENT (general guidance; not an official college commitment)
// ============================================================================
const OVERVIEW_PURPOSE = [
  "Connect classroom theory with real engineering practice",
  "Build familiarity with workplace processes, safety and standards",
  "Develop professional conduct, communication and teamwork",
  "Help students make informed choices about their career direction",
  "Produce documented, assessable evidence of learning",
];

const WHY_CARDS = [
  { t: "Theory in Context", d: "Seeing how concepts from lectures are applied in real plants, offices and project sites makes them easier to understand and remember." },
  { t: "Awareness of Standards", d: "Industry settings introduce safety practices, quality procedures and documentation habits that classrooms can only describe." },
  { t: "Tools and Technology", d: "Exposure to professional tools, equipment and software helps students see what current practice looks like." },
  { t: "Professional Behaviour", d: "Punctuality, accountability, reporting lines and respectful collaboration are learned best in a working environment." },
  { t: "Clearer Career Direction", d: "Observing different roles helps students judge which areas of their discipline they want to pursue further." },
  { t: "Stronger Profiles", d: "Documented, well-reflected experience gives students concrete material for resumes, interviews and project discussions." },
];

const OBJECTIVES = [
  "Apply engineering knowledge to practical, real-world situations",
  "Observe organisational structure, workflows and work culture",
  "Learn to follow safety, quality and ethical practices",
  "Practise technical communication, written and spoken",
  "Reflect critically on experiences and record them clearly",
];

const OUTCOMES = [
  "Describe how a process, product or system works in an industrial setting",
  "Relate coursework topics to practical tasks observed or performed",
  "Prepare a structured, accurate training report",
  "Demonstrate professional conduct and teamwork",
  "Present learning and experience confidently to faculty and peers",
];

const PROCESS_STEPS = [
  { t: "Understand the requirements", d: "Read the curriculum, department notices and the official policy to learn what applies to your programme and semester." },
  { t: "Prepare your profile", d: "Update your resume, collect academic details and prepare a short statement of your interests and goals." },
  { t: "Identify suitable opportunities", d: "Explore organisations relevant to your branch and discuss options with your faculty mentor or coordinator." },
  { t: "Complete approvals and formalities", d: "Follow the college procedure for permissions, letters and records. Confirm the exact steps with the department." },
  { t: "Undertake the training", d: "Attend regularly, follow workplace rules, take daily notes and seek feedback from your supervisor." },
  { t: "Document, report and present", d: "Compile your report, collect required certificates or letters, and submit as per the notified requirements." },
];

const READINESS_CHECKLIST = [
  "Updated resume with academic details, projects and skills",
  "Clear understanding of your branch fundamentals",
  "A professional email address and appropriate online presence",
  "Awareness of workplace safety and confidentiality expectations",
  "Appropriate attire and punctual attendance habits",
  "A notebook or digital log for daily observations",
];

const PROFESSIONAL_SKILLS = [
  "Respectful, clear communication with supervisors and colleagues",
  "Taking initiative while following instructions carefully",
  "Asking thoughtful questions and accepting feedback gracefully",
  "Protecting confidential and proprietary information",
  "Managing time and meeting commitments reliably",
  "Maintaining ethical standards and academic integrity",
];

const TECH_SKILLS = [
  { t: "Engineering Fundamentals", d: "Strengthening core concepts from your branch so they can be applied during tasks." },
  { t: "Tools and Software", d: "Becoming familiar with branch-relevant instruments, design tools and programming or analysis software." },
  { t: "Measurement and Testing", d: "Understanding how data is collected, verified and interpreted in practice." },
  { t: "Technical Documentation", d: "Learning to record procedures, observations and results accurately." },
];

const NONTECH_SKILLS = [
  { t: "Communication", d: "Explaining technical ideas clearly in reports, emails and conversations." },
  { t: "Teamwork", d: "Working with people from different roles and backgrounds towards shared goals." },
  { t: "Time Management", d: "Planning tasks, tracking progress and meeting deadlines." },
  { t: "Problem Solving and Adaptability", d: "Approaching unfamiliar problems calmly and learning quickly on the job." },
];

const PROJECT_ITEMS = [
  "Small, supervised tasks assigned by the host organisation or department",
  "Observation-based assignments, such as process mapping or equipment study",
  "Mini-projects linked to your branch, where permitted by the organisation",
  "Data collection, analysis and short written findings",
  "Presentations or viva sessions summarising what you learned",
];

const REPORT_SECTIONS = [
  "Title page and certificate or acknowledgement",
  "Introduction and profile of the organisation",
  "Training objectives and schedule followed",
  "Description of work, processes or projects observed or performed",
  "Skills gained and links to coursework",
  "Challenges faced and lessons learned",
  "Conclusion and references, with appendices if needed",
];

const FACULTY_ROLES = [
  "Explain the training requirements and evaluation approach",
  "Guide students on suitable areas and report structure",
  "Review drafts and give constructive feedback",
  "Assess documentation and presentations as per department norms",
];

const STUDENT_ROLES = [
  "Follow college and host organisation rules at all times",
  "Maintain honest, regular records of work done",
  "Keep faculty informed of progress and any difficulties",
  "Submit documents within notified requirements",
  "Represent the college professionally",
];

const SEARCH_STEPS = [
  { t: "Start with your branch", d: "List the sectors and job roles related to your discipline, then research organisations working in those areas." },
  { t: "Use trustworthy sources", d: "Check official company websites, professional networks, department notices and faculty recommendations." },
  { t: "Verify before you commit", d: "Confirm the organisation exists, review its contact details and ask what the training will involve." },
  { t: "Be cautious about payments", d: "Be careful with any offer that asks for fees or personal documents upfront. Discuss it with your faculty mentor." },
  { t: "Write a focused application", d: "Send a short, specific email with your resume and a clear statement of what you hope to learn." },
  { t: "Seek college approval", d: "Confirm with the department how external training is recognised before you begin." },
];

const CAREER_ITEMS = [
  { t: "Resume and Profile", d: "Keep it concise, honest and updated with projects, skills and training experience." },
  { t: "Technical Revision", d: "Revisit core subjects of your branch and be ready to explain your projects in depth." },
  { t: "Aptitude and Reasoning", d: "Practise quantitative, logical and verbal reasoning for screening rounds." },
  { t: "Mock Interviews", d: "Rehearse with peers or faculty, then reflect on feedback and improve." },
  { t: "Communication and Etiquette", d: "Practise clear speaking, active listening and professional email writing." },
  { t: "Reflecting on Experience", d: "Prepare to describe what you did, what you learned and what you would do differently." },
];

const FAQS = [
  {
    q: "What is industrial training?",
    a: "Industrial training is a period of practical learning in an industrial, technical or professional setting. It helps students connect classroom concepts with real workplace practice.",
  },
  {
    q: "Is industrial training compulsory for my programme?",
    a: `Requirements depend on your programme curriculum and university or regulatory guidelines. ${FALLBACK}, or check the curriculum page.`,
  },
  {
    q: "Does the college guarantee an internship?",
    a: "This page offers general guidance only and does not promise an internship or placement. Please speak with the department about the support available.",
  },
  {
    q: "When can I do industrial training and for how long?",
    a: `Timing and duration are set by the department and curriculum. ${FALLBACK}.`,
  },
  {
    q: "Will I receive a stipend?",
    a: "Stipends depend entirely on the host organisation and are not assured. This page does not state any amount.",
  },
  {
    q: "What should my training report include?",
    a: "A typical report includes an introduction to the organisation, objectives, a description of work done, skills gained, challenges, a conclusion and references. Follow the format notified by your department.",
  },
  {
    q: "How do I find a suitable organisation?",
    a: "Start from your branch interests, use trustworthy sources, verify the organisation, and consult your faculty mentor before applying.",
  },
  {
    q: "Who should I contact for current details?",
    a: `${FALLBACK}. Dates, forms and faculty contacts are updated by the college.`,
  },
];

const RELATED_LINKS = [
  { label: "Workshops", href: "/academics/resources/workshops" },
  { label: "Laboratories", href: "/academics/resources/laboratories" },
  { label: "Curriculum", href: "/academics/resources/curriculum" },
  { label: "Examination Cell", href: "/academics/resources/examination-cell" },
  { label: "Academic Calendar", href: "/academics/resources/academic-calendar" },
];

// ============================================================================
// STRUCTURED DATA (JSON-LD)
// ============================================================================
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Academics", item: `${SITE_URL}/academics` },
    { "@type": "ListItem", position: 3, name: "Resources", item: `${SITE_URL}/academics/resources` },
    { "@type": "ListItem", position: 4, name: "Industrial Training", item: PAGE_URL },
  ],
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

const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

// ============================================================================
// HELPERS & SMALL COMPONENTS
// ============================================================================
function SmartLink({ href, className, children, ...rest }) {
  if (!href) return <span className={className}>{children}</span>;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function MediaFrame({ src, alt, label, ratio = "16 / 9", sizes = "(max-width: 768px) 100vw, 33vw", priority = false }) {
  return (
    <div className="it-media" style={{ aspectRatio: ratio }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="it-media__img" />
      ) : (
        <div className="it-media__placeholder" role="img" aria-label={`Image placeholder: ${label}`}>
          <span className="it-media__corner it-media__corner--tl" aria-hidden="true" />
          <span className="it-media__corner it-media__corner--br" aria-hidden="true" />
          <span className="it-media__label">{label}</span>
        </div>
      )}
    </div>
  );
}

function SpecRow({ k, children }) {
  return (
    <div className="it-spec-row">
      <span className="it-spec-row__key">{k}</span>
      <span className="it-spec-row__value">{children}</span>
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="it-checklist">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

const orFallback = (v) => v || FALLBACK;

// ============================================================================
// PAGE
// ============================================================================
export default function IndustrialTrainingPage() {
  const c = TRAINING_CONFIG;
  const coord = c.facultyCoordinator;
  const reqs = Array.isArray(c.reportRequirements)
    ? c.reportRequirements
    : c.reportRequirements
    ? [c.reportRequirements]
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <main className="industrial-training">
        {/* ---------------- 1-2. BREADCRUMBS + HERO ---------------- */}
        <header className="it-hero">
          <div className="it-hero__grid" aria-hidden="true" />
          <div className="it-container it-hero__inner">
            <nav className="it-breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/academics">Academics</Link></li>
                <li><Link href="/academics/resources">Resources</Link></li>
                <li aria-current="page">Industrial Training</li>
              </ol>
            </nav>

            <div className="it-hero__content">
              <div className="it-hero__text">
                <p className="it-eyebrow it-eyebrow--light">ACADEMIC RESOURCES · PRACTICAL LEARNING</p>
                <h1>Industrial Training &amp; Internship Opportunities</h1>
                <p className="it-hero__lede">
                  Practical industry exposure is a meaningful part of an engineering education. This
                  page offers general guidance on the purpose of industrial training, how to prepare,
                  what to document and how to grow your professional skills at Pt. L.R. College of
                  Technology, Faridabad.
                </p>
                <div className="it-hero__cta">
                  <SmartLink href={c.contactHref} className="it-btn it-btn--primary">
                    Contact for Current Details
                  </SmartLink>
                  <Link href="/academics/resources/curriculum" className="it-btn it-btn--outline-light">
                    View Curriculum
                  </Link>
                </div>
              </div>

              <aside className="it-spec-panel" aria-label="Industrial training key details">
                <p className="it-spec-panel__title">TRAINING DATASHEET</p>
                <SpecRow k="Applies To">As per programme curriculum</SpecRow>
                <SpecRow k="Training Window">{orFallback(c.trainingWindow)}</SpecRow>
                <SpecRow k="Registration">{orFallback(c.registrationDeadline)}</SpecRow>
                <SpecRow k="Report Submission">{orFallback(c.reportSubmissionDeadline)}</SpecRow>
                <SpecRow k="Faculty Coordinator">{orFallback(coord.name)}</SpecRow>
                <SpecRow k="Official Policy">
                  {c.policyDocument.href ? (
                    <SmartLink href={c.policyDocument.href} className="it-spec-link">
                      {c.policyDocument.label}
                    </SmartLink>
                  ) : (
                    FALLBACK
                  )}
                </SpecRow>
                <SpecRow k="Location">Faridabad, Haryana</SpecRow>
              </aside>
            </div>
          </div>
        </header>

        <div className="it-container">
          <MediaFrame {...HERO_BANNER} ratio="21 / 9" sizes="(max-width: 1200px) 100vw, 1200px" priority />
        </div>

        {/* ---------------- 3. OVERVIEW ---------------- */}
        <section className="it-section" aria-labelledby="overview-h">
          <div className="it-container it-two-col">
            <div>
              <p className="it-eyebrow">OVERVIEW</p>
              <h2 id="overview-h">What is industrial training?</h2>
              <p>
                Industrial training is a structured period of practical learning outside the
                classroom, usually in an industrial, technical or professional setting. Its academic
                purpose is to bridge theory and practice, so that concepts studied in lectures and
                laboratories are seen working in real systems, processes and teams.
              </p>
              <p>
                Depending on the programme, such learning may take the form of industrial training,
                an internship, a project-based placement or industrial visits. Requirements, duration
                and evaluation are determined by the curriculum and the applicable university and
                regulatory guidelines. {FALLBACK}.
              </p>
              <div className="it-notice" role="note">
                <strong>Please note:</strong> this page provides general guidance. It is not an
                official college policy and does not promise internships, placements or specific
                organisations.
              </div>
            </div>
            <div className="it-card it-card--panel">
              <h3>Academic purpose at a glance</h3>
              <CheckList items={OVERVIEW_PURPOSE} />
            </div>
          </div>
        </section>

        {/* ---------------- 4. WHY IT MATTERS (six feature cards) ---------------- */}
        <section className="it-section it-section--tint" aria-labelledby="why-h">
          <div className="it-container">
            <p className="it-eyebrow">WHY IT MATTERS</p>
            <h2 id="why-h">Why practical industry exposure matters</h2>
            <p>
              Engineering is a practising discipline. Exposure to real working environments
              complements what students learn from books and laboratories in several ways.
            </p>
            <div className="it-card-grid">
              {WHY_CARDS.map((card, i) => (
                <article className="it-card" key={card.t}>
                  <span className="it-card__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{card.t}</h3>
                  <p>{card.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 5. OBJECTIVES & OUTCOMES ---------------- */}
        <section className="it-section" aria-labelledby="objectives-h">
          <div className="it-container">
            <p className="it-eyebrow">OBJECTIVES &amp; OUTCOMES</p>
            <h2 id="objectives-h">Training objectives and student learning outcomes</h2>
            <div className="it-two-col">
              <div className="it-card">
                <h3>Training objectives</h3>
                <CheckList items={OBJECTIVES} />
              </div>
              <div className="it-card">
                <h3>Intended learning outcomes</h3>
                <CheckList items={OUTCOMES} />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 6. PROCESS TIMELINE ---------------- */}
        <section className="it-section it-section--tint" aria-labelledby="process-h">
          <div className="it-container">
            <p className="it-eyebrow">PROCESS</p>
            <h2 id="process-h">Training process and preparation steps</h2>
            <p>
              The sequence below is a general outline. Exact steps, approvals and timing are set by
              your department.
            </p>
            <ol className="it-timeline">
              {PROCESS_STEPS.map((s, i) => (
                <li className="it-timeline__item" key={s.t}>
                  <span className="it-timeline__marker" aria-hidden="true">{i + 1}</span>
                  <div className="it-timeline__body">
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- 7. READINESS & PROFESSIONAL SKILLS ---------------- */}
        <section className="it-section" aria-labelledby="readiness-h">
          <div className="it-container">
            <p className="it-eyebrow">READINESS</p>
            <h2 id="readiness-h">Internship readiness and professional skills</h2>
            <div className="it-two-col">
              <div className="it-card">
                <h3>Readiness checklist</h3>
                <CheckList items={READINESS_CHECKLIST} />
              </div>
              <div className="it-card">
                <h3>Professional conduct and skills</h3>
                <CheckList items={PROFESSIONAL_SKILLS} />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 8. SKILL DEVELOPMENT ---------------- */}
        <section className="it-section it-section--tint" aria-labelledby="skills-h">
          <div className="it-container">
            <p className="it-eyebrow">SKILL DEVELOPMENT</p>
            <h2 id="skills-h">Technical and non-technical skill development</h2>

            <h3 className="it-group-title">Technical skills</h3>
            <div className="it-skill-grid">
              {TECH_SKILLS.map((s) => (
                <article className="it-skill-card" key={s.t}>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>

            <h3 className="it-group-title">Non-technical skills</h3>
            <div className="it-skill-grid">
              {NONTECH_SKILLS.map((s) => (
                <article className="it-skill-card it-skill-card--alt" key={s.t}>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 9. PROJECT WORK + GALLERY ---------------- */}
        <section className="it-section" aria-labelledby="projects-h">
          <div className="it-container">
            <div className="it-two-col">
              <div>
                <p className="it-eyebrow">PROJECT WORK</p>
                <h2 id="projects-h">Project work and practical assignments</h2>
                <p>
                  Practical assignments turn observation into understanding. Depending on the
                  host organisation and department guidelines, students may take part in activities
                  such as the following.
                </p>
                <CheckList items={PROJECT_ITEMS} />
              </div>
              <div className="it-card it-card--panel">
                <h3>Tips for meaningful assignments</h3>
                <p>
                  Agree on a clear scope with your supervisor, keep dated notes of what you do, and
                  ask how your work connects to the larger objective. Respect confidentiality:
                  never share proprietary data without permission.
                </p>
                <p>
                  Discuss any project-style work with your faculty mentor early, so it aligns with
                  your department&apos;s evaluation requirements.
                </p>
              </div>
            </div>

            <h3 className="it-group-title">Learning environments</h3>
            <div className="it-gallery">
              {GALLERY.map((g) => (
                <figure className="it-gallery__item" key={g.label}>
                  <MediaFrame src={g.src} alt={g.alt} label={`${g.label} — ${g.note}`} ratio="4 / 3" />
                  <figcaption>{g.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 10. DOCUMENTATION & REPORT ---------------- */}
        <section className="it-section it-section--tint" aria-labelledby="report-h">
          <div className="it-container it-two-col">
            <div>
              <p className="it-eyebrow">DOCUMENTATION</p>
              <h2 id="report-h">Training documentation and report preparation</h2>
              <p>
                A clear report shows what you did and what you learned. The outline below is typical;
                always follow the format and submission rules notified by your department.
              </p>
              <ol className="it-numbered">
                {REPORT_SECTIONS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ol>
            </div>
            <div className="it-card it-card--panel">
              <h3>Submission details</h3>
              <dl className="it-dl">
                <div>
                  <dt>Report submission date</dt>
                  <dd>{orFallback(c.reportSubmissionDeadline)}</dd>
                </div>
                <div>
                  <dt>Submission requirements</dt>
                  <dd>
                    {reqs ? (
                      <ul className="it-plain-list">
                        {reqs.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    ) : (
                      FALLBACK
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Report format guidelines</dt>
                  <dd>
                    {c.reportFormat.href ? (
                      <SmartLink href={c.reportFormat.href} className="it-inline-link">
                        {c.reportFormat.label}
                      </SmartLink>
                    ) : (
                      FALLBACK
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------- 11. FACULTY GUIDANCE & RESPONSIBILITIES ---------------- */}
        <section className="it-section" aria-labelledby="faculty-h">
          <div className="it-container">
            <p className="it-eyebrow">GUIDANCE &amp; RESPONSIBILITIES</p>
            <h2 id="faculty-h">Faculty guidance and student responsibilities</h2>
            <div className="it-two-col">
              <div className="it-card">
                <h3>How faculty can support you</h3>
                <CheckList items={FACULTY_ROLES} />
              </div>
              <div className="it-card">
                <h3>What is expected of students</h3>
                <CheckList items={STUDENT_ROLES} />
              </div>
            </div>

            <div className="it-contact">
              <h3>Faculty coordinator contact</h3>
              <dl className="it-contact__list">
                <div>
                  <dt>Name</dt>
                  <dd>{orFallback(coord.name)}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    {coord.email ? (
                      <a href={`mailto:${coord.email}`} className="it-inline-link">{coord.email}</a>
                    ) : (
                      FALLBACK
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    {coord.phone ? (
                      <a href={`tel:${coord.phone.replace(/\s+/g, "")}`} className="it-inline-link">{coord.phone}</a>
                    ) : (
                      FALLBACK
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------- 12. FINDING OPPORTUNITIES ---------------- */}
        <section className="it-section it-section--tint" aria-labelledby="opportunities-h">
          <div className="it-container">
            <p className="it-eyebrow">FINDING OPPORTUNITIES</p>
            <h2 id="opportunities-h">Identifying relevant internship opportunities</h2>
            <p>
              The guidance below is general. The college does not guarantee any internship or
              specific organisation through this page.
            </p>
            <div className="it-card-grid it-card-grid--steps">
              {SEARCH_STEPS.map((s, i) => (
                <article className="it-card" key={s.t}>
                  <span className="it-card__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>
            <div className="it-apply">
              {c.applicationLink.href ? (
                <SmartLink href={c.applicationLink.href} className="it-btn it-btn--primary">
                  {c.applicationLink.label}
                </SmartLink>
              ) : (
                <p className="it-apply__note">Application or approval form: {FALLBACK}.</p>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- 13. CAREER READINESS ---------------- */}
        <section className="it-section" aria-labelledby="career-h">
          <div className="it-container">
            <p className="it-eyebrow">CAREER READINESS</p>
            <h2 id="career-h">Career readiness and interview preparation</h2>
            <p>
              Training experience becomes more valuable when you can talk about it well. These
              areas help students prepare for internship screening and future interviews.
            </p>
            <div className="it-card-grid">
              {CAREER_ITEMS.map((i) => (
                <article className="it-card" key={i.t}>
                  <h3>{i.t}</h3>
                  <p>{i.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 14. FAQ ---------------- */}
        <section className="it-section it-section--tint" aria-labelledby="faq-h">
          <div className="it-container">
            <p className="it-eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-h">Industrial training: quick answers</h2>
            <div className="it-faq-list">
              {FAQS.map((f) => (
                <details className="it-faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 15. RELATED LINKS ---------------- */}
        <section className="it-section" aria-labelledby="related-h">
          <div className="it-container">
            <p className="it-eyebrow">EXPLORE FURTHER</p>
            <h2 id="related-h">Related academic resources</h2>
            <nav aria-label="Related academic resources">
              <ul className="it-link-grid">
                {RELATED_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* ---------------- 16. FINAL CTA ---------------- */}
        <section className="it-final-cta" aria-labelledby="cta-h">
          <div className="it-container it-final-cta__inner">
            <div>
              <p className="it-eyebrow it-eyebrow--light">NEXT STEP</p>
              <h2 id="cta-h">Planning your industrial training?</h2>
              <p>
                For current dates, forms, faculty contacts and official requirements, get in touch
                with the college. We recommend confirming details with your department before you
                make any commitments.
              </p>
            </div>
            <div className="it-final-cta__actions">
              <SmartLink href={c.contactHref} className="it-btn it-btn--gold">
                Contact the College
              </SmartLink>
              <Link href="/academics/resources/academic-calendar" className="it-btn it-btn--outline-light">
                View Academic Calendar
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}