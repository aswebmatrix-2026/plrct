import "./diploma.css";

// ============================================================================
// SEO METADATA — Next.js 15 App Router
// ============================================================================
export const metadata = {
  title: "Diploma Engineering College Faridabad | PLRCT Polytechnic Admission 2026",
  description:
    "AICTE approved Diploma Engineering (Polytechnic) admission at PLRCT, Faridabad. Diploma programs in Computer Science, Mechanical, Civil, Electrical and ECE with workshops, industrial training, and lateral entry to B.Tech. Serving Faridabad, Ballabgarh, Palwal and Haryana.",
  alternates: {
    canonical: "https://ptlrct.com/academics/diploma",
  },
  openGraph: {
    title: "Diploma Engineering at PLRCT Faridabad | AICTE Approved Polytechnic",
    description:
      "Practical, industry-oriented Diploma Engineering programs at PLRCT, Faridabad — with lateral entry to B.Tech and strong placement support.",
    url: "https://ptlrct.com/academics/diploma",
    siteName: "PLRCT (PLRCT)",
    images: [
      {
        url: "https://ptlrct.com/og/diploma-program.jpg",
        width: 1200,
        height: 630,
        alt: "Diploma Engineering Program at PLRCT Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diploma Engineering at PLRCT Faridabad | AICTE Approved Polytechnic",
    description:
      "Practical, industry-oriented Diploma Engineering programs at PLRCT, Faridabad, with lateral entry to B.Tech and dedicated placement support.",
    images: ["https://ptlrct.com/og/diploma-program.jpg"],
  },
};

// ============================================================================
// STRUCTURED DATA (JSON-LD)
// ============================================================================
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://ptlrct.com/" },
    { "@type": "ListItem", position: 2, name: "Academics", item: "https://ptlrct.com/academics" },
    { "@type": "ListItem", position: 3, name: "Diploma Engineering", item: "https://ptlrct.com/academics/diploma" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Diploma Engineering at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diploma Engineering at PLRCT is an AICTE approved, three-year polytechnic program in Faridabad focused on practical, workshop-based engineering education across Computer Science, Mechanical, Civil, Electrical and Electronics & Communication disciplines.",
      },
    },
    {
      "@type": "Question",
      name: "What is the eligibility for Diploma Engineering admission?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Candidates must have passed Class 10 with Science and Mathematics from a recognized board, meeting the minimum percentage set by the state technical education board, and apply through the applicable Haryana polytechnic counseling process.",
      },
    },
    {
      "@type": "Question",
      name: "Is PLRCT's Diploma Engineering program AICTE approved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, PLRCT's Diploma Engineering programs are AICTE approved and affiliated with the Haryana State Board of Technical Education, meeting all regulatory requirements for polytechnic education.",
      },
    },
    {
      "@type": "Question",
      name: "What is the duration of the Diploma Engineering program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Diploma Engineering program at PLRCT runs for three years, divided into six semesters, combining core subjects, laboratory practicals and industrial training.",
      },
    },
    {
      "@type": "Question",
      name: "Which Diploma Engineering branches does PLRCT offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PLRCT offers Diploma programs in Computer Science Engineering, Electrical Engineering, Mechanical Engineering, Civil Engineering, Electronics & Communication Engineering, and Information Technology.",
      },
    },
    {
      "@type": "Question",
      name: "Can Diploma students get lateral entry into B.Tech?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Diploma holders from a relevant engineering discipline are eligible for lateral entry directly into the second year of PLRCT's B.Tech program, subject to seat availability and university norms.",
      },
    },
    {
      "@type": "Question",
      name: "What career opportunities are available after Diploma Engineering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diploma graduates can pursue junior engineer and technician roles in government and private sector organizations, or continue their education through lateral entry into B.Tech.",
      },
    },
    {
      "@type": "Question",
      name: "Does PLRCT provide placement support for Diploma students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the Training and Placement Cell at PLRCT supports Diploma students with aptitude training, technical interview preparation and recruitment drives with employers across Faridabad and Delhi NCR.",
      },
    },
    {
      "@type": "Question",
      name: "Are government job opportunities available after a Diploma?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diploma holders are eligible to apply for junior engineer and technical assistant posts in various state and central government departments, public sector undertakings and railways, subject to each recruiter's eligibility criteria.",
      },
    },
    {
      "@type": "Question",
      name: "What laboratories and workshops are available for Diploma students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diploma students at PLRCT use dedicated mechanical workshops, electrical machines labs, computer labs, civil material-testing labs and electronics labs designed for hands-on, practical skill-building.",
      },
    },
  ],
};

const eduOrgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "PLRCT",
  alternateName: "PLRCT",
  url: "https://ptlrct.com",
  sameAs: ["https://ptlrct.com"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Diploma Engineering Programs",
    itemListElement: [
      "Diploma in Computer Science Engineering",
      "Diploma in Electrical Engineering",
      "Diploma in Mechanical Engineering",
      "Diploma in Civil Engineering",
      "Diploma in Electronics & Communication Engineering",
      "Diploma in Information Technology",
    ].map((name) => ({ "@type": "Course", name })),
  },
};

// ============================================================================
// SMALL COMPONENTS
// ============================================================================
function ImgPlaceholder({ label, ratio = "16/9" }) {
  return (
    <div className="img-placeholder" style={{ aspectRatio: ratio }} role="img" aria-label={label}>
      <span className="img-placeholder__corner img-placeholder__corner--tl" />
      <span className="img-placeholder__corner img-placeholder__corner--br" />
      <span className="img-placeholder__label">{label}</span>
    </div>
  );
}

function SpecRow({ k, v }) {
  return (
    <div className="spec-row">
      <span className="spec-row__key">{k}</span>
      <span className="spec-row__value">{v}</span>
    </div>
  );
}

// ============================================================================
// PAGE
// ============================================================================
export default function DiplomaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eduOrgSchema) }}
      />

      <main className="diploma">
        {/* ---------------- HERO ---------------- */}
        <header className="diploma-hero">
          <div className="diploma-hero__grid" aria-hidden="true" />
          <div className="container diploma-hero__inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/academics">Academics</a>
              <span>/</span>
              <span aria-current="page">Diploma Engineering</span>
            </nav>

            <div className="diploma-hero__content">
              <div className="diploma-hero__text">
                <p className="eyebrow eyebrow--light">POLYTECHNIC · DIPLOMA ENGINEERING</p>
                <h1>Diploma Engineering Programs</h1>
                <p className="diploma-hero__lede">
                  Practical, industry-oriented diploma education with workshops, laboratories,
                  industrial training, and lateral entry opportunities — built for students across
                  Faridabad, Ballabgarh, Palwal and Haryana who want a hands-on, job-ready
                  engineering qualification in three years.
                </p>
                <div className="diploma-hero__cta">
                  <a href="/admissions" className="btn btn--primary">
                    Apply Now
                  </a>
                  <a href="/downloads/PLRCT-prospectus.pdf" className="btn btn--ghost">
                    Download Prospectus
                  </a>
                </div>
              </div>

              <aside className="spec-panel" aria-label="Diploma program specification">
                <p className="spec-panel__title">PROGRAM DATASHEET</p>
                <SpecRow k="Qualification" v="Diploma in Engineering (Polytechnic)" />
                <SpecRow k="Duration" v="3 Years / 6 Semesters" />
                <SpecRow k="Approval" v="AICTE Approved" />
                <SpecRow k="Entry Route" v="After Class 10 (Haryana Counseling)" />
                <SpecRow k="Progression" v="Lateral Entry to B.Tech, 2nd Year" />
                <SpecRow k="Branches" v="6 Disciplines" />
                <SpecRow k="Location" v="Faridabad, Haryana (NCR)" />
              </aside>
            </div>
          </div>
        </header>

        <div className="container">
          <ImgPlaceholder label="PLRCT Mechanical Workshop — Diploma Engineering" ratio="21/9" />
        </div>

        {/* ---------------- OVERVIEW ---------------- */}
        <section className="section" aria-labelledby="overview-h">
          <div className="container">
            <p className="eyebrow">PROGRAM OVERVIEW</p>
            <h2 id="overview-h">What is Diploma Engineering at PLRCT?</h2>
            <p>
              Diploma Engineering at PLRCT is a three-year, AICTE
              approved polytechnic program built for students who want to enter the engineering
              workforce quickly, or build a practical foundation before progressing to a full
              B.Tech degree. As one of the recognized diploma engineering colleges in Faridabad,
              PLRCT structures the program around workshop time, laboratory practicals and
              industrial exposure rather than classroom theory alone, so graduates leave with
              skills employers can use from day one.
            </p>
            <p>
              The diploma is open to students immediately after Class 10, making it a faster route
              into a technical career than the two-year wait required before a B.Tech application.
              For students and parents researching a diploma admission in Haryana, PLRCT&apos;s
              polytechnic wing offers a straightforward, counseling-based admission process, a
              campus close to Faridabad, Ballabgarh and Greater Faridabad, and strong connectivity
              to the industrial and manufacturing corridor that runs through the Delhi NCR region.
            </p>
            <p>
              Every diploma branch — Computer Science, Electrical, Mechanical, Civil, Electronics
              &amp; Communication and Information Technology — follows the AICTE approved diploma
              engineering framework, ensuring the qualification is recognized for both direct
              employment and further academic progression.
            </p>
          </div>
        </section>

        {/* ---------------- WHY CHOOSE ---------------- */}
        <section className="section section--tint" aria-labelledby="why-h">
          <div className="container">
            <p className="eyebrow">WHY CHOOSE DIPLOMA AT PLRCT</p>
            <h2 id="why-h">A polytechnic built around practical skill</h2>
            <div className="card-grid">
              {[
                {
                  t: "Workshop-First Learning",
                  d: "More lab and workshop hours than a typical classroom-only program, so students build real fabrication, wiring and coding skills early.",
                },
                {
                  t: "Six Diploma Branches",
                  d: "Computer Science, Electrical, Mechanical, Civil, Electronics & Communication, and Information Technology — one campus, six career paths.",
                },
                {
                  t: "Direct Path to B.Tech",
                  d: "Lateral entry into the second year of PLRCT's B.Tech program for diploma holders who want to continue toward a full engineering degree.",
                },
                {
                  t: "Industrial Training Built In",
                  d: "Structured factory visits and internships connected to the Faridabad-Ballabgarh industrial belt, not left to chance.",
                },
                {
                  t: "Placement Support From Year One",
                  d: "Aptitude and communication training that starts early, not just before final semester.",
                },
                {
                  t: "AICTE Approved Diploma",
                  d: "A regulator-approved diploma engineering qualification affiliated with the Haryana State Board of Technical Education.",
                },
              ].map((c) => (
                <div className="card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- DEPARTMENTS ---------------- */}
        <section className="section" aria-labelledby="departments-h">
          <div className="container">
            <p className="eyebrow">DIPLOMA DEPARTMENTS</p>
            <h2 id="departments-h">Choose your diploma discipline</h2>
            <div className="dept-grid">
              <article className="dept-card">
                <h3>Computer Science Engineering</h3>
                <p>
                  A Computer Science diploma in Faridabad covering programming fundamentals, web
                  technologies, database basics and networking, delivered through dedicated
                  computer labs and project-based coursework.
                </p>
              </article>
              <article className="dept-card">
                <h3>Electrical Engineering</h3>
                <p>
                  An electrical diploma engineering track covering circuits, machines, wiring
                  practice and power systems fundamentals, backed by hands-on electrical
                  laboratory sessions.
                </p>
              </article>
              <article className="dept-card">
                <h3>Mechanical Engineering</h3>
                <p>
                  A mechanical diploma in Faridabad built around workshop practice, machine
                  drawing, manufacturing processes and CNC exposure in a fully equipped mechanical
                  workshop.
                </p>
              </article>
              <article className="dept-card">
                <h3>Civil Engineering</h3>
                <p>
                  A civil diploma covering surveying, material testing, structural basics and
                  construction practice, suited to students across Haryana interested in the
                  construction and infrastructure sector.
                </p>
              </article>
              <article className="dept-card">
                <h3>Electronics &amp; Communication Engineering</h3>
                <p>
                  Diploma coursework in analog and digital electronics, communication systems and
                  embedded basics, supported by dedicated electronics laboratories.
                </p>
              </article>
              <article className="dept-card">
                <h3>Information Technology</h3>
                <p>
                  A diploma track focused on IT infrastructure, application development
                  fundamentals and system support skills for entry-level technical roles.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ---------------- CURRICULUM & SEMESTER STRUCTURE ---------------- */}
        <section className="section section--tint" aria-labelledby="curriculum-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">CURRICULUM STRUCTURE</p>
              <h2 id="curriculum-h">How the diploma is structured</h2>
              <p>
                The first year of every diploma branch covers common subjects — mathematics,
                applied science, engineering drawing, workshop practice and basic computing —
                giving students a shared technical foundation regardless of their eventual
                specialization. From the second year, students move into branch-specific subjects,
                with laboratory and workshop hours increasing each semester.
              </p>
            </div>
            <div>
              <p className="eyebrow">SEMESTER-WISE LEARNING</p>
              <h2>Six semesters, building toward industry readiness</h2>
              <p>
                Semesters three and four introduce core specialization subjects alongside
                practical labs, while semesters five and six add electives, project work and a
                mandatory industrial training period. The final semester culminates in a capstone
                project that reflects the student&apos;s complete diploma-level skill set, along
                with placement preparation activities running in parallel.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- LABS, WORKSHOPS & PRACTICAL LEARNING ---------------- */}
        <section className="section" aria-labelledby="labs-h">
          <div className="container">
            <p className="eyebrow">LABORATORIES, WORKSHOPS &amp; PRACTICAL LEARNING</p>
            <h2 id="labs-h">Where diploma students spend their time</h2>
            <p>
              Practical learning is the core of a diploma education, and PLRCT's polytechnic wing
              is built around it. Mechanical diploma students work in a fully equipped workshop
              with lathes, fabrication tools and CNC stations. Electrical diploma students train
              in a dedicated machines and wiring lab. Computer Science and IT diploma students use
              modern computer labs for programming and networking practice, while civil diploma
              students use material-testing and surveying labs, and electronics diploma students
              work with analog and digital electronics benches.
            </p>
            <div className="img-grid">
              <ImgPlaceholder label="Mechanical Workshop" />
              <ImgPlaceholder label="Electrical Lab" />
              <ImgPlaceholder label="Computer Lab" />
              <ImgPlaceholder label="Civil Engineering Lab" />
              <ImgPlaceholder label="Students in Practical Training" />
              <ImgPlaceholder label="Industrial Visit" />
            </div>
          </div>
        </section>

        {/* ---------------- INDUSTRIAL TRAINING ---------------- */}
        <section className="section section--tint" aria-labelledby="training-h">
          <div className="container">
            <p className="eyebrow">INDUSTRIAL TRAINING</p>
            <h2 id="training-h">Learning inside real industry, not just the lab</h2>
            <p>
              Diploma students complete structured industrial training through plant visits and
              internship placements with manufacturing and engineering employers across the
              Faridabad-Ballabgarh industrial belt and the wider Delhi NCR region. This exposure is
              built into the curriculum rather than left optional, so every diploma graduate has
              direct experience of a working industrial environment before entering the job
              market. Full details are available on the{" "}
              <a href="/academics/resources/industrial-training">industrial training page</a>.
            </p>
          </div>
        </section>

        {/* ---------------- LATERAL ENTRY ---------------- */}
        <section className="section" aria-labelledby="lateral-h">
          <div className="container">
            <p className="eyebrow">LATERAL ENTRY TO B.TECH</p>
            <h2 id="lateral-h">Continue straight into a B.Tech degree</h2>
            <p>
              Diploma holders in a relevant discipline can apply for lateral entry directly into
              the second year of PLRCT's <a href="/academics/btech">B.Tech program</a>, skipping
              the first year entirely. This is one of the most direct routes from a diploma
              engineering college in Faridabad to a full four-year engineering degree, letting
              students who started with a polytechnic qualification finish with a B.Tech in just
              three additional years, subject to seat availability and university norms.
            </p>
          </div>
        </section>

        {/* ---------------- CAREERS ---------------- */}
        <section className="section section--tint" aria-labelledby="career-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">CAREER OPPORTUNITIES</p>
              <h2 id="career-h">Where a diploma leads</h2>
              <p>
                Diploma graduates step directly into technician, junior engineer and site
                supervisor roles across manufacturing, construction, electrical maintenance,
                IT support and communication sectors. Employers across Faridabad, Ballabgarh,
                Gurugram, Noida and greater Delhi NCR regularly recruit diploma-qualified
                candidates for entry-level technical positions.
              </p>
            </div>
            <div>
              <p className="eyebrow">GOVERNMENT &amp; PRIVATE SECTOR JOBS</p>
              <h2>Both public and private pathways</h2>
              <p>
                Diploma holders are eligible to apply for junior engineer, technical assistant and
                similar posts in government departments, public sector undertakings and railway
                recruitment exams, alongside private sector roles in manufacturing plants, EPC
                contractors, IT services firms and electrical and mechanical maintenance
                companies across the region.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- HIGHER EDUCATION & PLACEMENT SUPPORT ---------------- */}
        <section className="section" aria-labelledby="higher-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">HIGHER EDUCATION OPPORTUNITIES</p>
              <h2 id="higher-h">Beyond the diploma</h2>
              <p>
                Students who want to keep studying can move into PLRCT's B.Tech program through
                lateral entry, and later consider an{" "}
                <a href="/academics/mtech">M.Tech program</a> for postgraduate specialization,
                turning a three-year diploma into the first step of a much longer engineering
                education if they choose.
              </p>
            </div>
            <div>
              <p className="eyebrow">PLACEMENT SUPPORT</p>
              <h2>Guided from classroom to career</h2>
              <p>
                PLRCT's Training and Placement Cell extends its aptitude training, communication
                workshops and mock interview sessions to diploma students as well, and coordinates
                recruitment drives with employers looking specifically for diploma-qualified
                technical talent.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- CAMPUS FACILITIES & STUDENT PROJECTS ---------------- */}
        <section className="section section--tint" aria-labelledby="facilities-h">
          <div className="container">
            <p className="eyebrow">CAMPUS FACILITIES &amp; STUDENT PROJECTS</p>
            <h2 id="facilities-h">Supporting diploma life on campus</h2>
            <p>
              Diploma students share the full PLRCT campus — library, smart classrooms, sports and
              activity areas — and take part in the same project culture as B.Tech students,
              building small applied projects from the second year onward under faculty guidance,
              many of which are showcased at the college's annual technical exhibition.
            </p>
            <div className="img-grid">
              <ImgPlaceholder label="Campus Building" />
              <ImgPlaceholder label="Central Library" />
              <ImgPlaceholder label="Smart Classrooms" />
              <ImgPlaceholder label="Diploma Student Project Showcase" />
            </div>
          </div>
        </section>

        {/* ---------------- INTERNAL LINKS ---------------- */}
        <section className="section" aria-labelledby="explore-h">
          <div className="container">
            <p className="eyebrow">EXPLORE FURTHER</p>
            <h2 id="explore-h">Related programs &amp; resources</h2>
            <div className="link-grid">
              <a href="/academics/btech">B.Tech Programs</a>
              <a href="/academics/mtech">M.Tech Programs</a>
              <a href="/academics/resources/curriculum">Curriculum</a>
              <a href="/academics/resources/laboratories">Laboratories</a>
              <a href="/academics/resources/industrial-training">Industrial Training</a>
              <a href="/academics/departments/me">Mechanical Department</a>
              <a href="/academics/departments/ce">Civil Department</a>
              <a href="/admissions">Admissions</a>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ (10 QUESTIONS) ---------------- */}
        <section className="section section--tint" aria-labelledby="faq-h">
          <div className="container">
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-h">Diploma Engineering at PLRCT — quick answers</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>What is Diploma Engineering at PLRCT?</summary>
                <p>
                  A three-year, AICTE approved polytechnic program in Faridabad offered across six
                  engineering disciplines, built around practical, workshop-based learning.
                </p>
              </details>
              <details className="faq-item">
                <summary>What is the eligibility for Diploma admission?</summary>
                <p>
                  Pass Class 10 with Science and Mathematics at the required percentage, and apply
                  through the Haryana polytechnic counseling process.
                </p>
              </details>
              <details className="faq-item">
                <summary>Is the Diploma program AICTE approved?</summary>
                <p>
                  Yes. PLRCT's Diploma Engineering programs are AICTE approved and affiliated with
                  the Haryana State Board of Technical Education.
                </p>
              </details>
              <details className="faq-item">
                <summary>How long does the Diploma program take?</summary>
                <p>Three years, divided into six semesters, including industrial training.</p>
              </details>
              <details className="faq-item">
                <summary>Which Diploma branches are available?</summary>
                <p>
                  Computer Science, Electrical, Mechanical, Civil, Electronics &amp; Communication,
                  and Information Technology.
                </p>
              </details>
              <details className="faq-item">
                <summary>Can I move from Diploma to B.Tech?</summary>
                <p>
                  Yes, through lateral entry directly into the second year of PLRCT's B.Tech
                  program, subject to seat availability and university norms.
                </p>
              </details>
              <details className="faq-item">
                <summary>What jobs can I get after a Diploma?</summary>
                <p>
                  Technician, junior engineer and site supervisor roles in manufacturing,
                  construction, electrical maintenance, IT support and communication sectors.
                </p>
              </details>
              <details className="faq-item">
                <summary>Are government jobs available after a Diploma?</summary>
                <p>
                  Yes, diploma holders can apply for junior engineer and technical assistant posts
                  in government departments, PSUs and railway recruitment exams.
                </p>
              </details>
              <details className="faq-item">
                <summary>Does PLRCT provide placement support for Diploma students?</summary>
                <p>
                  Yes, the Training and Placement Cell supports diploma students with aptitude
                  training, interview preparation and dedicated recruitment drives.
                </p>
              </details>
              <details className="faq-item">
                <summary>What laboratories do Diploma students use?</summary>
                <p>
                  Mechanical workshops, electrical machines labs, computer labs, civil
                  material-testing labs and electronics laboratories, depending on their branch.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section className="final-cta">
          <div className="container final-cta__inner">
            <div>
              <p className="eyebrow eyebrow--light">ADMISSIONS OPEN</p>
              <h2>Start your Diploma Engineering journey at PLRCT</h2>
              <p>
                Seats for the upcoming academic year are limited across all six diploma
                disciplines. Apply now or download the prospectus to learn more.
              </p>
            </div>
            <div className="final-cta__actions">
              <a href="/admissions" className="btn btn--gold">
                Apply Now
              </a>
              <a href="/downloads/PLRCT-prospectus.pdf" className="btn btn--outline-light">
                Download Prospectus
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}