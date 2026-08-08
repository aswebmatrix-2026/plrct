import "./ce.css";

// ============================================================================
// SEO METADATA — Next.js 15 App Router
// ============================================================================
export const metadata = {
  title: "Civil Engineering College Faridabad | Best CE College PLRCT Haryana",
  description:
    "Civil Engineering (CE) at PLRCT, Faridabad — AICTE approved structural, construction, transportation, geotechnical and surveying engineering course with modern labs, industry mentoring and strong placement support. Serving Faridabad, Ballabgarh and Haryana.",
  alternates: {
    canonical: "https://ptlrct.com/academics/departments/ce",
  },
  openGraph: {
    title: "Civil Engineering (CE) at PLRCT Faridabad",
    description:
      "AICTE approved Civil Engineering department at PLRCT, Faridabad, with dedicated structural, concrete technology, geotechnical, transportation, surveying and environmental engineering laboratories.",
    url: "https://ptlrct.com/academics/departments/ce",
    siteName: "PLRCT (PLRCT)",
    images: [
      {
        url: "https://ptlrct.com/og/ce-department.jpg",
        width: 1200,
        height: 630,
        alt: "Civil Engineering Department at PLRCT Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Civil Engineering (CE) at PLRCT Faridabad",
    description:
      "AICTE approved Civil Engineering department at PLRCT, Faridabad, with structural, geotechnical, transportation, surveying and environmental engineering laboratories and strong placement support.",
    images: ["https://ptlrct.com/og/ce-department.jpg"],
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
    { "@type": "ListItem", position: 4, name: "Civil Engineering", item: "https://ptlrct.com/academics/departments/ce" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Civil Engineering available at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PLRCT offers an AICTE approved B.Tech in Civil Engineering in Faridabad covering structural engineering, construction technology, transportation engineering, geotechnical engineering, surveying and environmental engineering, supported by six dedicated laboratories.",
      },
    },
    {
      "@type": "Question",
      name: "What laboratories are available in the Civil Engineering department?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The department operates a Structural Engineering Laboratory, Concrete Technology Laboratory, Geotechnical Engineering Laboratory, Transportation Engineering Laboratory, Surveying Laboratory and Environmental Engineering Laboratory.",
      },
    },
    {
      "@type": "Question",
      name: "Does the department provide industrial training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, students undergo industrial training with construction companies, infrastructure developers, highway and metro projects, and government engineering departments across Faridabad, Delhi NCR and Haryana.",
      },
    },
    {
      "@type": "Question",
      name: "What are the placement opportunities after Civil Engineering at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Graduates are placed as structural, site, project and highway engineers with construction and infrastructure companies, alongside opportunities in government departments, PSUs and consultancy firms, supported by PLRCT's Training and Placement Cell.",
      },
    },
    {
      "@type": "Question",
      name: "Is surveying training included in the Civil Engineering course?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the department runs a dedicated Surveying Laboratory covering total station, GPS surveying, theodolite and leveling work, along with field survey camps.",
      },
    },
    {
      "@type": "Question",
      name: "Are construction site visits conducted for students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, regular site visits to construction projects, highway works and infrastructure developments are organized alongside classroom and laboratory learning.",
      },
    },
    {
      "@type": "Question",
      name: "What software is used in the Civil Engineering department?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Students train on AutoCAD, Civil 3D and structural design and estimation software as part of coursework and dedicated workshops.",
      },
    },
    {
      "@type": "Question",
      name: "Are internships compulsory for Civil Engineering students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Industrial training and internships are a required part of the curriculum, giving every student direct exposure to live construction and infrastructure projects before graduation.",
      },
    },
    {
      "@type": "Question",
      name: "What is the average placement support provided by PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PLRCT's Training and Placement Cell provides AutoCAD and Civil 3D training, structural design preparation, government exam guidance, resume building, mock interviews and industry mentoring ahead of recruitment drives.",
      },
    },
    {
      "@type": "Question",
      name: "Can students pursue M.Tech after graduation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, graduates can pursue M.Tech in structural, geotechnical, transportation or environmental engineering, along with MBA, Ph.D., GATE-based opportunities and professional certifications.",
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
    name: "Civil Engineering Department",
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
export default function CEPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eduOrgSchema) }} />

      <main className="ce">
        {/* ---------------- HERO ---------------- */}
        <header className="ce-hero">
          <div className="ce-hero__grid" aria-hidden="true" />
          <div className="container ce-hero__inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/academics">Academics</a>
              <span>/</span>
              <span aria-current="page">Civil Engineering</span>
            </nav>

            <div className="ce-hero__content">
              <div className="ce-hero__text">
                <p className="eyebrow eyebrow--light">DEPARTMENT · CIVIL ENGINEERING</p>
                <h1>Department of Civil Engineering</h1>
                <p className="ce-hero__lede">
                  Build expertise in structural engineering, construction management,
                  transportation systems, geotechnical engineering, surveying, environmental
                  engineering, and sustainable infrastructure through practical learning,
                  advanced laboratories, and industry-oriented education.
                </p>
                <div className="ce-hero__cta">
                  <a href="/admissions" className="btn btn--primary">Apply Now</a>
                  <a href="/downloads/PLRCT-brochure-ce.pdf" className="btn btn--ghost">Download Brochure</a>
                </div>
              </div>

              <aside className="spec-panel" aria-label="Civil Engineering department specification">
                <p className="spec-panel__title">DEPARTMENT DATASHEET</p>
                <SpecRow k="Degree Offered" v="B.Tech (Civil Engineering)" />
                <SpecRow k="Duration" v="4 Years / 8 Semesters" />
                <SpecRow k="Approval" v="AICTE Approved" />
                <SpecRow k="Laboratories" v="6 Dedicated Labs" />
                <SpecRow k="Focus Areas" v="Structures, Construction, Transportation, Geotech" />
                <SpecRow k="Location" v="Faridabad, Haryana (NCR)" />
              </aside>
            </div>
          </div>
        </header>

        <div className="container">
          <ImgPlaceholder label="Civil Engineering Department Building — PLRCT Faridabad" ratio="21/9" />
        </div>

        {/* ---------------- OVERVIEW ---------------- */}
        <section className="section" aria-labelledby="overview-h">
          <div className="container">
            <p className="eyebrow">DEPARTMENT OVERVIEW</p>
            <h2 id="overview-h">What is Civil Engineering at PLRCT?</h2>
            <p>
              The Department of Civil Engineering at PLRCT has grown alongside Faridabad's own
              evolution as a fast-developing infrastructure and construction hub within Delhi
              NCR. What began as a foundational program in structural design and surveying has
              expanded into a full civil engineering course covering structural analysis,
              construction technology, transportation systems, geotechnical engineering,
              environmental engineering and sustainable infrastructure development — mirroring
              how the discipline itself has broadened to meet the demands of modern urban
              growth, highway expansion and green building practice.
            </p>
            <p>
              Academic excellence in the department rests on a simple principle: every concept
              taught in a classroom is tested in a laboratory or on a field site. Students do
              not just learn what a compaction test measures; they run one. This industry
              relevance is deliberate — as one of the AICTE approved civil engineering colleges
              serving Faridabad, Ballabgarh, Gurugram, Noida, Palwal and the wider Haryana
              region, PLRCT's CE department is positioned to place graduates directly into the
              construction, infrastructure and government engineering ecosystem that surrounds
              the campus in Delhi NCR.
            </p>
            <p>
              The department's practical learning approach combines structural laboratories,
              concrete technology testing, geotechnical fieldwork, surveying camps and
              construction site visits with a modern, AICTE-oriented curriculum. Looking ahead,
              coursework continues to expand into smart infrastructure, earthquake-resistant
              design and sustainable construction — areas where regional and national hiring
              demand for civil engineers continues to grow fastest, from highway and metro
              corridors to residential and commercial real estate.
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
                To be recognized as a leading Civil Engineering department in Haryana,
                producing graduates capable of designing, building and managing the structures
                and infrastructure that modern cities and industry depend on.
              </p>
            </div>
            <div>
              <p className="eyebrow">MISSION</p>
              <h2>Our mission</h2>
              <p>
                To deliver a rigorous, field-tested civil engineering education through modern
                laboratories, experienced faculty and sustained industry collaboration —
                equipping every student with both the technical depth and the professional
                readiness to succeed in structural design, construction management, government
                service, research or entrepreneurship.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- WHY CHOOSE ---------------- */}
        <section className="section" aria-labelledby="why-h">
          <div className="container">
            <p className="eyebrow">WHY CHOOSE CIVIL ENGINEERING AT PLRCT</p>
            <h2 id="why-h">Built for graduates who can actually build</h2>
            <div className="card-grid">
              {[
                { t: "Experienced Faculty", d: "A faculty team with academic and site-level industry backgrounds guiding coursework, projects and research." },
                { t: "Modern Civil Engineering Laboratories", d: "Six dedicated laboratories spanning structures, concrete, geotechnical, transportation, surveying and environmental engineering." },
                { t: "Construction Technology Training", d: "Hands-on exposure to modern construction methods, materials and site practices." },
                { t: "Structural Engineering Exposure", d: "Beam, column and concrete testing alongside structural analysis and design coursework." },
                { t: "Industry-Oriented Curriculum", d: "A syllabus that tracks current construction and infrastructure practice across India." },
                { t: "Surveying & Field Training", d: "Total station, GPS surveying, theodolite and leveling practice through regular field camps." },
                { t: "Internship Support", d: "Structured industrial training placements with construction and infrastructure organizations." },
                { t: "Placement Assistance", d: "Aptitude, technical interview and resume training focused specifically on civil engineering hiring." },
                { t: "Project-Based Learning", d: "Coursework anchored in real design, estimation and construction problems, not just theory." },
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
            <h2 id="highlights-h">Civil Engineering program at a glance</h2>
            <div className="card-grid">
              <div className="card">
                <h3>Duration & Eligibility</h3>
                <p>4-year, 8-semester B.Tech program. Eligibility: 10+2 with Physics, Chemistry and Mathematics at the required percentage, with a valid JEE Main score or applicable state counseling.</p>
              </div>
              <div className="card">
                <h3>AICTE Approved Curriculum</h3>
                <p>A structured, regularly updated syllabus aligned with AICTE norms and current infrastructure industry practice.</p>
              </div>
              <div className="card">
                <h3>Practical Training & Placement</h3>
                <p>Laboratory training, industrial exposure, internship support, final-year project work and dedicated placement guidance throughout the program.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- CURRICULUM ---------------- */}
        <section className="section" aria-labelledby="curriculum-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">CURRICULUM</p>
              <h2 id="curriculum-h">Semester structure &amp; core subjects</h2>
              <p>
                The first year covers common engineering fundamentals shared across all B.Tech
                branches. From the second year, civil-specific core subjects begin: Engineering
                Mechanics, Strength of Materials, Surveying and Structural Analysis, followed by
                Reinforced Cement Concrete (RCC), Steel Structures, Geotechnical Engineering,
                Transportation and Highway Engineering, Environmental Engineering and Water
                Resources Engineering in later semesters.
              </p>
            </div>
            <div>
              <p className="eyebrow">ELECTIVES, PROJECTS &amp; INDUSTRY EXPOSURE</p>
              <h2>Depth where it matters</h2>
              <p>
                Later semesters add Construction Technology, Estimation &amp; Costing and
                Project Management, alongside elective baskets in structural design,
                sustainable infrastructure or transportation planning. Minor projects begin in
                the second year, building toward a major final-year project, alongside
                mandatory industrial training, survey camps and site visits connecting
                classroom learning to live construction and infrastructure work.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- LABORATORIES ---------------- */}
        <section className="section section--tint" aria-labelledby="labs-h">
          <div className="container">
            <p className="eyebrow">LABORATORIES</p>
            <h2 id="labs-h">Six labs, one discipline</h2>
            <div className="dept-grid">
              <article className="dept-card">
                <h3>Structural Engineering Laboratory</h3>
                <p>Beam testing, column testing, concrete testing and structural analysis practice on real specimens and models.</p>
              </article>
              <article className="dept-card">
                <h3>Concrete Technology Laboratory</h3>
                <p>Cement testing, aggregate testing, mix design and quality control procedures for concrete used in construction.</p>
              </article>
              <article className="dept-card">
                <h3>Geotechnical Engineering Laboratory</h3>
                <p>Soil testing, compaction tests, shear tests and foundation analysis for real ground conditions.</p>
              </article>
              <article className="dept-card">
                <h3>Transportation Engineering Laboratory</h3>
                <p>Bitumen testing, pavement material analysis, traffic studies and road construction evaluation.</p>
              </article>
              <article className="dept-card">
                <h3>Surveying Laboratory</h3>
                <p>Total station, GPS surveying, theodolite, leveling and land surveying practice through classroom and field exercises.</p>
              </article>
              <article className="dept-card">
                <h3>Environmental Engineering Laboratory</h3>
                <p>Water quality analysis, wastewater treatment study, air quality testing and environmental monitoring.</p>
              </article>
            </div>
            <div className="img-grid">
              <ImgPlaceholder label="Structural Engineering Laboratory" />
              <ImgPlaceholder label="Students Performing Surveying" />
              <ImgPlaceholder label="Concrete Technology Lab" />
            </div>
          </div>
        </section>

        {/* ---------------- WORKSHOPS, INDUSTRY, INTERNSHIPS, PROJECTS ---------------- */}
        <section className="section" aria-labelledby="workshops-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">WORKSHOPS &amp; PRACTICAL TRAINING</p>
              <h2 id="workshops-h">Skill-building beyond the syllabus</h2>
              <p>
                Regular survey camps, construction site visits, material testing workshops,
                CAD training, structural design workshops and estimation and costing practice
                give Civil Engineering students hands-on skills beyond the prescribed
                curriculum, keeping technical practice current with real construction demands.
              </p>
            </div>
            <div>
              <p className="eyebrow">INDUSTRIAL TRAINING &amp; INTERNSHIPS</p>
              <h2>Learning alongside working construction teams</h2>
              <p>
                The department arranges industrial training with construction companies,
                infrastructure developers, highway projects, real estate developers, government
                engineering departments, metro and bridge projects, and environmental
                consulting firms across Faridabad, Delhi NCR and Haryana — giving students
                direct exposure to live sites before graduation.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--tint" aria-labelledby="research-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">RESEARCH &amp; INNOVATION</p>
              <h2 id="research-h">From coursework to independent work</h2>
              <p>
                Faculty-guided research spans sustainable infrastructure, smart cities, green
                buildings, earthquake-resistant structures, transportation planning, water
                resource management, environmental sustainability and construction automation,
                with pathways into publication or further study through PLRCT's{" "}
                <a href="/academics/mtech">M.Tech program</a>.
              </p>
            </div>
            <div>
              <p className="eyebrow">FACULTY EXPERTISE</p>
              <h2>Mentors with real site experience</h2>
              <p>
                Civil Engineering faculty bring a mix of academic qualifications, industry
                experience, research publications and consultancy project work, mentoring
                students through coursework, design projects and career decisions alike.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- STUDENT PROJECTS ---------------- */}
        <section className="section" aria-labelledby="projects-h">
          <div className="container">
            <p className="eyebrow">STUDENT PROJECTS</p>
            <h2 id="projects-h">From coursework to independent design work</h2>
            <div className="card-grid">
              {[
                { t: "Smart Drainage Systems", d: "Design projects addressing urban waterlogging and drainage efficiency." },
                { t: "Sustainable Building Design", d: "Green building concepts balancing energy efficiency and material use." },
                { t: "Bridge Model Analysis", d: "Structural analysis and scaled model testing of bridge designs." },
                { t: "Traffic Management Systems", d: "Transportation planning projects addressing local traffic flow." },
                { t: "Rainwater Harvesting", d: "Water resource conservation designs for campus and community use." },
                { t: "Green Concrete", d: "Experimentation with sustainable, low-carbon concrete mix alternatives." },
                { t: "Structural Health Monitoring", d: "Sensor-based approaches to monitoring structural integrity over time." },
                { t: "Smart Infrastructure Projects", d: "Technology-integrated approaches to modern infrastructure design." },
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
            <ImgPlaceholder label="Construction Site Training" />
            <ImgPlaceholder label="Infrastructure Project Visit" />
            <ImgPlaceholder label="Faculty Interaction with Students" />
          </div>
        </div>

        {/* ---------------- INDUSTRY COLLABORATION ---------------- */}
        <section className="section section--tint" aria-labelledby="industry-h">
          <div className="container">
            <p className="eyebrow">INDUSTRY COLLABORATION</p>
            <h2 id="industry-h">Working alongside India's infrastructure leaders</h2>
            <p>
              The department maintains collaboration with leading construction and
              infrastructure organizations including L&amp;T Construction, DLF, NBCC, CPWD,
              PWD Haryana, NHAI, DMRC, Tata Projects, Shapoorji Pallonji, Afcons Infrastructure
              and Reliance Infrastructure — giving students internship placements, guest
              sessions and exposure to live construction and infrastructure projects across
              Faridabad, Delhi NCR and Haryana before graduation.
            </p>
          </div>
        </section>

        {/* ---------------- CAREERS ---------------- */}
        <section className="section" aria-labelledby="career-h">
          <div className="container">
            <p className="eyebrow">CAREER OPPORTUNITIES</p>
            <h2 id="career-h">Where a Civil Engineering degree leads</h2>
            <div className="card-grid">
              {[
                { t: "Structural Engineer", d: "Designing and analyzing structural systems for buildings and infrastructure. ₹3.5–9 LPA to start, rising with design experience." },
                { t: "Construction & Site Engineer", d: "Managing construction execution, quality and schedules on live sites. ₹3–7 LPA to start." },
                { t: "Highway & Transportation Engineer", d: "Planning and executing road, highway and transit infrastructure. ₹3.5–8 LPA to start." },
                { t: "Geotechnical Engineer", d: "Assessing soil and foundation conditions for construction projects. ₹3.5–8 LPA to start." },
                { t: "Survey & Planning Engineer", d: "Field surveying, mapping and layout planning for infrastructure work. ₹3–6 LPA to start." },
                { t: "Government & PSU Engineer", d: "Technical roles in PWD, CPWD, NHAI, DMRC and other public infrastructure bodies with stable, structured career growth." },
                { t: "Quantity Surveyor & Estimator", d: "Cost estimation, budgeting and quantity surveying for construction projects." },
                { t: "Higher Education & Research", d: "Progression into M.Tech, GATE-based PSU roles, research or infrastructure consultancy." },
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
        <section className="section section--tint" aria-labelledby="placement-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">PLACEMENT SUPPORT</p>
              <h2 id="placement-h">Getting site-ready and hire-ready, early</h2>
              <p>
                The Training and Placement Cell runs AutoCAD and Civil 3D training, structural
                design preparation, government exam guidance, resume building, mock interviews
                and industry mentoring specifically tuned to civil engineering hiring, well
                ahead of final placement drives. Potential recruiters include L&amp;T
                Construction, DLF, NBCC, CPWD, NHAI, Tata Projects, Shapoorji Pallonji and
                Afcons Infrastructure.
              </p>
            </div>
            <div>
              <p className="eyebrow">HIGHER EDUCATION OPPORTUNITIES</p>
              <h2>Beyond the B.Tech degree</h2>
              <p>
                Graduates can pursue M.Tech in structural, geotechnical, transportation or
                environmental engineering, MBA in infrastructure or project management, Ph.D.
                and research careers, international postgraduate study, professional
                certifications, or GATE-based entry into PSUs and government engineering
                services.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- FACILITIES & ACHIEVEMENTS ---------------- */}
        <section className="section" aria-labelledby="facilities-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">DEPARTMENT FACILITIES</p>
              <h2 id="facilities-h">Infrastructure built for infrastructure engineers</h2>
              <p>
                Smart classrooms, six advanced laboratories, AutoCAD and Civil software access,
                dedicated research and project laboratories, modern survey equipment and strong
                library resources support both coursework and independent project work
                throughout the program.
              </p>
            </div>
            <div>
              <p className="eyebrow">STUDENT ACHIEVEMENTS</p>
              <h2>A department that competes and builds</h2>
              <p>
                Students regularly take part in technical and design competitions, survey
                camps, research publications and national-level events, alongside strong
                placement outcomes and industrial project participation each year.
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
              <a href="/academics/departments/electrical">Electrical Engineering</a>
              <a href="/academics/departments/cse">Computer Science Engineering</a>
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
            <h2 id="answers-h">Civil Engineering at PLRCT — direct answers</h2>
            <div className="card-grid">
              <div className="card">
                <h3>What is Civil Engineering?</h3>
                <p>Civil Engineering is the branch of engineering focused on designing, constructing and maintaining buildings, roads, bridges, water systems and other infrastructure that society depends on.</p>
              </div>
              <div className="card">
                <h3>Why choose PLRCT for Civil Engineering?</h3>
                <p>PLRCT offers an AICTE approved curriculum, six dedicated laboratories, structured industrial training and a focused placement cell, positioned within Delhi NCR's active construction and infrastructure market.</p>
              </div>
              <div className="card">
                <h3>What careers are available after Civil Engineering?</h3>
                <p>Graduates can work as structural, site, highway, geotechnical or survey engineers, pursue government and PSU roles, or continue into M.Tech, research or infrastructure consultancy.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ (10 QUESTIONS) ---------------- */}
        <section className="section section--tint" aria-labelledby="faq-h">
          <div className="container">
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-h">Civil Engineering at PLRCT — quick answers</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>Is Civil Engineering available at PLRCT?</summary>
                <p>Yes, PLRCT offers an AICTE approved B.Tech in Civil Engineering in Faridabad covering structural, construction, transportation, geotechnical and environmental engineering.</p>
              </details>
              <details className="faq-item">
                <summary>What laboratories are available?</summary>
                <p>Structural Engineering Laboratory, Concrete Technology Laboratory, Geotechnical Engineering Laboratory, Transportation Engineering Laboratory, Surveying Laboratory and Environmental Engineering Laboratory.</p>
              </details>
              <details className="faq-item">
                <summary>Does the department provide industrial training?</summary>
                <p>Yes, with construction companies, infrastructure developers, highway and metro projects, and government engineering departments across Faridabad and Delhi NCR.</p>
              </details>
              <details className="faq-item">
                <summary>What are the placement opportunities?</summary>
                <p>Roles include structural, site, highway and geotechnical engineer positions with construction and infrastructure companies, plus government and PSU opportunities.</p>
              </details>
              <details className="faq-item">
                <summary>Is surveying training included?</summary>
                <p>Yes, through a dedicated Surveying Laboratory covering total station, GPS surveying, theodolite and leveling, along with field survey camps.</p>
              </details>
              <details className="faq-item">
                <summary>Are construction site visits conducted?</summary>
                <p>Yes, regular visits to construction and infrastructure sites are organized alongside laboratory and classroom learning.</p>
              </details>
              <details className="faq-item">
                <summary>What software is used in the department?</summary>
                <p>AutoCAD, Civil 3D and structural design and estimation software are used across coursework and dedicated workshops.</p>
              </details>
              <details className="faq-item">
                <summary>Are internships compulsory?</summary>
                <p>Yes, industrial training and internships are a required part of the curriculum for every student.</p>
              </details>
              <details className="faq-item">
                <summary>What is the average placement support?</summary>
                <p>AutoCAD and Civil 3D training, structural design preparation, government exam guidance, resume building, mock interviews and industry mentoring.</p>
              </details>
              <details className="faq-item">
                <summary>Can students pursue M.Tech after graduation?</summary>
                <p>Yes, through PLRCT's M.Tech program in structural, geotechnical, transportation or environmental engineering, or external postgraduate programs.</p>
              </details>
            </div>
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section className="final-cta">
          <div className="container final-cta__inner">
            <div>
              <p className="eyebrow eyebrow--light">ADMISSIONS OPEN</p>
              <h2>Join the Department of Civil Engineering</h2>
              <p>Build a successful engineering career with advanced laboratories, surveying and construction training, industry exposure, research opportunities, and excellent placement support at Pt. L.R. College of Technology.</p>
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