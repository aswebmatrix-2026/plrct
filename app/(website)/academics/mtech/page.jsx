import "./mtech.css";

// ============================================================================
// SEO METADATA — Next.js 15 App Router
// ============================================================================
export const metadata = {
  title: "M.Tech Engineering Faridabad | PLRCT AICTE Approved Postgraduate College",
  description:
    "AICTE approved M.Tech admission at PLRCT, Faridabad. Postgraduate engineering programs in Computer Science, Mechanical, Civil, Electrical and ECE with research labs, faculty-guided thesis work and industry collaboration. Serving Faridabad and Haryana.",
  alternates: {
    canonical: "https://ptlrct.com/academics/mtech",
  },
  openGraph: {
    title: "M.Tech Engineering at PLRCT Faridabad | AICTE Approved Postgraduate Programs",
    description:
      "Advanced postgraduate engineering education with research, innovation and industry collaboration at PLRCT, Faridabad.",
    url: "https://ptlrct.com/academics/mtech",
    siteName: "PLRCT (PLRCT)",
    images: [
      {
        url: "https://ptlrct.com/og/mtech-program.jpg",
        width: 1200,
        height: 630,
        alt: "M.Tech Engineering Program at PLRCT Faridabad",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M.Tech Engineering at PLRCT Faridabad | AICTE Approved Postgraduate Programs",
    description:
      "Advanced postgraduate engineering education with research, innovation and industry collaboration at PLRCT, Faridabad.",
    images: ["https://ptlrct.com/og/mtech-program.jpg"],
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
    { "@type": "ListItem", position: 3, name: "M.Tech", item: "https://ptlrct.com/academics/mtech" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is M.Tech at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "M.Tech at PLRCT is a two-year, AICTE approved postgraduate engineering degree in Faridabad focused on advanced coursework, research methodology and a faculty-guided thesis across Computer Science, Mechanical, Civil, Electrical and Electronics & Communication specializations.",
      },
    },
    {
      "@type": "Question",
      name: "Does PLRCT offer M.Tech?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, PLRCT offers AICTE approved M.Tech programs across five engineering specializations, combining research laboratories, faculty mentorship and industry collaboration for postgraduate engineering study in Faridabad, Haryana.",
      },
    },
    {
      "@type": "Question",
      name: "What is the eligibility for M.Tech admission at PLRCT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Candidates must hold a B.Tech or equivalent engineering degree in a relevant discipline with the minimum aggregate percentage prescribed by the affiliating university, and admission is typically based on GATE score or the applicable state-level entrance and counseling process.",
      },
    },
    {
      "@type": "Question",
      name: "Is PLRCT's M.Tech program AICTE approved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, PLRCT's M.Tech programs are AICTE approved and affiliated with the relevant state technical university, meeting all regulatory requirements for postgraduate engineering education.",
      },
    },
    {
      "@type": "Question",
      name: "What is the duration of the M.Tech program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The M.Tech program at PLRCT runs for two years, divided into four semesters, with the later semesters focused heavily on research work and a dissertation.",
      },
    },
    {
      "@type": "Question",
      name: "Which M.Tech specializations does PLRCT offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PLRCT offers M.Tech specializations in Computer Science Engineering, Electrical Engineering, Mechanical Engineering, Civil Engineering, and Electronics & Communication Engineering.",
      },
    },
    {
      "@type": "Question",
      name: "Does the M.Tech program include a thesis or dissertation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, every M.Tech student at PLRCT completes a faculty-guided dissertation spanning the final two semesters, following a structured research methodology and defended before an academic panel.",
      },
    },
    {
      "@type": "Question",
      name: "What career opportunities are available after M.Tech?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "M.Tech graduates from PLRCT can pursue R&D roles in industry, positions in public sector undertakings, academic and teaching careers, or continue into a Ph.D. program for further research specialization.",
      },
    },
    {
      "@type": "Question",
      name: "Does PLRCT support Ph.D. pathways after M.Tech?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, PLRCT's research culture and faculty publication support prepare M.Tech graduates well for Ph.D. admission at PLRCT or other research universities, building on the dissertation work completed during the program.",
      },
    },
    {
      "@type": "Question",
      name: "Does PLRCT provide research laboratories for M.Tech students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, M.Tech students at PLRCT have access to dedicated research laboratories, an advanced computing lab, and an innovation center supporting faculty-guided research projects and dissertation work.",
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "M.Tech Specializations",
    itemListElement: [
      "M.Tech Computer Science Engineering",
      "M.Tech Electrical Engineering",
      "M.Tech Mechanical Engineering",
      "M.Tech Civil Engineering",
      "M.Tech Electronics & Communication Engineering",
    ].map((name) => ({ "@type": "Course", name })),
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
export default function MTechPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eduOrgSchema) }}
      />

      <main className="mtech">
        {/* ---------------- HERO ---------------- */}
        <header className="mtech-hero">
          <div className="mtech-hero__grid" aria-hidden="true" />
          <div className="container mtech-hero__inner">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/academics">Academics</a>
              <span>/</span>
              <span aria-current="page">M.Tech</span>
            </nav>

            <div className="mtech-hero__content">
              <div className="mtech-hero__text">
                <p className="eyebrow eyebrow--light">POSTGRADUATE · RESEARCH ENGINEERING</p>
                <h1>M.Tech Engineering Programs</h1>
                <p className="mtech-hero__lede">
                  Advanced postgraduate engineering education with research, innovation, industry
                  collaboration, and specialised technical expertise — built for graduate
                  engineers across Faridabad and Haryana who want to deepen their discipline
                  through structured research rather than repeat undergraduate coursework.
                </p>
                <div className="mtech-hero__cta">
                  <a href="/admissions" className="btn btn--primary">
                    Apply Now
                  </a>
                  <a href="/downloads/PLRCT-prospectus.pdf" className="btn btn--ghost">
                    Download Prospectus
                  </a>
                </div>
              </div>

              <aside className="spec-panel" aria-label="M.Tech program specification">
                <p className="spec-panel__title">PROGRAM DATASHEET</p>
                <SpecRow k="Degree" v="Master of Technology (M.Tech)" />
                <SpecRow k="Duration" v="2 Years / 4 Semesters" />
                <SpecRow k="Approval" v="AICTE Approved" />
                <SpecRow k="Entry Route" v="GATE / State Entrance & Counseling" />
                <SpecRow k="Culmination" v="Faculty-Guided Dissertation" />
                <SpecRow k="Specializations" v="5 Branches" />
                <SpecRow k="Location" v="Faridabad, Haryana (NCR)" />
              </aside>
            </div>
          </div>
        </header>

        <div className="container">
          <ImgPlaceholder label="PLRCT Research Laboratory — M.Tech Engineering" ratio="21/9" />
        </div>

        {/* ---------------- OVERVIEW ---------------- */}
        <section className="section" aria-labelledby="overview-h">
          <div className="container">
            <p className="eyebrow">PROGRAM OVERVIEW</p>
            <h2 id="overview-h">What is M.Tech Engineering at PLRCT?</h2>
            <p>
              M.Tech at PLRCT is a two-year, AICTE approved postgraduate
              engineering degree designed for graduate engineers who want to move from applying
              known techniques to developing new ones. Where a B.Tech builds broad engineering
              competence, the M.Tech program at PLRCT narrows focus toward a single discipline —
              Computer Science, Mechanical, Civil, Electrical or Electronics &amp; Communication
              Engineering — and trains students to conduct independent, faculty-guided research
              within it.
            </p>
            <p>
              As one of the AICTE approved M.Tech colleges in the Faridabad and greater Haryana
              region, PLRCT structures the program around advanced coursework in the first two
              semesters, followed by a research methodology component and a substantial
              dissertation in the final two semesters. This mirrors how postgraduate engineering
              education works at established research universities, while staying closely
              connected to the industrial and technology base of Delhi NCR for applied,
              industry-relevant research questions.
            </p>
            <p>
              Admission to the M.Tech program at PLRCT typically follows a GATE score or the
              applicable state-level postgraduate entrance and counseling process, in keeping with
              AICTE norms for M.Tech admission in Haryana.
            </p>
          </div>
        </section>

        {/* ---------------- WHY CHOOSE ---------------- */}
        <section className="section section--tint" aria-labelledby="why-h">
          <div className="container">
            <p className="eyebrow">WHY CHOOSE M.TECH AT PLRCT</p>
            <h2 id="why-h">A postgraduate program built around research, not repetition</h2>
            <div className="card-grid">
              {[
                {
                  t: "Dedicated Research Laboratories",
                  d: "Specialization-specific research labs and an advanced computing lab equipped for postgraduate-level experimentation.",
                },
                {
                  t: "Five M.Tech Specializations",
                  d: "Computer Science, Electrical, Mechanical, Civil and Electronics & Communication Engineering — depth in the discipline that matters to you.",
                },
                {
                  t: "Structured Dissertation Process",
                  d: "A formal research methodology component followed by faculty-guided thesis work, not an unsupervised final-year add-on.",
                },
                {
                  t: "Industry Collaboration",
                  d: "Research questions and projects shaped in conversation with employers across the Faridabad-Delhi NCR industrial and technology corridor.",
                },
                {
                  t: "Publication Support",
                  d: "Faculty mentorship toward conference papers and journal publications arising from dissertation work.",
                },
                {
                  t: "AICTE Approved Program",
                  d: "A regulator-approved postgraduate qualification affiliated with the relevant state technical university.",
                },
              ].map((c) => (
                <div className="card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- SPECIALIZATIONS ---------------- */}
        <section className="section" aria-labelledby="specializations-h">
          <div className="container">
            <p className="eyebrow">SPECIALIZATIONS</p>
            <h2 id="specializations-h">Choose your research discipline</h2>
            <div className="dept-grid">
              <article className="dept-card">
                <h3>Computer Science Engineering</h3>
                <p>
                  An M.Tech in Computer Science at PLRCT for students in Faridabad pursuing
                  advanced research in algorithms, machine learning, data systems or network
                  security, supported by an advanced computing lab.
                </p>
              </article>
              <article className="dept-card">
                <h3>Electrical Engineering</h3>
                <p>
                  Postgraduate research in power systems, control engineering and electrical
                  machines, building on a full B.Tech-level electrical foundation.
                </p>
              </article>
              <article className="dept-card">
                <h3>Mechanical Engineering</h3>
                <p>
                  An M.Tech Mechanical track in Haryana covering thermal systems, design
                  optimization and manufacturing research, backed by dedicated research
                  workshops.
                </p>
              </article>
              <article className="dept-card">
                <h3>Civil Engineering</h3>
                <p>
                  Advanced study and dissertation work in structural engineering, geotechnical
                  analysis or environmental engineering, suited to postgraduate civil engineers
                  across the region.
                </p>
              </article>
              <article className="dept-card">
                <h3>Electronics &amp; Communication Engineering</h3>
                <p>
                  Research-level coursework in embedded systems, VLSI design and communication
                  networks, supported by specialized electronics research facilities.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ---------------- ADVANCED CURRICULUM & RESEARCH METHODOLOGY ---------------- */}
        <section className="section section--tint" aria-labelledby="curriculum-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">ADVANCED CURRICULUM</p>
              <h2 id="curriculum-h">Coursework built for depth, not breadth</h2>
              <p>
                The first two semesters of the M.Tech program cover advanced core subjects and
                electives within the chosen specialization, at a level well beyond undergraduate
                coursework. Seminars and technical presentations run alongside these subjects,
                giving students early practice in communicating research ideas before their
                dissertation begins in earnest.
              </p>
            </div>
            <div>
              <p className="eyebrow">RESEARCH METHODOLOGY</p>
              <h2>Learning how to do research, not just engineering</h2>
              <p>
                A dedicated research methodology course introduces literature review technique,
                experimental design, data analysis and academic writing, preparing students to
                plan and defend an original research proposal before they begin dissertation work
                in the third semester.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- THESIS & DISSERTATION ---------------- */}
        <section className="section" aria-labelledby="thesis-h">
          <div className="container">
            <p className="eyebrow">THESIS &amp; DISSERTATION</p>
            <h2 id="thesis-h">Two semesters, one substantial piece of research</h2>
            <p>
              Every M.Tech student at PLRCT completes a faculty-guided dissertation spanning the
              third and fourth semesters. The process begins with a formal proposal defense,
              proceeds through supervised experimentation or analysis, and concludes with a
              written dissertation and a final defense before an academic panel — the same
              structure used at established research universities, scaled appropriately for a
              two-year postgraduate program.
            </p>
          </div>
        </section>

        {/* ---------------- RESEARCH LABS & INNOVATION ---------------- */}
        <section className="section section--tint" aria-labelledby="labs-h">
          <div className="container">
            <p className="eyebrow">RESEARCH LABORATORIES &amp; INNOVATION</p>
            <h2 id="labs-h">Where M.Tech research actually happens</h2>
            <p>
              PLRCT's postgraduate research infrastructure includes specialization-specific
              research laboratories, an advanced computing lab for computational and data-driven
              research, and a dedicated innovation center where students can prototype ideas that
              extend beyond a single dissertation. Full laboratory details are available on the{" "}
              <a href="/academics/resources/laboratories">laboratories page</a> and the{" "}
              <a href="/academics/resources/research">research page</a>.
            </p>
            <div className="img-grid">
              <ImgPlaceholder label="Research Laboratory" />
              <ImgPlaceholder label="Innovation Center" />
              <ImgPlaceholder label="Advanced Computing Lab" />
              <ImgPlaceholder label="Faculty Research in Progress" />
              <ImgPlaceholder label="Technical Seminar" />
              <ImgPlaceholder label="Industry Collaboration Session" />
            </div>
          </div>
        </section>

        {/* ---------------- INDUSTRY COLLABORATION & FACULTY RESEARCH ---------------- */}
        <section className="section" aria-labelledby="industry-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">INDUSTRY COLLABORATION</p>
              <h2 id="industry-h">Research questions with real-world relevance</h2>
              <p>
                PLRCT's proximity to the Faridabad-Ballabgarh industrial belt and the wider Delhi
                NCR technology and manufacturing ecosystem gives M.Tech students access to
                applied, industry-relevant research problems, and in some cases direct
                collaboration with employers on dissertation topics with practical outcomes.
              </p>
            </div>
            <div>
              <p className="eyebrow">FACULTY RESEARCH &amp; PUBLICATIONS</p>
              <h2>Learning research culture from active researchers</h2>
              <p>
                M.Tech students work alongside faculty who maintain their own research programs,
                gaining exposure to ongoing publication and conference activity and support in
                preparing their own dissertation findings for academic publication where the work
                merits it.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- CAREERS ---------------- */}
        <section className="section section--tint" aria-labelledby="career-h">
          <div className="container">
            <p className="eyebrow">CAREER OPPORTUNITIES</p>
            <h2 id="career-h">Where an M.Tech leads</h2>
            <div className="card-grid">
              {[
                {
                  t: "R&D Careers",
                  d: "Research and development roles in engineering, technology and manufacturing companies across Delhi NCR seeking postgraduate-trained talent.",
                },
                {
                  t: "PSU Opportunities",
                  d: "Public sector undertakings that recruit specifically for M.Tech-qualified engineers into technical and research-oriented positions.",
                },
                {
                  t: "Academic Careers",
                  d: "Teaching and lecturing positions at engineering colleges and polytechnics, often a direct next step after M.Tech.",
                },
                {
                  t: "Ph.D. Pathways",
                  d: "A dissertation-tested research foundation that prepares graduates well for doctoral admission at PLRCT or other research universities.",
                },
              ].map((c) => (
                <div className="card" key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- PLACEMENT & RESEARCH SUPPORT / FACILITIES ---------------- */}
        <section className="section" aria-labelledby="support-h">
          <div className="container two-col">
            <div>
              <p className="eyebrow">PLACEMENT &amp; RESEARCH SUPPORT</p>
              <h2 id="support-h">Support that continues through both years</h2>
              <p>
                The Training and Placement Cell works with M.Tech students on R&amp;D-focused
                interview preparation and PSU recruitment processes, while faculty advisors
                continue mentoring dissertation work and, where appropriate, Ph.D. applications
                even after coursework is complete.
              </p>
            </div>
            <div>
              <p className="eyebrow">CAMPUS FACILITIES</p>
              <h2>Research life on the PLRCT campus</h2>
              <p>
                M.Tech students share full access to the campus library, research center and
                seminar halls used for technical presentations, alongside the specialized research
                laboratories attached to their discipline.
              </p>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="img-grid img-grid--facilities">
            <ImgPlaceholder label="Campus Research Facilities" />
          </div>
        </div>

        {/* ---------------- INTERNAL LINKS ---------------- */}
        <section className="section section--tint" aria-labelledby="explore-h">
          <div className="container">
            <p className="eyebrow">EXPLORE FURTHER</p>
            <h2 id="explore-h">Related programs &amp; resources</h2>
            <div className="link-grid">
              <a href="/academics/btech">B.Tech Programs</a>
              <a href="/academics/diploma">Diploma Engineering</a>
              <a href="/academics/resources/research">Research</a>
              <a href="/academics/resources/laboratories">Laboratories</a>
              <a href="/academics/resources/curriculum">Curriculum</a>
              <a href="/academics/departments/cse">Computer Science Department</a>
              <a href="/academics/departments/ece">Electronics &amp; Communication Department</a>
              <a href="/admissions">Admissions</a>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ (10 QUESTIONS) ---------------- */}
        <section className="section" aria-labelledby="faq-h">
          <div className="container">
            <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2 id="faq-h">M.Tech at PLRCT — quick answers</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>What is M.Tech at PLRCT?</summary>
                <p>
                  A two-year, AICTE approved postgraduate engineering degree in Faridabad focused
                  on advanced coursework, research methodology and a faculty-guided dissertation.
                </p>
              </details>
              <details className="faq-item">
                <summary>Does PLRCT offer M.Tech?</summary>
                <p>
                  Yes, across five specializations: Computer Science, Electrical, Mechanical,
                  Civil, and Electronics &amp; Communication Engineering.
                </p>
              </details>
              <details className="faq-item">
                <summary>What is the eligibility for M.Tech admission?</summary>
                <p>
                  A B.Tech or equivalent engineering degree in a relevant discipline, with
                  admission typically based on GATE score or the applicable state entrance and
                  counseling process.
                </p>
              </details>
              <details className="faq-item">
                <summary>Is the M.Tech program AICTE approved?</summary>
                <p>
                  Yes. PLRCT's M.Tech programs are AICTE approved and affiliated with the relevant
                  state technical university.
                </p>
              </details>
              <details className="faq-item">
                <summary>How long does the M.Tech program take?</summary>
                <p>
                  Two years, divided into four semesters, with the final two semesters focused on
                  dissertation work.
                </p>
              </details>
              <details className="faq-item">
                <summary>Which M.Tech specializations are available?</summary>
                <p>
                  Computer Science, Electrical, Mechanical, Civil, and Electronics &amp;
                  Communication Engineering.
                </p>
              </details>
              <details className="faq-item">
                <summary>Does the program include a thesis?</summary>
                <p>
                  Yes, every student completes a faculty-guided dissertation defended before an
                  academic panel in the final semester.
                </p>
              </details>
              <details className="faq-item">
                <summary>What careers follow an M.Tech?</summary>
                <p>
                  R&amp;D roles in industry, PSU technical positions, academic teaching careers,
                  or progression into a Ph.D. program.
                </p>
              </details>
              <details className="faq-item">
                <summary>Does PLRCT support Ph.D. pathways after M.Tech?</summary>
                <p>
                  Yes, the dissertation-focused training and faculty research culture prepare
                  graduates well for doctoral admission at PLRCT or other universities.
                </p>
              </details>
              <details className="faq-item">
                <summary>Are research laboratories available for M.Tech students?</summary>
                <p>
                  Yes, including specialization-specific research labs, an advanced computing lab
                  and a dedicated innovation center.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section className="final-cta">
          <div className="container final-cta__inner">
            <div>
              <p className="eyebrow eyebrow--light">ADMISSIONS OPEN</p>
              <h2>Begin your postgraduate research journey at PLRCT</h2>
              <p>
                Seats for the upcoming academic year are limited across all five M.Tech
                specializations. Apply now or download the prospectus to learn more.
              </p>
            </div>
            <div className="final-cta__actions">
              <a href="/admissions" className="btn btn--gold">
                Apply Now
              </a>
              <a href="/downloads/PLRCT-prospectus.pdf" className="btn btn--outline-light">
                Download Prospectus
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}