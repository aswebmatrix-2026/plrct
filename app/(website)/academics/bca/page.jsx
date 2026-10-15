import Link from "next/link";
import "./bca.css";

// ============================================================================
// SITE CONSTANTS
// ============================================================================
const SITE_URL = "https://ptlrct.com";
const PAGE_URL = `${SITE_URL}/academics/bca`;
const COLLEGE = "Pt. L.R. College of Technology";

// TODO(verify): Confirm this OG image exists on the server, or change the path.
const OG_IMAGE = `${SITE_URL}/og/bca-program.jpg`;

// ============================================================================
// CONFIGURABLE PROGRAM FACTS
// ----------------------------------------------------------------------------
// VERIFY every value in this block with the admissions office / official
// prospectus before going live. `affiliation` and `approval` are intentionally
// null: they only render in the datasheet once you supply confirmed text.
// If the official scheme is 4 years (e.g. honours structure), update
// `duration`, `STRUCTURE_PHASES`, and the matching FAQ answer.
// ============================================================================
const BCA_FACTS = {
  degree: "Bachelor of Computer Applications (BCA)",
  duration: "Typically 3 years / 6 semesters", // VERIFY
  eligibility: "10+2 or equivalent from a recognised board", // VERIFY
  structure: "Semester system: theory, labs and projects", // VERIFY
  location: "Faridabad, Haryana (Delhi NCR)",
  focus: "Programming, databases, web and software development",
  affiliation: null, // e.g. "Affiliated to <University name>" once confirmed
  approval: null, // e.g. "<Regulatory approval text>" once confirmed
};

// ============================================================================
// MEDIA CONFIG
// ----------------------------------------------------------------------------
// No image paths are assumed. Set `src` to a file that really exists in
// /public (e.g. "/images/bca/computer-lab.jpg") and the placeholder is
// replaced automatically with the real photo.
// ============================================================================
const MEDIA = {
  campus: { src: null, label: "Pt. L.R. College of Technology Campus, Faridabad" },
  lab: { src: null, label: "Computer laboratory" },
  coding: { src: null, label: "Coding and programming practice" },
  collab: { src: null, label: "Collaborative learning" },
  project: { src: null, label: "Project work and demonstrations" },
};

// ============================================================================
// SEO METADATA
// ============================================================================
export const metadata = {
  title: "BCA Course in Faridabad | Pt. L.R. College of Technology",
  description:
    "Explore the Bachelor of Computer Applications (BCA) at Pt. L.R. College of Technology, Faridabad: programming, databases, web development, labs, projects and career paths.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Bachelor of Computer Applications (BCA) | Pt. L.R. College of Technology, Faridabad",
    description:
      "A practice-focused BCA covering programming, databases, web technologies and software development, in Faridabad, Delhi NCR.",
    url: PAGE_URL,
    siteName: COLLEGE,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "BCA program at Pt. L.R. College of Technology, Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bachelor of Computer Applications (BCA) | Pt. L.R. College of Technology, Faridabad",
    description:
      "Programming, databases, web development and practical projects: explore the BCA program in Faridabad, Delhi NCR.",
    images: [OG_IMAGE],
  },
};

// ============================================================================
// STRUCTURED DATA (JSON-LD)
// Only BreadcrumbList and EducationalOrganization. No Course or FAQ schema,
// because course details are not yet verified.
// ============================================================================
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Academics", item: `${SITE_URL}/academics` },
    { "@type": "ListItem", position: 3, name: "BCA", item: PAGE_URL },
  ],
};

const eduOrgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: COLLEGE,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
};

// ============================================================================
// PAGE CONTENT DATA
// ============================================================================
const JUMP_LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#labs", label: "Labs & Projects" },
  { href: "#careers", label: "Careers" },
  { href: "#faq", label: "FAQ" },
];

const GLANCE = [
  { k: "What it is", v: "An undergraduate degree focused on designing, building and maintaining software applications." },
  { k: "What you build", v: "Programs, databases, websites, web applications and a final-year project." },
  { k: "Who it suits", v: "Students who enjoy logic, problem solving and creating things on screen." },
  { k: "Where it leads", v: "Software and web roles, data work, IT services, further study such as MCA or MBA." },
];

const WHY_CARDS = [
  {
    t: "Practice-first learning",
    d: "Programming labs, practical assignments and projects are treated as the core of the degree, not an add-on to lectures.",
  },
  {
    t: "A complete computing foundation",
    d: "Programming, data structures, databases, operating systems and networks give you the base to learn any new tool quickly.",
  },
  {
    t: "Web and software skills",
    d: "Learn how modern applications are planned, built, tested and delivered, from the screen a user sees to the database behind it.",
  },
  {
    t: "Delhi NCR location",
    d: "Studying in Faridabad keeps you close to the region's IT services, start-up and digital business activity for internships, events and career conversations.",
  },
  {
    t: "Mentorship and academic support",
    d: "Faculty guidance on coursework, mini projects and the final project helps you move from classroom concepts to working software.",
  },
  {
    t: "Clear pathways after graduation",
    d: "BCA prepares you for entry-level technology roles and for postgraduate study such as MCA, MBA or specialised master's programs.",
  },
];

const OUTCOMES = [
  "Write clear, correct programs in a high-level language and reason about the efficiency of algorithms.",
  "Design relational databases and retrieve, update and protect data using SQL.",
  "Build responsive, accessible web pages and applications using current web technologies.",
  "Apply software engineering practice: requirements, design, version control, testing and documentation.",
  "Explain how operating systems, networks and computer hardware work together beneath an application.",
  "Analyse data, and understand the basics and limits of AI and machine learning responsibly.",
  "Communicate technical ideas, and collaborate in a team on a shared codebase or project.",
  "Present a portfolio of projects and plan a career or higher-study path with confidence.",
];

// Indicative steps only. The official process follows the college's notification.
const ADMISSION_STEPS = [
  "Check that you meet the eligibility conditions for the current admission cycle.",
  "Enquire with the admissions office and attend a counselling or information session.",
  "Submit the application form along with the required academic documents.",
  "Document verification and admission decision as per the applicable norms.",
  "Complete fee payment and enrolment formalities to confirm your seat.",
];

// Indicative learning journey. The official scheme is defined by the university.
const STRUCTURE_PHASES = [
  {
    year: "Year 1",
    sems: "Semesters 1 to 2",
    title: "Foundation",
    points: [
      "Programming fundamentals and problem solving",
      "Computer organisation and digital basics",
      "Mathematics for computing",
      "Communication and professional skills",
    ],
  },
  {
    year: "Year 2",
    sems: "Semesters 3 to 4",
    title: "Building Applications",
    points: [
      "Data structures and object-oriented programming",
      "Database management and SQL",
      "Web technologies and operating systems",
      "Mini projects and practical assignments",
    ],
  },
  {
    year: "Year 3",
    sems: "Semesters 5 to 6",
    title: "Specialisation and Capstone",
    points: [
      "Software engineering and project management",
      "Networks, security awareness and electives",
      "Emerging areas such as analytics, AI or cloud",
      "Final project, internship or industry exposure",
    ],
  },
];

const CURRICULUM_AREAS = [
  { t: "Programming Fundamentals", d: "Syntax, control flow, functions and debugging in one or more high-level languages." },
  { t: "Data Structures & Algorithms", d: "Arrays, lists, stacks, queues, trees, searching, sorting and complexity thinking." },
  { t: "Web Technologies", d: "HTML, CSS, JavaScript and the principles behind responsive, accessible websites." },
  { t: "Database Management", d: "Relational modelling, normalisation, SQL queries, transactions and data integrity." },
  { t: "Software Engineering", d: "Life-cycle models, requirements, design, testing, version control and documentation." },
  { t: "Operating Systems", d: "Processes, memory, file systems and scheduling, and how programs interact with the machine." },
  { t: "Computer Networks", d: "Network models, protocols, IP addressing and how data moves across the internet." },
  { t: "Computer Fundamentals & Mathematics", d: "Computer organisation, number systems, discrete mathematics and logic." },
  { t: "Professional & Project Skills", d: "Technical writing, presentations, teamwork and a final project that ties everything together." },
];

const CODE_SAMPLE = `def binary_search(items, target):
    low, high = 0, len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        if items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`;

const PROBLEM_STEPS = ["Understand", "Plan", "Code", "Test", "Refine"];

const WEB_LAYERS = [
  { t: "Presentation", d: "HTML structure, CSS layout, responsive design and accessibility." },
  { t: "Behaviour", d: "JavaScript, the DOM, events and an introduction to front-end frameworks." },
  { t: "Server logic", d: "Back-end concepts, routing, forms, APIs and authentication basics." },
  { t: "Data", d: "Connecting applications to databases and handling data safely." },
  { t: "Delivery", d: "Version control, testing, performance, security basics and hosting concepts." },
];

const DB_TOPICS = [
  "Entity-relationship modelling and relational design",
  "Normalisation and keys",
  "SQL: queries, joins, views and constraints",
  "Transactions, indexing and data integrity",
  "Introduction to non-relational data stores",
];

const SE_TOPICS = [
  "Software life-cycle models and Agile thinking",
  "Requirements gathering and UML-style design",
  "Version control with Git and team workflows",
  "Testing, debugging and quality assurance",
  "Documentation, maintenance and project planning",
];

const FUNDAMENTALS = [
  {
    t: "Operating Systems",
    d: "Understand how processes, memory and files are managed, and why that matters for performance and reliability.",
    tags: ["Processes", "Memory", "File systems"],
  },
  {
    t: "Computer Networks",
    d: "Follow a request from your browser across the internet, and learn the protocols that make it possible.",
    tags: ["Protocols", "IP & DNS", "Security basics"],
  },
  {
    t: "Computer Fundamentals",
    d: "Learn how hardware, number systems and logic circuits underpin every program you will ever write.",
    tags: ["Architecture", "Logic", "Discrete maths"],
  },
];

const EMERGING = [
  { t: "AI & Machine Learning", d: "Core ideas, simple models and responsible use." },
  { t: "Data Analytics", d: "Cleaning, analysing and visualising data to support decisions." },
  { t: "Cloud Computing", d: "How applications are hosted and scaled on shared infrastructure." },
  { t: "Cyber Security Awareness", d: "Safe coding, authentication and protecting user data." },
  { t: "Mobile & App Development", d: "Principles behind apps for phones and tablets." },
  { t: "Internet of Things", d: "Connecting devices, sensors and software." },
];

const PROJECT_STAGES = [
  {
    t: "Practical assignments",
    d: "Weekly lab exercises turn each concept into working code, building speed and confidence.",
  },
  {
    t: "Mini projects",
    d: "Small applications such as a library system, a quiz app or a personal website teach design, teamwork and debugging.",
  },
  {
    t: "Capstone project",
    d: "A faculty-guided final project demonstrates the full cycle: planning, building, testing, documenting and presenting.",
  },
];

const PORTFOLIO_ITEMS = [
  "A public code profile with clean, documented repositories",
  "A deployed web project that others can open and use",
  "A database project with an ER diagram and sample queries",
  "A project report and short demonstration video or slides",
  "A concise resume linking to your best work",
];

const INDUSTRY_LADDER = [
  { t: "Workshops and guest sessions", d: "Learn what practitioners actually use and expect." },
  { t: "Certifications and short courses", d: "Add recognised tool or platform skills alongside your degree." },
  { t: "Live or simulated projects", d: "Work to a brief, a deadline and feedback, like a real team." },
  { t: "Internships", d: "Spend time inside an organisation to see how software gets shipped." },
  { t: "Interview preparation", d: "Practise aptitude, technical rounds and communication." },
];

const CAREERS = [
  { t: "Software Developer", d: "Designs, writes and maintains applications for businesses and consumers.", skills: ["Programming", "DSA", "Git"] },
  { t: "Web Developer", d: "Builds and maintains responsive websites and web applications.", skills: ["HTML/CSS", "JavaScript", "APIs"] },
  { t: "Data Analyst", d: "Collects, cleans and interprets data to answer business questions.", skills: ["SQL", "Excel", "Visualisation"] },
  { t: "Database Administrator", d: "Looks after the storage, security and performance of an organisation's data.", skills: ["DBMS", "SQL", "Backup"] },
  { t: "Software Tester (QA)", d: "Finds defects early and checks that software behaves as intended.", skills: ["Testing", "Attention to detail"] },
  { t: "IT Support & Systems Executive", d: "Keeps systems, networks and users running smoothly.", skills: ["OS", "Networking", "Support"] },
  { t: "Business / Technical Analyst", d: "Connects business needs with technical teams through clear requirements.", skills: ["Analysis", "Communication"] },
  { t: "Freelancer or Entrepreneur", d: "Builds products or delivers digital services independently.", skills: ["Portfolio", "Initiative"] },
];

const HIGHER_ED = [
  { t: "MCA", d: "A postgraduate computer applications degree that deepens programming, systems and software engineering." },
  { t: "MBA", d: "Combines technical understanding with management, useful for product, analytics or IT-business roles." },
  { t: "M.Sc. in Computer Science, IT or Data Science", d: "A more academic or research-leaning route into specialised computing areas." },
  { t: "Certifications and competitive exams", d: "Cloud, data, security or development certifications, and government or banking exams where eligible." },
];

const ROADMAP = [
  { stage: "Stage 1", t: "Learn the basics", d: "Pick one language, learn to read error messages, and solve small problems every week." },
  { stage: "Stage 2", t: "Build small things", d: "Create a personal site, a calculator or a to-do app. Finish projects, even simple ones." },
  { stage: "Stage 3", t: "Go deeper", d: "Study data structures, SQL and web fundamentals. Start using Git for all your work." },
  { stage: "Stage 4", t: "Prove it", d: "Build a larger project, earn a certification, and seek an internship or live project." },
  { stage: "Stage 5", t: "Launch", d: "Polish your portfolio and resume, practise interviews, and apply for roles or further study." },
];

const FAQS = [
  {
    q: "What is BCA?",
    a: "BCA stands for Bachelor of Computer Applications, an undergraduate degree focused on programming, databases, web technologies and software development. It prepares students for software and IT roles and for postgraduate study such as MCA.",
  },
  {
    q: "How long is the BCA program?",
    a: `${BCA_FACTS.duration}. Please confirm the exact duration and semester structure for your admission year with the admissions office, as the official scheme follows the applicable university norms.`,
  },
  {
    q: "What is the eligibility for BCA?",
    a: `${BCA_FACTS.eligibility}. Subject requirements and minimum marks depend on the affiliating university and current regulations, so please verify them with the admissions office before applying.`,
  },
  {
    q: "Do I need coding experience before joining?",
    a: "No. Programming is taught from the fundamentals. Curiosity, logical thinking and regular practice matter more than prior experience.",
  },
  {
    q: "Is mathematics important in BCA?",
    a: "Some mathematics, especially logic and discrete mathematics, supports programming and algorithms. The depth required depends on the official curriculum, so check the syllabus for your admission year.",
  },
  {
    q: "What career options are available after BCA?",
    a: "Common directions include software development, web development, data analysis, database administration, software testing and IT support. Outcomes depend on your skills, projects and effort, and no specific job or salary is guaranteed.",
  },
  {
    q: "Can I study further after BCA?",
    a: "Yes. Many BCA graduates consider MCA, MBA, M.Sc. in computing-related fields, or professional certifications. Each program has its own admission requirements.",
  },
  {
    q: "Are internships and placement support available?",
    a: "Industry exposure is encouraged through internships, workshops and projects. For current details of internship arrangements and placement activity for BCA students, please contact the college's admissions office or Training and Placement Cell.",
  },
];

const RELATED_LINKS = [
  { href: "/academics/btech", label: "B.Tech Programs" },
  { href: "/academics/mtech", label: "M.Tech Program" },
  { href: "/academics/departments/cse", label: "Computer Science Engineering" },
  { href: "/academics/departments/it", label: "Information Technology" },
  { href: "/academics/departments/aiml", label: "Artificial Intelligence & Machine Learning" },
  { href: "/academics/departments/data-science", label: "Data Science" },
  { href: "/academics/resources/laboratories", label: "Laboratories" },
  { href: "/academics/resources/industrial-training", label: "Industrial Training" },
];

// ============================================================================
// SMALL COMPONENTS
// ============================================================================
function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

function Media({ label, src, ratio, className = "" }) {
  return (
    <figure
      className={`bca-media ${className}`.trim()}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} loading="lazy" decoding="async" />
      ) : (
        <div className="bca-media__placeholder" role="img" aria-label={`Image placeholder: ${label}`}>
          <span className="bca-media__corner bca-media__corner--tl" aria-hidden="true" />
          <span className="bca-media__corner bca-media__corner--br" aria-hidden="true" />
          <span className="bca-media__label">{label}</span>
        </div>
      )}
    </figure>
  );
}

function SpecRow({ k, v }) {
  return (
    <div className="bca-spec-row">
      <span className="bca-spec-row__key">{k}</span>
      <span className="bca-spec-row__value">{v}</span>
    </div>
  );
}

function SectionHead({ id, eyebrow, title, children }) {
  return (
    <div className="bca-section-head">
      <p className="bca-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {children}
    </div>
  );
}

function Notice({ title, children }) {
  return (
    <aside className="bca-notice" role="note">
      <p>
        <strong>{title}</strong> {children}
      </p>
    </aside>
  );
}

// ============================================================================
// PAGE
// ============================================================================
export default function BcaPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={eduOrgSchema} />

      <main className="bca">
        {/* ============ 1. HERO + DATASHEET ============ */}
        <header className="bca-hero">
          <div className="bca-hero__grid" aria-hidden="true" />
          <div className="bca-container bca-hero__inner">
            <nav className="bca-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/academics">Academics</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">BCA</span>
            </nav>

            <div className="bca-hero__content">
              <div className="bca-hero__text">
                <p className="bca-eyebrow bca-eyebrow--light">
                  PROGRAM · UNDERGRADUATE COMPUTER APPLICATIONS
                </p>
                <h1>Bachelor of Computer Applications (BCA) at Pt. L.R. College of Technology, Faridabad</h1>
                <p className="bca-hero__lede">
                  Every app on your phone, every website you visit and every database behind an
                  online service began as a program written by someone who learned how. The BCA
                  program introduces you to computer applications from the ground up: programming
                  fundamentals, software development, databases and modern web technologies, with
                  room to explore emerging areas such as data analytics and artificial intelligence.
                  Study in Faridabad, in the heart of Delhi NCR, and build the practical skills that
                  digital careers ask for.
                </p>
                <div className="bca-hero__cta">
                  <Link href="/admissions" className="bca-btn bca-btn--primary">
                    Apply for BCA
                  </Link>
                  <a href="#curriculum" className="bca-btn bca-btn--outline-light">
                    Explore Curriculum
                  </a>
                </div>
              </div>

              <aside className="bca-spec" aria-label="BCA program datasheet">
                <p className="bca-spec__title">PROGRAM DATASHEET</p>
                <SpecRow k="Degree" v={BCA_FACTS.degree} />
                <SpecRow k="Duration" v={BCA_FACTS.duration} />
                <SpecRow k="Eligibility" v={BCA_FACTS.eligibility} />
                <SpecRow k="Study Structure" v={BCA_FACTS.structure} />
                <SpecRow k="Location" v={BCA_FACTS.location} />
                <SpecRow k="Key Learning Areas" v={BCA_FACTS.focus} />
                {BCA_FACTS.affiliation && <SpecRow k="Affiliation" v={BCA_FACTS.affiliation} />}
                {BCA_FACTS.approval && <SpecRow k="Approval" v={BCA_FACTS.approval} />}
                <p className="bca-spec__note">
                  Duration, eligibility and structure follow the applicable university and
                  regulatory norms. Please confirm current details with the admissions office.
                </p>
              </aside>
            </div>
          </div>
        </header>

        {/* ============ 2. CAMPUS / DEPARTMENT IMAGE + JUMP NAV ============ */}
        <div className="bca-container bca-feature">
          <Media label={MEDIA.campus.label} src={MEDIA.campus.src} ratio="21 / 9" />
          <nav className="bca-jump" aria-label="On this page">
            <span className="bca-jump__label">On this page</span>
            {JUMP_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ============ 3. OVERVIEW ============ */}
        <section id="overview" className="bca-section" aria-labelledby="overview-h">
          <div className="bca-container bca-two-col bca-two-col--wide-left">
            <div>
              <SectionHead id="overview-h" eyebrow="OVERVIEW" title="What is BCA, and what will you learn?">
                <p>
                  The Bachelor of Computer Applications is an undergraduate degree built around one
                  question: how do we turn an idea into software that works? Students learn to
                  program, to organise and query data, to build websites and applications, and to
                  understand the operating systems and networks that quietly support every digital
                  product.
                </p>
              </SectionHead>
              <p>
                At {COLLEGE}, BCA is taught in an institution where technology is a daily subject.
                Located in Faridabad, within Delhi NCR, students are close to one of the country&apos;s
                busiest clusters of IT services, start-ups and digital businesses. That proximity
                makes it easier to attend events, look for internships and hear first-hand what
                employers value.
              </p>
              <p>
                You do not need to arrive as an expert programmer. Good developers are made by steady
                practice: writing code every week, reading other people&apos;s code, breaking things
                and fixing them. The program is structured to give you that practice, with theory
                supporting the work rather than replacing it.
              </p>
            </div>

            <aside className="bca-glance" aria-label="BCA at a glance">
              <p className="bca-glance__title">BCA AT A GLANCE</p>
              <dl>
                {GLANCE.map((g) => (
                  <div key={g.k} className="bca-glance__item">
                    <dt>{g.k}</dt>
                    <dd>{g.v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        {/* ============ 4. WHY STUDY BCA HERE ============ */}
        <section className="bca-section bca-section--tint" aria-labelledby="why-h">
          <div className="bca-container">
            <SectionHead
              id="why-h"
              eyebrow="KEY HIGHLIGHTS"
              title="Why study BCA at Pt. L.R. College of Technology"
            >
              <p>
                Six reasons students and parents consider this program when comparing computer
                application degrees in and around Faridabad.
              </p>
            </SectionHead>
            <div className="bca-card-grid">
              {WHY_CARDS.map((c) => (
                <article className="bca-card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 5. LEARNING OUTCOMES ============ */}
        <section className="bca-section" aria-labelledby="outcomes-h">
          <div className="bca-container">
            <SectionHead id="outcomes-h" eyebrow="LEARNING OUTCOMES" title="What you should be able to do by graduation">
              <p>
                A degree is only useful if it changes what you can do. These are the capabilities
                the program aims to build across its semesters.
              </p>
            </SectionHead>
            <ol className="bca-outcomes">
              {OUTCOMES.map((o) => (
                <li key={o}>
                  <span>{o}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ 6. ELIGIBILITY & ADMISSION ============ */}
        <section id="eligibility" className="bca-section bca-section--tint" aria-labelledby="eligibility-h">
          <div className="bca-container">
            <div className="bca-two-col">
              <div>
                <SectionHead id="eligibility-h" eyebrow="ELIGIBILITY" title="Who can apply for BCA?">
                  <p>
                    The general requirement for BCA is a pass in 10+2 or an equivalent examination
                    from a recognised board. The exact subject requirements and minimum percentage are
                    set by the affiliating university and current regulations.
                  </p>
                </SectionHead>
                <div className="bca-panel">
                  <h3>Eligibility at a glance</h3>
                  <ul className="bca-list">
                    <li>{BCA_FACTS.eligibility}.</li>
                    <li>Subject combination and minimum marks as notified for the admission year.</li>
                    <li>
                      Typical documents: academic mark sheets, identity proof, photographs and
                      transfer or migration certificates as required.
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <p className="bca-eyebrow">ADMISSION PROCESS</p>
                <h2>How admission usually works</h2>
                <p>
                  The steps below describe a typical path. The college announces the exact process,
                  dates and seat availability for each admission cycle.
                </p>
                <ol className="bca-steps">
                  {ADMISSION_STEPS.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>
            </div>

            <Notice title="Please verify:">
              Eligibility, seat availability, fees and last dates change from year to year. Confirm
              the current details with the admissions office before you apply.
            </Notice>
          </div>
        </section>

        {/* ============ 7. DURATION & SEMESTER STRUCTURE ============ */}
        <section className="bca-section" aria-labelledby="structure-h">
          <div className="bca-container">
            <SectionHead id="structure-h" eyebrow="DURATION & STRUCTURE" title="A learning journey in three stages">
              <p>
                {BCA_FACTS.duration}. Most computer application programs move from foundations, to
                applications, to specialisation and a final project. The outline below shows that
                journey in indicative form.
              </p>
            </SectionHead>
            <div className="bca-phases">
              {STRUCTURE_PHASES.map((p) => (
                <article className="bca-phase" key={p.year}>
                  <p className="bca-phase__year">{p.year}</p>
                  <p className="bca-phase__sems">{p.sems}</p>
                  <h3>{p.title}</h3>
                  <ul className="bca-list">
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <Notice title="Indicative outline:">
              The official scheme, subjects and credits are defined by the affiliating university.
              See the college{" "}
              <Link href="/academics/resources/curriculum">curriculum page</Link> and{" "}
              <Link href="/academics/resources/syllabus">syllabus documents</Link> for official
              details.
            </Notice>
          </div>
        </section>

        {/* ============ 8. CURRICULUM OVERVIEW ============ */}
        <section id="curriculum" className="bca-section bca-section--tint" aria-labelledby="curriculum-h">
          <div className="bca-container">
            <SectionHead id="curriculum-h" eyebrow="CURRICULUM OVERVIEW" title="The learning areas that make up a BCA">
              <p>
                Nine areas form the backbone of a computer applications degree. Together they cover
                how software is written, how data is stored, how systems run, and how people work
                together to deliver a product.
              </p>
            </SectionHead>
            <div className="bca-area-grid">
              {CURRICULUM_AREAS.map((a, i) => (
                <article className="bca-area" key={a.t}>
                  <span className="bca-area__code" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{a.t}</h3>
                  <p>{a.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 9. PROGRAMMING & PROBLEM SOLVING ============ */}
        <section className="bca-section" aria-labelledby="programming-h">
          <div className="bca-container bca-two-col">
            <div>
              <SectionHead id="programming-h" eyebrow="PROGRAMMING & PROBLEM SOLVING" title="Thinking like a programmer">
                <p>
                  Programming is less about memorising syntax and more about breaking a problem into
                  steps a computer can follow. Students start with variables, decisions and loops,
                  then move on to functions, object-oriented design, and data structures such as
                  lists, stacks, queues and trees.
                </p>
              </SectionHead>
              <p>
                Practice matters because skill comes from repetition. Regular lab work, small
                coding challenges and code reviews help you move from &quot;it runs&quot; to &quot;it
                is clear, correct and efficient&quot;, which is what employers and further-study
                programs look for.
              </p>
              <ul className="bca-chip-row" aria-label="Problem-solving cycle">
                {PROBLEM_STEPS.map((s, i) => (
                  <li key={s}>
                    <span>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bca-code" role="group" aria-label="Illustrative code example">
              <div className="bca-code__bar">
                <span className="bca-code__dots" aria-hidden="true">
                  <i /> <i /> <i />
                </span>
                <span className="bca-code__file">binary_search.py</span>
                <span className="bca-code__tag">Illustrative example</span>
              </div>
              <pre tabIndex={0} aria-label="Binary search example in Python">
                <code>{CODE_SAMPLE}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* ============ 10. WEB DEVELOPMENT ============ */}
        <section className="bca-section bca-section--tint" aria-labelledby="web-h">
          <div className="bca-container bca-two-col bca-two-col--reverse">
            <div>
              <SectionHead id="web-h" eyebrow="WEB DEVELOPMENT" title="From a blank page to a working web application">
                <p>
                  The web is the most common place people meet software. In this learning area,
                  students study how a page is structured, styled and made interactive, how a server
                  responds to requests, and how data flows between the two.
                </p>
              </SectionHead>
              <p>
                Responsive layouts, accessibility and performance are treated as part of good
                engineering, not as extras. By building real pages and small applications, students
                learn the habits that carry over to any modern framework they meet later.
              </p>
              <p className="bca-fineprint">
                Specific languages, tools and frameworks depend on the official syllabus and may
                change as technology evolves.
              </p>
            </div>

            <ol className="bca-stack" aria-label="Layers of a web application">
              {WEB_LAYERS.map((l, i) => (
                <li key={l.t} style={{ "--i": i }}>
                  <span className="bca-stack__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3>{l.t}</h3>
                    <p>{l.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ 11. DATABASES & SOFTWARE ENGINEERING ============ */}
        <section className="bca-section" aria-labelledby="dbse-h">
          <div className="bca-container">
            <SectionHead id="dbse-h" eyebrow="DATABASES & SOFTWARE ENGINEERING" title="Where data meets disciplined development">
              <p>
                Almost every application stores data, and almost every project needs a method.
                Database management and software engineering give you both: a way to keep
                information organised and trustworthy, and a way to build software that a team can
                maintain.
              </p>
            </SectionHead>
            <div className="bca-duo">
              <article className="bca-panel">
                <p className="bca-panel__tag">Data</p>
                <h3>Database Management</h3>
                <ul className="bca-list">
                  {DB_TOPICS.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
              <article className="bca-panel bca-panel--dark">
                <p className="bca-panel__tag">Process</p>
                <h3>Software Engineering</h3>
                <ul className="bca-list">
                  {SE_TOPICS.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ============ 12. OS, NETWORKING, FUNDAMENTALS ============ */}
        <section className="bca-section bca-section--tint" aria-labelledby="systems-h">
          <div className="bca-container">
            <SectionHead id="systems-h" eyebrow="SYSTEMS FOUNDATIONS" title="Operating systems, networking and computer fundamentals">
              <p>
                Knowing what happens beneath your code makes you a better developer. These subjects
                explain how a computer runs programs, stores information and talks to other
                machines.
              </p>
            </SectionHead>
            <div className="bca-card-grid">
              {FUNDAMENTALS.map((f) => (
                <article className="bca-card" key={f.t}>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                  <ul className="bca-tags" aria-label={`${f.t} topics`}>
                    {f.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 13. AI, ANALYTICS, EMERGING TECH ============ */}
        <section className="bca-section" aria-labelledby="emerging-h">
          <div className="bca-container bca-two-col">
            <div>
              <SectionHead id="emerging-h" eyebrow="EMERGING TECHNOLOGIES" title="AI, data analytics and what comes next">
                <p>
                  Technology changes quickly, so a strong BCA graduate keeps learning. These areas
                  are increasingly relevant to software careers and are worth exploring through
                  electives, certifications, workshops or your own projects.
                </p>
              </SectionHead>
              <Notice title="Please note:">
                These are relevant learning areas, not a list of officially offered subjects.
                Which topics appear as courses depends on the approved curriculum for each
                admission year.
              </Notice>
            </div>
            <ul className="bca-tile-grid">
              {EMERGING.map((e) => (
                <li key={e.t} className="bca-tile">
                  <h3>{e.t}</h3>
                  <p>{e.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ 14. COMPUTER LABS & PRACTICAL LEARNING ============ */}
        <section id="labs" className="bca-section bca-section--tint" aria-labelledby="labs-h">
          <div className="bca-container">
            <SectionHead id="labs-h" eyebrow="LABS & PRACTICAL LEARNING" title="Learning by doing, in the computer lab">
              <p>
                Computer laboratories are where concepts become skills. Students write, run, debug
                and improve programs under faculty guidance, working on tasks that mirror real
                development: reading requirements, building a solution and testing it. You can
                explore the college&apos;s facilities on the{" "}
                <Link href="/academics/resources/laboratories">laboratories page</Link>.
              </p>
            </SectionHead>
            <div className="bca-media-grid">
              <Media label={MEDIA.lab.label} src={MEDIA.lab.src} />
              <Media label={MEDIA.coding.label} src={MEDIA.coding.src} />
              <Media label={MEDIA.collab.label} src={MEDIA.collab.src} />
              <Media label={MEDIA.project.label} src={MEDIA.project.src} />
            </div>
          </div>
        </section>

        {/* ============ 15. PROJECTS & PORTFOLIO ============ */}
        <section className="bca-section" aria-labelledby="projects-h">
          <div className="bca-container">
            <SectionHead id="projects-h" eyebrow="PROJECTS & PORTFOLIO" title="Build things you can show">
              <p>
                A certificate says you attended. A portfolio shows what you can do. Throughout the
                degree, assignments and projects grow in size, so that you graduate with real work
                to discuss in interviews and applications.
              </p>
            </SectionHead>
            <div className="bca-two-col bca-two-col--wide-left">
              <div className="bca-project-list">
                {PROJECT_STAGES.map((s, i) => (
                  <article className="bca-project" key={s.t}>
                    <span className="bca-project__num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h3>{s.t}</h3>
                      <p>{s.d}</p>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="bca-panel">
                <p className="bca-panel__tag">Portfolio checklist</p>
                <h3>What a strong BCA portfolio contains</h3>
                <ul className="bca-checklist">
                  {PORTFOLIO_ITEMS.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        {/* ============ 16. INTERNSHIP & INDUSTRY EXPOSURE ============ */}
        <section className="bca-section bca-section--tint" aria-labelledby="industry-h">
          <div className="bca-container bca-two-col">
            <div>
              <SectionHead id="industry-h" eyebrow="INTERNSHIP & INDUSTRY EXPOSURE" title="Connecting the classroom to the workplace">
                <p>
                  Employers in Delhi NCR and beyond look for graduates who understand how teams
                  actually work. Industry exposure, through workshops, projects and internships,
                  helps you test your skills, learn professional habits and discover what kind of
                  role suits you.
                </p>
              </SectionHead>
              <p>
                Students are encouraged to look for these opportunities from the second year
                onward. Read more about the college&apos;s approach on the{" "}
                <Link href="/academics/resources/industrial-training">industrial training page</Link>.
              </p>
              <Notice title="Please verify:">
                Internship partners, schedules and placement activity for BCA students are announced
                by the college. No specific outcome is promised on this page.
              </Notice>
            </div>
            <ol className="bca-ladder" aria-label="Industry exposure ladder">
              {INDUSTRY_LADDER.map((s) => (
                <li key={s.t}>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ 17. CAREER OPPORTUNITIES ============ */}
        <section id="careers" className="bca-section" aria-labelledby="careers-h">
          <div className="bca-container">
            <SectionHead id="careers-h" eyebrow="CAREER OPPORTUNITIES" title="Where a BCA can take you">
              <p>
                A BCA opens doors across the technology sector. The roles below are common
                directions for graduates. Your route will depend on your skills, projects and
                effort, and none of these outcomes is guaranteed.
              </p>
            </SectionHead>
            <div className="bca-career-grid">
              {CAREERS.map((c) => (
                <article className="bca-career" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <ul className="bca-tags" aria-label={`${c.t} skills`}>
                    {c.skills.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 18. HIGHER EDUCATION ============ */}
        <section className="bca-section bca-section--tint" aria-labelledby="higher-h">
          <div className="bca-container">
            <SectionHead id="higher-h" eyebrow="HIGHER EDUCATION" title="Continuing your studies after BCA">
              <p>
                Some graduates go straight into work; others study further first. Each of these
                options has its own eligibility and admission process, so check requirements early.
              </p>
            </SectionHead>
            <div className="bca-card-grid bca-card-grid--4">
              {HIGHER_ED.map((h) => (
                <article className="bca-card" key={h.t}>
                  <h3>{h.t}</h3>
                  <p>{h.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 19. SKILL ROADMAP ============ */}
        <section className="bca-section" aria-labelledby="roadmap-h">
          <div className="bca-container">
            <SectionHead id="roadmap-h" eyebrow="STUDENT SKILL ROADMAP" title="A practical plan for your BCA years">
              <p>
                You do not have to wait for a syllabus to start building skills. This simple
                roadmap shows how a motivated student can grow from beginner to job- or
                study-ready.
              </p>
            </SectionHead>
            <ol className="bca-roadmap">
              {ROADMAP.map((r) => (
                <li key={r.stage}>
                  <span className="bca-roadmap__stage">{r.stage}</span>
                  <h3>{r.t}</h3>
                  <p>{r.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ 20. FAQ ============ */}
        <section id="faq" className="bca-section bca-section--tint" aria-labelledby="faq-h">
          <div className="bca-container">
            <SectionHead id="faq-h" eyebrow="FREQUENTLY ASKED QUESTIONS" title="BCA at Pt. L.R. College of Technology: quick answers" />
            <div className="bca-faq">
              {FAQS.map((f) => (
                <details className="bca-faq__item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 21. RELATED PROGRAMS & INTERNAL LINKS ============ */}
        <section className="bca-section" aria-labelledby="related-h">
          <div className="bca-container">
            <SectionHead id="related-h" eyebrow="EXPLORE MORE" title="Related programs and resources" />
            <div className="bca-link-grid">
              {RELATED_LINKS.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 22. FINAL CTA ============ */}
        <section className="bca-cta" aria-labelledby="cta-h">
          <div className="bca-container bca-cta__inner">
            <div>
              <p className="bca-eyebrow bca-eyebrow--light">ADMISSIONS ENQUIRY</p>
              <h2 id="cta-h">Start your computing journey at Pt. L.R. College of Technology, Faridabad</h2>
              <p>
                Talk to the admissions team to confirm eligibility, fee details and the current
                admission schedule for BCA, and take the first step toward a career in technology.
              </p>
            </div>
            <div className="bca-cta__actions">
              <Link href="/admissions" className="bca-btn bca-btn--gold">
                Enquire Now
              </Link>
              <Link href="/contact" className="bca-btn bca-btn--outline-light">
                Contact Admissions
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}