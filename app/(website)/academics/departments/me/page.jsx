import "./me.css";

// ============================================================================
// SEO METADATA — Next.js 15 App Router
// ============================================================================
export const metadata = {
  title: "Mechanical Engineering Faridabad | Best ME College PLRCT Haryana",
  description:
    "Mechanical Engineering (ME) at PLRCT, Faridabad — AICTE approved mechanical engineering course with thermal, manufacturing, CAD/CAM, robotics and automobile labs, industry mentoring and strong placement support. Serving Faridabad, Ballabgarh and Haryana.",
  alternates: {
    canonical: "https://ptlrct.com/academics/departments/me",
  },
  openGraph: {
    title: "Mechanical Engineering (ME) at PLRCT Faridabad",
    description:
      "AICTE approved ME department at PLRCT, Faridabad, with dedicated thermal, manufacturing, CAD/CAM, robotics and automobile engineering laboratories.",
    url: "https://ptlrct.com/academics/departments/me",
    siteName: "PLRCT (PLRCT)",
    images: [
      {
        url: "https://ptlrct.com/og/me-department.jpg",
        width: 1200,
        height: 630,
        alt: "Mechanical Engineering Department at PLRCT Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mechanical Engineering (ME) at PLRCT Faridabad",
    description:
      "AICTE approved ME department at PLRCT, Faridabad, with thermal, manufacturing, CAD/CAM and robotics laboratories and strong placement support.",
    images: ["https://ptlrct.com/og/me-department.jpg"],
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
    { "@type": "ListItem", position: 4, name: "Mechanical Engineering", item: "https://ptlrct.com/academics/departments/me" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Mechanical Engineering at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mechanical Engineering at PLRCT is an AICTE approved B.Tech department in Faridabad covering thermodynamics, manufacturing processes, machine design, CAD/CAM, robotics and automobile engineering, supported by dedicated laboratories and industry mentoring.",
      },
    },
    {
      "@type": "Question",
      name: "Is PLRCT a good Mechanical Engineering college in Haryana?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PLRCT's ME department combines an AICTE approved curriculum, five dedicated laboratories, structured industry collaboration and a focused Training and Placement Cell, making it a strong option among Mechanical Engineering colleges in Faridabad and the wider Haryana region.",
      },
    },
    {
      "@type": "Question",
      name: "What is the eligibility for Mechanical Engineering admission at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Admission to the ME department follows PLRCT's B.Tech eligibility: 10+2 with Physics, Chemistry and Mathematics at the required percentage, along with a valid JEE Main score or the applicable state counseling process.",
      },
    },
    {
      "@type": "Question",
      name: "What laboratories does the Mechanical Engineering department have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ME department at PLRCT operates a Thermal Engineering Lab, Manufacturing & Machine Shop, CAD/CAM Lab, Fluid Mechanics Lab and Robotics & Automation Lab, giving students hands-on practice across the discipline's major areas.",
      },
    },
    {
      "@type": "Question",
      name: "What career opportunities are available after Mechanical Engineering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ME graduates from PLRCT can pursue roles such as design engineer, production engineer, quality engineer, automobile engineer and maintenance engineer, along with government exams, PSU opportunities, higher studies or entrepreneurship.",
      },
    },
    {
      "@type": "Question",
      name: "Does PLRCT's Mechanical Engineering department offer industry collaboration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the ME department maintains collaboration with manufacturing and automobile companies across Faridabad, Gurugram, Noida and Delhi NCR for internships, guest sessions and placement drives.",
      },
    },
    {
      "@type": "Question",
      name: "What core course does PLRCT teach in Mechanical Engineering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The ME curriculum covers a full mechanical engineering course including thermodynamics, fluid mechanics, manufacturing processes, machine design, CAD/CAM, robotics, automobile engineering and industrial engineering.",
      },
    },
    {
      "@type": "Question",
      name: "What is the placement support for Mechanical Engineering students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PLRCT's Training and Placement Cell provides ME students with aptitude training, technical interview preparation, resume building support and coordinated on-campus recruitment drives with manufacturing and automobile companies.",
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
    name: "Mechanical Engineering Department",
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
export default function MEPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eduOrgSchema) }} />

      <main className="me">
        {/* ---------------- HERO ---------------- */}
        <header className="me-hero">
          <div className="me-hero__grid" aria-hidden="true" />
          <div className="container me-hero__inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/academics">Academics</a>
              <span>/</span>
              <span aria-current="page">Mechanical Engineering</span>
            </nav>

            <div className="me-hero__content">
              <div className="me-hero__text">
                <p className="eyebrow eyebrow--light">DEPARTMENT · MECHANICAL ENGINEERING</p>
                <h1>Mechanical Engineering</h1>
                <p className="me-hero__lede">
                  A design-and-build engineering department in Faridabad shaping mechanical
                  designers, manufacturing engineers and automobile specialists through machine
                  shop practice, thermal engineering, CAD/CAM and robotics coursework, backed by
                  dedicated placement support.
                </p>
                <div className="me-hero__cta">
                  <a href="/admissions" className="btn btn--primary">Apply Now</a>
                  <a href="/downloads/PLRCT-brochure-me.pdf" className="btn btn--ghost">Download Brochure</a>
                </div>
              </div>

              <aside className="spec-panel" aria-label="ME department specification">
                <p className="spec-panel__title">DEPARTMENT DATASHEET</p>
                <SpecRow k="Degree Offered" v="B.Tech (ME)" />
                <SpecRow k="Duration" v="4 Years / 8 Semesters" />
                <SpecRow k="Approval" v="AICTE Approved" />
                <SpecRow k="Laboratories" v="5 Dedicated Labs" />
                <SpecRow k="Focus Areas" v="Thermal, Manufacturing, CAD/CAM, Robotics" />
                <SpecRow k="Location" v="Faridabad, Haryana (NCR)" />
              </aside>
            </div>
          </div>
        </header>

        <div className="container">
          <ImgPlaceholder label="ME Department Building — PLRCT Faridabad" ratio="21/9" />
        </div>

        {/* ---------------- OVERVIEW ---------------- */}
        <section className="section" aria-labelledby="overview-h">
          <div className="container">
            <p className="eyebrow">DEPARTMENT OVERVIEW</p>
            <h2 id="overview-h">What is Mechanical Engineering at PLRCT?</h2>
            <p>
              The Mechanical Engineering department at PLRCT has grown
              alongside Faridabad's own standing as one of North India's largest manufacturing
              and industrial hubs. What began as a foundational workshop and thermodynamics
              curriculum has expanded into a full mechanical engineering course covering fluid
              mechanics, manufacturing processes, machine design, CAD/CAM, robotics and
              automobile engineering — reflecting how the discipline itself has broadened over
              the last decade.
            </p>
            <p>
              Academic excellence in the department is built on a simple principle: every concept
              taught in a classroom is reinforced on the shop floor. Students don't just learn
              how an engine cycle works; they run one on a test rig. This industry relevance is
              deliberate — as one of the AICTE approved Mechanical Engineering colleges serving
              Faridabad, Ballabgarh, Gurugram, Noida and the wider Haryana region, PLRCT's ME
              department is positioned to place graduates directly into the manufacturing and
              automotive ecosystem that surrounds the campus.
            </p>
            <p>
              Looking ahead, the department continues to expand its coursework into robotics,
              automation and CAD/CAM-driven design, areas where regional and national hiring
              demand continues to grow fastest among mechanical disciplines.
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
                To be recognized as a leading Mechanical Engineering department in Haryana,
                producing graduates capable of designing, manufacturing and maintaining the
                machines and systems that modern industry depends on.
              </p>
            </div>
            <div>
              <p className="eyebrow">MISSION</p>
              <h2>Our mission</h2>
              <p>
                To deliver a rigorous, hands-on mechanical engineering education through modern
                laboratories, experienced faculty and sustained industry collaboration —
                equipping every student with both the technical depth and the professional
                readiness to succeed in design, manufacturing, research or entrepreneurship.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- WHY CHOOSE ---------------- */}
        <section className="section" aria-labelledby="why-h">
          <div className="container">
            <p className="eyebrow">WHY CHOOSE ME AT PLRCT</p>
            <h2 id="why-h">Built for graduates who can actually build the machine</h2>
            <div className="card-grid">
              {[
                { t: "Experienced Faculty", d: "A faculty team with academic and industry backgrounds guiding coursework, projects and research." },
                { t: "Five Modern Laboratories", d: "Thermal engineering, manufacturing, CAD/CAM, fluid mechanics and robotics labs equipped for hands-on practice." },
                { t: "Industry-Oriented Curriculum", d: "A syllabus that tracks current manufacturing practice, from CNC machining to applied robotics." },
                { t: "Research Opportunities", d: "Faculty-guided projects and paper publication support for students interested in going deeper." },
                { t: "Practical, Project-Based Learning", d: "Coursework anchored in designing and building real machines, not just studying theory." },
                { t: "Dedicated Placement Support", d: "Aptitude, technical interview and resume training focused specifically on core mechanical hiring." },
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
                branches. From the second year, ME-specific core subjects begin: engineering
                mechanics, strength of materials, thermodynamics, fluid mechanics and
                manufacturing processes, followed by machine design, heat transfer, dynamics of
                machines and CAD/CAM in later semesters.
              </p>
            </div>
            <div>
              <p className="eyebrow">ELECTIVES, PROJECTS &amp; INDUSTRY EXPOSURE</p>
              <h2>Depth where it matters</h2>
              <p>
                Elective baskets let students specialize further in areas such as robotics and
                automation, automobile engineering, industrial engineering or refrigeration and
                air conditioning. Minor projects begin in the second year, building toward a
                major final-year project, alongside mandatory industrial training and
                internships connecting classroom learning to real manufacturing teams.
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
                <h3>Thermal Engineering Lab</h3>
                <p>Hands-on testing of engines, boilers, refrigeration cycles and heat transfer equipment.</p>
              </article>
              <article className="dept-card">
                <h3>Manufacturing &amp; Machine Shop</h3>
                <p>Practice on lathes, milling machines, welding, casting and CNC machining processes.</p>
              </article>
              <article className="dept-card">
                <h3>CAD/CAM Lab</h3>
                <p>Design and simulation practice using modern 2D/3D modeling and manufacturing software.</p>
              </article>
              <article className="dept-card">
                <h3>Fluid Mechanics Lab</h3>
                <p>Experiments on pumps, turbines, flow measurement and hydraulic machine performance.</p>
              </article>
              <article className="dept-card">
                <h3>Robotics &amp; Automation Lab</h3>
                <p>Applied practice with robotic arms, sensors and automated mechanical systems.</p>
              </article>
            </div>
            <div className="img-grid">
              <ImgPlaceholder label="Manufacturing & Machine Shop" />
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
                Regular workshops in welding, CNC programming, 3D printing and CAD tools give ME
                students practice beyond the prescribed curriculum, keeping technical skills
                current with industry practice.
              </p>
            </div>
            <div>
              <p className="eyebrow">INDUSTRY COLLABORATIONS &amp; INTERNSHIPS</p>
              <h2>Learning alongside working manufacturing teams</h2>
              <p>
                The department maintains collaboration with manufacturing and automobile
                companies across Faridabad, Gurugram, Noida and Delhi NCR, giving students
                internship placements and exposure to production-grade shop floor practices
                before graduation.
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
                Student projects range from go-karts and 3D printed prototypes to robotic arms
                and automobile subsystems, many developed under faculty guidance with an eye
                toward publication or further research through PLRCT's{" "}
                <a href="/academics/mtech">M.Tech program</a>.
              </p>
            </div>
            <div>
              <p className="eyebrow">FACULTY EXPERTISE</p>
              <h2>Mentors with real technical depth</h2>
              <p>
                ME faculty bring a mix of academic research backgrounds and industry experience
                across manufacturing, design and thermal systems, mentoring students through
                coursework, projects and career decisions alike.
              </p>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="img-grid">
            <ImgPlaceholder label="Industrial Visit — Manufacturing Plant" />
            <ImgPlaceholder label="Technical Event / Project Expo" />
            <ImgPlaceholder label="Student Project Showcase" />
          </div>
        </div>

        {/* ---------------- CAREERS ---------------- */}
        <section className="section section--tint" aria-labelledby="career-h">
          <div className="container">
            <p className="eyebrow">CAREER OPPORTUNITIES</p>
            <h2 id="career-h">Where an ME degree leads</h2>
            <div className="card-grid">
              {[
                { t: "Design Engineer", d: "Creating and refining mechanical components and systems using CAD/CAM tools." },
                { t: "Production Engineer", d: "Overseeing manufacturing processes, workflows and shop-floor operations." },
                { t: "Quality Engineer", d: "Ensuring components and assemblies meet defined engineering standards." },
                { t: "Automobile Engineer", d: "Working on vehicle systems, components and automotive manufacturing." },
                { t: "Government & PSU Roles", d: "Technical positions in public sector manufacturing and infrastructure departments." },
                { t: "Higher Education & Entrepreneurship", d: "Progression into M.Tech, research, or founding a manufacturing or design venture." },
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
                core mechanical and PSU hiring, well ahead of final placement drives.
              </p>
            </div>
            <div>
              <p className="eyebrow">DEPARTMENT FACILITIES &amp; ACHIEVEMENTS</p>
              <h2>A department that competes and wins</h2>
              <p>
                Beyond its labs, the ME department hosts technical events and project expos where
                students regularly place in inter-college competitions, alongside strong
                participation in design challenges and industry-sponsored projects.
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
              <a href="/academics/departments/ee">Electrical Engineering</a>
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
            <h2 id="faq-h">ME at PLRCT — quick answers</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>What is Mechanical Engineering at PLRCT?</summary>
                <p>An AICTE approved B.Tech department in Faridabad covering thermodynamics, manufacturing, machine design, CAD/CAM and robotics.</p>
              </details>
              <details className="faq-item">
                <summary>Is PLRCT a good Mechanical Engineering college in Haryana?</summary>
                <p>Yes — an AICTE approved curriculum, five dedicated labs, industry collaboration and a focused placement cell support strong outcomes.</p>
              </details>
              <details className="faq-item">
                <summary>What is the eligibility for ME admission?</summary>
                <p>10+2 with Physics, Chemistry and Mathematics at the required percentage, plus a valid JEE Main score or state counseling.</p>
              </details>
              <details className="faq-item">
                <summary>What laboratories does ME have?</summary>
                <p>Thermal Engineering Lab, Manufacturing &amp; Machine Shop, CAD/CAM Lab, Fluid Mechanics Lab and Robotics &amp; Automation Lab.</p>
              </details>
              <details className="faq-item">
                <summary>What careers follow an ME degree?</summary>
                <p>Design engineer, production engineer, quality engineer, automobile engineer and maintenance engineer roles, plus government, PSU and entrepreneurship paths.</p>
              </details>
              <details className="faq-item">
                <summary>Does ME offer industry collaboration?</summary>
                <p>Yes, with manufacturing and automobile companies across Faridabad, Gurugram, Noida and Delhi NCR for internships and placements.</p>
              </details>
              <details className="faq-item">
                <summary>What core course does PLRCT teach in ME?</summary>
                <p>Thermodynamics, fluid mechanics, manufacturing processes, machine design, CAD/CAM, robotics and automobile engineering.</p>
              </details>
              <details className="faq-item">
                <summary>What is the placement support for ME students?</summary>
                <p>Aptitude training, technical interview prep, resume building and coordinated recruitment drives with manufacturing and automobile companies.</p>
              </details>
              <details className="faq-item">
                <summary>Can ME students pursue higher studies?</summary>
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
              <h2>Start your Mechanical Engineering journey at PLRCT</h2>
              <p>Seats in the ME department are limited for the upcoming academic year. Apply now or download the department brochure.</p>
            </div>
            <div className="final-cta__actions">
              <a href="/admissions" className="btn btn--gold">Apply Now</a>
              <a href="/downloads/PLRCT-brochure-me.pdf" className="btn btn--outline-light">Download Brochure</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}