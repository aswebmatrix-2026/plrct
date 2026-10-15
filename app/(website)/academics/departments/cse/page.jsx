import "./cse.css";
<<<<<<< HEAD
import Image from "next/image";
=======

>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88
// ============================================================================
// SEO METADATA — Next.js 15 App Router
// ============================================================================
export const metadata = {
  title: "Computer Science Engineering Faridabad | Best CSE College Pt. L.R. College of Technology Haryana",
  description:
    "Computer Science Engineering (CSE) at Pt. L.R. College of Technology, Faridabad — AICTE approved software engineering course with programming, AI, cloud and cybersecurity labs, industry mentoring and strong placement support. Serving Faridabad, Ballabgarh and Haryana.",
  alternates: {
    canonical: "https://ptlrct.com/academics/departments/cse",
  },
  openGraph: {
    title: "Computer Science Engineering (CSE) at Pt. L.R. College of Technology Faridabad",
    description:
      "AICTE approved CSE department at Pt. L.R. College of Technology, Faridabad, with dedicated programming, database, AI, cloud and cybersecurity laboratories.",
    url: "https://ptlrct.com/academics/departments/cse",
    siteName: "Pt. L.R. College of Technology (Pt. L.R. College of Technology)",
    images: [
      {
        url: "https://ptlrct.com/og/cse-department.jpg",
        width: 1200,
        height: 630,
        alt: "Computer Science Engineering Department at Pt. L.R. College of Technology Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Computer Science Engineering (CSE) at Pt. L.R. College of Technology Faridabad",
    description:
      "AICTE approved CSE department at Pt. L.R. College of Technology, Faridabad, with programming, database, AI, cloud and cybersecurity laboratories and strong placement support.",
    images: ["https://ptlrct.com/og/cse-department.jpg"],
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
    { "@type": "ListItem", position: 4, name: "Computer Science Engineering", item: "https://ptlrct.com/academics/departments/cse" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is CSE at Pt. L.R. College of Technology?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Computer Science Engineering at Pt. L.R. College of Technology is an AICTE approved B.Tech department in Faridabad covering programming, data structures, databases, artificial intelligence, cloud computing and cybersecurity, supported by dedicated laboratories and industry mentoring.",
      },
    },
    {
      "@type": "Question",
      name: "Is Pt. L.R. College of Technology a good CSE college in Haryana?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pt. L.R. College of Technology's CSE department combines an AICTE approved curriculum, five dedicated laboratories, structured industry collaboration and a focused Training and Placement Cell, making it a strong option among CSE colleges in Faridabad and the wider Haryana region.",
      },
    },
    {
      "@type": "Question",
      name: "What is the eligibility for CSE admission at Pt. L.R. College of Technology?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Admission to the CSE department follows Pt. L.R. College of Technology's B.Tech eligibility: 10+2 with Physics, Chemistry and Mathematics at the required percentage, along with a valid JEE Main score or the applicable state counseling process.",
      },
    },
    {
      "@type": "Question",
      name: "What laboratories does the CSE department have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CSE department at Pt. L.R. College of Technology operates a Programming Lab, Database Lab, AI Lab, Cloud Computing Lab and Cybersecurity Lab, giving students hands-on practice across the discipline's major areas.",
      },
    },
    {
      "@type": "Question",
      name: "What career opportunities are available after CSE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CSE graduates from Pt. L.R. College of Technology can pursue roles such as software engineer, AI engineer, data scientist, cloud engineer and cybersecurity analyst, along with government exams, PSU opportunities, higher studies or entrepreneurship.",
      },
    },
    {
      "@type": "Question",
      name: "Does Pt. L.R. College of Technology's CSE department offer industry collaboration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the CSE department maintains collaboration with IT and software companies across Faridabad, Gurugram, Noida and Delhi NCR for internships, guest sessions and placement drives.",
      },
    },
    {
      "@type": "Question",
      name: "What software course is taught in CSE at Pt. L.R. College of Technology?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CSE curriculum covers a full software engineering course including programming languages, data structures, algorithms, database management, operating systems, software engineering practices, AI and machine learning, and cloud computing.",
      },
    },
    {
      "@type": "Question",
      name: "What is the placement support for CSE students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pt. L.R. College of Technology's Training and Placement Cell provides CSE students with aptitude training, technical interview preparation, resume building support and coordinated on-campus recruitment drives with IT and product companies.",
      },
    },
  ],
};

const eduOrgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Pt. L.R. College of Technology",
  alternateName: "Pt. L.R. College of Technology",
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
    name: "Computer Science Engineering Department",
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
export default function CSEPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eduOrgSchema) }} />

      <main className="cse">
        {/* ---------------- HERO ---------------- */}
        <header className="cse-hero">
          <div className="cse-hero__grid" aria-hidden="true" />
          <div className="container cse-hero__inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/academics">Academics</a>
              <span>/</span>
              <span aria-current="page">Computer Science Engineering</span>
            </nav>

            <div className="cse-hero__content">
              <div className="cse-hero__text">
                <p className="eyebrow eyebrow--light">DEPARTMENT · COMPUTER SCIENCE</p>
                <h1>Computer Science Engineering</h1>
                <p className="cse-hero__lede">
                  A software-first engineering department in Faridabad building programmers,
                  AI engineers and cloud specialists through programming labs, database systems,
                  artificial intelligence and cybersecurity coursework, backed by dedicated
                  placement support.
                </p>
                <div className="cse-hero__cta">
<<<<<<< HEAD
                  <a href="/contact" className="btn btn--primary">Enquiry Now</a>
=======
                  <a href="/admissions" className="btn btn--primary">Apply Now</a>
>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88
                  <a href="/downloads/Pt. L.R. College of Technology-brochure-cse.pdf" className="btn btn--ghost">Download Brochure</a>
                </div>
              </div>

              <aside className="spec-panel" aria-label="CSE department specification">
                <p className="spec-panel__title">DEPARTMENT DATASHEET</p>
                <SpecRow k="Degree Offered" v="B.Tech (CSE)" />
                <SpecRow k="Duration" v="4 Years / 8 Semesters" />
                <SpecRow k="Approval" v="AICTE Approved" />
                <SpecRow k="Laboratories" v="5 Dedicated Labs" />
                <SpecRow k="Focus Areas" v="Software, AI, Cloud, Security" />
                <SpecRow k="Location" v="Faridabad, Haryana (NCR)" />
              </aside>
            </div>
          </div>
        </header>

        <div className="container">
<<<<<<< HEAD
          <Image
  src="/images/Busy Modern College Computer Lab.webp"
  alt="Students working in the programming lab at Pt. L.R. College of Technology"
  width={1200}
  height={600}
  priority
  style={{ width: "100%", height: "auto", marginTop: "35px", borderRadius: "15px" }}
/>
=======
          <ImgPlaceholder label="CSE Department Building — Pt. L.R. College of Technology Faridabad" ratio="21/9" />
>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88
        </div>

        {/* ---------------- OVERVIEW ---------------- */}
        <section className="section" aria-labelledby="overview-h">
          <div className="container">
            <p className="eyebrow">DEPARTMENT OVERVIEW</p>
            <h2 id="overview-h">What is CSE at Pt. L.R. College of Technology?</h2>
            <p>
              The Computer Science Engineering department at Pt. L.R. College of Technology has
              grown alongside Faridabad's own transformation into a technology and software hub
              within Delhi NCR. What began as a foundational programming curriculum has expanded
              into a full software engineering course covering data structures, databases,
              operating systems, artificial intelligence, cloud computing and cybersecurity —
              reflecting how the discipline itself has broadened over the last decade.
            </p>
            <p>
              Academic excellence in the department is built on a simple principle: every concept
              taught in a classroom is reinforced in a lab. Students don't just learn what a
              database index is; they build one. This industry relevance is deliberate — as one
              of the AICTE approved CSE colleges serving Faridabad, Ballabgarh, Gurugram, Noida
              and the wider Haryana region, Pt. L.R. College of Technology's CSE department is positioned to place graduates
              directly into the software and IT ecosystem that surrounds the campus.
            </p>
            <p>
              Looking ahead, the department continues to expand its coursework into artificial
              intelligence, cloud infrastructure and applied cybersecurity, areas where regional
              and national hiring demand continues to grow fastest among engineering disciplines.
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
                To be recognized as a leading Computer Science Engineering department in Haryana,
                producing graduates capable of designing, building and securing the software
                systems that modern industry depends on.
              </p>
            </div>
            <div>
              <p className="eyebrow">MISSION</p>
              <h2>Our mission</h2>
              <p>
                To deliver a rigorous, hands-on computer science education through modern
                laboratories, experienced faculty and sustained industry collaboration — equipping
                every student with both the technical depth and the professional readiness to
                succeed in software engineering, research or entrepreneurship.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- WHY CHOOSE ---------------- */}
        <section className="section" aria-labelledby="why-h">
          <div className="container">
            <p className="eyebrow">WHY CHOOSE CSE AT Pt. L.R. College of Technology</p>
            <h2 id="why-h">Built for graduates who can actually ship code</h2>
            <div className="card-grid">
              {[
                { t: "Experienced Faculty", d: "A faculty team with academic and industry backgrounds guiding coursework, projects and research." },
                { t: "Five Modern Laboratories", d: "Programming, database, AI, cloud computing and cybersecurity labs equipped for hands-on practice." },
                { t: "Industry-Oriented Curriculum", d: "A syllabus that tracks current software practice, from cloud-native development to applied AI." },
                { t: "Research Opportunities", d: "Faculty-guided projects and paper publication support for students interested in going deeper." },
                { t: "Practical, Project-Based Learning", d: "Coursework anchored in building real systems, not just studying theory." },
                { t: "Dedicated Placement Support", d: "Aptitude, technical interview and resume training focused specifically on software hiring." },
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
                branches. From the second year, CSE-specific core subjects begin: programming
                languages, data structures and algorithms, discrete mathematics, computer
                organization, and database management systems, followed by operating systems,
                software engineering, computer networks, and artificial intelligence in later
                semesters.
              </p>
            </div>
            <div>
              <p className="eyebrow">ELECTIVES, PROJECTS &amp; INDUSTRY EXPOSURE</p>
              <h2>Depth where it matters</h2>
              <p>
                Elective baskets let students specialize further in areas such as machine
                learning, cloud computing, cybersecurity or mobile application development.
                Minor projects begin in the second year, building toward a major final-year
                project, alongside mandatory industrial training and internships connecting
                classroom learning to real software teams.
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
                <h3>Programming Lab</h3>
                <p>Core coding practice across languages and paradigms, from first-year fundamentals to advanced problem solving.</p>
              </article>
              <article className="dept-card">
                <h3>Database Lab</h3>
                <p>Hands-on design, querying and optimization of relational and non-relational database systems.</p>
              </article>
              <article className="dept-card">
                <h3>AI Lab</h3>
                <p>Applied machine learning and artificial intelligence projects using real datasets and modern frameworks.</p>
              </article>
              <article className="dept-card">
                <h3>Cloud Computing Lab</h3>
                <p>Deployment, scaling and management practice on cloud infrastructure and containerized environments.</p>
              </article>
              <article className="dept-card">
                <h3>Cybersecurity Lab</h3>
                <p>Security fundamentals, vulnerability analysis and secure system design practice.</p>
              </article>
            </div>
<<<<<<< HEAD
            <div className="img-grid" style={{marginTop:"25px",borderRadius: "50%"}}>
           <img
            src="/images/computerlab.webp"
             alt="Programming Lab"
            />

          <img
           src="/images/student.webp"
            alt="Students in Lab Session"
            />

          <img
          src="/images/auditorium.webp"
          alt="Faculty Guiding a Project"
           />
          </div>
=======
            <div className="img-grid">
              <ImgPlaceholder label="Programming Lab" />
              <ImgPlaceholder label="Students in Lab Session" />
              <ImgPlaceholder label="Faculty Guiding a Project" />
            </div>
>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88
          </div>
        </section>

        {/* ---------------- WORKSHOPS, INDUSTRY, INTERNSHIPS, PROJECTS ---------------- */}
        <section className="section section--tint" aria-labelledby="workshops-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">WORKSHOPS &amp; PRACTICAL TRAINING</p>
              <h2 id="workshops-h">Skill-building beyond the syllabus</h2>
              <p>
                Regular workshops in emerging tools and frameworks, coding bootcamps and hackathons
                give CSE students practice beyond the prescribed curriculum, keeping technical
                skills current with industry practice.
              </p>
            </div>
            <div>
              <p className="eyebrow">INDUSTRY COLLABORATIONS &amp; INTERNSHIPS</p>
              <h2>Learning alongside working software teams</h2>
              <p>
                The department maintains collaboration with IT and software companies across
                Faridabad, Gurugram, Noida and Delhi NCR, giving students internship placements
                and exposure to production-grade software development practices before
                graduation.
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
                Student projects range from web and mobile applications to machine learning
                models and security tools, many developed under faculty guidance with an eye
                toward publication or further research through Pt. L.R. College of Technology's{" "}
                <a href="/academics/mtech">M.Tech program</a>.
              </p>
            </div>
            <div>
              <p className="eyebrow">FACULTY EXPERTISE</p>
              <h2>Mentors with real technical depth</h2>
              <p>
                CSE faculty bring a mix of academic research backgrounds and industry experience
                across software development, AI and systems, mentoring students through
                coursework, projects and career decisions alike.
              </p>
            </div>
          </div>
        </section>

<<<<<<< HEAD
      
=======
        <div className="container">
          <div className="img-grid">
            <ImgPlaceholder label="Industrial Visit — IT Company" />
            <ImgPlaceholder label="Technical Event / Hackathon" />
            <ImgPlaceholder label="Student Project Showcase" />
          </div>
        </div>

>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88
        {/* ---------------- CAREERS ---------------- */}
        <section className="section section--tint" aria-labelledby="career-h">
          <div className="container">
            <p className="eyebrow">CAREER OPPORTUNITIES</p>
            <h2 id="career-h">Where a CSE degree leads</h2>
            <div className="card-grid">
              {[
                { t: "Software Engineer", d: "Building and maintaining applications across web, mobile and enterprise systems." },
                { t: "AI Engineer", d: "Designing and deploying machine learning models and intelligent systems." },
                { t: "Data Scientist", d: "Extracting insight from data using statistical and machine learning methods." },
                { t: "Cloud & Network Engineer", d: "Managing cloud infrastructure, deployment pipelines and network systems." },
                { t: "Government & PSU Roles", d: "Technical positions in public sector undertakings and government IT departments." },
                { t: "Higher Education & Entrepreneurship", d: "Progression into M.Tech, research, or founding a technology venture." },
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
                software hiring, well ahead of final placement drives.
              </p>
            </div>
            <div>
              <p className="eyebrow">DEPARTMENT FACILITIES &amp; ACHIEVEMENTS</p>
              <h2>A department that competes and wins</h2>
              <p>
                Beyond its labs, the CSE department hosts technical events and hackathons where
                students regularly place in inter-college competitions, alongside strong
                participation in coding contests and industry-sponsored challenges.
              </p>
            </div>
          </div>
        </section>

<<<<<<< HEAD
=======
        {/* ---------------- INTERNAL LINKS ---------------- */}
>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88
        <section className="section section--tint" aria-labelledby="explore-h">
          <div className="container">
            <p className="eyebrow">EXPLORE FURTHER</p>
            <h2 id="explore-h">Related programs &amp; departments</h2>
            <div className="link-grid">
              <a href="/academics/btech">B.Tech Programs</a>
<<<<<<< HEAD
              <a href="/academics/departments/me">Mechanical Engineering</a>
              <a href="/academics/departments/ee">Electronics Engineering</a>
              <a href="/academics/departments/cse">Computer Science Engineering</a>
              <a href="/academics/departments/applied-science">Applied Science</a>
              <a href="/academics/departments/ce">Civil Engineering</a>
              <a href="/academics/mtech">M.Tech Programs</a>
              <a href="/academics/diploma">Diploma Programs</a>
            </div>
          </div>
        </section>
        
=======
              <a href="/academics/departments/aiml">AI &amp; Machine Learning</a>
              <a href="/academics/departments/data-science">Data Science</a>
              <a href="/academics/departments/it">Information Technology</a>
              <a href="/academics/resources/laboratories">Laboratories</a>
              <a href="/academics/resources/curriculum">Curriculum</a>
              <a href="/academics/mtech">M.Tech Programs</a>
              <a href="/admissions">Admissions</a>
            </div>
          </div>
        </section>
>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88

        {/* ---------------- FAQ (10 QUESTIONS) ---------------- */}
        <section className="section" aria-labelledby="faq-h">
          <div className="container">
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-h">CSE at Pt. L.R. College of Technology — quick answers</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>What is CSE at Pt. L.R. College of Technology?</summary>
                <p>An AICTE approved B.Tech department in Faridabad covering programming, databases, AI, cloud computing and cybersecurity.</p>
              </details>
              <details className="faq-item">
                <summary>Is Pt. L.R. College of Technology a good CSE college in Haryana?</summary>
                <p>Yes — an AICTE approved curriculum, five dedicated labs, industry collaboration and a focused placement cell support strong outcomes.</p>
              </details>
              <details className="faq-item">
                <summary>What is the eligibility for CSE admission?</summary>
                <p>10+2 with Physics, Chemistry and Mathematics at the required percentage, plus a valid JEE Main score or state counseling.</p>
              </details>
              <details className="faq-item">
                <summary>What laboratories does CSE have?</summary>
                <p>Programming Lab, Database Lab, AI Lab, Cloud Computing Lab and Cybersecurity Lab.</p>
              </details>
              <details className="faq-item">
                <summary>What careers follow a CSE degree?</summary>
                <p>Software engineer, AI engineer, data scientist, cloud engineer and cybersecurity analyst roles, plus government, PSU and entrepreneurship paths.</p>
              </details>
              <details className="faq-item">
                <summary>Does CSE offer industry collaboration?</summary>
                <p>Yes, with IT and software companies across Faridabad, Gurugram, Noida and Delhi NCR for internships and placements.</p>
              </details>
              <details className="faq-item">
                <summary>What software engineering course does Pt. L.R. College of Technology teach?</summary>
                <p>Programming, data structures, algorithms, databases, operating systems, software engineering, AI/ML and cloud computing.</p>
              </details>
              <details className="faq-item">
                <summary>What is the placement support for CSE students?</summary>
                <p>Aptitude training, technical interview prep, resume building and coordinated recruitment drives with IT companies.</p>
              </details>
              <details className="faq-item">
                <summary>Can CSE students pursue higher studies?</summary>
                <p>Yes, through Pt. L.R. College of Technology's M.Tech program or external postgraduate and research programs.</p>
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
              <h2>Start your Computer Science Engineering journey at Pt. L.R. College of Technology</h2>
<<<<<<< HEAD
              <p>Seats in the CSE department are limited for the upcoming academic year. Enquiry Now or download the department brochure.</p>
            </div>
            <div className="final-cta__actions">
              <a href="/contact" className="btn btn--gold">Enquiry Now</a>
=======
              <p>Seats in the CSE department are limited for the upcoming academic year. Apply now or download the department brochure.</p>
            </div>
            <div className="final-cta__actions">
              <a href="/admissions" className="btn btn--gold">Apply Now</a>
>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88
              <a href="/downloads/Pt. L.R. College of Technology-brochure-cse.pdf" className="btn btn--outline-light">Download Brochure</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}