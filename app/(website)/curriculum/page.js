import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import "./curriculum.css";

// ============================================================================
// SITE CONSTANTS
// ============================================================================
const SITE_URL = "https://ptlrct.com";
const PAGE_URL = `${SITE_URL}/academics/resources/curriculum`;
const FALLBACK = "Contact the college for current details";

// ============================================================================
// CONFIGURATION — EDIT THIS SECTION ONLY
// Anything left null / empty renders a clearly marked "not configured" state.
// Nothing below is an official statement unless you fill it in from an
// official source.
// ============================================================================
const PAGE_CONFIG = {
  officialSource: null, // e.g. "Affiliating university syllabus portal"
  officialSourceHref: null, // e.g. "https://example-university.ac.in/syllabus"
  lastReviewed: null, // e.g. "July 2026"
  contactHref: "/contact",
};

// Programmes. `href` must be an existing internal route or a full URL.
// Set show:false to hide a programme the college does not confirm.
// `semesters` is filled in the next block (SEMESTER_DATA).
const PROGRAMS = [
  {
    id: "btech",
    show: true,
    name: "B.Tech",
    level: "Undergraduate · Engineering",
    duration: "4 years / 8 semesters", // from the existing B.Tech page
    summary:
      "Four-year engineering degree with a common first year followed by branch-specific study, laboratories, projects and industrial training components.",
    href: "/academics/btech",
  },
  {
    id: "bca",
    show: true,
    name: "BCA",
    level: "Undergraduate · Computer Applications",
    duration: null,
    summary: "Undergraduate programme in computer applications.",
    href: "/academics/bca"
  },
  {
    id: "bba",
    show: true,
    name: "BBA",
    level: "Undergraduate · Management",
    duration: null,
    summary: "Undergraduate programme in business administration.",
    href: "/academics/bba" 
  },
  {
    id: "mtech",
    show: true,
    name: "M.Tech",
    level: "Postgraduate · Engineering",
    duration: null,
    summary: "Postgraduate engineering programme for advanced study and research.",
    href: "/academics/mtech",
  },
  {
    id: "diploma",
    show: true,
    name: "Diploma",
    level: "Diploma · Engineering",
    duration: null,
    summary: "Diploma programmes, with lateral-entry routes described on the B.Tech page.",
    href: "/academics/diploma",
  },
];

// Semester-wise data per programme id.
// Each semester: { label, focus, detail, subjects: [{ code, name, type, credits }] }
// Leave `subjects` empty until you have the OFFICIAL scheme. `credits` may be null.
// The B.Tech entries below are general overviews drawn from the existing B.Tech
// page, NOT an official scheme. Replace them with the official scheme when ready.
const SEMESTER_DATA = {
  btech: {
    source: null, // e.g. "Official B.Tech scheme, 2025-26 (affiliating university)"
    semesters: [
      {
        label: "Semester 1",
        focus: "Common engineering foundation",
        detail:
          "The first year is described on the B.Tech page as a common foundation: mathematics, physics, chemistry, programming, engineering graphics and workshop practice. The exact allocation of subjects between Semester 1 and 2 is set by the official scheme.",
        subjects: [],
      },
      {
        label: "Semester 2",
        focus: "Common engineering foundation",
        detail:
          "Continuation of the common first year across branches. Confirm the subject list and practicals in the official scheme.",
        subjects: [],
      },
      {
        label: "Semester 3",
        focus: "Branch study begins",
        detail:
          "Branch-specific coursework begins from the second year, with an increasing share of laboratory work. Subjects vary by branch.",
        subjects: [],
      },
      {
        label: "Semester 4",
        focus: "Branch core and laboratories",
        detail:
          "Deeper branch core subjects with practical sessions. Subjects vary by branch; see the official scheme.",
        subjects: [],
      },
      {
        label: "Semester 5",
        focus: "Advanced core and electives",
        detail:
          "Advanced branch subjects, with electives and skill-based courses becoming more prominent as described on the B.Tech page.",
        subjects: [],
      },
      {
        label: "Semester 6",
        focus: "Electives and applied learning",
        detail:
          "Applied coursework, electives and project-style learning may feature. Confirm details in the official scheme.",
        subjects: [],
      },
      {
        label: "Semester 7",
        focus: "Seminar, minor project and training components",
        detail:
          "Later semesters may include seminars, minor projects and an industrial training component. The exact semester placement is determined by the official scheme.",
        subjects: [],
      },
      {
        label: "Semester 8",
        focus: "Major project",
        detail:
          "The B.Tech page describes a major project in the eighth semester that brings together the programme's learning. Confirm requirements in the official scheme.",
        subjects: [],
      },
    ],
  },
  // bca: { source: null, semesters: [ ... ] },
  // bba: { source: null, semesters: [ ... ] },
};

// Syllabus document library. Add only files that exist.
// Local files live in /public, e.g. "/documents/syllabus/btech-semester-1.pdf".
// Shape: { title, programs: ["btech"], semester: "Semester 1" | "All semesters",
//          type: "Syllabus", format: "PDF", href: "/documents/...", updated: "2026" }
// programs: [] (or omitted) means the item applies to every programme.
const SYLLABUS_DOCUMENTS = [];

// General downloadable academic resources (forms, guidelines, schemes).
// Same shape as SYLLABUS_DOCUMENTS.
const ACADEMIC_RESOURCES = [];

// Credit structure and assessment. Fill ONLY from verified official sources.
// Shape: { source: "Official document name", rows: [{ label: "...", value: "..." }] }
const CREDIT_STRUCTURE = null;
const ASSESSMENT_OVERVIEW = null;

// Curriculum revision and academic notices.
// Shape: { date: "12 July 2026", title: "...", body: "...", href: "/documents/notice.pdf" | null }
const ACADEMIC_NOTICES = [];

// ============================================================================
// SERVER-SIDE VALIDATION (routes and files)
// - Routes are matched against your app/ directory.
// - Local files are matched against /public.
// If the directories cannot be read at runtime, validation fails open (trusts
// the config) so valid links are never hidden by an environment quirk.
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

function resolveDocs(list, label) {
  return list.filter((d) => {
    const ok = Boolean(d && d.title && fileExists(d.href));
    if (!ok) {
      console.warn(`[curriculum] Skipped ${label} item (missing title or file): ${d && (d.title || d.href)}`);
    }
    return ok;
  });
}

// ============================================================================
// DERIVED DATA
// ============================================================================
const PROGRAMS_SHOWN = PROGRAMS.filter((p) => p.show && /^[a-z0-9-]+$/.test(p.id));
const PROGRAM_NAME = Object.fromEntries(PROGRAMS_SHOWN.map((p) => [p.id, p.name]));
const SYLLABUS_DOCS = resolveDocs(SYLLABUS_DOCUMENTS, "syllabus");
const RESOURCE_DOCS = resolveDocs(ACADEMIC_RESOURCES, "resource");
const PROGRAMS_WITH_SEMESTERS = PROGRAMS_SHOWN.filter(
  (p) => SEMESTER_DATA[p.id] && SEMESTER_DATA[p.id].semesters.length
);

// CSS-only programme filter: rules are generated from the programme list so
// they always match the config. Selectors are scoped to .curriculum.
const FILTER_CSS = PROGRAMS_SHOWN.map(
  (p) => `
.curriculum:has(#cu-p-${p.id}:checked) .cu-filterable:not([data-programs~="${p.id}"]):not([data-programs~="universal"]){display:none}
.curriculum:has(#cu-p-${p.id}:checked) .cu-sem-group[data-program="${p.id}"]{display:block}
.curriculum:has(#cu-p-${p.id}:checked) .cu-showing[data-program="${p.id}"]{display:inline}
.curriculum:has(#cu-p-${p.id}:checked) .cu-program-info[data-program="${p.id}"]{display:block}
.curriculum:has(#cu-p-${p.id}:checked) .cu-empty-filter[data-program="${p.id}"]{display:block}`
).join("\n");

// ============================================================================
// STATIC CONTENT (general guidance; not an official scheme)
// ============================================================================
const SUBJECT_GROUPS = [
  {
    t: "Basic Sciences & Mathematics",
    d: "Foundational subjects that build analytical and quantitative reasoning for later study.",
    o: "Apply mathematical and scientific principles to analyse problems.",
  },
  {
    t: "Engineering Fundamentals",
    d: "Introductory subjects common across disciplines, such as programming, graphics and basic engineering concepts.",
    o: "Use core tools and concepts shared across engineering fields.",
  },
  {
    t: "Programme Core",
    d: "Subjects that define the discipline and build depth in the chosen branch or programme.",
    o: "Explain and apply the principles central to the chosen discipline.",
  },
  {
    t: "Electives & Skill Courses",
    d: "Choice-based and skill-oriented courses that let students explore emerging or specialised areas.",
    o: "Develop focused expertise aligned with personal and career interests.",
  },
  {
    t: "Laboratories & Workshops",
    d: "Hands-on sessions that pair with theory subjects through experiments, fabrication and software work.",
    o: "Carry out experiments, record observations and interpret results.",
  },
  {
    t: "Projects, Seminars & Training",
    d: "Applied components such as seminars, projects and industrial training that integrate learning.",
    o: "Plan, execute and communicate an applied piece of work.",
  },
  {
    t: "Humanities, Management & Communication",
    d: "Courses that build communication, ethics, awareness of society and basic management understanding.",
    o: "Communicate clearly and act responsibly in professional settings.",
  },
];

const COMPONENTS = [
  {
    t: "Theory",
    d: "Lectures, tutorials and self-study that develop concepts, methods and problem-solving ability.",
    link: null,
  },
  {
    t: "Practical",
    d: "Supervised practical sessions that reinforce theory through demonstration and guided activity.",
    link: { label: "Workshops", href: "/academics/resources/workshops" },
  },
  {
    t: "Laboratory",
    d: "Structured experiments and software or hardware exercises with recorded observations and results.",
    link: { label: "Laboratories", href: "/academics/resources/laboratories" },
  },
  {
    t: "Project & Training",
    d: "Seminars, projects and industrial training that apply learning to real or simulated problems.",
    link: { label: "Industrial Training", href: "/academics/resources/industrial-training" },
  },
];

const REVISION_POINTS = [
  "Curricula and schemes may be revised by the affiliating university or relevant regulatory bodies.",
  "Revised syllabi usually apply to specific admission batches. Confirm which version applies to you.",
  "Always rely on the latest official document and department notices rather than older copies.",
];

const FAQS = [
  {
    q: "Where can I find the official syllabus for my programme?",
    a: `Official syllabi are issued by the affiliating university or the relevant authority and shared through the department. The library on this page lists documents when they are available. ${FALLBACK}.`,
  },
  {
    q: "Which syllabus version applies to my batch?",
    a: "Syllabus versions usually apply by admission year or batch. Check the scheme document for your batch and confirm with your department.",
  },
  {
    q: "Are credits and assessment weightings listed on this page?",
    a: "Only where they have been verified from an official document. If that section shows a notice instead of figures, the official details have not been added here yet.",
  },
  {
    q: "Does this page list every subject for every semester?",
    a: "No. Subject lists appear only when the official scheme has been added. The semester overview gives general context, not an official scheme.",
  },
  {
    q: "How are theory, practical and project components organised?",
    a: "Most programmes combine theory with laboratory or workshop practice and applied components such as projects. The proportions are set by the official scheme.",
  },
  {
    q: "Where do I find examination rules and dates?",
    a: "Use the Examination Cell and Academic Calendar pages linked below, and follow official notices for current details.",
  },
  {
    q: "Who should I contact if a document or detail is missing?",
    a: `${FALLBACK}. Please contact your department or the college office.`,
  },
];

const RELATED_LINKS = [
  { label: "Academic Calendar", href: "/academics/resources/academic-calendar", d: "Sessions, terms and key dates." },
  { label: "Examination Cell", href: "/academics/resources/examination-cell", d: "Examination information and notices." },
  { label: "Laboratories", href: "/academics/resources/laboratories", d: "Facilities supporting practical learning." },
  { label: "Workshops", href: "/academics/resources/workshops", d: "Hands-on workshop facilities." },
  { label: "Industrial Training", href: "/academics/resources/industrial-training", d: "Guidance on training and internships." },
];

// ============================================================================
// SEO METADATA — Next.js App Router
// ============================================================================
export const metadata = {
  title: "Academic Curriculum & Syllabus | Pt. L.R. College of Technology Faridabad",
  description:
    "Explore the academic curriculum and syllabus resources at Pt. L.R. College of Technology, Faridabad: programme directory, semester-wise overview, subject categories, theory and practical components, and syllabus documents.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Academic Curriculum & Syllabus | Pt. L.R. College of Technology",
    description:
      "Programme directory, semester overview, subject categories and syllabus resources for Pt. L.R. College of Technology, Faridabad.",
    url: PAGE_URL,
    siteName: "Pt. L.R. College of Technology",
    images: [
      {
        url: `${SITE_URL}/og/curriculum.jpg`,
        width: 1200,
        height: 630,
        alt: "Academic Curriculum and Syllabus at Pt. L.R. College of Technology, Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academic Curriculum & Syllabus | Pt. L.R. College of Technology",
    description:
      "Programme directory, semester overview and syllabus resources at Pt. L.R. College of Technology, Faridabad.",
    images: [`${SITE_URL}/og/curriculum.jpg`],
  },
};

// ============================================================================
// STRUCTURED DATA (JSON-LD)
// ============================================================================
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Academics", item: `${SITE_URL}/academics` },
    { "@type": "ListItem", position: 3, name: "Resources", item: `${SITE_URL}/academics/resources` },
    { "@type": "ListItem", position: 4, name: "Curriculum", item: PAGE_URL },
  ],
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

const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

// ============================================================================
// SMALL COMPONENTS
// ============================================================================
function RouteLink({ href, className = "", children, ...rest }) {
  if (!routeExists(href)) {
    return (
      <span className={`${className} cu-is-disabled`} aria-disabled="true">
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

function SpecRow({ k, children }) {
  return (
    <div className="cu-spec-row">
      <span className="cu-spec-row__key">{k}</span>
      <span className="cu-spec-row__value">{children}</span>
    </div>
  );
}

function ShowingLabels() {
  return (
    <p className="cu-showing-line">
      Programme shown:{" "}
      <strong>
        <span className="cu-showing" data-program="all">All programmes</span>
        {PROGRAMS_SHOWN.map((p) => (
          <span className="cu-showing" data-program={p.id} key={p.id}>
            {p.name}
          </span>
        ))}
      </strong>{" "}
      <a href="#program-select" className="cu-inline-link">Change programme</a>
    </p>
  );
}

function SemesterPanel({ s }) {
  const hasCredits = s.subjects.some((x) => x.credits !== null && x.credits !== undefined);
  return (
    <details className="cu-sem">
      <summary>
        <span className="cu-sem__label">{s.label}</span>
        <span className="cu-sem__focus">{s.focus}</span>
      </summary>
      <div className="cu-sem__body">
        <p>{s.detail}</p>
        {s.subjects.length ? (
          <div className="cu-table-wrap" role="region" aria-label={`${s.label} subjects`} tabIndex={0}>
            <table className="cu-table">
              <thead>
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Type</th>
                  {hasCredits && <th scope="col">Credits</th>}
                </tr>
              </thead>
              <tbody>
                {s.subjects.map((x) => (
                  <tr key={`${x.code}-${x.name}`}>
                    <td>{x.code || "—"}</td>
                    <td>{x.name}</td>
                    <td>{x.type || "—"}</td>
                    {hasCredits && <td>{x.credits ?? "—"}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="cu-pending" role="note">
            <strong>Subject list not configured.</strong> The official subject list for this
            semester has not been added to this page. {FALLBACK}.
          </p>
        )}
      </div>
    </details>
  );
}

function SemesterGroup({ program }) {
  const data = SEMESTER_DATA[program.id];
  const has = data && data.semesters.length;
  return (
    <div className="cu-sem-group" data-program={program.id}>
      <h3>{program.name}: semester-wise overview</h3>
      {has ? (
        <>
          <p className="cu-sem-meta">
            {data.source
              ? `Source: ${data.source}`
              : "Indicative overview only. An official source has not been configured for this programme."}
          </p>
          <div className="cu-sem-grid">
            {data.semesters.map((s) => (
              <SemesterPanel s={s} key={s.label} />
            ))}
          </div>
        </>
      ) : (
        <div className="cu-empty" role="note">
          <h4>Semester overview not configured</h4>
          <p>
            The semester-wise overview for {program.name} has not been added yet. {FALLBACK}.
          </p>
        </div>
      )}
    </div>
  );
}

function DocList({ docs, emptyTitle, emptyBody }) {
  if (!docs.length) {
    return (
      <div className="cu-empty" role="note">
        <h4>{emptyTitle}</h4>
        <p>{emptyBody}</p>
      </div>
    );
  }
  const matches = (d, id) => !d.programs || d.programs.length === 0 || d.programs.includes(id);
  return (
    <>
      <ul className="cu-doc-list">
        {docs.map((d) => {
          const programs = (d.programs || []).filter((id) => PROGRAM_NAME[id]);
          const isLocal = d.href.startsWith("/");
          return (
            <li
              className="cu-doc cu-filterable"
              key={d.href}
              data-programs={programs.length ? programs.join(" ") : "universal"}
            >
              <div className="cu-doc__main">
                <h4>{d.title}</h4>
                <ul className="cu-doc__meta" aria-label="Document details">
                  <li className="cu-badge cu-badge--dark">
                    {programs.length ? programs.map((id) => PROGRAM_NAME[id]).join(", ") : "All programmes"}
                  </li>
                  <li className="cu-badge">{d.semester || "All semesters"}</li>
                  <li className="cu-badge cu-badge--gold">{d.type || "Document"}</li>
                  {d.format && <li className="cu-badge">{d.format}</li>}
                  {d.updated && <li className="cu-badge">Updated {d.updated}</li>}
                </ul>
              </div>
              <a
                href={d.href}
                className="cu-btn cu-btn--primary cu-btn--sm"
                {...(isLocal ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
              >
                {isLocal ? "Download" : "Open"}
                <span className="cu-sr"> {d.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
      {PROGRAMS_SHOWN.filter((p) => !docs.some((d) => matches(d, p.id))).map((p) => (
        <div className="cu-empty cu-empty-filter" data-program={p.id} role="note" key={p.id}>
          <h4>No documents listed for {p.name}</h4>
          <p>{FALLBACK}.</p>
        </div>
      ))}
    </>
  );
}

function RowsPanel({ title, data, emptyBody }) {
  return (
    <div className="cu-card">
      <h3>{title}</h3>
      {data && data.rows && data.rows.length ? (
        <>
          <dl className="cu-dl">
            {data.rows.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
          <p className="cu-sem-meta">{data.source ? `Source: ${data.source}` : "Source not stated."}</p>
        </>
      ) : (
        <p className="cu-pending" role="note">
          <strong>Not published here.</strong> {emptyBody}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// PAGE
// ============================================================================
export default function CurriculumPage() {
  const cfg = PAGE_CONFIG;
  const counts = {
    programs: PROGRAMS_SHOWN.length,
    semesters: PROGRAMS_WITH_SEMESTERS.length,
    docs: SYLLABUS_DOCS.length,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <main className="curriculum">
        <style dangerouslySetInnerHTML={{ __html: FILTER_CSS }} />

        {/* ---------------- 1-2. BREADCRUMBS + HERO ---------------- */}
        <header className="cu-hero">
          <div className="cu-hero__grid" aria-hidden="true" />
          <div className="cu-container cu-hero__inner">
            <nav className="cu-breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li><RouteLink href="/">Home</RouteLink></li>
                <li><RouteLink href="/academics">Academics</RouteLink></li>
                <li><RouteLink href="/academics/resources">Resources</RouteLink></li>
                <li aria-current="page">Curriculum</li>
              </ol>
            </nav>

            <div className="cu-hero__content">
              <div className="cu-hero__text">
                <p className="cu-eyebrow cu-eyebrow--light">ACADEMIC RESOURCES · CURRICULUM</p>
                <h1>Academic Curriculum &amp; Syllabus</h1>
                <p className="cu-hero__lede">
                  Plan your studies with a clear view of how programmes are structured: course
                  components, semester-wise overviews, subject categories and the syllabus
                  documents available at Pt. L.R. College of Technology, Faridabad. Official
                  schemes and syllabi remain the final authority.
                </p>
                <div className="cu-hero__cta">
                  <a href="#syllabus-library" className="cu-btn cu-btn--primary">Browse Syllabus Library</a>
                  <a href="#program-select" className="cu-btn cu-btn--outline-light">Select Your Programme</a>
                </div>
              </div>

              <aside className="cu-spec-panel" aria-label="Curriculum page datasheet">
                <p className="cu-spec-panel__title">CURRICULUM DATASHEET</p>
                <SpecRow k="Programmes Listed">{counts.programs}</SpecRow>
                <SpecRow k="Semester Overviews">
                  {counts.semesters ? `${counts.semesters} programme(s)` : FALLBACK}
                </SpecRow>
                <SpecRow k="Syllabus Documents">
                  {counts.docs ? `${counts.docs} available` : "Not yet listed here"}
                </SpecRow>
                <SpecRow k="Official Source">
                  {cfg.officialSourceHref && cfg.officialSource ? (
                    <a href={cfg.officialSourceHref} className="cu-spec-link" target="_blank" rel="noopener noreferrer">
                      {cfg.officialSource}
                    </a>
                  ) : (
                    cfg.officialSource || FALLBACK
                  )}
                </SpecRow>
                <SpecRow k="Last Reviewed">{cfg.lastReviewed || FALLBACK}</SpecRow>
                <SpecRow k="Location">Faridabad, Haryana</SpecRow>
              </aside>
            </div>
          </div>
        </header>

        <div className="cu-container">
          <div className="cu-notice cu-notice--float" role="note">
            <strong>Please note:</strong> this page is a guide. Subject lists, credits and
            assessment details appear only when they have been added from official documents.
            Always confirm with the department and the official syllabus.
          </div>
        </div>

        {/* ---------------- 3. INTRODUCTION ---------------- */}
        <section className="cu-section" aria-labelledby="intro-h">
          <div className="cu-container cu-two-col">
            <div>
              <p className="cu-eyebrow">INTRODUCTION</p>
              <h2 id="intro-h">Academic planning and course structure</h2>
              <p>
                A curriculum describes what you will study, in what order, and how learning is
                organised. Understanding it early helps you plan semesters, choose electives
                wisely and prepare for practical and project work.
              </p>
              <p>
                Most programmes combine theory, practical or laboratory work and applied
                components such as projects or training. The exact scheme, subject list and
                examination pattern are set by the affiliating university and applicable
                regulators, and may differ by programme and admission batch.
              </p>
            </div>
            <div className="cu-card cu-card--panel">
              <h3>How to use this page</h3>
              <ul className="cu-checklist">
                <li>Pick your programme in the selector below</li>
                <li>Read the semester overview for context</li>
                <li>Open the syllabus library for official documents</li>
                <li>Check notices for revisions that affect your batch</li>
                <li>Confirm anything unclear with your department</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------- 4. PROGRAM DIRECTORY ---------------- */}
        <section className="cu-section cu-section--tint" id="program-directory" aria-labelledby="directory-h">
          <div className="cu-container">
            <p className="cu-eyebrow">PROGRAMME DIRECTORY</p>
            <h2 id="directory-h">Academic programmes</h2>
            <p>
              Programmes are listed below. A programme page link appears only when the page is
              available on this website.
            </p>
            <div className="cu-card-grid">
              {PROGRAMS_SHOWN.map((p) => (
                <article className="cu-card" key={p.id}>
                  <p className="cu-card__tag">{p.level}</p>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <p className="cu-card__meta">
                    <span>Duration:</span> {p.duration || FALLBACK}
                  </p>
                  {p.href && routeExists(p.href) ? (
                    <RouteLink href={p.href} className="cu-text-link">
                      View {p.name} programme page →
                    </RouteLink>
                  ) : (
                    <p className="cu-card__meta">Programme page: {FALLBACK}.</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 5. PROGRAM SELECTION ---------------- */}
        <section className="cu-section" id="program-select" aria-labelledby="select-h">
          <div className="cu-container">
            <p className="cu-eyebrow">PROGRAMME SELECTION</p>
            <h2 id="select-h">Choose your programme</h2>
            <p>
              Your choice filters the semester overview and the document libraries below. It works
              with the keyboard: use the arrow keys to move between options.
            </p>
            <fieldset className="cu-chooser">
              <legend>Programme filter</legend>
              <div className="cu-chips">
                <div className="cu-chip">
                  <input type="radio" name="cu-program" id="cu-p-all" defaultChecked />
                  <label htmlFor="cu-p-all">All programmes</label>
                </div>
                {PROGRAMS_SHOWN.map((p) => (
                  <div className="cu-chip" key={p.id}>
                    <input type="radio" name="cu-program" id={`cu-p-${p.id}`} />
                    <label htmlFor={`cu-p-${p.id}`}>{p.name}</label>
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="cu-program-info cu-program-info--all" role="note">
              <h3>Select a programme to begin</h3>
              <p>
                Choose a programme above to see its semester-wise overview and related documents.
                &ldquo;All programmes&rdquo; shows every document in the libraries.
              </p>
            </div>
            {PROGRAMS_SHOWN.map((p) => (
              <div className="cu-program-info" data-program={p.id} key={p.id}>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <p className="cu-card__meta">
                  <span>Level:</span> {p.level} &nbsp;·&nbsp; <span>Duration:</span> {p.duration || FALLBACK}
                </p>
                <p>
                  <a href="#semester-overview" className="cu-inline-link">Jump to semester overview</a>
                  {" · "}
                  <a href="#syllabus-library" className="cu-inline-link">Jump to syllabus library</a>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- 6. SEMESTER OVERVIEW ---------------- */}
        <section className="cu-section cu-section--tint" id="semester-overview" aria-labelledby="semester-h">
          <div className="cu-container">
            <p className="cu-eyebrow">SEMESTER-WISE OVERVIEW</p>
            <h2 id="semester-h">Semester-wise curriculum overview</h2>
            <p>
              Expand a semester to read its overview. Official subject lists appear here only when
              they have been added.
            </p>
            <ShowingLabels />
            <div className="cu-sem-prompt" role="note">
              Select a programme above to view its semester-wise overview.
            </div>
            {PROGRAMS_SHOWN.map((p) => (
              <SemesterGroup program={p} key={p.id} />
            ))}
          </div>
        </section>

        {/* ---------------- 7. SUBJECT CATEGORIES ---------------- */}
        <section className="cu-section" aria-labelledby="subjects-h">
          <div className="cu-container">
            <p className="cu-eyebrow">SUBJECT CATEGORIES</p>
            <h2 id="subjects-h">Subject categories and learning outcomes</h2>
            <p>
              These categories are a general way to understand how programmes are organised. The
              official scheme decides which categories apply to each programme.
            </p>
            <div className="cu-card-grid">
              {SUBJECT_GROUPS.map((g, i) => (
                <article className="cu-card" key={g.t}>
                  <span className="cu-card__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{g.t}</h3>
                  <p>{g.d}</p>
                  <p className="cu-outcome">
                    <strong>Learning outcome:</strong> {g.o}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 8. COMPONENTS ---------------- */}
        <section className="cu-section cu-section--tint" aria-labelledby="components-h">
          <div className="cu-container">
            <p className="cu-eyebrow">LEARNING COMPONENTS</p>
            <h2 id="components-h">Theory, practical, laboratory and project components</h2>
            <div className="cu-skill-grid">
              {COMPONENTS.map((c) => (
                <article className="cu-skill-card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  {c.link && routeExists(c.link.href) && (
                    <RouteLink href={c.link.href} className="cu-text-link">
                      {c.link.label} →
                    </RouteLink>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 9. CREDIT & ASSESSMENT ---------------- */}
        <section className="cu-section" aria-labelledby="credits-h">
          <div className="cu-container">
            <p className="cu-eyebrow">CREDITS &amp; ASSESSMENT</p>
            <h2 id="credits-h">Credit structure and assessment overview</h2>
            <p>
              Figures are shown only when taken from a verified official document. Nothing here is
              estimated.
            </p>
            <div className="cu-two-col">
              <RowsPanel
                title="Credit structure"
                data={CREDIT_STRUCTURE}
                emptyBody={`Verified credit details have not been added. ${FALLBACK}.`}
              />
              <RowsPanel
                title="Assessment overview"
                data={ASSESSMENT_OVERVIEW}
                emptyBody={`Verified assessment details have not been added. ${FALLBACK}.`}
              />
            </div>
          </div>
        </section>

        {/* ---------------- 10. SYLLABUS LIBRARY ---------------- */}
        <section className="cu-section cu-section--tint" id="syllabus-library" aria-labelledby="library-h">
          <div className="cu-container">
            <p className="cu-eyebrow">SYLLABUS LIBRARY</p>
            <h2 id="library-h">Syllabus document library</h2>
            <p>Each item shows its programme, semester and document type.</p>
            <ShowingLabels />
            <DocList
              docs={SYLLABUS_DOCS}
              emptyTitle="No syllabus documents are listed yet"
              emptyBody={`Syllabus files will appear here once they are added. ${FALLBACK}.`}
            />
          </div>
        </section>

        {/* ---------------- 11. DOWNLOADABLE RESOURCES ---------------- */}
        <section className="cu-section" id="resources" aria-labelledby="resources-h">
          <div className="cu-container">
            <p className="cu-eyebrow">DOWNLOADS</p>
            <h2 id="resources-h">Downloadable academic resources</h2>
            <p>Guidelines, schemes and other academic documents, when available.</p>
            <ShowingLabels />
            <DocList
              docs={RESOURCE_DOCS}
              emptyTitle="No downloadable resources are listed yet"
              emptyBody={`Academic resources will appear here once they are added. ${FALLBACK}.`}
            />
          </div>
        </section>

        {/* ---------------- 12. REVISIONS & NOTICES ---------------- */}
        <section className="cu-section cu-section--tint" id="notices" aria-labelledby="notices-h">
          <div className="cu-container cu-two-col">
            <div>
              <p className="cu-eyebrow">REVISIONS &amp; NOTICES</p>
              <h2 id="notices-h">Curriculum revision and academic notices</h2>
              <ul className="cu-checklist">
                {REVISION_POINTS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="cu-card cu-card--panel">
              <h3>Latest notices</h3>
              {ACADEMIC_NOTICES.length ? (
                <ul className="cu-notice-list">
                  {ACADEMIC_NOTICES.map((n) => (
                    <li key={`${n.date}-${n.title}`}>
                      <p className="cu-notice-list__date">{n.date}</p>
                      <h4>{n.title}</h4>
                      {n.body && <p>{n.body}</p>}
                      {n.href && fileExists(n.href) && (
                        <a href={n.href} className="cu-spec-link" {...(n.href.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
                          View notice
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No notices are listed on this page. {FALLBACK}.</p>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- 13. FAQ ---------------- */}
        <section className="cu-section" aria-labelledby="faq-h">
          <div className="cu-container">
            <p className="cu-eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-h">Curriculum: quick answers</h2>
            <div className="cu-faq-list">
              {FAQS.map((f) => (
                <details className="cu-faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 14. RELATED LINKS ---------------- */}
        <section className="cu-section cu-section--tint" aria-labelledby="related-h">
          <div className="cu-container">
            <p className="cu-eyebrow">EXPLORE FURTHER</p>
            <h2 id="related-h">Related academic resources</h2>
            <nav aria-label="Related academic resources">
              <ul className="cu-link-grid">
                {RELATED_LINKS.map((l) => (
                  <li key={l.href}>
                    <RouteLink href={l.href} className="cu-link-card">
                      <span className="cu-link-card__title">{l.label}</span>
                      <span className="cu-link-card__desc">
                        {routeExists(l.href) ? l.d : "Page not available yet"}
                      </span>
                    </RouteLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* ---------------- 15. FINAL CTA ---------------- */}
        <section className="cu-final-cta" aria-labelledby="cta-h">
          <div className="cu-container cu-final-cta__inner">
            <div>
              <p className="cu-eyebrow cu-eyebrow--light">NEXT STEP</p>
              <h2 id="cta-h">Need the latest curriculum details?</h2>
              <p>
                For current syllabi, schemes and notices, contact the college or your department.
                Confirm which version applies to your batch before you plan your semester.
              </p>
            </div>
            <div className="cu-final-cta__actions">
              <RouteLink href={cfg.contactHref} className="cu-btn cu-btn--gold">
                Contact the College
              </RouteLink>
              <a href="#program-directory" className="cu-btn cu-btn--outline-light">
                Explore Programmes
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}