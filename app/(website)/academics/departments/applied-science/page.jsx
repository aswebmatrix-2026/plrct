import "./applied-science.css";

// ============================================================================
// SEO METADATA — Next.js 15 App Router
// ============================================================================
export const metadata = {
  title: "Applied Science Department Faridabad | Best Engineering Foundation College Haryana",
  description:
    "Department of Applied Science at PLRCT, Faridabad — AICTE approved engineering mathematics, physics, chemistry, environmental science and communication skills foundation with modern labs and research-oriented learning. Serving Faridabad, Ballabgarh and Haryana.",
  alternates: {
    canonical: "https://ptlrct.com/academics/departments/applied-science",
  },
  openGraph: {
    title: "Department of Applied Science at PLRCT Faridabad",
    description:
      "AICTE approved Applied Science department at PLRCT, Faridabad, with dedicated physics, chemistry, engineering mathematics, environmental science and language laboratories.",
    url: "https://ptlrct.com/academics/departments/applied-science",
    siteName: "PLRCT (PLRCT)",
    images: [
      {
        url: "https://ptlrct.com/og/applied-science-department.jpg",
        width: 1200,
        height: 630,
        alt: "Applied Science Department at PLRCT Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Department of Applied Science at PLRCT Faridabad",
    description:
      "AICTE approved Applied Science department at PLRCT, Faridabad, with physics, chemistry, mathematics, environmental science and language laboratories supporting every engineering branch.",
    images: ["https://ptlrct.com/og/applied-science-department.jpg"],
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
    { "@type": "ListItem", position: 4, name: "Applied Science", item: "https://ptlrct.com/academics/departments/applied-science" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Department of Applied Science?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Department of Applied Science at PLRCT provides the academic foundation for every engineering branch, teaching engineering mathematics, physics, chemistry, communication skills and environmental science to all first-year students.",
      },
    },
    {
      "@type": "Question",
      name: "Which subjects are taught in Applied Science?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Core subjects include Engineering Mathematics, Engineering Physics, Engineering Chemistry, Technical Communication and English Language Skills, and Environmental Science, each supported by dedicated laboratory work.",
      },
    },
    {
      "@type": "Question",
      name: "Are laboratory facilities available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the department operates a Physics Laboratory, Chemistry Laboratory, Engineering Mathematics Laboratory, Environmental Science Laboratory and a Language and Communication Laboratory.",
      },
    },
    {
      "@type": "Question",
      name: "How does Applied Science support engineering education?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Applied Science builds the mathematical, scientific and communication foundation that every engineering branch depends on, from Computer Science and Electrical Engineering to Civil and Mechanical Engineering, before students move into branch-specific coursework.",
      },
    },
    {
      "@type": "Question",
      name: "Is research encouraged in the department?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, faculty guide student projects and research in areas such as applied physics, materials science, computational mathematics and environmental sustainability, with support for publication where relevant.",
      },
    },
    {
      "@type": "Question",
      name: "What career opportunities are available after Applied Science?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Students carrying Applied Science strengths into their engineering careers pursue roles such as research scientist, data analyst, scientific officer, laboratory specialist, environmental consultant and academic researcher, alongside their core engineering paths.",
      },
    },
    {
      "@type": "Question",
      name: "Does the department help with GATE preparation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the strong mathematics and physics foundation built in Applied Science supports GATE foundation preparation, and the department offers guidance alongside competitive exam readiness sessions.",
      },
    },
    {
      "@type": "Question",
      name: "Are communication skills included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Technical Communication, English Language Skills, presentation practice and professional ethics are taught through a dedicated Language and Communication Laboratory alongside the science curriculum.",
      },
    },
    {
      "@type": "Question",
      name: "What higher education options are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Students building on Applied Science foundations can pursue M.Sc., M.Tech, MBA, Ph.D., research careers, international postgraduate study or roles in scientific research organizations.",
      },
    },
    {
      "@type": "Question",
      name: "How does the department support first-year engineering students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The department runs bridge courses, remedial classes and academic mentoring for first-year students, helping them transition from school-level science and mathematics into rigorous engineering coursework.",
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
    name: "Applied Science Department",
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
export default function AppliedSciencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eduOrgSchema) }} />

      <main className="appsci">
        {/* ---------------- HERO ---------------- */}
        <header className="appsci-hero">
          <div className="appsci-hero__grid" aria-hidden="true" />
          <div className="container appsci-hero__inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/academics">Academics</a>
              <span>/</span>
              <span aria-current="page">Applied Science</span>
            </nav>

            <div className="appsci-hero__content">
              <div className="appsci-hero__text">
                <p className="eyebrow eyebrow--light">DEPARTMENT · APPLIED SCIENCE</p>
                <h1>Department of Applied Science</h1>
                <p className="appsci-hero__lede">
                  Build a strong foundation in engineering mathematics, physics, chemistry,
                  environmental science, and scientific research through practical laboratory
                  experience, analytical learning, and interdisciplinary academic excellence.
                </p>
                <div className="appsci-hero__cta">
                  <a href="/admissions" className="btn btn--primary">Apply Now</a>
                  <a href="/downloads/PLRCT-brochure-applied-science.pdf" className="btn btn--ghost">Download Brochure</a>
                </div>
              </div>

              <aside className="spec-panel" aria-label="Applied Science department specification">
                <p className="spec-panel__title">DEPARTMENT DATASHEET</p>
                <SpecRow k="Role" v="Engineering Foundation Department" />
                <SpecRow k="Serves" v="All First-Year B.Tech Branches" />
                <SpecRow k="Approval" v="AICTE Approved Curriculum" />
                <SpecRow k="Laboratories" v="5 Dedicated Labs" />
                <SpecRow k="Focus Areas" v="Mathematics, Physics, Chemistry, Environment" />
                <SpecRow k="Location" v="Faridabad, Haryana (NCR)" />
              </aside>
            </div>
          </div>
        </header>

        <div className="container">
          <ImgPlaceholder label="Applied Science Department — PLRCT Faridabad" ratio="21/9" />
        </div>

        {/* ---------------- OVERVIEW ---------------- */}
        <section className="section" aria-labelledby="overview-h">
          <div className="container">
            <p className="eyebrow">DEPARTMENT OVERVIEW</p>
            <h2 id="overview-h">What is the Department of Applied Science at PLRCT?</h2>
            <p>
              The Department of Applied Science at PLRCT has stood as the academic foundation
              of engineering education at the college since its earliest years, teaching the
              mathematics, physics, chemistry and communication skills that every engineering
              branch is built on. What began as a basic first-year science curriculum has grown
              into a research-aware, laboratory-driven program covering engineering
              mathematics, semiconductor and quantum physics, materials chemistry, environmental
              science and professional communication — reflecting how foundational science
              itself has broadened to keep pace with modern, interdisciplinary engineering
              practice.
            </p>
            <p>
              Academic excellence in the department rests on a simple principle: abstract
              scientific concepts become durable knowledge only when tested in a laboratory or
              worked through by hand. Students do not just learn what a numerical method
              computes; they compute one. This foundation is deliberate — as the department that
              every incoming engineering student at PLRCT passes through, Applied Science shapes
              the analytical and problem-solving capacity that Computer Science, Electrical,
              Mechanical, Civil and Electronics students carry into their branch-specific
              coursework, serving learners across Faridabad, Ballabgarh, Gurugram, Noida, Palwal
              and the wider Haryana and Delhi NCR region.
            </p>
            <p>
              The department's scientific learning approach combines rigorous classroom
              instruction with hands-on laboratory practice, computational tools such as MATLAB,
              and a growing research culture in applied physics, materials science and
              environmental sustainability. Looking ahead, the department continues to
              strengthen its interdisciplinary links with emerging fields such as data science,
              renewable energy and computational engineering, ensuring the scientific foundation
              it builds remains relevant to where engineering careers are heading.
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
                To be recognized as a leading center of scientific and analytical foundation in
                Haryana, cultivating in every engineering student the mathematical rigor,
                scientific reasoning and research aptitude that underpin lasting innovation.
              </p>
            </div>
            <div>
              <p className="eyebrow">MISSION</p>
              <h2>Our mission</h2>
              <p>
                To deliver a rigorous, laboratory-grounded education in engineering mathematics,
                physics, chemistry, environmental science and communication — equipping every
                student with the analytical thinking, experimental skill and scientific
                curiosity needed to excel across any engineering discipline, research pathway or
                professional career.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- WHY CHOOSE ---------------- */}
        <section className="section" aria-labelledby="why-h">
          <div className="container">
            <p className="eyebrow">WHY CHOOSE APPLIED SCIENCE AT PLRCT</p>
            <h2 id="why-h">Built for the thinkers behind every engineer</h2>
            <div className="card-grid">
              {[
                { t: "Experienced Faculty", d: "Ph.D. qualified faculty with academic and research backgrounds guiding coursework, projects and mentoring." },
                { t: "Advanced Science Laboratories", d: "Five dedicated laboratories spanning physics, chemistry, mathematics, environmental science and communication." },
                { t: "Engineering Mathematics Excellence", d: "Rigorous training in calculus, differential equations, linear algebra and numerical methods." },
                { t: "Physics & Chemistry Practical Training", d: "Hands-on experiments in optics, semiconductor devices, electrochemistry and materials analysis." },
                { t: "Research-Oriented Education", d: "Faculty-guided research culture spanning applied physics, materials science and sustainability." },
                { t: "Interdisciplinary Learning", d: "A curriculum designed to support every engineering branch, not just one." },
                { t: "Communication Skill Development", d: "Dedicated language and communication laboratory building technical writing and presentation skills." },
                { t: "Academic Mentoring", d: "Bridge courses and remedial support helping every student build a solid first-year foundation." },
                { t: "Strong Engineering Foundation", d: "A scientific base that supports success in every subsequent year of the engineering program." },
              ].map((c) => (
                <div className="card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- PROGRAM HIGHLIGHTS ---------------- */}
        <section className="section section--tint" aria-labelledby="highlights-h">
          <div className="container">
            <p className="eyebrow">PROGRAM HIGHLIGHTS</p>
            <h2 id="highlights-h">Applied Science at a glance</h2>
            <div className="card-grid">
              <div className="card">
                <h3>Engineering Foundation Subjects</h3>
                <p>Mathematics, Physics, Chemistry, Communication Skills and Environmental Science taught to every incoming B.Tech student.</p>
              </div>
              <div className="card">
                <h3>Scientific Research Orientation</h3>
                <p>Analytical skill development and problem-solving approach woven into every laboratory and classroom session.</p>
              </div>
              <div className="card">
                <h3>Academic Excellence & Support</h3>
                <p>Practical laboratory training, interdisciplinary exposure and academic mentoring throughout the first year and beyond.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- CURRICULUM ---------------- */}
        <section className="section" aria-labelledby="curriculum-h">
          <div className="container">
            <p className="eyebrow">ACADEMIC CURRICULUM</p>
            <h2 id="curriculum-h">Five pillars of foundation science</h2>
            <div className="dept-grid">
              <article className="dept-card">
                <h3>Engineering Mathematics</h3>
                <p>Calculus, Differential Equations, Linear Algebra, Numerical Methods, Probability &amp; Statistics, and Engineering Mathematics Applications.</p>
              </article>
              <article className="dept-card">
                <h3>Engineering Physics</h3>
                <p>Semiconductor Physics, Optics, Quantum Physics, Materials Science, Electronics Physics and Modern Physics.</p>
              </article>
              <article className="dept-card">
                <h3>Engineering Chemistry</h3>
                <p>Electrochemistry, Polymer Chemistry, Environmental Chemistry, Materials Chemistry, Corrosion Engineering and Instrumental Analysis.</p>
              </article>
              <article className="dept-card">
                <h3>Communication & Professional Skills</h3>
                <p>Technical Communication, English Language Skills, Presentation Skills, Professional Ethics, Personality Development and Soft Skills.</p>
              </article>
              <article className="dept-card">
                <h3>Environmental Science</h3>
                <p>Environmental Engineering, Sustainability, Renewable Energy, Waste Management, Climate Studies and Green Technology.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ---------------- LABORATORIES ---------------- */}
        <section className="section section--tint" aria-labelledby="labs-h">
          <div className="container">
            <p className="eyebrow">LABORATORIES</p>
            <h2 id="labs-h">Five labs behind every engineering branch</h2>
            <div className="dept-grid">
              <article className="dept-card">
                <h3>Physics Laboratory</h3>
                <p>Optics experiments, semiconductor devices, electronics experiments, laser experiments and material testing.</p>
              </article>
              <article className="dept-card">
                <h3>Chemistry Laboratory</h3>
                <p>Chemical analysis, electrochemistry, polymer experiments, environmental testing and instrumental techniques.</p>
              </article>
              <article className="dept-card">
                <h3>Engineering Mathematics Laboratory</h3>
                <p>Mathematical modeling, numerical computation, MATLAB applications, engineering simulations and data analysis.</p>
              </article>
              <article className="dept-card">
                <h3>Environmental Science Laboratory</h3>
                <p>Water quality analysis, air quality monitoring, soil analysis, environmental testing and sustainability experiments.</p>
              </article>
              <article className="dept-card">
                <h3>Language & Communication Laboratory</h3>
                <p>English communication, technical writing, presentation practice, interview preparation and professional communication.</p>
              </article>
            </div>
            <div className="img-grid">
              <ImgPlaceholder label="Physics Laboratory" />
              <ImgPlaceholder label="Students Performing Experiments" />
              <ImgPlaceholder label="Chemistry Laboratory" />
            </div>
          </div>
        </section>

        {/* ---------------- LEARNING OUTCOMES & ENGINEERING INTEGRATION ---------------- */}
        <section className="section" aria-labelledby="outcomes-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">STUDENT LEARNING OUTCOMES</p>
              <h2 id="outcomes-h">What Applied Science builds in every student</h2>
              <p>
                Coursework and laboratory practice in the department develop analytical
                thinking, problem-solving, scientific reasoning, mathematical modeling,
                experimental skills, research aptitude and communication abilities — the same
                capacities that underpin success in every engineering discipline that follows.
              </p>
            </div>
            <div>
              <p className="eyebrow">ENGINEERING INTEGRATION</p>
              <h2>One foundation, every branch</h2>
              <p>
                Applied Science directly supports Computer Science Engineering, Electrical
                Engineering, Mechanical Engineering, Civil Engineering, Electronics &amp;
                Communication Engineering, Artificial Intelligence &amp; Machine Learning, Data
                Science and Information Technology, giving every branch the shared scientific
                and mathematical grounding its advanced coursework depends on.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="research-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">RESEARCH & INNOVATION</p>
              <h2 id="research-h">From coursework to independent inquiry</h2>
              <p>
                Faculty-guided research spans applied physics, materials science, environmental
                sustainability, computational mathematics, scientific instrumentation,
                renewable energy research and interdisciplinary engineering research, with
                pathways into publication or further study through PLRCT's{" "}
                <a href="/academics/mtech">M.Tech program</a>.
              </p>
            </div>
            <div>
              <p className="eyebrow">FACULTY EXPERTISE</p>
              <h2>Scientists mentoring engineers</h2>
              <p>
                Applied Science faculty bring Ph.D. qualifications, research publications,
                scientific research projects and interdisciplinary collaboration experience,
                mentoring students through coursework, early research exposure and academic
                decisions alike.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- STUDENT PROJECTS ---------------- */}
        <section className="section" aria-labelledby="projects-h">
          <div className="container">
            <p className="eyebrow">STUDENT PROJECTS</p>
            <h2 id="projects-h">From foundation science to applied work</h2>
            <div className="card-grid">
              {[
                { t: "Renewable Energy Studies", d: "Applied physics projects examining solar and other renewable energy systems." },
                { t: "Water Quality Analysis", d: "Environmental chemistry projects testing and analyzing local water samples." },
                { t: "Smart Material Research", d: "Materials science exploration of new or improved engineering materials." },
                { t: "Mathematical Modeling", d: "Numerical and computational modeling of real engineering problems." },
                { t: "Scientific Computing", d: "MATLAB and simulation-based projects supporting engineering analysis." },
                { t: "Environmental Sustainability Projects", d: "Applied research into waste management and green technology practices." },
                { t: "Physics-Based Engineering Applications", d: "Semiconductor and electronics physics projects with practical engineering use." },
              ].map((c) => (
                <div className="card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container">
          <div className="img-grid">
            <ImgPlaceholder label="Mathematics Laboratory" />
            <ImgPlaceholder label="Environmental Science Laboratory" />
            <ImgPlaceholder label="Faculty Interaction with Students" />
          </div>
        </div>

        {/* ---------------- ACADEMIC SUPPORT ---------------- */}
        <section className="section section--tint" aria-labelledby="support-h">
          <div className="container">
            <p className="eyebrow">ACADEMIC SUPPORT</p>
            <h2 id="support-h">Helping every student build a solid foundation</h2>
            <p>
              The department runs bridge courses and remedial classes to help first-year
              students transition confidently from school-level science and mathematics into
              rigorous engineering coursework, alongside research mentoring, competitive exam
              preparation, GATE foundation support and guidance toward higher education
              pathways.
            </p>
          </div>
        </section>

        {/* ---------------- CAREERS ---------------- */}
        <section className="section" aria-labelledby="career-h">
          <div className="container">
            <p className="eyebrow">CAREER OPPORTUNITIES</p>
            <h2 id="career-h">Where a strong scientific foundation leads</h2>
            <div className="card-grid">
              {[
                { t: "Research Scientist", d: "Conducting applied research in physics, chemistry, materials or environmental science." },
                { t: "Data Analyst", d: "Applying mathematical and statistical training to data-driven decision-making roles." },
                { t: "Scientific Officer", d: "Technical and research roles in government scientific and testing organizations." },
                { t: "Laboratory Specialist", d: "Leading laboratory operations, testing and quality control across industries." },
                { t: "Academic Researcher", d: "Pursuing teaching and research careers in higher education institutions." },
                { t: "Environmental Consultant", d: "Advising on sustainability, compliance and environmental impact for projects." },
                { t: "Quality Analyst", d: "Applying scientific rigor to quality assurance and testing roles in industry." },
                { t: "Technical Writer", d: "Translating scientific and engineering work into clear technical documentation." },
              ].map((c) => (
                <div className="card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- HIGHER EDUCATION & FACILITIES ---------------- */}
        <section className="section section--tint" aria-labelledby="higher-ed-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">HIGHER EDUCATION OPPORTUNITIES</p>
              <h2 id="higher-ed-h">Beyond the foundation years</h2>
              <p>
                Students building on Applied Science foundations pursue M.Sc., M.Tech, MBA,
                Ph.D. and research careers, international postgraduate education, roles in
                scientific research organizations, and competitive examinations including GATE
                and other national-level tests.
              </p>
            </div>
            <div>
              <p className="eyebrow">DEPARTMENT FACILITIES</p>
              <h2>Infrastructure built for scientific rigor</h2>
              <p>
                Modern laboratories, dedicated research facilities, digital classrooms,
                scientific instruments, strong library resources and seminar halls support both
                coursework and independent research throughout the program.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- STUDENT ACHIEVEMENTS ---------------- */}
        <section className="section" aria-labelledby="achievements-h">
          <div className="container">
            <p className="eyebrow">STUDENT ACHIEVEMENTS</p>
            <h2 id="achievements-h">A department that thinks and builds</h2>
            <p>
              Students regularly take part in science exhibitions, research publications,
              innovation competitions and national-level events, alongside strong academic
              excellence, project achievements and continued success in higher education
              admissions each year.
            </p>
          </div>
        </section>

        {/* ---------------- INTERNAL LINKS ---------------- */}
        <section className="section section--tint" aria-labelledby="explore-h">
          <div className="container">
            <p className="eyebrow">EXPLORE FURTHER</p>
            <h2 id="explore-h">Related programs &amp; departments</h2>
            <div className="link-grid">
              <a href="/academics/btech">B.Tech Programs</a>
              <a href="/academics/departments/cse">Computer Science Engineering</a>
              <a href="/academics/departments/ce">Civil Engineering</a>
              <a href="/academics/departments/mechanical">Mechanical Engineering</a>
              <a href="/academics/resources/laboratories">Laboratories</a>
              <a href="/academics/resources/curriculum">Curriculum</a>
              <a href="/academics/mtech">M.Tech Programs</a>
              <a href="/admissions">Admissions</a>
            </div>
          </div>
        </section>

        {/* ---------------- AEO ANSWER SECTIONS ---------------- */}
        <section className="section" aria-labelledby="answers-h">
          <div className="container">
            <p className="eyebrow">QUICK ANSWERS</p>
            <h2 id="answers-h">Applied Science at PLRCT — direct answers</h2>
            <div className="card-grid">
              <div className="card">
                <h3>What is Applied Science in engineering?</h3>
                <p>Applied Science is the foundation discipline covering mathematics, physics, chemistry and communication skills that every engineering branch relies on before moving into specialized coursework.</p>
              </div>
              <div className="card">
                <h3>Why choose PLRCT for Applied Science?</h3>
                <p>PLRCT offers a research-aware, AICTE approved curriculum, five dedicated laboratories, Ph.D. qualified faculty and structured academic support, positioned to prepare students for every B.Tech branch.</p>
              </div>
              <div className="card">
                <h3>What careers are available after Applied Science?</h3>
                <p>Students carry their scientific foundation into research, data analysis, laboratory, environmental consultancy and academic careers, alongside their primary engineering discipline.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ (10 QUESTIONS) ---------------- */}
        <section className="section section--tint" aria-labelledby="faq-h">
          <div className="container">
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-h">Applied Science at PLRCT — quick answers</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>What is the Department of Applied Science?</summary>
                <p>The department that builds the mathematics, physics, chemistry and communication foundation every PLRCT engineering student needs before specializing.</p>
              </details>
              <details className="faq-item">
                <summary>Which subjects are taught in Applied Science?</summary>
                <p>Engineering Mathematics, Engineering Physics, Engineering Chemistry, Technical Communication and English Language Skills, and Environmental Science.</p>
              </details>
              <details className="faq-item">
                <summary>Are laboratory facilities available?</summary>
                <p>Yes — Physics Laboratory, Chemistry Laboratory, Engineering Mathematics Laboratory, Environmental Science Laboratory and Language and Communication Laboratory.</p>
              </details>
              <details className="faq-item">
                <summary>How does Applied Science support engineering education?</summary>
                <p>It builds the analytical, scientific and communication foundation that Computer Science, Electrical, Mechanical, Civil and other engineering branches build upon.</p>
              </details>
              <details className="faq-item">
                <summary>Is research encouraged in the department?</summary>
                <p>Yes, through faculty-guided projects in applied physics, materials science, computational mathematics and environmental sustainability.</p>
              </details>
              <details className="faq-item">
                <summary>What career opportunities are available?</summary>
                <p>Research scientist, data analyst, scientific officer, laboratory specialist, environmental consultant and academic researcher roles, alongside core engineering careers.</p>
              </details>
              <details className="faq-item">
                <summary>Does the department help with GATE preparation?</summary>
                <p>Yes, the mathematics and physics foundation supports GATE readiness, with dedicated guidance and competitive exam preparation sessions.</p>
              </details>
              <details className="faq-item">
                <summary>Are communication skills included?</summary>
                <p>Yes, through Technical Communication, English Language Skills and a dedicated Language and Communication Laboratory.</p>
              </details>
              <details className="faq-item">
                <summary>What higher education options are available?</summary>
                <p>M.Sc., M.Tech, MBA, Ph.D., research careers, international education and roles in scientific research organizations.</p>
              </details>
              <details className="faq-item">
                <summary>How does the department support first-year engineering students?</summary>
                <p>Through bridge courses, remedial classes and academic mentoring that ease the transition from school-level science into engineering coursework.</p>
              </details>
            </div>
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section className="final-cta">
          <div className="container final-cta__inner">
            <div>
              <p className="eyebrow eyebrow--light">ADMISSIONS OPEN</p>
              <h2>Join the Department of Applied Science</h2>
              <p>Build a strong scientific and analytical foundation for a successful engineering career through advanced laboratories, research-oriented learning, interdisciplinary education, and academic excellence at Pt. L.R. College of Technology.</p>
            </div>
            <div className="final-cta__actions">
              <a href="/admissions" className="btn btn--gold">Apply for Admission</a>
              <a href="/contact" className="btn btn--outline-light">Contact the Department</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}