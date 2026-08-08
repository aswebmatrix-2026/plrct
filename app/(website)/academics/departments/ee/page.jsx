import "./ee.css";

// ============================================================================
// SEO METADATA — Next.js 15 App Router
// ============================================================================
export const metadata = {
  title: "Electrical Engineering Faridabad | Best EE College PLRCT Haryana",
  description:
    "Electrical Engineering (EE) at PLRCT, Faridabad — AICTE approved power engineering course with electrical machines, power systems, control systems, power electronics and renewable energy labs, industry mentoring and strong placement support. Serving Faridabad, Ballabgarh and Haryana.",
  alternates: {
    canonical: "https://ptlrct.com/academics/departments/ee",
  },
  openGraph: {
    title: "Electrical Engineering (EE) at PLRCT Faridabad",
    description:
      "AICTE approved EE department at PLRCT, Faridabad, with dedicated electrical machines, power systems, control systems, power electronics and renewable energy laboratories.",
    url: "https://ptlrct.com/academics/departments/ee",
    siteName: "PLRCT (PLRCT)",
    images: [
      {
        url: "https://ptlrct.com/og/ee-department.jpg",
        width: 1200,
        height: 630,
        alt: "Electrical Engineering Department at PLRCT Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Electrical Engineering (EE) at PLRCT Faridabad",
    description:
      "AICTE approved EE department at PLRCT, Faridabad, with power systems, electrical machines, control systems and renewable energy laboratories and strong placement support.",
    images: ["https://ptlrct.com/og/ee-department.jpg"],
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
    { "@type": "ListItem", position: 3, name: "Departments", item: "https://ptlrct.com/academics/departments" },
    { "@type": "ListItem", position: 4, name: "Electrical Engineering", item: "https://ptlrct.com/academics/departments/ee" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Electrical Engineering at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Electrical Engineering at PLRCT is an AICTE approved B.Tech department in Faridabad covering electrical circuits, machines, power systems, control systems, power electronics and renewable energy, supported by dedicated laboratories and industry mentoring.",
      },
    },
    {
      "@type": "Question",
      name: "Is PLRCT a good Electrical Engineering college in Haryana?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PLRCT's EE department combines an AICTE approved curriculum, five dedicated laboratories, structured industry collaboration and a focused Training and Placement Cell, making it a strong option among Electrical Engineering colleges in Faridabad and the wider Haryana region.",
      },
    },
    {
      "@type": "Question",
      name: "What is the eligibility for Electrical Engineering admission at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Admission to the EE department follows PLRCT's B.Tech eligibility: 10+2 with Physics, Chemistry and Mathematics at the required percentage, along with a valid JEE Main score or the applicable state counseling process.",
      },
    },
    {
      "@type": "Question",
      name: "What laboratories does the Electrical Engineering department have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The EE department at PLRCT operates an Electrical Machines Lab, Power Systems Lab, Control Systems Lab, Power Electronics Lab and Renewable Energy Lab, giving students hands-on practice across the discipline's major areas.",
      },
    },
    {
      "@type": "Question",
      name: "What career opportunities are available after Electrical Engineering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EE graduates from PLRCT can pursue roles such as electrical design engineer, power systems engineer, control engineer, automation engineer and renewable energy engineer, along with government exams, PSU opportunities, higher studies or entrepreneurship.",
      },
    },
    {
      "@type": "Question",
      name: "Does PLRCT's Electrical Engineering department offer industry collaboration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the EE department maintains collaboration with power and electrical companies across Faridabad, Gurugram, Noida and Delhi NCR for internships, guest sessions and placement drives.",
      },
    },
    {
      "@type": "Question",
      name: "What core course does PLRCT teach in Electrical Engineering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The EE curriculum covers a full power engineering course including electrical circuits, network theory, electrical machines, power systems, control systems, power electronics, renewable energy systems and industrial automation.",
      },
    },
    {
      "@type": "Question",
      name: "What is the placement support for Electrical Engineering students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PLRCT's Training and Placement Cell provides EE students with aptitude training, technical interview preparation, resume building support and coordinated on-campus recruitment drives with power and electrical companies.",
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
  department: {
    "@type": "EducationalOrganization",
    name: "Electrical Engineering Department",
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
export default function EEPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eduOrgSchema) }} />

      <main className="ee">
        {/* ---------------- HERO ---------------- */}
        <header className="ee-hero">
          <div className="ee-hero__grid" aria-hidden="true" />
          <div className="container ee-hero__inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/academics">Academics</a>
              <span>/</span>
              <span aria-current="page">Electrical Engineering</span>
            </nav>

            <div className="ee-hero__content">
              <div className="ee-hero__text">
                <p className="eyebrow eyebrow--light">DEPARTMENT · ELECTRICAL ENGINEERING</p>
                <h1>Electrical Engineering</h1>
                <p className="ee-hero__lede">
                  A power-first engineering department in Faridabad building electrical
                  designers, power systems engineers and automation specialists through
                  electrical machines labs, power systems, control systems and renewable
                  energy coursework, backed by dedicated placement support.
                </p>
                <div className="ee-hero__cta">
                  <a href="/admissions" className="btn btn--primary">Apply Now</a>
                  <a href="/downloads/PLRCT-brochure-ee.pdf" className="btn btn--ghost">Download Brochure</a>
                </div>
              </div>

              <aside className="spec-panel" aria-label="EE department specification">
                <p className="spec-panel__title">DEPARTMENT DATASHEET</p>
                <SpecRow k="Degree Offered" v="B.Tech (EE)" />
                <SpecRow k="Duration" v="4 Years / 8 Semesters" />
                <SpecRow k="Approval" v="AICTE Approved" />
                <SpecRow k="Laboratories" v="5 Dedicated Labs" />
                <SpecRow k="Focus Areas" v="Power, Machines, Automation, Renewable" />
                <SpecRow k="Location" v="Faridabad, Haryana (NCR)" />
              </aside>
            </div>
          </div>
        </header>

        <div className="container">
          <ImgPlaceholder label="EE Department Building — PLRCT Faridabad" ratio="21/9" />
        </div>

        {/* ---------------- OVERVIEW ---------------- */}
        <section className="section" aria-labelledby="overview-h">
          <div className="container">
            <p className="eyebrow">DEPARTMENT OVERVIEW</p>
            <h2 id="overview-h">What is Electrical Engineering at PLRCT?</h2>
            <p>
              The Electrical Engineering department at PLRCT has grown
              alongside Faridabad's own standing as an industrial and power-equipment hub within
              Delhi NCR. What began as a foundational circuits and machines curriculum has
              expanded into a full power engineering course covering network theory, electrical
              machines, power systems, control systems, power electronics and renewable energy —
              reflecting how the discipline itself has broadened over the last decade.
            </p>
            <p>
              Academic excellence in the department is built on a simple principle: every concept
              taught in a classroom is reinforced in a lab. Students don't just learn what a
              transformer does; they test one. This industry relevance is deliberate — as one of
              the AICTE approved Electrical Engineering colleges serving Faridabad, Ballabgarh,
              Gurugram, Noida and the wider Haryana region, PLRCT's EE department is positioned to
              place graduates directly into the power and electrical ecosystem that surrounds the
              campus.
            </p>
            <p>
              Looking ahead, the department continues to expand its coursework into renewable
              energy, industrial automation and smart grid technologies, areas where regional and
              national hiring demand continues to grow fastest among electrical disciplines.
            </p>
          </div>
        </section>

        {/* ---------------- VISION & MISSION ---------------- */}
        <section className="section section--tint" aria-labelledby="vision-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">VISION</p>
              <h2 id="vision-h">Our vision</h2>
              <p>
                To be recognized as a leading Electrical Engineering department in Haryana,
                producing graduates capable of designing, operating and maintaining the power
                and electrical systems that modern industry depends on.
              </p>
            </div>
            <div>
              <p className="eyebrow">MISSION</p>
              <h2>Our mission</h2>
              <p>
                To deliver a rigorous, hands-on electrical engineering education through modern
                laboratories, experienced faculty and sustained industry collaboration —
                equipping every student with both the technical depth and the professional
                readiness to succeed in power engineering, research or entrepreneurship.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- WHY CHOOSE ---------------- */}
        <section className="section" aria-labelledby="why-h">
          <div className="container">
            <p className="eyebrow">WHY CHOOSE EE AT PLRCT</p>
            <h2 id="why-h">Built for graduates who can actually run the grid</h2>
            <div className="card-grid">
              {[
                { t: "Experienced Faculty", d: "A faculty team with academic and industry backgrounds guiding coursework, projects and research." },
                { t: "Five Modern Laboratories", d: "Electrical machines, power systems, control systems, power electronics and renewable energy labs equipped for hands-on practice." },
                { t: "Industry-Oriented Curriculum", d: "A syllabus that tracks current power practice, from smart grids to applied renewable energy." },
                { t: "Research Opportunities", d: "Faculty-guided projects and paper publication support for students interested in going deeper." },
                { t: "Practical, Project-Based Learning", d: "Coursework anchored in building and testing real systems, not just studying theory." },
                { t: "Dedicated Placement Support", d: "Aptitude, technical interview and resume training focused specifically on core electrical hiring." },
              ].map((c) => (
                <div className="card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CURRICULUM ---------------- */}
        <section className="section section--tint" aria-labelledby="curriculum-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">CURRICULUM</p>
              <h2 id="curriculum-h">Semester structure &amp; core subjects</h2>
              <p>
                The first year covers common engineering fundamentals shared across all B.Tech
                branches. From the second year, EE-specific core subjects begin: electrical
                circuits, network theory, electrical machines, digital electronics and electrical
                measurements, followed by power systems, power electronics, control systems and
                microprocessors in later semesters.
              </p>
            </div>
            <div>
              <p className="eyebrow">ELECTIVES, PROJECTS &amp; INDUSTRY EXPOSURE</p>
              <h2>Depth where it matters</h2>
              <p>
                Elective baskets let students specialize further in areas such as renewable
                energy systems, high voltage engineering, industrial automation or smart grid
                technologies. Minor projects begin in the second year, building toward a
                major final-year project, alongside mandatory industrial training and
                internships connecting classroom learning to real power and electrical teams.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- LABORATORIES ---------------- */}
        <section className="section" aria-labelledby="labs-h">
          <div className="container">
            <p className="eyebrow">LABORATORIES</p>
            <h2 id="labs-h">Five labs, one discipline</h2>
            <div className="dept-grid">
              <article className="dept-card">
                <h3>Electrical Machines Lab</h3>
                <p>Hands-on testing and analysis of transformers, DC machines, induction motors and synchronous machines.</p>
              </article>
              <article className="dept-card">
                <h3>Power Systems Lab</h3>
                <p>Practice with transmission and distribution systems, protection schemes, load flow and fault analysis.</p>
              </article>
              <article className="dept-card">
                <h3>Control Systems Lab</h3>
                <p>Controller design, automation systems, process control and servo mechanism experiments.</p>
              </article>
              <article className="dept-card">
                <h3>Power Electronics Lab</h3>
                <p>Converters, inverters and motor drive practice for real industrial applications.</p>
              </article>
              <article className="dept-card">
                <h3>Renewable Energy Lab</h3>
                <p>Solar power, wind energy, battery storage and hybrid energy system experimentation.</p>
              </article>
            </div>
            <div className="img-grid">
              <ImgPlaceholder label="Electrical Machines Lab" />
              <ImgPlaceholder label="Students in Lab Session" />
              <ImgPlaceholder label="Faculty Guiding a Project" />
            </div>
          </div>
        </section>

        {/* ---------------- WORKSHOPS, INDUSTRY, INTERNSHIPS, PROJECTS ---------------- */}
        <section className="section section--tint" aria-labelledby="workshops-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">WORKSHOPS &amp; PRACTICAL TRAINING</p>
              <h2 id="workshops-h">Skill-building beyond the syllabus</h2>
              <p>
                Regular workshops in wiring practices, industrial electrical systems, PLC
                programming and SCADA exposure give EE students practice beyond the prescribed
                curriculum, keeping technical skills current with industry practice.
              </p>
            </div>
            <div>
              <p className="eyebrow">INDUSTRY COLLABORATIONS &amp; INTERNSHIPS</p>
              <h2>Learning alongside working power teams</h2>
              <p>
                The department maintains collaboration with power and electrical companies
                across Faridabad, Gurugram, Noida and Delhi NCR, giving students internship
                placements and exposure to production-grade electrical systems at power plants,
                substations and manufacturing units before graduation.
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="research-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">STUDENT PROJECTS &amp; RESEARCH</p>
              <h2 id="research-h">From coursework to independent work</h2>
              <p>
                Student projects range from smart energy meters and solar monitoring systems to
                EV charging setups and industrial motor control, many developed under faculty
                guidance with an eye toward publication or further research through PLRCT's{" "}
                <a href="/academics/mtech">M.Tech program</a>.
              </p>
            </div>
            <div>
              <p className="eyebrow">FACULTY EXPERTISE</p>
              <h2>Mentors with real technical depth</h2>
              <p>
                EE faculty bring a mix of academic research backgrounds and industry experience
                across power systems, automation and renewable energy, mentoring students through
                coursework, projects and career decisions alike.
              </p>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="img-grid">
            <ImgPlaceholder label="Industrial Visit — Power Substation" />
            <ImgPlaceholder label="Technical Event / Project Expo" />
            <ImgPlaceholder label="Student Project Showcase" />
          </div>
        </div>

        {/* ---------------- CAREERS ---------------- */}
        <section className="section section--tint" aria-labelledby="career-h">
          <div className="container">
            <p className="eyebrow">CAREER OPPORTUNITIES</p>
            <h2 id="career-h">Where an EE degree leads</h2>
            <div className="card-grid">
              {[
                { t: "Electrical Design Engineer", d: "Designing electrical layouts, circuits and systems for industrial and infrastructure projects." },
                { t: "Power Systems Engineer", d: "Working on generation, transmission and distribution network planning and operations." },
                { t: "Control & Automation Engineer", d: "Developing and maintaining PLC and SCADA based automation systems." },
                { t: "Renewable Energy Engineer", d: "Designing and managing solar, wind and hybrid energy system installations." },
                { t: "Government & PSU Roles", d: "Technical positions in power sector undertakings and government electrical departments." },
                { t: "Higher Education & Entrepreneurship", d: "Progression into M.Tech, research, or founding an energy or automation venture." },
              ].map((c) => (
                <div className="card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- PLACEMENT SUPPORT & FACILITIES ---------------- */}
        <section className="section" aria-labelledby="placement-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">PLACEMENT SUPPORT</p>
              <h2 id="placement-h">Getting hire-ready, early</h2>
              <p>
                The Training and Placement Cell runs aptitude preparation, technical interview
                practice, resume building sessions and industry mentoring specifically tuned to
                core electrical and PSU hiring, well ahead of final placement drives.
              </p>
            </div>
            <div>
              <p className="eyebrow">DEPARTMENT FACILITIES &amp; ACHIEVEMENTS</p>
              <h2>A department that competes and wins</h2>
              <p>
                Beyond its labs, the EE department hosts technical events and project expos where
                students regularly place in inter-college competitions, alongside strong
                participation in innovation challenges and industry-sponsored projects.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- INTERNAL LINKS ---------------- */}
        <section className="section section--tint" aria-labelledby="explore-h">
          <div className="container">
            <p className="eyebrow">EXPLORE FURTHER</p>
            <h2 id="explore-h">Related programs &amp; departments</h2>
            <div className="link-grid">
              <a href="/academics/btech">B.Tech Programs</a>
              <a href="/academics/departments/mechanical">Mechanical Engineering</a>
              <a href="/academics/departments/electronics">Electronics Engineering</a>
              <a href="/academics/departments/cse">Computer Science Engineering</a>
              <a href="/academics/resources/laboratories">Laboratories</a>
              <a href="/academics/resources/curriculum">Curriculum</a>
              <a href="/academics/mtech">M.Tech Programs</a>
              <a href="/admissions">Admissions</a>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ (10 QUESTIONS) ---------------- */}
        <section className="section" aria-labelledby="faq-h">
          <div className="container">
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-h">EE at PLRCT — quick answers</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>What is Electrical Engineering at PLRCT?</summary>
                <p>An AICTE approved B.Tech department in Faridabad covering circuits, machines, power systems, control systems and renewable energy.</p>
              </details>
              <details className="faq-item">
                <summary>Is PLRCT a good Electrical Engineering college in Haryana?</summary>
                <p>Yes — an AICTE approved curriculum, five dedicated labs, industry collaboration and a focused placement cell support strong outcomes.</p>
              </details>
              <details className="faq-item">
                <summary>What is the eligibility for EE admission?</summary>
                <p>10+2 with Physics, Chemistry and Mathematics at the required percentage, plus a valid JEE Main score or state counseling.</p>
              </details>
              <details className="faq-item">
                <summary>What laboratories does EE have?</summary>
                <p>Electrical Machines Lab, Power Systems Lab, Control Systems Lab, Power Electronics Lab and Renewable Energy Lab.</p>
              </details>
              <details className="faq-item">
                <summary>What careers follow an EE degree?</summary>
                <p>Electrical design engineer, power systems engineer, control engineer, automation engineer and renewable energy engineer roles, plus government, PSU and entrepreneurship paths.</p>
              </details>
              <details className="faq-item">
                <summary>Does EE offer industry collaboration?</summary>
                <p>Yes, with power and electrical companies across Faridabad, Gurugram, Noida and Delhi NCR for internships and placements.</p>
              </details>
              <details className="faq-item">
                <summary>What core course does PLRCT teach in EE?</summary>
                <p>Electrical circuits, network theory, electrical machines, power systems, control systems, power electronics and renewable energy systems.</p>
              </details>
              <details className="faq-item">
                <summary>What is the placement support for EE students?</summary>
                <p>Aptitude training, technical interview prep, resume building and coordinated recruitment drives with power and electrical companies.</p>
              </details>
              <details className="faq-item">
                <summary>Can EE students pursue higher studies?</summary>
                <p>Yes, through PLRCT's M.Tech program or external postgraduate and research programs.</p>
              </details>
              <details className="faq-item">
                <summary>Does the department support student research?</summary>
                <p>Yes, through faculty-guided projects and publication support for interested students.</p>
              </details>
            </div>
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section className="final-cta">
          <div className="container final-cta__inner">
            <div>
              <p className="eyebrow eyebrow--light">ADMISSIONS OPEN</p>
              <h2>Start your Electrical Engineering journey at PLRCT</h2>
              <p>Seats in the EE department are limited for the upcoming academic year. Apply now or download the department brochure.</p>
            </div>
            <div className="final-cta__actions">
              <a href="/admissions" className="btn btn--gold">Apply Now</a>
              <a href="/downloads/PLRCT-brochure-ee.pdf" className="btn btn--outline-light">Download Brochure</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}