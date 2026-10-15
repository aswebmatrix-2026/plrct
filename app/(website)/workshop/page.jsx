import "./workshops.css";

// ============================================================================
// SITE CONSTANTS
// ============================================================================
const SITE_URL = "https://ptlrct.com";
const PAGE_URL = `${SITE_URL}/academics/resources/workshops`;

// ============================================================================
// SEO METADATA — Next.js App Router
// ============================================================================
export const metadata = {
  title: "Engineering Workshops & Practical Training | Pt. L.R. College of Technology, Faridabad",
  description:
    "Hands-on engineering workshops and practical training at Pt. L.R. College of Technology, Faridabad: mechanical workshop, fabrication and CNC facilities, safety guidance and related academic resources.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Engineering Workshops & Practical Training | Pt. L.R. College of Technology",
    description:
      "Hands-on technical education through engineering workshops, fabrication and CNC facilities at Pt. L.R. College of Technology, Faridabad.",
    url: PAGE_URL,
    siteName: "Pt. L.R. College of Technology",
    locale: "en_IN",
    type: "website",
    // Add `images: [{ url, width: 1200, height: 630, alt }]` once an OG image exists.
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Workshops & Practical Training | Pt. L.R. College of Technology",
    description:
      "Hands-on engineering workshops and practical training at Pt. L.R. College of Technology, Faridabad.",
  },
};

// ============================================================================
// CONFIGURABLE CONTENT  (for the college administration)
// ----------------------------------------------------------------------------
// Everything below comes either from the college's existing B.Tech / home page
// content or is general educational text. Sections backed by a list that is
// EMPTY are hidden automatically, so nothing is invented. To add a verified
// detail, add an entry to the matching list.
// ============================================================================

const BREADCRUMBS = [
  { name: "Home", href: "/" },
  { name: "Academics", href: "/academics" },
  { name: "Resources", href: "/academics/resources" }, // confirm this route exists
  { name: "Workshops", href: null },
];

/** Hero datasheet — only facts stated on the existing B.Tech page. */
const DATASHEET = [
  { k: "Institution", v: "Pt. L.R. College of Technology" },
  { k: "Location", v: "Faridabad, Haryana (NCR)" },
  { k: "Facility", v: "Mechanical workshops with fabrication and CNC facilities" },
  { k: "First-year course", v: "Workshop practice (common to all branches)" },
  { k: "Related facilities", v: "Laboratories and project work" },
];

/** Overview highlights — taken from the existing B.Tech page. */
const HIGHLIGHTS = [
  {
    title: "Mechanical workshops",
    text: "Mechanical workshops with fabrication and CNC facilities are part of the campus laboratory floors.",
  },
  {
    title: "First-year workshop practice",
    text: "Workshop practice is part of the common first-year engineering fundamentals shared across all branches.",
  },
  {
    title: "Faculty-guided projects",
    text: "Minor and major projects, guided by faculty, build on practical skills from the second year onward.",
  },
];

/**
 * WORKSHOPS — department-wise workshop entries.
 * Add an entry ONLY for a workshop the administration has confirmed.
 * Optional fields: equipment (array of strings), image, href.
 */
const WORKSHOPS = [
  {
    id: "mechanical-workshop",
    name: "Mechanical Workshop",
    category: "Mechanical",
    department: "me",
    description:
      "Mechanical workshops with fabrication and CNC facilities support hands-on practice for engineering students.",
    image: "/images/workshop.webp",
    equipment: [], // e.g. ["Lathe machine", "Welding set"] — add only once confirmed
    href: "/academics/departments/me",
  },
];

/** Departments (routes taken from the existing B.Tech page links). */
const DEPARTMENTS = [
  { id: "me", name: "Mechanical Engineering", href: "/academics/departments/me" },
  { id: "ee", name: "Electronics Engineering", href: "/academics/departments/ee" },
  { id: "cse", name: "Computer Science Engineering", href: "/academics/departments/cse" },
  { id: "ce", name: "Civil Engineering", href: "/academics/departments/ce" },
  { id: "applied-science", name: "Applied Science", href: "/academics/departments/applied-science" },
];

/**
 * PROCESSES — only processes the college has confirmed.
 * Fabrication and CNC are named on the existing B.Tech page. Add Fitting,
 * Welding, Machining, etc. here once the administration confirms them.
 */
const PROCESSES = [
  {
    name: "Fabrication",
    text: "Fabrication is the building of components and structures by cutting, shaping and joining materials.",
  },
  {
    name: "CNC",
    text: "CNC (computer numerical control) machining uses programmed instructions to control machine tools with precision.",
  },
];

/** Tools, machinery and equipment. Leave empty until confirmed — section hides. */
const EQUIPMENT = [
  // { name: "Lathe machine", workshop: "Mechanical Workshop", note: "" },
];

const ACTIVITIES = [
  {
    title: "Workshop practice",
    text: "Students begin with workshop practice in the common first year, building familiarity with hands-on engineering work.",
  },
  {
    title: "Minor and major projects",
    text: "Faculty-guided projects, starting as early as the second year, turn classroom concepts into working outcomes.",
  },
  {
    title: "Industrial training",
    text: "Structured industrial training connects workshop skills to real industry practice.",
    href: "/academics/resources/industrial-training",
    linkLabel: "Industrial Training",
  },
];

/** General safety guidance. College-specific rules come from the in-charge. */
const SAFETY_ITEMS = [
  "Wear appropriate protective equipment for the task, such as safety glasses, gloves and closed footwear, as instructed.",
  "Tie back long hair and avoid loose clothing, jewellery and dangling items near moving machinery.",
  "Know where the emergency exits, first-aid kit and fire extinguisher are located.",
  "Report damaged tools, faulty equipment or unsafe conditions to the workshop in-charge immediately.",
  "Keep work areas clean and free of obstructions, spills and loose materials.",
];

const SUPERVISION_ITEMS = [
  "Follow the instructions of the workshop in-charge and instructors at all times.",
  "Use machines and tools only for the task assigned, and only when authorised to do so.",
  "Ask for demonstration or guidance before using equipment for the first time.",
  "Workshop timings, batches and access are as notified by the department.",
];

const OUTCOMES = [
  { title: "Applying theory", text: "Connecting engineering concepts from the classroom with real materials, tools and processes." },
  { title: "Safe working habits", text: "Building the discipline of working safely with tools and equipment." },
  { title: "Technical skills", text: "Developing practical skills in making, assembling and testing components." },
  { title: "Teamwork and documentation", text: "Working in groups and recording work clearly, as in a professional setting." },
  { title: "Problem solving", text: "Diagnosing issues and improving a design or process through hands-on iteration." },
  { title: "Industry readiness", text: "Preparing for industrial training, internships and engineering roles." },
];

/** Gallery — real images that already exist in /public/images. Add more as available. */
const GALLERY = [
  {
    src: "/images/workshop.webp",
    alt: "Engineering workshop at Pt. L.R. College of Technology",
    caption: "Engineering Workshop",
  },
];

const FAQS = [
  {
    q: "What workshop facilities does the college have?",
    a: "The college's mechanical workshops include fabrication and CNC facilities. For department-specific details, please refer to the relevant department page or contact the college.",
  },
  {
    q: "Is workshop practice part of the B.Tech curriculum?",
    a: "Yes. Workshop practice is part of the common first-year engineering fundamentals shared across all branches. See the curriculum page for the complete scheme.",
  },
  {
    q: "Do students need protective equipment in the workshop?",
    a: "Protective equipment appropriate to the task is generally required in workshops. Students should follow the instructions given by the workshop in-charge.",
  },
  {
    q: "Can students use workshop machines on their own?",
    a: "Machines and tools should be used only when authorised and under the guidance of the workshop in-charge or instructors.",
  },
  {
    q: "Where can I see laboratory facilities?",
    a: "Laboratory facilities are described on the laboratories page of this website.",
  },
];

const RELATED = [
  { title: "Laboratories", description: "Computer, electronics, electrical and other laboratory facilities.", href: "/academics/resources/laboratories" },
  { title: "Industrial Training", description: "Training and internship information for engineering students.", href: "/academics/resources/industrial-training" },
  { title: "Curriculum", description: "Semester-wise subjects, credits and electives for each programme.", href: "/academics/resources/curriculum" },
  { title: "Examination Cell", description: "Examination notices and student guidelines.", href: "/academics/resources/examination-cell" },
  { title: "Academic Calendar", description: "The academic year plan.", href: "/academics/resources/academic-calendar" }, // confirm route exists
];

// ============================================================================
// STRUCTURED DATA (JSON-LD)
// ============================================================================
const toJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: BREADCRUMBS.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: b.name,
    item: b.href ? `${SITE_URL}${b.href}` : PAGE_URL,
  })),
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

// ============================================================================
// REUSABLE COMPONENTS
// ============================================================================
function SectionHeader({ id, eyebrow, title, intro }) {
  return (
    <div className="ws-section-head">
      <p className="ws-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {intro ? <p className="ws-section-head__intro">{intro}</p> : null}
    </div>
  );
}

function InfoCard({ title, text, href, linkLabel }) {
  return (
    <div className="ws-card">
      <h3>{title}</h3>
      <p>{text}</p>
      {href ? (
        <a className="ws-text-link" href={href}>
          {linkLabel || "Learn more"}
          <span className="ws-sr-only">: {title}</span>
        </a>
      ) : null}
    </div>
  );
}

function InfoPanel({ title, children }) {
  return (
    <div className="ws-panel">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="ws-checklist">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

function WorkshopCard({ w }) {
  return (
    <article className="ws-workshop">
      {w.image ? (
        <div className="ws-workshop__media">
          <img src={w.image} alt={`${w.name} at Pt. L.R. College of Technology`} loading="lazy" />
        </div>
      ) : null}
      <div className="ws-workshop__body">
        <span className="ws-badge">{w.category}</span>
        <h3>{w.name}</h3>
        <p>{w.description}</p>
        {w.equipment && w.equipment.length > 0 ? (
          <ul className="ws-checklist">
            {w.equipment.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        ) : null}
        {w.href ? (
          <a className="ws-text-link" href={w.href}>
            Department details
            <span className="ws-sr-only">: {w.name}</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

// ============================================================================
// PAGE
// ============================================================================
export default function WorkshopsPage() {
  const hasEquipment = EQUIPMENT.length > 0;

  const sectionLinks = [
    { id: "overview", label: "Overview" },
    { id: "facilities", label: "Facilities" },
    { id: "mechanical", label: "Mechanical Workshop" },
    { id: "electrical", label: "Electrical & Electronics" },
    { id: "directory", label: "Directory" },
    ...(hasEquipment ? [{ id: "equipment", label: "Equipment" }] : []),
    { id: "activities", label: "Activities" },
    { id: "safety", label: "Safety" },
    { id: "outcomes", label: "Outcomes" },
    { id: "gallery", label: "Gallery" },
    { id: "faq", label: "FAQ" },
  ];

  const mechanical = WORKSHOPS.filter((w) => w.category === "Mechanical");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }}
      />

      <main className="workshops">
        {/* ---------------- BREADCRUMBS + HERO ---------------- */}
        <header className="ws-hero">
          <div className="ws-hero__grid" aria-hidden="true" />
          <div className="ws-container ws-hero__inner">
            <nav className="ws-breadcrumbs" aria-label="Breadcrumb">
              <ol>
                {BREADCRUMBS.map((b) => (
                  <li key={b.name}>
                    {b.href ? <a href={b.href}>{b.name}</a> : <span aria-current="page">{b.name}</span>}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="ws-hero__content">
              <div className="ws-hero__text">
                <p className="ws-eyebrow ws-eyebrow--light">RESOURCES · WORKSHOPS</p>
                <h1>Engineering Workshops &amp; Practical Training</h1>
                <p className="ws-hero__lede">
                  Engineers learn best by building things. At Pt. L.R. College of
                  Technology, Faridabad, workshop practice and hands-on projects
                  sit alongside classroom theory, helping students turn concepts
                  into practical skill from their very first year.
                </p>
                <div className="ws-hero__cta">
                  <a href="#facilities" className="ws-btn ws-btn--primary">
                    Explore Facilities
                  </a>
                  <a href="/academics/resources/laboratories" className="ws-btn ws-btn--ghost-light">
                    View Laboratories
                  </a>
                </div>
              </div>

              <aside className="ws-spec-panel" aria-label="Workshops datasheet">
                <p className="ws-spec-panel__title">WORKSHOP DATASHEET</p>
                {DATASHEET.map((d) => (
                  <div className="ws-spec-row" key={d.k}>
                    <span className="ws-spec-row__key">{d.k}</span>
                    <span className="ws-spec-row__value">{d.v}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </header>

        {/* ---------------- ON THIS PAGE ---------------- */}
        <div className="ws-jump">
          <div className="ws-container">
            <nav aria-label="On this page">
              <ul className="ws-jump__list">
                {sectionLinks.map((l) => (
                  <li key={l.id}>
                    <a href={`#${l.id}`}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* ---------------- INTRODUCTION ---------------- */}
        <section id="overview" className="ws-section" aria-labelledby="overview-h">
          <div className="ws-container ws-two-col">
            <div>
              <SectionHeader
                id="overview-h"
                eyebrow="INTRODUCTION"
                title="Hands-on technical education"
              />
              <p>
                Theory is only half of an engineering education. Workshops give
                students the chance to handle real materials, tools and
                processes, to see how components are made, and to understand why
                design decisions matter in practice.
              </p>
              <p>
                The college combines workshop practice, laboratory work and
                faculty-guided projects across the programme, so that practical
                learning is built into each year rather than saved for the end.
              </p>
            </div>
            <InfoPanel title="What you will find on this page">
              <CheckList
                items={[
                  "Workshop facilities and the mechanical workshop",
                  "Fabrication and CNC information",
                  "Department-wise directory",
                  "Student activities and learning outcomes",
                  "Safety and supervision guidance",
                  "Gallery, FAQs and related resources",
                ]}
              />
            </InfoPanel>
          </div>
        </section>

        {/* ---------------- FACILITIES OVERVIEW ---------------- */}
        <section id="facilities" className="ws-section ws-section--white" aria-labelledby="facilities-h">
          <div className="ws-container">
            <SectionHeader
              id="facilities-h"
              eyebrow="FACILITIES OVERVIEW"
              title="Workshop facilities at a glance"
            />
            <div className="ws-card-grid">
              {HIGHLIGHTS.map((h) => (
                <InfoCard key={h.title} title={h.title} text={h.text} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- MECHANICAL WORKSHOP + PROCESSES ---------------- */}
        <section id="mechanical" className="ws-section" aria-labelledby="mechanical-h">
          <div className="ws-container">
            <SectionHeader
              id="mechanical-h"
              eyebrow="MECHANICAL WORKSHOP"
              title="Mechanical workshop and manufacturing processes"
              intro="The college's mechanical workshops include fabrication and CNC facilities."
            />
            {mechanical.length > 0 ? (
              <div className="ws-workshop-grid">
                {mechanical.map((w) => (
                  <WorkshopCard key={w.id} w={w} />
                ))}
              </div>
            ) : null}

            {PROCESSES.length > 0 ? (
              <div className="ws-stack">
                <h3 className="ws-subhead">Processes</h3>
                <div className="ws-card-grid ws-card-grid--two">
                  {PROCESSES.map((p) => (
                    <InfoCard key={p.name} title={p.name} text={p.text} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* ---------------- ELECTRICAL & ELECTRONICS ---------------- */}
        <section id="electrical" className="ws-section ws-section--white" aria-labelledby="electrical-h">
          <div className="ws-container ws-two-col">
            <div>
              <SectionHeader
                id="electrical-h"
                eyebrow="ELECTRICAL & ELECTRONICS"
                title="Electrical and electronics practical work"
              />
              <p>
                Hands-on electrical and electronics practice takes place in the
                college&apos;s laboratories, including electronics and
                communication labs and electrical machines and power systems labs.
              </p>
              <p>
                Details of each facility are available on the laboratories page
                and the relevant department pages.
              </p>
              <div className="ws-actions">
                <a className="ws-btn ws-btn--primary" href="/academics/resources/laboratories">
                  View Laboratories
                </a>
                <a className="ws-text-link" href="/academics/departments/ee">
                  Electronics Engineering
                </a>
              </div>
            </div>
            <InfoPanel title="Related practical facilities">
              <CheckList
                items={[
                  "Electronics and communication labs",
                  "Electrical machines and power systems labs",
                  "Computer programming and networking labs",
                ]}
              />
            </InfoPanel>
          </div>
        </section>

        {/* ---------------- DEPARTMENT DIRECTORY ---------------- */}
        <section id="directory" className="ws-section" aria-labelledby="directory-h">
          <div className="ws-container">
            <SectionHeader
              id="directory-h"
              eyebrow="DIRECTORY"
              title="Department-wise workshop directory"
              intro="Select a department for its facilities and details."
            />
            <div className="ws-dir-grid">
              {DEPARTMENTS.map((d) => {
                const list = WORKSHOPS.filter((w) => w.department === d.id);
                return (
                  <a className="ws-dir-card" href={d.href} key={d.id}>
                    <h3>{d.name}</h3>
                    {list.length > 0 ? (
                      <ul>
                        {list.map((w) => (
                          <li key={w.id}>{w.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>View department page</p>
                    )}
                    <span className="ws-dir-card__arrow" aria-hidden="true">→</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- EQUIPMENT (hidden until data is added) ---------------- */}
        {hasEquipment ? (
          <section id="equipment" className="ws-section ws-section--white" aria-labelledby="equipment-h">
            <div className="ws-container">
              <SectionHeader
                id="equipment-h"
                eyebrow="EQUIPMENT"
                title="Tools, machinery and equipment"
              />
              <div className="ws-card-grid">
                {EQUIPMENT.map((e) => (
                  <InfoCard
                    key={e.name}
                    title={e.name}
                    text={[e.workshop, e.note].filter(Boolean).join(" · ")}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------------- ACTIVITIES ---------------- */}
        <section id="activities" className="ws-section" aria-labelledby="activities-h">
          <div className="ws-container">
            <SectionHeader
              id="activities-h"
              eyebrow="STUDENT ACTIVITIES"
              title="Practical activities and project development"
            />
            <div className="ws-card-grid">
              {ACTIVITIES.map((a) => (
                <InfoCard key={a.title} {...a} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- SAFETY + SUPERVISION ---------------- */}
        <section id="safety" className="ws-section ws-section--white" aria-labelledby="safety-h">
          <div className="ws-container">
            <SectionHeader
              id="safety-h"
              eyebrow="SAFETY & ACCESS"
              title="Workshop safety, PPE, supervision and access"
              intro="This is general good-practice guidance. College-specific rules are those issued by the workshop in-charge and the department."
            />
            <div className="ws-two-col">
              <InfoPanel title="Safety and personal protective equipment">
                <CheckList items={SAFETY_ITEMS} />
              </InfoPanel>
              <InfoPanel title="Supervision and access guidelines">
                <CheckList items={SUPERVISION_ITEMS} />
              </InfoPanel>
            </div>
          </div>
        </section>

        {/* ---------------- OUTCOMES ---------------- */}
        <section id="outcomes" className="ws-section" aria-labelledby="outcomes-h">
          <div className="ws-container">
            <SectionHeader
              id="outcomes-h"
              eyebrow="LEARNING OUTCOMES"
              title="Industrial skills and practical learning outcomes"
            />
            <div className="ws-card-grid">
              {OUTCOMES.map((o) => (
                <InfoCard key={o.title} title={o.title} text={o.text} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- GALLERY ---------------- */}
        {GALLERY.length > 0 ? (
          <section id="gallery" className="ws-section ws-section--white" aria-labelledby="gallery-h">
            <div className="ws-container">
              <SectionHeader id="gallery-h" eyebrow="GALLERY" title="Workshop image gallery" />
              <div className={`ws-gallery ws-gallery--${Math.min(GALLERY.length, 3)}`}>
                {GALLERY.map((g) => (
                  <figure className="ws-tile" key={g.src}>
                    <img src={g.src} alt={g.alt} loading="lazy" />
                    <figcaption>{g.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------------- FAQ ---------------- */}
        <section id="faq" className="ws-section" aria-labelledby="faq-h">
          <div className="ws-container">
            <SectionHeader id="faq-h" eyebrow="FREQUENTLY ASKED QUESTIONS" title="Workshops: quick answers" />
            <div className="ws-faq-list">
              {FAQS.map((f) => (
                <details className="ws-faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- RELATED LINKS ---------------- */}
        <section className="ws-section ws-section--white" aria-labelledby="related-h">
          <div className="ws-container">
            <SectionHeader id="related-h" eyebrow="RELATED LINKS" title="Explore related resources" />
            <div className="ws-link-grid">
              {RELATED.map((l) => (
                <a className="ws-link-card" href={l.href} key={l.title}>
                  <h3>{l.title}</h3>
                  <p>{l.description}</p>
                  <span className="ws-link-card__arrow" aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section className="ws-final-cta" aria-labelledby="cta-h">
          <div className="ws-container ws-final-cta__inner">
            <div>
              <p className="ws-eyebrow ws-eyebrow--light">HANDS-ON ENGINEERING</p>
              <h2 id="cta-h">Learn engineering by building it</h2>
              <p>
                Explore the programmes and facilities at Pt. L.R. College of
                Technology, Faridabad, or speak with the college to learn more.
              </p>
            </div>
            <div className="ws-final-cta__actions">
              <a href="/academics/btech" className="ws-btn ws-btn--gold">
                Explore B.Tech
              </a>
              <a href="/contact" className="ws-btn ws-btn--outline-light">
                Contact the College
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}