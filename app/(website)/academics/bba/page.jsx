import "./bba.css";

// ============================================================================
// CONFIGURATION
// Anything marked VERIFY has NOT been confirmed against official college
// documents. Edit these values once the admissions office confirms them.
// ============================================================================
const SITE_URL = "https://ptlrct.com";
const PAGE_URL = `${SITE_URL}/academics/bba`;
const COLLEGE = "Pt. L.R. College of Technology";

// Set to a real, verified image URL (1200x630) to enable og:image / twitter:image.
const OG_IMAGE = null; // VERIFY: e.g. "https://ptlrct.com/og/bba-program.jpg"

const PROGRAM = {
  degree: "Bachelor of Business Administration (BBA)",
  duration: "3 Years / 6 Semesters", // VERIFY with admissions / university scheme
  durationShort: "three years (six semesters)", // VERIFY - keep in sync with `duration`
  eligibility: "10+2 from a recognised board", // VERIFY stream and minimum marks
  eligibilityNote:
    "Stream and minimum marks are set by the affiliating university and the college admission norms for the session.", // VERIFY
  structure: "Semester system: core papers, electives, projects", // VERIFY
  location: "Faridabad, Haryana (Delhi NCR)",
  learningAreas: "Management, Marketing, Finance, HR, Analytics",
  affiliation: "", // VERIFY: add only after official confirmation. Leave "" to hide the row.
};

const LINKS = {
  apply: "/admissions",
  contact: "/contact",
  academics: "/academics",
  curriculum: "/academics/resources/curriculum",
  syllabus: "/academics/resources/syllabus",
};

// VERIFY every href below exists before launch.
const RELATED = [
  { href: "/academics/mba", title: "MBA", text: "Postgraduate management study, a common next step after BBA." },
  { href: "/academics/bca", title: "BCA", text: "Computer applications for students who lean toward technology." },
  { href: "/academics/btech", title: "B.Tech", text: "Four-year engineering programme across multiple branches." },
  { href: "/academics/mtech", title: "M.Tech", text: "Postgraduate engineering study for B.Tech graduates." },
  { href: LINKS.curriculum, title: "Curriculum Resources", text: "Programme-wise curriculum documents." },
  { href: LINKS.syllabus, title: "Syllabus Documents", text: "Official subject syllabi once published." },
  { href: LINKS.academics, title: "All Academics", text: "Browse every programme and department." },
  { href: LINKS.contact, title: "Contact Admissions", text: "Ask about eligibility, process and campus visits." },
];

// ============================================================================
// SEO METADATA
// ============================================================================
const SEO_TITLE = "BBA Course in Faridabad | Pt. L.R. College of Technology";
const SEO_DESC =
  "Explore the BBA at Pt. L.R. College of Technology, Faridabad: curriculum areas, eligibility, career paths, MBA pathways and admission guidance for Delhi NCR students.";

export const metadata = {
  title: SEO_TITLE,
  description: SEO_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESC,
    url: PAGE_URL,
    siteName: COLLEGE,
    locale: "en_IN",
    type: "website",
    ...(OG_IMAGE
      ? { images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "BBA at Pt. L.R. College of Technology, Faridabad" }] }
      : {}),
  },
  twitter: {
    card: OG_IMAGE ? "summary_large_image" : "summary",
    title: SEO_TITLE,
    description: SEO_DESC,
    ...(OG_IMAGE ? { images: [OG_IMAGE] } : {}),
  },
};

// ============================================================================
// PAGE CONTENT
// ============================================================================
const WHY_BBA = [
  {
    t: "A broad business foundation",
    d: "BBA introduces how organisations actually run: how products are marketed, how money is tracked, how people are managed and how decisions are made under uncertainty. That breadth helps you discover which function suits you before you specialise.",
  },
  {
    t: "Early practice in decision-making",
    d: "Case discussions, simulations and group assignments put you in the manager's seat from the first year. You learn to weigh incomplete information, defend a recommendation and revise it when the facts change.",
  },
  {
    t: "Confidence in communication",
    d: "Management is largely about explaining ideas, persuading colleagues and listening well. Presentations, viva-style discussions and written reports build that habit semester after semester.",
  },
  {
    t: "Flexible career directions",
    d: "Marketing, sales, operations, HR, finance support, analytics and entrepreneurship all draw on the same management core, so a BBA keeps several doors open instead of closing them early.",
  },
  {
    t: "A natural route to MBA",
    d: "Many graduates continue to postgraduate management study. A BBA gives you the vocabulary, the study habits and the project record that make an MBA classroom feel familiar.",
  },
  {
    t: "A region full of business activity",
    d: "Faridabad sits inside a Delhi NCR economy of manufacturing units, trading businesses, services firms and start-ups, which gives management students plenty of real organisations to observe, study and learn from.",
  },
];

const PILLARS = [
  {
    t: "Leadership",
    d: "Leadership is practised long before it is titled. Running a project team, chairing a discussion or coordinating a college event teaches you to set direction, divide work fairly and take responsibility for outcomes.",
    items: ["Team projects with defined roles", "Peer feedback and reflection", "Event and club coordination"],
  },
  {
    t: "Analytical thinking",
    d: "Good managers separate facts from opinion. You learn to read financial statements, interpret data, test assumptions and arrive at a recommendation you can justify with evidence.",
    items: ["Case analysis frameworks", "Spreadsheet-based problem solving", "Basic statistics and interpretation"],
  },
  {
    t: "Communication",
    d: "Clear speaking, concise writing and attentive listening carry across every business role. The programme gives repeated, low-risk chances to present, be questioned and improve.",
    items: ["Presentations and group discussions", "Professional email and report writing", "Negotiation and role-play exercises"],
  },
  {
    t: "Entrepreneurship",
    d: "Even if you never start a company, thinking like a founder sharpens judgment. You learn to spot a need, test an idea cheaply, estimate costs and explain why customers would care.",
    items: ["Idea validation and business models", "Simple budgeting and break-even thinking", "Pitching to a panel"],
  },
];

const SKILL_CHIPS = [
  "Time and project management",
  "Teamwork",
  "Negotiation",
  "Ethical judgment",
  "Financial literacy",
  "Digital fluency",
  "Problem solving",
  "Customer orientation",
];

const ADMISSION_STEPS = [
  { t: "Check eligibility", d: "Confirm that your qualifying examination and marks match the requirements for the session." },
  { t: "Speak to admissions", d: "Ask for the current-year process, documents list and any entrance or counselling requirement." },
  { t: "Submit your application", d: "Complete the application with your academic records and identification documents." },
  { t: "Selection and counselling", d: "The college communicates the selection criteria for the session and guides you through the next steps." },
  { t: "Confirm admission", d: "Complete the formalities communicated by the college to secure your place." },
];

const YEARS = [
  {
    y: "Year 1",
    t: "Build the foundation",
    items: [
      "Learn core management, accounting and economics vocabulary",
      "Strengthen English, writing and basic computer skills",
      "Join a club, committee or student initiative",
      "Start a reading habit: business news, annual reports, case studies",
    ],
  },
  {
    y: "Year 2",
    t: "Apply and specialise",
    items: [
      "Take on group projects and lead at least one",
      "Explore marketing, finance, HR or analytics through electives",
      "Learn spreadsheet analysis and a presentation tool well",
      "Seek a short internship, shadowing or live-project opportunity",
    ],
  },
  {
    y: "Year 3",
    t: "Prove and position",
    items: [
      "Complete a major project or report with a clear business question",
      "Prepare a CV, LinkedIn profile and interview stories",
      "Decide between a job, an MBA route or your own venture",
      "Prepare for entrance tests or professional certifications if you plan to continue",
    ],
  },
];

const SUBJECTS = [
  {
    id: "management",
    t: "Principles of Management and Organizational Behavior",
    d: [
      "This is the intellectual centre of the degree. You study how managers plan, organise, lead and control, and how those functions change across a family business, a factory, a start-up or a service company.",
      "Organizational behaviour then turns to people: motivation, personality, group dynamics, conflict, culture and change. Understanding why capable teams still struggle is often the most practical lesson in the programme.",
    ],
    topics: ["Planning and decision-making", "Leadership styles", "Motivation theories", "Team dynamics", "Organisational culture"],
  },
  {
    id: "marketing",
    t: "Marketing Management and Digital Marketing",
    d: [
      "Marketing teaches you to start with the customer. You study segmentation, targeting, positioning, pricing, distribution and promotion, and learn why a good product still needs a clear reason to be chosen.",
      "Digital marketing extends this into search, social media, content, email and analytics. Students learn how campaigns are planned, measured and improved, which is useful for employers and for anyone running a small business.",
    ],
    topics: ["Consumer behaviour", "Branding", "Market research", "Social media and content", "Campaign metrics"],
  },
  {
    id: "finance",
    t: "Financial Accounting and Business Finance",
    d: [
      "Accounting is the language of business. You learn to record transactions, prepare and read financial statements and understand what profit, cash flow and working capital really mean.",
      "Business finance then asks how organisations raise and use money: budgeting, cost of capital, investment decisions and basic risk. The goal is financial literacy that lets you question numbers rather than simply accept them.",
    ],
    topics: ["Journal and ledger basics", "Financial statements", "Cost and budgeting", "Working capital", "Investment appraisal basics"],
  },
  {
    id: "hrm",
    t: "Human Resource Management",
    d: [
      "People decisions shape every organisation. HRM covers manpower planning, recruitment and selection, training, performance appraisal, compensation and employee relations.",
      "Students also look at workplace ethics, diversity, labour regulations in outline and the growing use of HR technology, so that they understand both the human side and the process side of the function.",
    ],
    topics: ["Recruitment and selection", "Training and development", "Performance management", "Employee engagement", "Workplace ethics"],
  },
  {
    id: "economics-statistics",
    t: "Business Economics and Business Statistics",
    d: [
      "Economics explains the environment in which firms operate: demand and supply, costs, market structures, inflation and the broad forces that move industries. It helps you read news about the economy with real understanding.",
      "Statistics gives you tools to summarise data, spot patterns and estimate uncertainty. Averages, dispersion, correlation, probability and sampling become practical when applied to sales, quality and survey data.",
    ],
    topics: ["Demand and pricing", "Cost behaviour", "Market structures", "Descriptive statistics", "Correlation and probability"],
  },
  {
    id: "communication",
    t: "Business Communication and Professional Presentation",
    d: [
      "Workplace communication is a skill that can be trained. You practise business emails, reports, proposals, meeting etiquette, active listening and structured speaking.",
      "Presentation work covers building a clear storyline, designing readable slides, handling questions and speaking with composure. Repeated practice in a supportive setting is what turns nervousness into steadiness.",
    ],
    topics: ["Business writing", "Slide design", "Group discussion", "Interview preparation", "Cross-cultural etiquette"],
  },
  {
    id: "entrepreneurship",
    t: "Entrepreneurship, Innovation and Startup Fundamentals",
    d: [
      "This area treats entrepreneurship as a method, not a mystery. You learn to identify a problem worth solving, interview potential customers, sketch a business model and estimate whether the idea can sustain itself.",
      "Topics such as lean experimentation, basic legal forms of business, funding options in outline and pitching help students judge ideas realistically, whether they plan to launch, join a start-up or support a family enterprise.",
    ],
    topics: ["Opportunity identification", "Business model canvas", "Lean testing", "Basic unit economics", "Pitching"],
  },
  {
    id: "analytics",
    t: "Business Analytics and Digital Business Concepts",
    d: [
      "Modern firms run on data and software. Students are introduced to collecting, cleaning and visualising business data, using spreadsheets and dashboards to answer practical questions about sales, costs and customers.",
      "Digital business concepts cover e-commerce, digital payments, customer relationship tools, automation and the responsible use of data and AI-assisted tools, so graduates are comfortable in technology-enabled workplaces.",
    ],
    topics: ["Spreadsheet analysis", "Data visualisation", "E-commerce models", "CRM concepts", "Data privacy and ethics"],
  },
];

const GRID_SUBJECTS = [
  { t: "Management and Organizational Behavior", href: "#management" },
  { t: "Marketing and Digital Marketing", href: "#marketing" },
  { t: "Accounting and Business Finance", href: "#finance" },
  { t: "Human Resource Management", href: "#hrm" },
  { t: "Economics and Statistics", href: "#economics-statistics" },
  { t: "Business Communication", href: "#communication" },
  { t: "Entrepreneurship and Innovation", href: "#entrepreneurship" },
  { t: "Business Analytics and Digital Business", href: "#analytics" },
];

const CASE_STEPS = [
  { t: "Read and frame", d: "Identify the organisation, the decision-maker and the real question hidden inside the story." },
  { t: "Analyse the evidence", d: "Use numbers, frameworks and context to separate symptoms from causes." },
  { t: "Debate and decide", d: "Defend options in a group, challenge assumptions and agree on a recommendation." },
  { t: "Present and reflect", d: "Explain your answer to an audience, take questions and note what you would do differently." },
];

const PRACTICE_FORMATS = [
  { t: "Case studies", d: "Real or realistic business situations analysed individually and in groups." },
  { t: "Group projects", d: "Market surveys, business plans and process studies completed in teams with shared accountability." },
  { t: "Presentations", d: "Regular short and long presentations with questions from faculty and peers." },
  { t: "Live observation", d: "Visits to local shops, units or markets, and interviews with owners, to connect theory to practice." },
];

const GALLERY = [
  { label: "Business meeting and discussion", ratio: "4/3", cls: "bba-mosaic__a", src: null },
  { label: "Student presentation in class", ratio: "4/3", cls: "bba-mosaic__b", src: null },
  { label: "Entrepreneurship and idea pitch", ratio: "4/3", cls: "bba-mosaic__c", src: null },
  { label: "Teamwork and group project", ratio: "4/3", cls: "bba-mosaic__d", src: null },
  { label: "Campus learning and library", ratio: "4/3", cls: "bba-mosaic__e", src: null },
];

const CAREERS = [
  {
    t: "Marketing and Digital Marketing Executive",
    d: "Supports campaigns, content, social media and market research. Suits students who enjoy understanding customers and communicating ideas.",
    f: "Marketing, content, analytics",
  },
  {
    t: "Business Development and Sales Executive",
    d: "Finds prospects, builds relationships and helps convert interest into orders. Rewards persuasion, persistence and clear communication.",
    f: "Sales, negotiation, relationships",
  },
  {
    t: "Operations and Management Trainee",
    d: "Learns how processes, vendors, logistics and quality fit together inside a company, often rotating across functions.",
    f: "Operations, coordination, planning",
  },
  {
    t: "HR Executive or Recruitment Coordinator",
    d: "Assists with hiring, onboarding, records, training schedules and employee queries. Suits people-oriented, organised students.",
    f: "People, process, communication",
  },
  {
    t: "Accounts and Finance Support Associate",
    d: "Handles bookkeeping, billing, reconciliations and reporting support. Strong accounting basics and attention to detail matter most.",
    f: "Accounting, budgeting, accuracy",
  },
  {
    t: "Junior Business or Data Analyst",
    d: "Cleans data, builds simple dashboards and helps managers interpret sales and operational numbers. Spreadsheet and statistics skills are key.",
    f: "Analytics, reporting, insight",
  },
  {
    t: "Entrepreneur or Family-Business Manager",
    d: "Launches a venture or helps modernise an existing business with better costing, marketing and record-keeping.",
    f: "Initiative, finance, leadership",
  },
  {
    t: "Banking, Insurance and Customer Relationship Roles",
    d: "Works in advisory, service or relationship positions in financial services, depending on the recruiting institution's own requirements.",
    f: "Service, advisory, compliance basics",
  },
];

const FURTHER_STUDIES = [
  { t: "MBA or PGDM", d: "The most common continuation. Entry usually depends on tests such as CAT, XAT, MAT or CMAT, or on university-level entrance processes, plus interviews. Requirements differ by institute." },
  { t: "Specialised master's degrees", d: "Programmes in marketing, human resource management, finance, international business, supply chain or business analytics for students with a clear focus." },
  { t: "Professional certifications", d: "Courses in accounting, company secretaryship, cost and management accounting, digital marketing or data tools can add depth alongside or after the degree." },
  { t: "Law, public service and other routes", d: "Some graduates prepare for competitive examinations, law programmes or study abroad. Each route has its own eligibility and preparation timeline." },
];

const FAQS = [
  {
    q: "What is the BBA programme at Pt. L.R. College of Technology?",
    a: `The BBA (Bachelor of Business Administration) is an undergraduate management programme offered by ${COLLEGE}, Faridabad. It introduces students to management, marketing, finance, human resources, economics, communication, entrepreneurship and business analytics.`,
  },
  {
    q: "How long is the BBA programme?",
    a: `The programme is listed as ${PROGRAM.durationShort}. Please confirm the current scheme of studies with the admissions office, as it is set by the affiliating university.`,
  },
  {
    q: "What is the eligibility for BBA admission?",
    a: `Applicants are generally expected to have completed ${PROGRAM.eligibility}. ${PROGRAM.eligibilityNote} Contact admissions for the current requirements.`,
  },
  {
    q: "Which subjects will I study in BBA?",
    a: "Typical BBA study areas include principles of management, organizational behaviour, marketing, financial accounting, business finance, human resource management, business economics, statistics, business communication, entrepreneurship and business analytics. The official semester-wise subject list is published through the college curriculum and syllabus resources.",
  },
  {
    q: "What career options are available after BBA?",
    a: "Graduates may explore roles in marketing, sales, operations, human resources, accounts support, business analysis and entrepreneurship, or continue to postgraduate study such as an MBA. These are possibilities that depend on individual skills, effort and the job market, not guarantees.",
  },
  {
    q: "Can I do an MBA after BBA?",
    a: "Yes, a BBA is a common foundation for MBA and PGDM programmes. Admission rules, entrance tests and eligibility differ by institution, so check each programme before applying.",
  },
  {
    q: "Does the BBA include internships and practical learning?",
    a: "Practical learning through case studies, presentations and group projects is a core part of management education. Internship and industry-exposure arrangements for each session are communicated by the college, so please ask the admissions team for current details.",
  },
  {
    q: "How do I apply for BBA at Pt. L.R. College of Technology?",
    a: "Use the Apply for BBA button on this page or contact the admissions team to learn the current application steps, documents and timelines.",
  },
];

// ============================================================================
// STRUCTURED DATA
// ============================================================================
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Academics", item: `${SITE_URL}/academics` },
    { "@type": "ListItem", position: 3, name: "BBA", item: PAGE_URL },
  ],
};

// Mirrors the B.Tech page organisation entity (same name/url). If your site
// already injects an organisation schema globally, remove this block.
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: COLLEGE,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
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
// NOTE: No Course schema on purpose; add it only after official course details are verified.

// ============================================================================
// SMALL COMPONENTS
// ============================================================================
function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function MediaTile({ label, ratio = "16/9", src = null, className = "" }) {
  if (src) {
    return (
      <figure className={`bba-media ${className}`} style={{ aspectRatio: ratio }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} loading="lazy" />
      </figure>
    );
  }
  return (
    <div
      className={`bba-media bba-media--placeholder ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`${label} (image placeholder)`}
    >
      <span className="bba-media__corner bba-media__corner--tl" aria-hidden="true" />
      <span className="bba-media__corner bba-media__corner--br" aria-hidden="true" />
      <span className="bba-media__label">{label}</span>
    </div>
  );
}

function SpecRow({ k, v }) {
  return (
    <div className="bba-spec__row">
      <dt className="bba-spec__key">{k}</dt>
      <dd className="bba-spec__value">{v}</dd>
    </div>
  );
}

function SectionHead({ id, eyebrow, title, lede, light = false }) {
  return (
    <div className="bba-head">
      <p className={`bba-eyebrow${light ? " bba-eyebrow--light" : ""}`}>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {lede ? <p className="bba-lede">{lede}</p> : null}
    </div>
  );
}

// ============================================================================
// PAGE
// ============================================================================
export default function BBAPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={orgSchema} />
      <JsonLd data={faqSchema} />

      <main className="bba">
        {/* 1. HERO ------------------------------------------------------ */}
        <header className="bba-hero">
          <div className="bba-hero__grid" aria-hidden="true" />
          <div className="bba-wrap bba-hero__inner">
            <nav className="bba-crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true">/</span>
              <a href={LINKS.academics}>Academics</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">BBA</span>
            </nav>

            <div className="bba-hero__content">
              <div className="bba-hero__text">
                <p className="bba-eyebrow bba-eyebrow--light">PROGRAM · UNDERGRADUATE BUSINESS MANAGEMENT</p>
                <h1>Bachelor of Business Administration (BBA) at Pt. L.R. College of Technology, Faridabad</h1>
                <p className="bba-hero__lede">
                  Every organisation, from a neighbourhood workshop to a multinational, depends on
                  people who can read a market, manage a team, understand the numbers and explain
                  a decision clearly. The BBA builds those abilities step by step: business
                  fundamentals, marketing, finance, communication, entrepreneurship and
                  data-informed thinking, practised through cases, projects and presentations.
                  It is designed for students in Faridabad and across Delhi NCR who want a
                  practical start in management.
                </p>
                <div className="bba-hero__cta">
                  <a href={LINKS.apply} className="bba-btn bba-btn--primary">Apply for BBA</a>
                  <a href="#curriculum" className="bba-btn bba-btn--ghost">Explore Curriculum</a>
                </div>
              </div>

              <aside className="bba-spec" aria-labelledby="bba-spec-title">
                <p className="bba-spec__title" id="bba-spec-title">PROGRAM DATASHEET</p>
                <dl>
                  <SpecRow k="Degree" v={PROGRAM.degree} />
                  <SpecRow k="Duration" v={PROGRAM.duration} />
                  <SpecRow k="Eligibility" v={PROGRAM.eligibility} />
                  <SpecRow k="Study Structure" v={PROGRAM.structure} />
                  {PROGRAM.affiliation ? <SpecRow k="Affiliation" v={PROGRAM.affiliation} /> : null}
                  <SpecRow k="Location" v={PROGRAM.location} />
                  <SpecRow k="Learning Areas" v={PROGRAM.learningAreas} />
                </dl>
                <p className="bba-spec__note">Please confirm current details with the admissions office.</p>
              </aside>
            </div>
          </div>
        </header>

        {/* 2. FEATURE IMAGE -------------------------------------------- */}
        <div className="bba-wrap bba-feature">
          <MediaTile label="Business education at Pt. L.R. College of Technology, Faridabad campus" ratio="21/9" />
        </div>

        {/* 3. OVERVIEW -------------------------------------------------- */}
        <section className="bba-section" aria-labelledby="overview-h">
          <div className="bba-wrap bba-split bba-split--editorial">
            <div>
              <SectionHead id="overview-h" eyebrow="PROGRAM OVERVIEW" title="What the BBA is, and what it prepares you to do" />
              <p>
                The Bachelor of Business Administration is an undergraduate degree in general
                management. Rather than training you for one narrow job, it teaches the shared
                language of business: how organisations create value, how they are led, how they
                are financed and how they communicate with customers and employees.
              </p>
              <p>
                At {COLLEGE}, the BBA sits on a campus in Faridabad, close to a Delhi NCR economy
                made up of industry, trade, services and young companies. For students from
                Faridabad, Ballabgarh, Palwal and neighbouring areas, that proximity makes
                business concepts easy to observe in everyday life, from how a local supplier
                prices an order to how a retailer builds repeat customers.
              </p>
              <p>
                The programme moves from fundamentals in the early semesters to applied work later
                on. By the final year, students are expected to frame a business question,
                gather evidence, analyse it and present a considered recommendation, which is
                exactly the cycle they will repeat in a workplace.
              </p>
            </div>
            <aside className="bba-aside" aria-label="BBA at a glance">
              <h3>BBA at a glance</h3>
              <ul className="bba-ticks">
                <li>A general management degree with room to specialise later</li>
                <li>Learning through cases, projects and presentations</li>
                <li>Builds a base for jobs, entrepreneurship or an MBA</li>
                <li>Open to students who enjoy people, numbers and ideas in equal measure</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* 4. WHY BBA --------------------------------------------------- */}
        <section className="bba-section bba-section--tint" aria-labelledby="why-h">
          <div className="bba-wrap">
            <SectionHead
              id="why-h"
              eyebrow="WHY STUDY BBA"
              title="Six reasons students choose management after school"
              lede="A BBA is a good fit when you want to understand how organisations work and keep your options open while you find your direction."
            />
            <div className="bba-cards">
              {WHY_BBA.map((c) => (
                <article className="bba-card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CORE SKILLS ---------------------------------------------- */}
        <section className="bba-section bba-section--dark" aria-labelledby="skills-h">
          <div className="bba-wrap">
            <SectionHead
              id="skills-h"
              eyebrow="CORE MANAGEMENT SKILLS"
              title="Four capabilities the programme is designed to develop"
              lede="Skills grow through repetition. Each of these is practised across semesters, not taught once and forgotten."
              light
            />
            <div className="bba-pillars">
              {PILLARS.map((p) => (
                <article className="bba-pillar" key={p.t}>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                  <p className="bba-pillar__label">Practised through</p>
                  <ul>
                    {p.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <ul className="bba-chips bba-chips--light" aria-label="Additional skills">
              {SKILL_CHIPS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. ELIGIBILITY & ADMISSION ---------------------------------- */}
        <section className="bba-section" aria-labelledby="eligibility-h">
          <div className="bba-wrap bba-split">
            <div>
              <SectionHead id="eligibility-h" eyebrow="ELIGIBILITY" title="Who can apply for the BBA?" />
              <p>
                Applicants are generally expected to have completed {PROGRAM.eligibility}. {PROGRAM.eligibilityNote}
              </p>
              <p>
                Because requirements can change from one academic session to the next, the most
                reliable way to confirm your eligibility is to speak to the admissions team
                before you apply. Keep your marksheets and identification documents ready so the
                conversation can be specific.
              </p>
              <p>
                Parents and students from Faridabad and across Delhi NCR are welcome to visit
                the campus and ask questions about the programme before deciding.
              </p>
            </div>
            <div>
              <SectionHead id="admission-h" eyebrow="ADMISSION PROCESS" title="From enquiry to enrolment" />
              <ol className="bba-steps">
                {ADMISSION_STEPS.map((s) => (
                  <li key={s.t}>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </li>
                ))}
              </ol>
              <p className="bba-fineprint">
                Exact documents, dates, fees and seat availability are shared by the college for
                each session and are not listed on this page.
              </p>
            </div>
          </div>
        </section>

        {/* 7. DURATION & STRUCTURE ------------------------------------- */}
        <section className="bba-section bba-section--tint" aria-labelledby="duration-h">
          <div className="bba-wrap">
            <SectionHead
              id="duration-h"
              eyebrow="DURATION AND ACADEMIC STRUCTURE"
              title={`A ${PROGRAM.durationShort} journey from fundamentals to application`}
              lede="The structure below describes how a typical management degree progresses. The official scheme of studies is issued by the affiliating university and published through the college curriculum resources."
            />
            <div className="bba-ledger">
              <div className="bba-ledger__col">
                <h3>Early semesters</h3>
                <p>
                  Foundation papers in management, accounting, economics, mathematics or
                  statistics, computer applications and communication give every student a shared
                  base, whatever their school stream.
                </p>
              </div>
              <div className="bba-ledger__col">
                <h3>Middle semesters</h3>
                <p>
                  Functional areas such as marketing, finance, human resources and operations
                  deepen. Group projects, presentations and field assignments begin to carry more
                  weight.
                </p>
              </div>
              <div className="bba-ledger__col">
                <h3>Later semesters</h3>
                <p>
                  Electives, applied papers and a project or report help students focus on an area
                  of interest and demonstrate independent work before graduation.
                </p>
              </div>
            </div>
            <p className="bba-fineprint">
              For semester-wise papers and credits, see the{" "}
              <a href={LINKS.curriculum}>curriculum resources</a> and{" "}
              <a href={LINKS.syllabus}>syllabus documents</a>.
            </p>
          </div>
        </section>

        {/* 8. CURRICULUM OVERVIEW + SUBJECT GRID ----------------------- */}
        <section className="bba-section" id="curriculum" aria-labelledby="curriculum-h">
          <div className="bba-wrap">
            <SectionHead
              id="curriculum-h"
              eyebrow="CURRICULUM OVERVIEW"
              title="Business and management subject areas"
              lede="These are the broad areas a BBA typically covers. They describe learning themes, not an official semester-by-semester paper list, which is published separately by the university and college."
            />
            <ul className="bba-subject-grid">
              {GRID_SUBJECTS.map((s) => (
                <li key={s.t}>
                  <a href={s.href}>
                    <span>{s.t}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 9-16. SUBJECT DEEP DIVES ------------------------------------ */}
        <section className="bba-section bba-section--tint" aria-labelledby="areas-h">
          <div className="bba-wrap">
            <SectionHead
              id="areas-h"
              eyebrow="INSIDE THE SUBJECT AREAS"
              title="What you explore in each management discipline"
            />
            <div className="bba-subjects">
              {SUBJECTS.map((s) => (
                <article className="bba-subject" id={s.id} key={s.id} aria-labelledby={`${s.id}-h`}>
                  <h3 id={`${s.id}-h`}>{s.t}</h3>
                  <div className="bba-subject__body">
                    {s.d.map((para) => (
                      <p key={para.slice(0, 24)}>{para}</p>
                    ))}
                    <ul className="bba-chips" aria-label={`Topics in ${s.t}`}>
                      {s.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 17. PRACTICAL LEARNING -------------------------------------- */}
        <section className="bba-section" aria-labelledby="practice-h">
          <div className="bba-wrap">
            <SectionHead
              id="practice-h"
              eyebrow="PRACTICAL LEARNING"
              title="Case studies, presentations and group projects"
              lede="Management cannot be learned from a textbook alone. The classroom works best when students argue, present and defend their thinking."
            />
            <div className="bba-split">
              <div>
                <h3>How a typical case discussion unfolds</h3>
                <ol className="bba-steps bba-steps--compact">
                  {CASE_STEPS.map((s) => (
                    <li key={s.t}>
                      <h4>{s.t}</h4>
                      <p>{s.d}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3>Learning formats you can expect</h3>
                <dl className="bba-defs">
                  {PRACTICE_FORMATS.map((f) => (
                    <div key={f.t}>
                      <dt>{f.t}</dt>
                      <dd>{f.d}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* IMAGE MOSAIC ------------------------------------------------ */}
        <section className="bba-section bba-section--tint" aria-labelledby="gallery-h">
          <div className="bba-wrap">
            <SectionHead
              id="gallery-h"
              eyebrow="BUSINESS EDUCATION IN PICTURES"
              title="Meetings, presentations, ideas and teamwork"
              lede="Replace these labelled placeholders with real campus photographs when they are available."
            />
            <div className="bba-mosaic">
              {GALLERY.map((g) => (
                <MediaTile key={g.label} label={g.label} ratio={g.ratio} src={g.src} className={g.cls} />
              ))}
            </div>
          </div>
        </section>

        {/* 18. INDUSTRY EXPOSURE --------------------------------------- */}
        <section className="bba-section" aria-labelledby="industry-h">
          <div className="bba-wrap bba-split bba-split--editorial">
            <div>
              <SectionHead id="industry-h" eyebrow="INDUSTRY EXPOSURE AND INTERNSHIPS" title="Learning from real organisations" />
              <p>
                Business students gain the most when they see organisations at work. Industry
                exposure can take many forms: short internships, live projects, guest sessions,
                field visits, shadowing a manager or studying a local business in depth for a
                report.
              </p>
              <p>
                Faridabad and the wider Delhi NCR region contain manufacturing units, trading
                firms, logistics providers, service companies and start-ups that students can
                learn from. The specific internships, visits and speakers available in any
                session are announced by the college, and this page does not name partner
                companies or promise placements.
              </p>
              <p>
                Students can also take initiative: approach a local business for a short
                project, volunteer with a social enterprise, or support a family business with
                records and marketing. Ask the admissions team how the college currently
                supports internships and industry interaction.
              </p>
            </div>
            <aside className="bba-aside bba-aside--gold" aria-label="Making the most of exposure">
              <h3>Make any exposure count</h3>
              <ul className="bba-ticks">
                <li>Set a learning goal before you start</li>
                <li>Keep a short weekly log of what you observe</li>
                <li>Ask for feedback and a reference letter at the end</li>
                <li>Turn the experience into a report or presentation</li>
              </ul>
            </aside>
          </div>
        </section>

        {/* 19. CAREERS -------------------------------------------------- */}
        <section className="bba-section bba-section--tint" aria-labelledby="careers-h">
          <div className="bba-wrap">
            <SectionHead
              id="careers-h"
              eyebrow="CAREER PATHS AFTER BBA"
              title="Roles graduates may explore"
              lede="These are possibilities, not promises. Outcomes depend on your skills, effort, internships, the job market and each employer's own requirements."
            />
            <div className="bba-careers">
              {CAREERS.map((c) => (
                <article className="bba-career" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <p className="bba-career__focus"><span>Focus:</span> {c.f}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 20. FURTHER STUDIES ----------------------------------------- */}
        <section className="bba-section" aria-labelledby="further-h">
          <div className="bba-wrap">
            <SectionHead
              id="further-h"
              eyebrow="FURTHER STUDIES"
              title="MBA and other postgraduate pathways"
              lede="Many BBA graduates work for a few years before postgraduate study, while others continue straight away. Both routes are common."
            />
            <div className="bba-split bba-split--grid">
              {FURTHER_STUDIES.map((f) => (
                <div className="bba-path" key={f.t}>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              ))}
            </div>
            <p className="bba-fineprint">
              Interested in postgraduate management? Read about the college{" "}
              <a href="/academics/mba">MBA programme</a>.
            </p>
          </div>
        </section>

        {/* 21. ROADMAP ------------------------------------------------- */}
        <section className="bba-section bba-section--tint" aria-labelledby="roadmap-h">
          <div className="bba-wrap">
            <SectionHead
              id="roadmap-h"
              eyebrow="PROFESSIONAL DEVELOPMENT ROADMAP"
              title="A year-by-year plan for building your profile"
              lede="Use this as a personal checklist. Small, steady habits matter more than last-minute effort."
            />
            <ol className="bba-roadmap">
              {YEARS.map((y) => (
                <li className="bba-roadmap__item" key={y.y}>
                  <p className="bba-roadmap__year">{y.y}</p>
                  <h3>{y.t}</h3>
                  <ul className="bba-ticks">
                    {y.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 22. FAQ ------------------------------------------------------ */}
        <section className="bba-section" aria-labelledby="faq-h">
          <div className="bba-wrap bba-faq">
            <SectionHead id="faq-h" eyebrow="FREQUENTLY ASKED QUESTIONS" title="BBA at Pt. L.R. College of Technology: quick answers" />
            <div className="bba-faq__list">
              {FAQS.map((f) => (
                <details className="bba-faq__item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 23. RELATED -------------------------------------------------- */}
        <section className="bba-section bba-section--tint" aria-labelledby="related-h">
          <div className="bba-wrap">
            <SectionHead id="related-h" eyebrow="RELATED PROGRAMS AND USEFUL LINKS" title="Continue exploring the college" />
            <ul className="bba-links">
              {RELATED.map((r) => (
                <li key={r.href}>
                  <a href={r.href}>
                    <strong>{r.title}</strong>
                    <span>{r.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 24. FINAL CTA ----------------------------------------------- */}
        <section className="bba-final" aria-labelledby="cta-h">
          <div className="bba-wrap bba-final__inner">
            <div>
              <p className="bba-eyebrow bba-eyebrow--light">ADMISSIONS</p>
              <h2 id="cta-h">Begin your business management journey in Faridabad</h2>
              <p>
                Talk to the admissions team about eligibility, the current admission process and
                campus visits, or start your application for the BBA today.
              </p>
            </div>
            <div className="bba-final__actions">
              <a href={LINKS.apply} className="bba-btn bba-btn--gold">Apply for BBA</a>
              <a href={LINKS.contact} className="bba-btn bba-btn--outline-light">Contact Admissions</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}