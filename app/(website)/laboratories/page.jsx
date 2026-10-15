import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import "./laboratories.css";

// ============================================================================
// SITE CONSTANTS
// ============================================================================
const SITE_URL = "https://ptlrct.com";
const PAGE_URL = `${SITE_URL}/academics/resources/laboratories`;
const FALLBACK = "Contact the college for current details";

// ============================================================================
// CONFIGURATION — EDIT THIS SECTION ONLY
// ============================================================================
const LAB_CONFIG = {
  contactHref: "/contact",
  admissionsHref: "/admissions",
  programsHref: "/academics/btech",
  coordinator: null, // e.g. "Name, Designation"
  labHours: null, // e.g. "As notified by each department"
  safetyDocument: { label: "Laboratory safety guidelines", href: null }, // e.g. "/documents/lab-safety.pdf"
};

// Real photographs from /public, e.g. "/images/labs/computer-lab.jpg".
// null = clearly labelled placeholder. Paths are checked at build time;
// a missing file falls back to the placeholder.
const LAB_IMAGES = {
  intro: {
    src: null,
    alt: "Students working on a practical exercise in a college laboratory",
    label: "Laboratory photograph (add to LAB_IMAGES.intro)",
  },
};

// Facilities. `status`:
//   "site"    = mentioned on the existing B.Tech page
//   "confirm" = suggested category; confirm with the college before publishing
// Set show:false to hide an entry. `image` may be a /public path or null.
const LAB_FACILITIES = [
  {
    id: "programming-networking",
    show: true,
    status: "site",
    icon: "code",
    name: "Programming & Networking Laboratories",
    desc: "Practical sessions that accompany computing coursework, where students apply programming and networking concepts through guided exercises.",
    activities: ["Programming practice", "Guided software exercises", "Networking fundamentals"],
    image: null,
  },
  {
    id: "ai-robotics",
    show: true,
    status: "site",
    icon: "chip",
    name: "AI, Robotics & Data Science Laboratory",
    desc: "A project-oriented space for work in emerging technology areas, supporting applied learning beyond the core syllabus.",
    activities: ["Applied project work", "Data and model experiments", "Prototype building"],
    image: null,
  },
  {
    id: "electronics",
    show: true,
    status: "site",
    icon: "chip",
    name: "Electronics & Communication Laboratories",
    desc: "Hands-on practice with electronic circuits and communication concepts, connecting theory to measurement and observation.",
    activities: ["Circuit experiments", "Measurement and observation", "Equipment handling"],
    image: null,
  },
  {
    id: "electrical",
    show: true,
    status: "site",
    icon: "bolt",
    name: "Electrical Machines & Power Systems Laboratories",
    desc: "Practical sessions that help students understand electrical machines and power systems through supervised experiments.",
    activities: ["Supervised experiments", "Readings and analysis", "Safe equipment use"],
    image: null,
  },
  {
    id: "mechanical",
    show: true,
    status: "site",
    icon: "gear",
    name: "Mechanical Workshops & Fabrication",
    desc: "Workshop-based learning that builds familiarity with tools, processes and fabrication practice.",
    activities: ["Tool and process familiarity", "Workshop assignments", "Fabrication practice"],
    image: null,
  },
  {
    id: "civil",
    show: true,
    status: "site",
    icon: "building",
    name: "Civil Engineering: Material Testing & Surveying",
    desc: "Practical learning in testing of materials and surveying, linking classroom principles to field and laboratory methods.",
    activities: ["Material testing exercises", "Surveying practice", "Recording and reporting results"],
    image: null,
  },
  {
    id: "physics",
    show: true,
    status: "confirm",
    icon: "atom",
    name: "Physics Laboratory",
    desc: "Experiment-based learning that supports first-year science and engineering physics. Facility details are to be confirmed.",
    activities: ["Experiments and demonstrations", "Observation and data recording", "Error analysis"],
    image: null,
  },
  {
    id: "chemistry",
    show: true,
    status: "confirm",
    icon: "flask",
    name: "Chemistry Laboratory",
    desc: "Experiment-based learning that supports first-year science and engineering chemistry. Facility details are to be confirmed.",
    activities: ["Guided experiments", "Careful measurement", "Safe handling of materials"],
    image: null,
  },
  {
    id: "communication",
    show: false, // enable only if the college confirms this facility
    status: "confirm",
    icon: "chat",
    name: "Communication & Language Laboratory",
    desc: "Placeholder: describe the facility once confirmed.",
    activities: ["Add activity", "Add activity"],
    image: null,
  },
  {
    id: "pharmacy",
    show: false, // enable only if the college offers a relevant programme
    status: "confirm",
    icon: "flask",
    name: "Pharmacy Laboratory",
    desc: "Placeholder: describe the facility once confirmed.",
    activities: ["Add activity", "Add activity"],
    image: null,
  },
];

// ============================================================================
// SERVER-SIDE VALIDATION (routes and files; fails open if folders unreadable)
// ============================================================================
let ROUTE_CACHE;

function walkRoutes(dir, base, out) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.isFile() && /^page\.(js|jsx|ts|tsx|mdx)$/.test(e.name)) {
      out.add(base || "/");
    } else if (e.isDirectory()) {
      const n = e.name;
      if (n.startsWith("_") || n.startsWith("@") || n.startsWith("(.") || n.startsWith("[")) continue;
      const isGroup = n.startsWith("(") && n.endsWith(")");
      walkRoutes(path.join(dir, n), isGroup ? base : `${base}/${n}`, out);
    }
  }
}

function getKnownRoutes() {
  if (ROUTE_CACHE !== undefined) return ROUTE_CACHE;
  const found = new Set();
  for (const dir of ["app", "src/app"]) {
    walkRoutes(path.join(process.cwd(), dir), "", found);
  }
  ROUTE_CACHE = found.size ? found : null;
  return ROUTE_CACHE;
}

function routeExists(href) {
  if (!href) return false;
  if (/^(https?:|mailto:|tel:)/.test(href)) return true;
  if (!href.startsWith("/")) return false;
  const routes = getKnownRoutes();
  if (!routes) return true;
  const clean = href.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
  return routes.has(clean);
}

function fileExists(href) {
  if (!href) return false;
  if (/^https?:\/\//.test(href)) return true;
  if (!href.startsWith("/")) return false;
  const pub = path.join(process.cwd(), "public");
  if (!fs.existsSync(pub)) return true;
  try {
    const target = path.normalize(path.join(pub, decodeURIComponent(href.split(/[?#]/)[0])));
    if (!target.startsWith(pub + path.sep)) return false;
    return fs.statSync(target).isFile();
  } catch {
    return false;
  }
}

// ============================================================================
// STATIC CONTENT (general guidance; not a statement about specific equipment)
// ============================================================================
const FACILITIES_SHOWN = LAB_FACILITIES.filter((f) => f.show);

const INTRO_POINTS = [
  { t: "Practical exercises", d: "Guided tasks that turn a concept from the lecture into something students do themselves." },
  { t: "Experimentation and observation", d: "Careful measurement and recording build the habit of evidence-based reasoning." },
  { t: "Problem-solving", d: "When results differ from expectations, students learn to diagnose and refine their approach." },
  { t: "Application of theory", d: "Principles taught in class are tested in realistic settings, which deepens understanding." },
];

const IT_TOPICS = [
  { icon: "code", t: "Programming practice", d: "Regular coding exercises help students move from syntax to confident problem-solving." },
  { icon: "monitor", t: "Web development and software projects", d: "Project work introduces the planning, building and testing involved in real software." },
  { icon: "database", t: "Database concepts", d: "Hands-on exercises reinforce how data is structured, stored and retrieved." },
  { icon: "network", t: "Networking fundamentals", d: "Practical activities make abstract networking ideas more concrete." },
  { icon: "chip", t: "Practical assignments", d: "Assignments develop the habit of finishing, documenting and presenting technical work." },
  { icon: "atom", t: "Technical problem-solving", d: "Debugging and iteration teach students to approach unfamiliar problems methodically." },
];

const SCIENCE_ITEMS = [
  { t: "Experiments and demonstrations", d: "Seeing a principle at work makes it easier to understand and remember." },
  { t: "Measurement and observation", d: "Recording data accurately is a core skill across science and engineering." },
  { t: "Technical problem-solving", d: "Experiments rarely go exactly as planned, which is where analysis skills grow." },
  { t: "Equipment handling", d: "Careful, correct use of instruments builds confidence and good practice." },
  { t: "Practical assignments", d: "Write-ups and records teach students to communicate results clearly." },
  { t: "Application of principles", d: "Practical work connects formulas and models with real behaviour." },
];

const PROCESS_STEPS = [
  { t: "Understand", d: "Learn the concept in class and read the practical's objectives before you begin." },
  { t: "Experiment", d: "Apply the concept through practical exercises, following the guidance given." },
  { t: "Analyze", d: "Observe results, compare them with expectations and identify solutions." },
  { t: "Improve", d: "Develop skills through repetition, feedback and reflection on each practical." },
];

const SAFETY_POINTS = [
  "Follow the instructions of faculty and laboratory staff at all times",
  "Handle equipment and materials responsibly and only for their intended use",
  "Keep your workspace clean, organised and free of obstructions",
  "Follow the applicable safety procedures for each laboratory",
  "Report damaged equipment or unsafe conditions immediately",
];

const BENEFITS = [
  { t: "Stronger conceptual understanding", d: "Doing makes ideas stick. Practical work turns abstract theory into familiar experience." },
  { t: "Hands-on technical experience", d: "Students gain confidence with tools, instruments and methods used in their field." },
  { t: "Problem-solving and analysis", d: "Interpreting results and troubleshooting build analytical habits." },
  { t: "Teamwork and collaboration", d: "Many practicals involve working with peers, sharing roles and communicating clearly." },
  { t: "Project development experience", d: "Planning, building and documenting a project mirrors real engineering work." },
  { t: "Preparation for professional settings", d: "Discipline, safety awareness and accurate records are valued in every workplace." },
];

// ============================================================================
// SEO METADATA — Next.js App Router
// ============================================================================
export const metadata = {
  title: "Laboratories | Pt. L.R. College of Technology",
  description:
    "Explore the laboratory facilities at Pt. L.R. College of Technology, including practical learning spaces, technical equipment, and hands-on learning opportunities across academic disciplines.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Laboratories & Practical Learning | Pt. L.R. College of Technology",
    description:
      "Practical learning spaces and hands-on opportunities across academic disciplines at Pt. L.R. College of Technology, Faridabad.",
    url: PAGE_URL,
    siteName: "Pt. L.R. College of Technology",
    images: [
      {
        url: `${SITE_URL}/og/laboratories.jpg`,
        width: 1200,
        height: 630,
        alt: "Laboratories and practical learning at Pt. L.R. College of Technology, Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laboratories & Practical Learning | Pt. L.R. College of Technology",
    description: "Practical learning spaces and hands-on opportunities at Pt. L.R. College of Technology, Faridabad.",
    images: [`${SITE_URL}/og/laboratories.jpg`],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Academics", item: `${SITE_URL}/academics` },
    { "@type": "ListItem", position: 3, name: "Resources", item: `${SITE_URL}/academics/resources` },
    { "@type": "ListItem", position: 4, name: "Laboratories", item: PAGE_URL },
  ],
};

const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

// ============================================================================
// SMALL COMPONENTS
// ============================================================================
const ICONS = {
  monitor: (<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>),
  code: (<><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></>),
  chip: (<><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" /></>),
  bolt: (<path d="M13 2L4 14h7l-1 8 9-12h-7z" />),
  atom: (<><circle cx="12" cy="12" r="1.6" /><ellipse cx="12" cy="12" rx="9" ry="3.6" /><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" /></>),
  flask: (<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8" />),
  gear: (<><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>),
  building: (<path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6" />),
  chat: (<path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z" />),
  database: (<><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>),
  network: (<><circle cx="12" cy="5" r="2.2" /><circle cx="5" cy="19" r="2.2" /><circle cx="19" cy="19" r="2.2" /><path d="M12 7.2v4.3M12 11.5L6.2 17M12 11.5l5.8 5.5" /></>),
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {ICONS[name] || ICONS.flask}
    </svg>
  );
}

function RouteLink({ href, className = "", children, ...rest }) {
  if (!routeExists(href)) {
    return (
      <span className={`${className} laboratories-is-disabled`} aria-disabled="true">
        {children}
      </span>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function MediaFrame({ src, alt, label, ratio = "4 / 3", sizes = "(max-width: 992px) 100vw, 50vw" }) {
  const ok = src && fileExists(src);
  return (
    <div className="laboratories-media" style={{ aspectRatio: ratio }}>
      {ok ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="laboratories-media__img" />
      ) : (
        <div className="laboratories-media__placeholder" role="img" aria-label={`Image placeholder: ${label}`}>
          <span className="laboratories-media__corner laboratories-media__corner--tl" aria-hidden="true" />
          <span className="laboratories-media__corner laboratories-media__corner--br" aria-hidden="true" />
          <span className="laboratories-media__label">{label}</span>
        </div>
      )}
    </div>
  );
}

function SpecRow({ k, children }) {
  return (
    <div className="laboratories-spec-row">
      <span className="laboratories-spec-row__key">{k}</span>
      <span className="laboratories-spec-row__value">{children}</span>
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="laboratories-checklist">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

function FacilityCard({ f }) {
  const confirmed = f.status === "site";
  const hasImage = f.image && fileExists(f.image);
  return (
    <article className="laboratories-card laboratories-facility">
      {hasImage && (
        <MediaFrame src={f.image} alt={`${f.name} at Pt. L.R. College of Technology`} label={f.name} ratio="16 / 10" sizes="(max-width: 768px) 100vw, 33vw" />
      )}
      <div className="laboratories-facility__head">
        <span className="laboratories-icon-badge"><Icon name={f.icon} /></span>
        <span className={`laboratories-tag ${confirmed ? "laboratories-tag--site" : "laboratories-tag--confirm"}`}>
          {confirmed ? "Listed on the B.Tech page" : "Confirm details with the college"}
        </span>
      </div>
      <h3>{f.name}</h3>
      <p>{f.desc}</p>
      <p className="laboratories-facility__label">Learning activities</p>
      <CheckList items={f.activities} />
    </article>
  );
}

// ============================================================================
// PAGE
// ============================================================================
export default function LaboratoriesPage() {
  const c = LAB_CONFIG;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <main className="laboratories-page">
        {/* ---------------- 1. HERO ---------------- */}
        <header className="laboratories-hero">
          <div className="laboratories-hero__grid" aria-hidden="true" />
          <div className="laboratories-container laboratories-hero__inner">
            <nav className="laboratories-breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li><RouteLink href="/">Home</RouteLink></li>
                <li><RouteLink href="/academics">Academics</RouteLink></li>
                <li><RouteLink href="/academics/resources">Resources</RouteLink></li>
                <li aria-current="page">Laboratories</li>
              </ol>
            </nav>

            <div className="laboratories-hero__content">
              <div className="laboratories-hero__text">
                <p className="laboratories-eyebrow laboratories-eyebrow--light">ACADEMIC RESOURCES · PRACTICAL LEARNING</p>
                <h1>Laboratories &amp; Practical Learning</h1>
                <p className="laboratories-hero__lede">
                  Engineering and science are learned by doing. Laboratory sessions at Pt. L.R. College
                  of Technology, Faridabad, give students the chance to experiment, observe, solve
                  problems and build the technical skills that classroom teaching alone cannot develop.
                </p>
                <div className="laboratories-hero__cta">
                  <a href="#facilities" className="laboratories-btn laboratories-btn--primary">Explore Our Laboratories</a>
                  <RouteLink href={c.programsHref} className="laboratories-btn laboratories-btn--outline-light">
                    Explore Academic Programs
                  </RouteLink>
                </div>
              </div>

              <aside className="laboratories-spec-panel" aria-label="Laboratories datasheet">
                <p className="laboratories-spec-panel__title">LABORATORY DATASHEET</p>
                <SpecRow k="Focus">Hands-on, practical learning</SpecRow>
                <SpecRow k="Facilities Listed">{FACILITIES_SHOWN.length} categories</SpecRow>
                <SpecRow k="Lab Timings">{c.labHours || FALLBACK}</SpecRow>
                <SpecRow k="Coordinator">{c.coordinator || FALLBACK}</SpecRow>
                <SpecRow k="Safety Guidelines">
                  {c.safetyDocument.href && fileExists(c.safetyDocument.href) ? (
                    <a href={c.safetyDocument.href} className="laboratories-spec-link" {...(c.safetyDocument.href.startsWith("/") ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}>
                      {c.safetyDocument.label}
                    </a>
                  ) : (
                    FALLBACK
                  )}
                </SpecRow>
                <SpecRow k="Location">Faridabad, Haryana</SpecRow>
              </aside>
            </div>
          </div>
        </header>

        <div className="laboratories-container">
          <div className="laboratories-notice laboratories-notice--float" role="note">
            <strong>Please note:</strong> this page describes practical learning in general terms.
            Equipment, capacity, timings and software are not stated here. {FALLBACK}.
          </div>
        </div>

        {/* ---------------- 2. INTRODUCTION ---------------- */}
        <section className="laboratories-section" aria-labelledby="intro-h">
          <div className="laboratories-container laboratories-two-col">
            <div>
              <p className="laboratories-eyebrow">INTRODUCTION</p>
              <h2 id="intro-h">Learning Beyond the Classroom</h2>
              <p>
                Lectures explain how things work. Laboratory sessions let students see it for
                themselves. Through practical exercises, experimentation and observation, students
                test the ideas they meet in class, notice where reality departs from the textbook, and
                learn how to reason their way to a solution.
              </p>
              <p>
                This complement between theory and practice is a central part of technical education.
                A student who has handled instruments, written code, recorded readings or built a
                small project understands the subject at a depth that reading alone rarely provides.
              </p>
              <div className="laboratories-mini-grid">
                {INTRO_POINTS.map((p) => (
                  <div className="laboratories-mini" key={p.t}>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <MediaFrame {...LAB_IMAGES.intro} ratio="4 / 5" />
            </div>
          </div>
        </section>

        {/* ---------------- 3. FACILITIES ---------------- */}
        <section className="laboratories-section laboratories-section--tint" id="facilities" aria-labelledby="facilities-h">
          <div className="laboratories-container">
            <p className="laboratories-eyebrow">FACILITIES OVERVIEW</p>
            <h2 id="facilities-h">Our Laboratory Facilities</h2>
            <p>
              The cards below describe the kinds of practical learning supported at the college. Items
              marked &ldquo;Listed on the B.Tech page&rdquo; are mentioned on that programme page.
              Items marked &ldquo;Confirm details with the college&rdquo; should be verified before you
              rely on them. For workshop facilities, see the{" "}
              <RouteLink href="/academics/resources/workshops" className="laboratories-inline-link">Workshops page</RouteLink>.
            </p>
            <div className="laboratories-card-grid">
              {FACILITIES_SHOWN.map((f) => (
                <FacilityCard f={f} key={f.id} />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 4. COMPUTER & IT ---------------- */}
        <section className="laboratories-section" aria-labelledby="it-h">
          <div className="laboratories-container">
            <p className="laboratories-eyebrow">COMPUTING</p>
            <h2 id="it-h">Computer and Information Technology Labs</h2>
            <p>
              Practical computing work focuses on building skills step by step. The areas below
              describe typical learning themes. They are not a statement about specific hardware,
              software licences or capacity.
            </p>
            <div className="laboratories-skill-grid">
              {IT_TOPICS.map((t) => (
                <article className="laboratories-skill-card" key={t.t}>
                  <span className="laboratories-icon-badge laboratories-icon-badge--sm"><Icon name={t.icon} /></span>
                  <h3>{t.t}</h3>
                  <p>{t.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 5. ENGINEERING & SCIENCE ---------------- */}
        <section className="laboratories-section laboratories-section--tint" aria-labelledby="eng-h">
          <div className="laboratories-container">
            <p className="laboratories-eyebrow">ENGINEERING &amp; SCIENCE</p>
            <h2 id="eng-h">Engineering and Science in Practice</h2>
            <p>
              Practical sessions in engineering and science laboratories help students build
              reliable habits of measurement, reasoning and careful work.
            </p>
            <div className="laboratories-two-col laboratories-two-col--tight">
              <div className="laboratories-card">
                <h3>What practical sessions develop</h3>
                <ul className="laboratories-checklist">
                  {SCIENCE_ITEMS.map((s) => (
                    <li key={s.t}>
                      <strong>{s.t}.</strong> {s.d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="laboratories-card laboratories-card--panel">
                <h3>Related practical areas</h3>
                <p>
                  Disciplines with laboratory or workshop work listed on this website include
                  electronics, electrical, mechanical and civil engineering, along with the applied
                  sciences. Subject-specific practicals follow each programme&apos;s curriculum.
                </p>
                <p>
                  <RouteLink href="/academics/resources/curriculum" className="laboratories-spec-link">
                    View the curriculum →
                  </RouteLink>
                </p>
                <p>
                  <RouteLink href="/academics/resources/workshops" className="laboratories-spec-link">
                    View workshops →
                  </RouteLink>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 6. PROCESS ---------------- */}
        <section className="laboratories-section" aria-labelledby="process-h">
          <div className="laboratories-container">
            <p className="laboratories-eyebrow">LEARNING PROCESS</p>
            <h2 id="process-h">From Theory to Practical Skills</h2>
            <ol className="laboratories-steps">
              {PROCESS_STEPS.map((s, i) => (
                <li className="laboratories-step" key={s.t}>
                  <span className="laboratories-step__marker" aria-hidden="true">{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- 7. SAFETY ---------------- */}
        <section className="laboratories-section laboratories-section--tint" aria-labelledby="safety-h">
          <div className="laboratories-container laboratories-two-col">
            <div>
              <p className="laboratories-eyebrow">SAFETY</p>
              <h2 id="safety-h">Safety, Discipline &amp; Responsible Practice</h2>
              <p>
                A good laboratory is a safe and orderly one. These are general principles of
                responsible laboratory use. Each laboratory may have its own specific rules, which
                faculty and laboratory staff will explain.
              </p>
              <CheckList items={SAFETY_POINTS} />
            </div>
            <div className="laboratories-card laboratories-card--panel">
              <h3>Laboratory-specific rules</h3>
              <p>
                Always follow the procedures notified for the laboratory you are working in. This
                page does not describe any certifications or formal compliance systems.
              </p>
              <p>
                Safety guidelines document:{" "}
                {c.safetyDocument.href && fileExists(c.safetyDocument.href) ? (
                  <a href={c.safetyDocument.href} className="laboratories-spec-link" {...(c.safetyDocument.href.startsWith("/") ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}>
                    {c.safetyDocument.label}
                  </a>
                ) : (
                  FALLBACK
                )}
                .
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- 8. BENEFITS ---------------- */}
        <section className="laboratories-section" aria-labelledby="benefits-h">
          <div className="laboratories-container">
            <p className="laboratories-eyebrow">STUDENT BENEFITS</p>
            <h2 id="benefits-h">How Practical Learning Helps Students</h2>
            <div className="laboratories-card-grid">
              {BENEFITS.map((b, i) => (
                <article className="laboratories-card" key={b.t}>
                  <span className="laboratories-card__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{b.t}</h3>
                  <p>{b.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 9. PROGRAMS CTA ---------------- */}
        <section className="laboratories-section laboratories-section--tint" aria-labelledby="programs-h">
          <div className="laboratories-container">
            <div className="laboratories-panel">
              <div>
                <p className="laboratories-eyebrow laboratories-eyebrow--light">PROGRAMMES</p>
                <h2 id="programs-h">Explore Programs That Match Your Interests</h2>
                <p>
                  Each programme has its own balance of theory, laboratory work and projects. Explore
                  the programmes to see how practical learning fits into the study plan you are
                  considering.
                </p>
              </div>
              <div className="laboratories-panel__actions">
                <RouteLink href={c.programsHref} className="laboratories-btn laboratories-btn--primary">
                  Explore Courses
                </RouteLink>
                <RouteLink href={c.contactHref} className="laboratories-btn laboratories-btn--outline-light">
                  Contact the College
                </RouteLink>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 10. FINAL CTA ---------------- */}
        <section className="laboratories-final-cta" aria-labelledby="cta-h">
          <div className="laboratories-container laboratories-final-cta__inner">
            <div>
              <p className="laboratories-eyebrow laboratories-eyebrow--light">NEXT STEP</p>
              <h2 id="cta-h">Discover the Power of Practical Learning</h2>
              <p>
                Learn more about the academic programmes and how laboratory-based education is part of
                the student experience at Pt. L.R. College of Technology, Faridabad.
              </p>
            </div>
            <div className="laboratories-final-cta__actions">
              <RouteLink href={c.admissionsHref} className="laboratories-btn laboratories-btn--gold">
                Enquire About Admission
              </RouteLink>
              <RouteLink href="/academics/resources/industrial-training" className="laboratories-btn laboratories-btn--outline-light">
                Industrial Training
              </RouteLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}