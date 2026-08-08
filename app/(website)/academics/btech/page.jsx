import "./btech.css";

// ============================================================================
// SEO METADATA — Next.js 15 App Router
// ============================================================================
export const metadata = {
  title: "B.Tech at PLRCT Faridabad | AICTE Approved Engineering Degree 2026",
  description:
    "B.Tech admissions open at PLRCT (PLRCT), Faridabad. AICTE approved 4-year engineering degree in CSE, ECE, ME, CE, EE, AI & ML, IT and Data Science. Modern labs, industry training, strong placements. Serving Faridabad, Ballabgarh, Palwal, Delhi NCR, Gurugram and Noida.",
  alternates: {
    canonical: "https://ptlrct.com/academics/btech",
  },
  openGraph: {
    title: "B.Tech at PLRCT Faridabad | AICTE Approved Engineering Degree",
    description:
      "4-year AICTE approved B.Tech program at PLRCT, Faridabad. Eight specializations, modern laboratories, and dedicated placement support.",
    url: "https://ptlrct.com/academics/btech",
    siteName: "PLRCT (PLRCT)",
    images: [
      {
        url: "https://ptlrct.com/og/btech-program.jpg",
        width: 1200,
        height: 630,
        alt: "B.Tech Program at PLRCT Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B.Tech at PLRCT Faridabad | AICTE Approved Engineering Degree",
    description:
      "4-year AICTE approved B.Tech program at PLRCT, Faridabad. Eight specializations, modern laboratories, dedicated placement cell.",
    images: ["https://ptlrct.com/og/btech-program.jpg"],
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
    { "@type": "ListItem", position: 3, name: "B.Tech", item: "https://ptlrct.com/academics/btech" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is B.Tech at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B.Tech at PLRCT is a four-year, AICTE approved undergraduate engineering degree offered by PLRCT, Faridabad, across eight specializations including Computer Science, Electronics, Mechanical, Civil, Electrical, AI & ML, Data Science and Information Technology.",
      },
    },
    {
      "@type": "Question",
      name: "What is the eligibility for B.Tech admission at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Candidates must have passed 10+2 with Physics, Chemistry and Mathematics from a recognized board, meeting the minimum percentage set by the affiliating university, and qualify through JEE Main or the applicable state counseling process.",
      },
    },
    {
      "@type": "Question",
      name: "Is PLRCT AICTE approved for B.Tech?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, PLRCT is an AICTE approved institution affiliated with the relevant state technical university, and its B.Tech programs meet all regulatory requirements for engineering education in Haryana.",
      },
    },
    {
      "@type": "Question",
      name: "What is the duration of the B.Tech program at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The B.Tech program at PLRCT runs for four years, divided into eight semesters, with an option for direct second-year entry for diploma holders through lateral entry.",
      },
    },
    {
      "@type": "Question",
      name: "Which B.Tech specializations does PLRCT offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PLRCT offers B.Tech specializations in Computer Science Engineering, Electronics and Communication Engineering, Mechanical Engineering, Civil Engineering, Electrical Engineering, Artificial Intelligence and Machine Learning, Data Science, and Information Technology.",
      },
    },
    {
      "@type": "Question",
      name: "How is placement support provided to B.Tech students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PLRCT's Training and Placement Cell organizes pre-placement training, aptitude workshops, mock interviews, and on-campus recruitment drives with companies across Delhi NCR, connecting students in Faridabad, Ballabgarh and nearby regions with regional and national employers.",
      },
    },
    {
      "@type": "Question",
      name: "Does PLRCT provide industrial training for B.Tech students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, B.Tech students at PLRCT complete mandatory industrial training and internships during their program, supported by tie-ups with manufacturing units and IT companies across the Faridabad-Ballabgarh industrial belt and greater Delhi NCR.",
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
    name: "B.Tech Specializations",
    itemListElement: [
      "Computer Science Engineering",
      "Electronics and Communication Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Artificial Intelligence & Machine Learning",
      "Data Science",
      "Information Technology",
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
export default function BTechPage() {
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

      <main className="btech">
        {/* ---------------- HERO ---------------- */}
        <header className="btech-hero">
          <div className="btech-hero__grid" aria-hidden="true" />
          <div className="container btech-hero__inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/academics">Academics</a>
              <span>/</span>
              <span aria-current="page">B.Tech</span>
            </nav>

            <div className="btech-hero__content">
              <div className="btech-hero__text">
                <p className="eyebrow">PROGRAM · UNDERGRADUATE ENGINEERING</p>
                <h1>B.Tech at PLRCT, Faridabad</h1>
                <p className="btech-hero__lede">
                  A four-year, AICTE approved Bachelor of Technology program built for students
                  across Faridabad, Ballabgarh, Palwal and Delhi NCR who want a rigorous
                  engineering foundation, hands-on laboratory exposure, and a direct bridge into
                  industry. Eight specializations, one campus, one placement-focused mission.
                </p>
                <div className="btech-hero__cta">
                  <a href="/admissions" className="btn btn--primary">
                    Apply for B.Tech
                  </a>
                  <a href="/academics/resources/curriculum" className="btn btn--ghost">
                    View Curriculum
                  </a>
                </div>
              </div>

              <aside className="spec-panel" aria-label="B.Tech program specification">
                <p className="spec-panel__title">PROGRAM DATASHEET</p>
                <SpecRow k="Degree" v="Bachelor of Technology (B.Tech)" />
                <SpecRow k="Duration" v="4 Years / 8 Semesters" />
                <SpecRow k="Approval" v="AICTE Approved" />
                <SpecRow k="Intake Route" v="JEE Main / State Counseling" />
                <SpecRow k="Lateral Entry" v="Direct 2nd Year for Diploma Holders" />
                <SpecRow k="Specializations" v="8 Branches" />
                <SpecRow k="Location" v="Faridabad, Haryana (NCR)" />
              </aside>
            </div>
          </div>
        </header>

        <div className="container">
          <ImgPlaceholder label="PLRCT Campus — Academic Block, Faridabad" ratio="21/9" />
        </div>

        {/* ---------------- OVERVIEW ---------------- */}
        <section className="section" aria-labelledby="overview-h">
          <div className="container">
            <p className="eyebrow">OVERVIEW</p>
            <h2 id="overview-h">What is B.Tech at PLRCT?</h2>
            <p>
              B.Tech at PLRCT is a four-year undergraduate engineering
              degree designed around a simple idea: engineers learn best by building things. The
              program combines a rigorous core curriculum in mathematics, applied sciences and
              engineering fundamentals with specialization tracks that let students go deep into
              the discipline that interests them most — from software systems and artificial
              intelligence to power systems, structural design and communication networks.
            </p>
            <p>
              Located in Faridabad, on the doorstep of one of North India&apos;s densest
              industrial and IT corridors, PLRCT is positioned to give students in Faridabad,
              Ballabgarh, Greater Faridabad, Palwal, Gurugram, Noida and the wider Delhi NCR region
              access to an engineering education that stays connected to real industry practice.
              Faculty mentorship, well-equipped laboratories, structured industrial training and a
              dedicated placement cell work together across all four years, not just in the final
              semester.
            </p>
            <p>
              Every specialization under the B.Tech umbrella shares a common first year of core
              engineering subjects, so students who are still deciding on a branch begin with a
              broad foundation before committing to a specialization in their second year.
            </p>
          </div>
        </section>

        {/* ---------------- KEY HIGHLIGHTS ---------------- */}
        <section className="section section--tint" aria-labelledby="highlights-h">
          <div className="container">
            <p className="eyebrow">KEY HIGHLIGHTS</p>
            <h2 id="highlights-h">Why students choose the PLRCT B.Tech program</h2>
            <div className="card-grid">
              {[
                {
                  t: "AICTE Approved Curriculum",
                  d: "A regulator-approved syllabus updated to reflect current engineering practice, refreshed regularly in line with university guidelines.",
                },
                {
                  t: "Eight Specializations",
                  d: "CSE, ECE, ME, CE, EE, AI & ML, Data Science and IT — enough breadth to match nearly any engineering interest.",
                },
                {
                  t: "Industry-Aligned Labs",
                  d: "Computer, electronics, electrical, mechanical and civil laboratories built for hands-on practice, not just demonstration.",
                },
                {
                  t: "Structured Industrial Training",
                  d: "Mandatory internships and industrial visits connecting classroom theory to the Faridabad-NCR manufacturing and IT ecosystem.",
                },
                {
                  t: "Dedicated Placement Cell",
                  d: "Year-round training in aptitude, communication and technical interviews, alongside on-campus recruitment drives.",
                },
                {
                  t: "Research & Project Culture",
                  d: "Faculty-guided minor and major projects, paper publication support, and access to a growing research center.",
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

        {/* ---------------- ELIGIBILITY & DURATION ---------------- */}
        <section className="section" aria-labelledby="eligibility-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">ELIGIBILITY</p>
              <h2 id="eligibility-h">Who can apply for B.Tech at PLRCT?</h2>
              <p>
                Applicants should have completed 10+2 (or an equivalent qualification) with
                Physics, Chemistry and Mathematics as core subjects from a recognized board,
                securing the minimum aggregate percentage prescribed by the affiliating state
                technical university. Admission is offered through JEE Main scores or the
                applicable state-level counseling process, in line with AICTE and university
                norms for the academic year.
              </p>
              <p>
                Diploma holders in a relevant engineering discipline are eligible for lateral
                entry directly into the second year of the B.Tech program, subject to seat
                availability and university guidelines, allowing a faster route from polytechnic
                study to a full engineering degree.
              </p>
            </div>
            <div>
              <p className="eyebrow">DURATION &amp; STRUCTURE</p>
              <h2>How long is the program?</h2>
              <p>
                The B.Tech degree is spread across four years and eight semesters. The first year
                covers common engineering fundamentals — mathematics, physics, chemistry,
                programming, engineering graphics and workshop practice — shared across all
                branches. From the second year onward, students follow their chosen
                specialization&apos;s curriculum, with an increasing share of laboratory work,
                electives, seminars and project-based learning as they progress toward the final
                year, which is anchored by a major project and industrial training component.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- CURRICULUM ---------------- */}
        <section className="section section--tint" aria-labelledby="curriculum-h">
          <div className="container">
            <p className="eyebrow">CURRICULUM</p>
            <h2 id="curriculum-h">A curriculum built in layers</h2>
            <p>
              The first year establishes a common engineering base. From the second year, the
              curriculum splits into branch-specific tracks that combine core theory, laboratory
              practicals, open electives and skill-based courses in emerging areas such as machine
              learning, data analytics, embedded systems and sustainable design. Later semesters
              introduce seminars, minor projects, an industrial training component, and finally a
              major project in the eighth semester that ties four years of learning into a
              single, demonstrable body of work.
            </p>
            <p>
              Full semester-wise subject breakdowns, credit distribution and elective baskets for
              every branch are published on the dedicated{" "}
              <a href="/academics/resources/curriculum">curriculum page</a>, alongside the
              official <a href="/academics/resources/syllabus">syllabus documents</a> for each
              subject.
            </p>
          </div>
        </section>

        {/* ---------------- LABS & WORKSHOPS ---------------- */}
        <section className="section" aria-labelledby="labs-h">
          <div className="container">
            <p className="eyebrow">LABORATORIES &amp; WORKSHOPS</p>
            <h2 id="labs-h">Facilities built for hands-on engineering</h2>
            <p>
              Theory is only half of an engineering education. PLRCT&apos;s laboratory floors
              include computer programming and networking labs, electronics and communication
              labs, electrical machines and power systems labs, mechanical workshops with
              fabrication and CNC facilities, civil engineering material-testing and surveying
              labs, and a dedicated AI, robotics and data science lab for project work in emerging
              technology. A full walkthrough of each facility is available on the{" "}
              <a href="/academics/resources/laboratories">laboratories page</a> and the{" "}
              <a href="/academics/resources/workshops">workshops page</a>.
            </p>
            <div className="img-grid">
              <ImgPlaceholder label="Computer Science Laboratory" />
              <ImgPlaceholder label="Electronics & Communication Lab" />
              <ImgPlaceholder label="Mechanical Workshop" />
              <ImgPlaceholder label="Electrical Machines Lab" />
              <ImgPlaceholder label="Civil Engineering Lab" />
              <ImgPlaceholder label="AI & Robotics Lab" />
            </div>
          </div>
        </section>

        {/* ---------------- FACULTY / PROJECTS / RESEARCH ---------------- */}
        <section className="section section--tint" aria-labelledby="faculty-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">FACULTY &amp; PROJECTS</p>
              <h2 id="faculty-h">Mentorship through four years, not just placement season</h2>
              <p>
                Each department maintains a faculty team of qualified engineers and academics who
                mentor students through coursework, minor and major projects, and competitive
                events. Project work begins as early as the second year with small applied
                assignments, building toward independent, faculty-guided major projects in the
                final year that many students carry forward into publications or startup ideas.
              </p>
            </div>
            <div>
              <p className="eyebrow">INDUSTRIAL EXPOSURE &amp; RESEARCH</p>
              <h2>Learning that reaches outside the classroom</h2>
              <p>
                Structured industrial training, plant visits and internship placements connect
                students with manufacturing and technology employers across the
                Faridabad-Ballabgarh industrial belt and the wider Delhi NCR region. Interested
                students can also engage with ongoing faculty research through the college&apos;s
                research initiatives, detailed on the{" "}
                <a href="/academics/resources/research">research page</a>, and the{" "}
                <a href="/academics/resources/industrial-training">
                  industrial training page
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- PLACEMENTS & CAREERS ---------------- */}
        <section className="section" aria-labelledby="placements-h">
          <div className="container">
            <p className="eyebrow">PLACEMENTS &amp; CAREER OPPORTUNITIES</p>
            <h2 id="placements-h">Where the B.Tech degree leads</h2>
            <p>
              PLRCT&apos;s Training and Placement Cell runs a continuous cycle of aptitude
              training, communication workshops, resume clinics and mock interviews starting well
              before final semesters, so students are recruitment-ready when campus drives begin.
              Recruiters from IT services, manufacturing, core engineering and analytics sectors
              across Faridabad, Gurugram, Noida and Delhi NCR regularly participate in on-campus
              and pooled placement drives.
            </p>
            <p>
              Graduates move into roles such as software and systems engineer, embedded and VLSI
              design engineer, site and structural engineer, electrical design engineer, data
              analyst and machine learning engineer, production and quality engineer, and network
              and communications engineer — as well as further study through GATE-qualified
              M.Tech admissions, MBA programs, or government engineering services examinations.
              Students considering postgraduate study can explore PLRCT&apos;s own{" "}
              <a href="/academics/mtech">M.Tech program</a> for a direct continuation path.
            </p>
          </div>
        </section>

        {/* ---------------- FACILITIES ---------------- */}
        <section className="section section--tint" aria-labelledby="facilities-h">
          <div className="container">
            <p className="eyebrow">CAMPUS FACILITIES</p>
            <h2 id="facilities-h">Supporting life on campus</h2>
            <div className="img-grid">
              <ImgPlaceholder label="Central Library" />
              <ImgPlaceholder label="Smart Classrooms" />
              <ImgPlaceholder label="Research Center" />
              <ImgPlaceholder label="Student Activity & Sports Area" />
            </div>
          </div>
        </section>

        {/* ---------------- BRANCHES / INTERNAL LINKS ---------------- */}
        <section className="section" aria-labelledby="branches-h">
          <div className="container">
            <p className="eyebrow">CHOOSE YOUR SPECIALIZATION</p>
            <h2 id="branches-h">B.Tech departments at PLRCT</h2>
            <div className="link-grid">
              <a href="/academics/departments/cse">Computer Science Engineering</a>
              <a href="/academics/departments/ece">Electronics &amp; Communication Engineering</a>
              <a href="/academics/departments/me">Mechanical Engineering</a>
              <a href="/academics/departments/ce">Civil Engineering</a>
              <a href="/academics/departments/ee">Electrical Engineering</a>
              <a href="/academics/departments/aiml">Artificial Intelligence &amp; Machine Learning</a>
              <a href="/academics/departments/data-science">Data Science</a>
              <a href="/academics/departments/it">Information Technology</a>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="section section--tint" aria-labelledby="faq-h">
          <div className="container">
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-h">B.Tech at PLRCT — quick answers</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>What is B.Tech at PLRCT?</summary>
                <p>
                  It is a four-year, AICTE approved undergraduate engineering degree offered
                  across eight specializations at PLRCT, Faridabad.
                </p>
              </details>
              <details className="faq-item">
                <summary>What is the eligibility for B.Tech admission?</summary>
                <p>
                  Pass 10+2 with Physics, Chemistry and Mathematics at the required percentage,
                  and qualify via JEE Main or the applicable state counseling process.
                </p>
              </details>
              <details className="faq-item">
                <summary>Is PLRCT AICTE approved?</summary>
                <p>
                  Yes. PLRCT is AICTE approved and affiliated with the relevant state technical
                  university for all its engineering programs.
                </p>
              </details>
              <details className="faq-item">
                <summary>What is the duration of the B.Tech program?</summary>
                <p>
                  Four years, divided into eight semesters, with lateral entry into the second
                  year available for eligible diploma holders.
                </p>
              </details>
              <details className="faq-item">
                <summary>Which specializations does PLRCT offer?</summary>
                <p>
                  CSE, ECE, Mechanical, Civil, Electrical, AI &amp; ML, Data Science and
                  Information Technology.
                </p>
              </details>
              <details className="faq-item">
                <summary>How is placement support provided?</summary>
                <p>
                  Through a dedicated Training and Placement Cell offering aptitude training,
                  mock interviews and on-campus recruitment drives with regional and national
                  companies.
                </p>
              </details>
              <details className="faq-item">
                <summary>Does PLRCT provide industrial training?</summary>
                <p>
                  Yes, mandatory internships and industrial visits are built into the curriculum,
                  supported by ties to the Faridabad-NCR industrial ecosystem.
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
              <h2>Start your engineering degree at PLRCT, Faridabad</h2>
              <p>
                Seats for the upcoming academic year are limited across all eight B.Tech
                specializations. Speak with our admissions team or begin your application today.
              </p>
            </div>
            <div className="final-cta__actions">
              <a href="/admissions" className="btn btn--gold">
                Apply Now
              </a>
              <a href="/contact" className="btn btn--outline-light">
                Contact Admissions
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}