import "./ece.css";

// ============================================================================
// SEO METADATA — Next.js 15 App Router
// ============================================================================
export const metadata = {
  title: "Electronics & Communication Engineering Faridabad | Best ECE College PLRCT Haryana",
  description:
    "Electronics and Communication Engineering (ECE) at PLRCT, Faridabad — AICTE approved engineering course with embedded systems, IoT, VLSI, wireless communication and semiconductor labs, industry collaboration and strong placement support. Serving Faridabad, Ballabgarh, Gurugram, Noida and Haryana.",
  alternates: {
    canonical: "https://ptlrct.com/academics/departments/ece",
  },
  openGraph: {
    title: "Electronics & Communication Engineering (ECE) at PLRCT Faridabad",
    description:
      "AICTE approved ECE department at PLRCT, Faridabad, with dedicated embedded systems, VLSI, communication systems and IoT & robotics laboratories.",
    url: "https://ptlrct.com/academics/departments/ece",
    siteName: "PLRCT (PLRCT)",
    images: [
      {
        url: "https://ptlrct.com/og/ece-department.jpg",
        width: 1200,
        height: 630,
        alt: "Electronics and Communication Engineering Department at PLRCT Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Electronics & Communication Engineering (ECE) at PLRCT Faridabad",
    description:
      "AICTE approved ECE department at PLRCT, Faridabad, with embedded systems, VLSI, wireless communication and IoT laboratories and strong placement support.",
    images: ["https://ptlrct.com/og/ece-department.jpg"],
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
    { "@type": "ListItem", position: 4, name: "Electronics & Communication Engineering", item: "https://ptlrct.com/academics/departments/ece" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Electronics and Communication Engineering available at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PLRCT offers an AICTE approved B.Tech in Electronics and Communication Engineering in Faridabad, covering embedded systems, VLSI, communication engineering, IoT and semiconductor technology, supported by six dedicated laboratories.",
      },
    },
    {
      "@type": "Question",
      name: "What laboratories are available in the ECE department?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The department operates an Electronic Devices Laboratory, Digital Electronics Laboratory, Embedded Systems Laboratory, Communication Systems Laboratory, VLSI & Semiconductor Laboratory and an IoT & Robotics Laboratory.",
      },
    },
    {
      "@type": "Question",
      name: "Does the department provide industrial training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, students complete mandatory industrial training and internships with electronics manufacturing, telecom, semiconductor, embedded systems, IoT and automation organisations, alongside classroom and laboratory learning.",
      },
    },
    {
      "@type": "Question",
      name: "What are the placement opportunities for ECE students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ECE graduates are prepared for roles such as embedded systems engineer, VLSI design engineer, IoT engineer, RF and communication engineer, and telecom engineer, with placement support through aptitude training, mock interviews and industry mentoring.",
      },
    },
    {
      "@type": "Question",
      name: "Is VLSI training included in the ECE curriculum?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, VLSI design is covered through dedicated coursework and the VLSI & Semiconductor Laboratory, where students work with IC design concepts, FPGA boards and HDL programming.",
      },
    },
    {
      "@type": "Question",
      name: "Are IoT and embedded systems covered in the program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Embedded systems and Internet of Things are core focus areas of the department, taught through dedicated subjects and practised in the Embedded Systems Laboratory and the IoT & Robotics Laboratory using Arduino, Raspberry Pi and sensor networks.",
      },
    },
    {
      "@type": "Question",
      name: "What software and hardware platforms are used in the labs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Students work with microcontroller boards such as Arduino and Raspberry Pi, FPGA kits, HDL simulation tools, communication trainer kits, and standard circuit design and simulation software used across the electronics industry.",
      },
    },
    {
      "@type": "Question",
      name: "Are internships compulsory for ECE students at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Industrial training and internships are a required part of the ECE curriculum, giving students structured exposure to electronics, telecom and embedded systems organisations before graduation.",
      },
    },
    {
      "@type": "Question",
      name: "What is the placement support offered to ECE students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Training and Placement Cell provides technical interview preparation, VLSI and embedded systems focused coaching, IoT project guidance, resume building, mock interviews and coordinated recruitment drives.",
      },
    },
    {
      "@type": "Question",
      name: "Can ECE students pursue M.Tech after graduation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, graduates can progress to PLRCT's M.Tech program or pursue postgraduate study, GATE-based admissions, professional certifications, MBA or Ph.D. research in electronics and communication related fields.",
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
    name: "Electronics and Communication Engineering Department",
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

const RECRUITERS = [
  "Samsung", "Intel", "Qualcomm", "Texas Instruments", "Nokia", "Ericsson",
  "Bosch", "Siemens", "Tata Communications", "Airtel", "Reliance Jio",
];

// ============================================================================
// PAGE
// ============================================================================
export default function ECEPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eduOrgSchema) }} />

      <main className="ece">
        {/* ---------------- HERO ---------------- */}
        <header className="ece-hero">
          <div className="ece-hero__grid" aria-hidden="true" />
          <div className="container ece-hero__inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/academics">Academics</a>
              <span>/</span>
              <span aria-current="page">Electronics &amp; Communication Engineering</span>
            </nav>

            <div className="ece-hero__content">
              <div className="ece-hero__text">
                <p className="eyebrow eyebrow--light">DEPARTMENT · ELECTRONICS &amp; COMMUNICATION</p>
                <h1>Department of Electronics and Communication Engineering</h1>
                <p className="ece-hero__lede">
                  Develop expertise in embedded systems, IoT, VLSI, wireless communication, signal
                  processing and semiconductor technologies through practical learning, modern
                  laboratories and industry-oriented education in Faridabad.
                </p>
                <div className="ece-hero__cta">
                  <a href="/admissions" className="btn btn--primary">Apply Now</a>
                  <a href="/downloads/PLRCT-brochure-ece.pdf" className="btn btn--ghost">Download Brochure</a>
                </div>
              </div>

              <aside className="spec-panel" aria-label="ECE department specification">
                <p className="spec-panel__title">DEPARTMENT DATASHEET</p>
                <SpecRow k="Degree Offered" v="B.Tech (ECE)" />
                <SpecRow k="Duration" v="4 Years / 8 Semesters" />
                <SpecRow k="Approval" v="AICTE Approved" />
                <SpecRow k="Laboratories" v="6 Dedicated Labs" />
                <SpecRow k="Focus Areas" v="Embedded, VLSI, IoT, Comms" />
                <SpecRow k="Location" v="Faridabad, Haryana (NCR)" />
              </aside>
            </div>
          </div>
        </header>

        <div className="container">
          <ImgPlaceholder label="Electronics Laboratory — PLRCT Faridabad" ratio="21/9" />
        </div>

        {/* ---------------- OVERVIEW ---------------- */}
        <section className="section" aria-labelledby="overview-h">
          <div className="container">
            <p className="eyebrow">DEPARTMENT OVERVIEW</p>
            <h2 id="overview-h">What is Electronics and Communication Engineering at PLRCT?</h2>
            <p>
              The Department of Electronics and Communication Engineering at Pt. L.R. College of
              Technology has grown alongside Faridabad's evolution into a manufacturing, electronics
              and technology corridor within Delhi NCR. What began as a core electronics curriculum
              built on devices, circuits and communication fundamentals has expanded into a
              comprehensive program covering embedded systems, VLSI design, wireless communication,
              digital signal processing and Internet of Things engineering — mirroring how the
              discipline itself has broadened to meet demand from semiconductor, telecom and
              automation industries.
            </p>
            <p>
              Academic excellence in the department rests on one principle: every concept introduced
              in the classroom is reinforced on the workbench. Students don't just study how an
              amplifier behaves or how a microcontroller schedules interrupts; they build the circuit,
              flash the firmware and debug the result. This AICTE-oriented, industry-relevant approach
              is deliberate — as one of the recognised ECE colleges serving Faridabad, Ballabgarh,
              Gurugram, Noida, Palwal and the wider Haryana region, PLRCT positions its ECE graduates
              to move directly into electronics manufacturing, embedded systems, telecom and
              semiconductor roles across Delhi NCR.
            </p>
            <p>
              The department's infrastructure reflects this practical learning approach: six dedicated
              laboratories spanning devices, digital electronics, embedded systems, communication
              systems, VLSI and semiconductor technology, and IoT and robotics, supported by faculty
              who bring both academic research and industry experience into every session.
            </p>
            <p>
              Looking ahead, the department continues to deepen its coursework in embedded systems,
              IoT, VLSI and wireless communication — including 5G-adjacent concepts and AI-enabled
              hardware — areas where regional and national hiring demand continues to accelerate
              fastest among electronics disciplines.
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
                To be recognised as a leading Electronics and Communication Engineering department in
                Haryana, producing engineers capable of designing, building and deploying the
                embedded, communication and semiconductor systems that power modern industry.
              </p>
            </div>
            <div>
              <p className="eyebrow">MISSION</p>
              <h2>Our mission</h2>
              <p>
                To deliver a rigorous, hands-on electronics education through modern laboratories,
                experienced faculty and sustained industry collaboration — equipping every student
                with the technical depth and professional readiness needed to succeed in embedded
                systems, VLSI, communication engineering, research or entrepreneurship.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- WHY CHOOSE ---------------- */}
        <section className="section" aria-labelledby="why-h">
          <div className="container">
            <p className="eyebrow">WHY CHOOSE ECE AT PLRCT</p>
            <h2 id="why-h">Built for engineers who can design, build and debug hardware</h2>
            <div className="card-grid">
              {[
                { t: "Experienced Faculty", d: "A faculty team combining academic research and industry experience across electronics, embedded systems and communication engineering." },
                { t: "Six Modern Laboratories", d: "Devices, digital electronics, embedded systems, communication systems, VLSI & semiconductor, and IoT & robotics labs equipped for hands-on practice." },
                { t: "Embedded Systems Training", d: "Structured coursework and lab practice on microcontrollers, real-time firmware and hardware interfacing." },
                { t: "IoT & Automation Exposure", d: "Sensor networks, smart devices and wireless connectivity practice through the IoT & Robotics Laboratory." },
                { t: "VLSI & Semiconductor Learning", d: "IC design fundamentals, FPGA programming and HDL practice preparing students for chip-design careers." },
                { t: "Industry-Oriented Curriculum", d: "A syllabus tracking current electronics practice, from wireless communication to semiconductor technology." },
                { t: "Internship Support", d: "Mandatory industrial training placements with electronics, telecom and embedded systems organisations." },
                { t: "Placement Assistance", d: "A dedicated Training and Placement Cell preparing students for embedded, VLSI and communication interviews." },
                { t: "Project-Based Learning", d: "Coursework anchored in building real circuits and systems rather than studying theory in isolation." },
                { t: "Research Opportunities", d: "Faculty-guided projects and publication support for students exploring embedded, IoT, VLSI or wireless research." },
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
            <h2 id="highlights-h">B.Tech ECE at a glance</h2>
            <aside className="spec-panel" style={{ background: "var(--color-white)", border: "1px solid #e5e9f0" }}>
              <p className="spec-panel__title" style={{ color: "var(--color-primary)" }}>PROGRAM DATASHEET</p>
              <SpecRow k="Duration" v="4 Years / 8 Semesters" />
              <SpecRow k="Eligibility" v="10+2 with PCM, valid JEE Main / state counseling" />
              <SpecRow k="Curriculum" v="AICTE approved" />
              <SpecRow k="Laboratory Training" v="Practical, semester-wise" />
              <SpecRow k="Industrial Exposure" v="Mandatory internship" />
              <SpecRow k="Project Work" v="Minor + major final-year project" />
              <SpecRow k="Placement Guidance" v="Dedicated T&P Cell" />
            </aside>
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
                branches, alongside an introduction to electronics and circuit theory. From the
                second year, ECE-specific core subjects begin: electronic devices, digital
                electronics, analog circuits and network analysis, followed by signals and systems,
                microprocessors and microcontrollers, embedded systems, communication engineering,
                VLSI design, wireless communication, digital signal processing, antenna and wave
                propagation, optical communication and semiconductor technology in later semesters.
              </p>
              <p>
                Each subject is paired with a corresponding laboratory so that theory is reinforced
                immediately through measurement, simulation or hardware implementation, rather than
                being left as abstract classroom material until final examinations.
              </p>
            </div>
            <div>
              <p className="eyebrow">ELECTIVES, PROJECTS &amp; INDUSTRY EXPOSURE</p>
              <h2>Depth where it matters</h2>
              <p>
                Elective baskets let students specialise further in areas such as VLSI design,
                embedded systems, IoT and automation, or wireless and optical communication. Minor
                projects begin in the second year, building toward a major final-year project,
                alongside mandatory industrial training and internships connecting classroom
                learning to real electronics and communication teams.
              </p>
              <p>
                By the final year, students are expected to combine several subject areas into a
                single working system — for example, an embedded controller communicating over a
                wireless link and processing sensor data in real time — reflecting how electronics
                projects are actually built in industry.
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
                <h3>Electronic Devices Laboratory</h3>
                <p>Hands-on practice with the building blocks of analog electronics.</p>
                <ul>
                  <li>Diodes</li>
                  <li>Transistors</li>
                  <li>Amplifiers</li>
                  <li>Circuit analysis</li>
                </ul>
              </article>
              <article className="dept-card">
                <h3>Digital Electronics Laboratory</h3>
                <p>Design and testing of the logic that underpins every digital system.</p>
                <ul>
                  <li>Logic circuits</li>
                  <li>Flip-flops</li>
                  <li>Counters</li>
                  <li>Digital design</li>
                </ul>
              </article>
              <article className="dept-card">
                <h3>Embedded Systems Laboratory</h3>
                <p>Firmware and hardware interfacing practice on industry-standard boards.</p>
                <ul>
                  <li>Arduino</li>
                  <li>Raspberry Pi</li>
                  <li>Microcontrollers</li>
                  <li>Embedded programming</li>
                </ul>
              </article>
              <article className="dept-card">
                <h3>Communication Systems Laboratory</h3>
                <p>Practical exposure to analog and wireless communication techniques.</p>
                <ul>
                  <li>AM/FM communication</li>
                  <li>Modulation</li>
                  <li>Demodulation</li>
                  <li>Wireless communication</li>
                </ul>
              </article>
              <article className="dept-card">
                <h3>VLSI &amp; Semiconductor Laboratory</h3>
                <p>Chip-design fundamentals for students heading toward semiconductor careers.</p>
                <ul>
                  <li>IC design</li>
                  <li>FPGA</li>
                  <li>HDL programming</li>
                  <li>Semiconductor devices</li>
                </ul>
              </article>
              <article className="dept-card">
                <h3>IoT &amp; Robotics Laboratory</h3>
                <p>Connected-device and automation practice using real sensor networks.</p>
                <ul>
                  <li>Sensors</li>
                  <li>IoT devices</li>
                  <li>Wireless communication</li>
                  <li>Smart automation</li>
                </ul>
              </article>
            </div>
            <div className="img-grid">
              <ImgPlaceholder label="Embedded Systems Lab" />
              <ImgPlaceholder label="VLSI &amp; Semiconductor Lab" />
              <ImgPlaceholder label="IoT &amp; Robotics Lab" />
            </div>
          </div>
        </section>

        {/* ---------------- WORKSHOPS & INDUSTRIAL TRAINING ---------------- */}
        <section className="section" aria-labelledby="workshops-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">WORKSHOPS &amp; PRACTICAL TRAINING</p>
              <h2 id="workshops-h">Skill-building beyond the syllabus</h2>
              <p>
                Regular workshops in PCB design, embedded programming, IoT development, communication
                systems, hardware interfacing and automation give ECE students practice beyond the
                prescribed curriculum, keeping technical skills current with industry practice.
              </p>
            </div>
            <div>
              <p className="eyebrow">INDUSTRIAL TRAINING</p>
              <h2>Learning inside working electronics teams</h2>
              <p>
                Students complete mandatory industrial training with electronics manufacturing
                industries, telecom companies, semiconductor companies, embedded systems firms, IoT
                companies, automation industries and communication technology organisations,
                connecting coursework to production-grade practice before graduation.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- RESEARCH & FACULTY ---------------- */}
        <section className="section section--tint" aria-labelledby="research-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">RESEARCH &amp; INNOVATION</p>
              <h2 id="research-h">From coursework to independent work</h2>
              <p>
                Faculty-guided research spans embedded systems, IoT, wireless communication, 5G-related
                technologies, VLSI and semiconductor research, robotics, AI-enabled hardware and smart
                communication systems, with publication support for students who want to go further
                through PLRCT's <a href="/academics/mtech">M.Tech program</a>.
              </p>
            </div>
            <div>
              <p className="eyebrow">FACULTY EXPERTISE</p>
              <h2>Mentors with real technical depth</h2>
              <p>
                ECE faculty bring qualified academic backgrounds combined with industry experience,
                research publications and consultancy projects, mentoring students through coursework,
                laboratory work, projects and career decisions alike.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- STUDENT PROJECTS ---------------- */}
        <section className="section" aria-labelledby="projects-h">
          <div className="container">
            <p className="eyebrow">STUDENT PROJECTS</p>
            <h2 id="projects-h">What students build</h2>
            <p>
              Student projects range across the department's core focus areas, including smart home
              automation systems, IoT-based monitoring solutions, wireless sensor networks, FPGA-based
              designs, embedded robotics, smart communication devices, digital signal processing
              applications and AI-enabled embedded systems — many developed under faculty guidance
              with an eye toward inter-college competitions or further research.
            </p>
            <div className="img-grid">
              <ImgPlaceholder label="Students Working with Electronic Circuits" />
              <ImgPlaceholder label="Communication Systems Project" />
              <ImgPlaceholder label="Industrial Training Visit" />
            </div>
          </div>
        </section>

        {/* ---------------- INDUSTRY COLLABORATION ---------------- */}
        <section className="section section--tint" aria-labelledby="industry-h">
          <div className="container">
            <p className="eyebrow">INDUSTRY COLLABORATION</p>
            <h2 id="industry-h">Learning alongside global electronics leaders</h2>
            <p>
              The department maintains collaboration and outreach with organisations across
              electronics manufacturing, semiconductors, telecom and communication technology,
              including ISRO-related research opportunities, giving students internship placements
              and exposure to production-grade engineering practice before graduation.
            </p>
            <div className="recruiter-strip">
              {RECRUITERS.map((r) => (
                <span className="recruiter-chip" key={r}>{r}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- PLACEMENT SUPPORT ---------------- */}
        <section className="section" aria-labelledby="placement-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">PLACEMENT SUPPORT</p>
              <h2 id="placement-h">Getting hire-ready, early</h2>
              <p>
                The Training and Placement Cell runs technical training, embedded systems preparation,
                VLSI interview preparation, IoT project guidance, resume building sessions, mock
                interviews and industry mentoring specifically tuned to electronics and communication
                hiring, well ahead of final placement drives.
              </p>
            </div>
            <div>
              <p className="eyebrow">DEPARTMENT FACILITIES &amp; ACHIEVEMENTS</p>
              <h2>A department that competes and wins</h2>
              <p>
                Beyond its six laboratories, the department offers smart classrooms, research and
                project laboratories, and library resources, while students regularly participate in
                embedded systems and IoT innovation competitions, technical events and national-level
                contests, alongside research publications and strong placement outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- CAREERS ---------------- */}
        <section className="section section--tint" aria-labelledby="career-h">
          <div className="container">
            <p className="eyebrow">CAREER OPPORTUNITIES</p>
            <h2 id="career-h">Where an ECE degree leads</h2>
            <div className="card-grid">
              {[
                { t: "Embedded Systems Engineer", d: "Designing and programming microcontroller-based systems for products and industrial equipment.", s: "₹4–10 LPA" },
                { t: "VLSI Design Engineer", d: "Working on integrated circuit design, verification and semiconductor chip development.", s: "₹5–12 LPA" },
                { t: "IoT Engineer", d: "Building connected-device solutions across sensors, gateways and cloud platforms.", s: "₹4–9 LPA" },
                { t: "Communication Engineer", d: "Designing and maintaining wired and wireless communication systems.", s: "₹4–8 LPA" },
                { t: "RF Engineer", d: "Working on radio-frequency design for telecom and wireless infrastructure.", s: "₹5–10 LPA" },
                { t: "Network Engineer", d: "Managing and optimising communication and data networks.", s: "₹4–8 LPA" },
                { t: "Signal Processing Engineer", d: "Developing algorithms for audio, image and communication signal systems.", s: "₹5–11 LPA" },
                { t: "Electronics Design Engineer", d: "Designing circuits and PCBs for consumer and industrial electronics.", s: "₹4–8 LPA" },
                { t: "Automation Engineer", d: "Building automated control systems for manufacturing and industrial processes.", s: "₹4–9 LPA" },
                { t: "Telecom Engineer", d: "Supporting and expanding telecom infrastructure and network operations.", s: "₹4–8 LPA" },
                { t: "Semiconductor Engineer", d: "Working on chip fabrication, testing and semiconductor device development.", s: "₹5–12 LPA" },
                { t: "Research Engineer", d: "Contributing to applied research in embedded, wireless or semiconductor technologies.", s: "₹4–9 LPA" },
                { t: "Hardware Engineer", d: "Designing and testing electronic hardware for products and systems.", s: "₹4–9 LPA" },
                { t: "Electronics Consultant", d: "Advising organisations on electronics design, automation and system integration.", s: "₹6–14 LPA" },
              ].map((c) => (
                <div className="card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <span className="salary-badge">{c.s} indicative</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "var(--space-3)", fontSize: "0.85rem", color: "#6b7280" }}>
              Salary ranges are indicative industry estimates for entry to mid-level roles in India and
              vary by employer, location and experience.
            </p>
          </div>
        </section>

        {/* ---------------- DEPARTMENT FACILITIES & ACHIEVEMENTS ---------------- */}
        <section className="section" aria-labelledby="facilities-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">DEPARTMENT FACILITIES</p>
              <h2 id="facilities-h">Infrastructure built for hands-on electronics</h2>
              <p>
                Beyond its six core laboratories, the department maintains smart classrooms for
                theory sessions, dedicated project and research laboratories for final-year and
                faculty-guided work, and library resources covering electronics, communication and
                embedded systems literature, giving students the infrastructure to move from
                coursework into independent project work without leaving campus.
              </p>
            </div>
            <div>
              <p className="eyebrow">STUDENT ACHIEVEMENTS</p>
              <h2>Recognised beyond the classroom</h2>
              <p>
                ECE students have represented the department in technical competitions, embedded
                systems and IoT innovation challenges, and national-level participation events,
                alongside research publications, industrial project work and consistent placement
                achievements that reflect the department's practical, project-based approach to
                electronics education.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- HIGHER EDUCATION ---------------- */}
        <section className="section" aria-labelledby="higher-ed-h">
          <div className="container">
            <p className="eyebrow">HIGHER EDUCATION OPPORTUNITIES</p>
            <h2 id="higher-ed-h">Beyond the B.Tech</h2>
            <p>
              Graduates can progress into M.Tech specialisations, an MBA for management-track careers,
              or Ph.D. research in electronics and communication related fields. Others pursue GATE
              qualification for postgraduate admissions and PSU recruitment, professional
              certifications in VLSI or embedded systems, or international education opportunities in
              electronics, telecommunications and semiconductor engineering.
            </p>
          </div>
        </section>

        {/* ---------------- AEO ANSWER BLOCK ---------------- */}
        <section className="section section--tint" aria-labelledby="answers-h">
          <div className="container">
            <p className="eyebrow">QUICK ANSWERS</p>
            <h2 id="answers-h">ECE at PLRCT, explained simply</h2>
            <div className="two-col">
              <div>
                <h3>What is Electronics and Communication Engineering?</h3>
                <p>
                  Electronics and Communication Engineering is the branch of engineering focused on
                  electronic devices, circuits, communication systems, embedded systems and
                  semiconductor technology used across telecom, IoT, automation and consumer
                  electronics.
                </p>
                <h3>Why choose PLRCT for ECE?</h3>
                <p>
                  PLRCT combines an AICTE approved curriculum with six dedicated laboratories, mandatory
                  industrial training, faculty with industry experience and a placement cell focused
                  specifically on electronics and communication hiring.
                </p>
              </div>
              <div>
                <h3>Does PLRCT provide industrial training?</h3>
                <p>
                  Yes, industrial training and internships with electronics, telecom, semiconductor and
                  automation organisations are a required part of the ECE curriculum.
                </p>
                <h3>What careers are available after ECE?</h3>
                <p>
                  Graduates can pursue roles including embedded systems engineer, VLSI design engineer,
                  IoT engineer, RF engineer, telecom engineer and semiconductor engineer, along with
                  higher studies and research careers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- INTERNAL LINKS ---------------- */}
        <section className="section" aria-labelledby="explore-h">
          <div className="container">
            <p className="eyebrow">EXPLORE FURTHER</p>
            <h2 id="explore-h">Related programs &amp; departments</h2>
            <div className="link-grid">
              <a href="/academics/btech">B.Tech Programs</a>
              <a href="/academics/departments/cse">Computer Science Engineering</a>
              <a href="/academics/departments/aiml">AI &amp; Machine Learning</a>
              <a href="/academics/departments/it">Information Technology</a>
              <a href="/academics/resources/laboratories">Laboratories</a>
              <a href="/academics/resources/curriculum">Curriculum</a>
              <a href="/academics/mtech">M.Tech Programs</a>
              <a href="/admissions">Admissions</a>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ (10 QUESTIONS) ---------------- */}
        <section className="section section--tint" aria-labelledby="faq-h">
          <div className="container">
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-h">ECE at PLRCT — quick answers</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>Is Electronics and Communication Engineering available at PLRCT?</summary>
                <p>Yes, an AICTE approved B.Tech in ECE is offered in Faridabad, covering embedded systems, VLSI, communication engineering, IoT and semiconductor technology.</p>
              </details>
              <details className="faq-item">
                <summary>What laboratories are available?</summary>
                <p>Electronic Devices, Digital Electronics, Embedded Systems, Communication Systems, VLSI &amp; Semiconductor, and IoT &amp; Robotics laboratories.</p>
              </details>
              <details className="faq-item">
                <summary>Does the department provide industrial training?</summary>
                <p>Yes, mandatory industrial training and internships with electronics, telecom, semiconductor and automation organisations are part of the curriculum.</p>
              </details>
              <details className="faq-item">
                <summary>What are the placement opportunities?</summary>
                <p>Roles such as embedded systems engineer, VLSI design engineer, IoT engineer, RF engineer and telecom engineer, supported by a dedicated placement cell.</p>
              </details>
              <details className="faq-item">
                <summary>Is VLSI training included?</summary>
                <p>Yes, through dedicated coursework and the VLSI &amp; Semiconductor Laboratory covering IC design, FPGA and HDL programming.</p>
              </details>
              <details className="faq-item">
                <summary>Are IoT and embedded systems covered?</summary>
                <p>Yes, taught through dedicated subjects and practised in the Embedded Systems Laboratory and IoT &amp; Robotics Laboratory.</p>
              </details>
              <details className="faq-item">
                <summary>What software and hardware platforms are used?</summary>
                <p>Arduino, Raspberry Pi, FPGA kits, HDL simulation tools, communication trainer kits and standard circuit design software.</p>
              </details>
              <details className="faq-item">
                <summary>Are internships compulsory?</summary>
                <p>Yes, industrial training and internships are a required part of the ECE curriculum at PLRCT.</p>
              </details>
              <details className="faq-item">
                <summary>What is the average placement support?</summary>
                <p>Technical training, embedded and VLSI interview preparation, resume building, mock interviews and coordinated recruitment drives with electronics and telecom companies.</p>
              </details>
              <details className="faq-item">
                <summary>Can students pursue M.Tech after graduation?</summary>
                <p>Yes, through PLRCT's M.Tech program, GATE-based postgraduate admissions, or external research and professional certification pathways.</p>
              </details>
            </div>
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section className="final-cta">
          <div className="container final-cta__inner">
            <div>
              <p className="eyebrow eyebrow--light">ADMISSIONS OPEN</p>
              <h2>Join the Department of Electronics and Communication Engineering</h2>
              <p>
                Build a successful engineering career with advanced electronics laboratories, embedded
                systems training, IoT and VLSI exposure, industry collaboration, research
                opportunities, and excellent placement support at PLRCT.
              </p>
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