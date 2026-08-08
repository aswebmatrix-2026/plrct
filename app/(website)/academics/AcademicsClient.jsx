'use client';

import { useState } from 'react';
import Link from 'next/link';
import './academics.css';
import {
  PROGRAMS,
  DEPARTMENTS,
  FEATURES,
  LABS,
  CURRICULUM_POINTS,
  CAREERS,
  PLACEMENT_SUPPORT,
  ADMISSION_STEPS,
  ADMISSION_NOTES,
  FAQS,
  AEO_BLOCKS,
} from './data';

/* --------------------------------------------------------------------- */
/* Minimal icon set — line icons drawn to match the program/feature grid  */
/* --------------------------------------------------------------------- */
const ICONS = {
  engineering: <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 0v20M3 7l9 5 9-5" />,
  diploma: <path d="M12 3 2 8l10 5 10-5-10-5ZM6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" />,
  research: <path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3M9 3h6" />,
  curriculum: <path d="M4 4h16v16H4zM4 9h16M9 9v11" />,
  lab: <path d="M9 2v6L4 20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2L15 8V2M9 2h6" />,
  faculty: <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-8 10a8 8 0 0 1 16 0" />,
  practical: <path d="M14.7 6.3a1 1 0 0 1 0 1.4l-8 8-4 1 1-4 8-8a1 1 0 0 1 1.4 0l1.6 1.6ZM18 3l3 3" />,
  internship: <path d="M2 7h20v13H2zM8 7V4h8v3M2 12h20" />,
  placement: <path d="m5 12 5 5L20 7" />,
  'soft-skills': <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  entrepreneur: <path d="M12 2 2 8v13h20V8Zm0 0 10 6M12 22V11" />,
  'mtech-research': <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

function Icon({ name }) {
  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {d}
    </svg>
  );
}

/* --------------------------------------------------------------------- */

export default function AcademicsClient() {
  const [activeDept, setActiveDept] = useState(DEPARTMENTS[0].code);
  const dept = DEPARTMENTS.find((d) => d.code === activeDept) || DEPARTMENTS[0];
  const btech = PROGRAMS.find((p) => p.id === 'btech');
  const diploma = PROGRAMS.find((p) => p.id === 'diploma');
  const mtech = PROGRAMS.find((p) => p.id === 'mtech');

  return (
    <main id="main-content" className="ac-page">
      {/* Breadcrumbs — SEO / navigation context.
          NOTE: "Home" points at #top (this page) for now so it never 404s
          while the rest of the site isn't built yet. Once a real homepage
          exists at "/", swap this back to <Link href="/">Home</Link>. */}
      <div className="ac-breadcrumbs">
        <div className="ac-container">
          <Link href="#top">Home</Link> / <span aria-current="page">Academics &amp; Courses</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- Hero */}
      <section className="ac-hero" id="top">
        <div className="ac-hero__media ac-grid-bg">
          <img src="/images/academics/hero-campus.jpg" alt="PLRCT engineering campus and laboratories" />
        </div>
        <div className="ac-hero__scrim" />
        <div className="ac-hero__inner">
          <div className="ac-container">
            <span className="ac-hero__eyebrow">Academics — PLRCT, Faridabad</span>
            <h1>Engineering &amp; Technical Education Programs</h1>
            <p>
              Industry-focused B.Tech, Diploma Engineering and M.Tech programs with practical
              learning, advanced laboratories, experienced faculty, research opportunities and
              career-oriented placement support in Faridabad, Haryana.
            </p>
            <div className="ac-hero__actions">
              {/* CHANGE: these two now scroll to the on-page Admission Process
                  section instead of linking to /admissions/apply and
                  /admissions/prospectus, which don't exist yet. */}
              <Link href="#admission-process" className="ac-btn ac-btn--primary">Apply Now <Icon name="arrow" /></Link>
              <Link href="#admission-process" className="ac-btn ac-btn--ghost">Download Prospectus</Link>
            </div>
          </div>
        </div>
        <div className="ac-hero__stats">
          <div className="ac-container">
            <div className="ac-hero__stats-inner">
              <div className="ac-hero__stat"><b>3</b><span>Degree levels — Diploma, B.Tech, M.Tech</span></div>
              <div className="ac-hero__stat"><b>8</b><span>Engineering departments</span></div>
              <div className="ac-hero__stat"><b>AICTE</b><span>Approved institution</span></div>
              <div className="ac-hero__stat"><b>10+</b><span>Specialised laboratories</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Program overview */}
      <section className="ac-programs">
        <div className="ac-container">
          <div className="ac-section-head">
            <span className="ac-eyebrow">Programs Offered</span>
            <h2 className="ac-heading-xl">Three degree levels, one engineering foundation</h2>
            <p className="ac-lede">
              From a 3-year Diploma through the flagship 4-year B.Tech to a research-driven
              2-year M.Tech, every program is built around the same practical, industry-linked
              approach to engineering education.
            </p>
          </div>

          <div className="ac-program-grid">
            {PROGRAMS.map((p) => (
              <article key={p.id} className="ac-program-card">
                <div className="ac-program-card__icon"><Icon name={p.icon} /></div>
                <span className="ac-program-card__duration">{p.duration}</span>
                <h3>{p.name}</h3>
                <div className="ac-program-card__depts">
                  {p.departments.map((d) => <span key={d}>{d}</span>)}
                </div>
                <div className="ac-program-card__meta">
                  <div><span>Eligibility</span><b>{p.eligibility}</b></div>
                  <div><span>Career outcomes</span><b>{p.outcomes}</b></div>
                  <div><span>Industry demand</span><b>{p.demand}</b></div>
                </div>
                <Link href={p.href} className="ac-btn ac-btn--outline">Learn More <Icon name="arrow" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- B.Tech departments */}
      <section className="ac-departments" id="btech">
        <div className="ac-container">
          <div className="ac-section-head">
            <span className="ac-eyebrow">B.Tech Engineering — 4 Years</span>
            <h2 className="ac-heading-xl">Department-wise engineering education</h2>
            <p className="ac-lede">
              Every B.Tech department pairs a rigorous core curriculum with dedicated laboratories,
              live projects and placement pathways specific to that branch.
            </p>
          </div>

          <div className="ac-dept-tabs" role="tablist" aria-label="B.Tech departments">
            {DEPARTMENTS.map((d) => (
              <button
                key={d.code}
                type="button"
                role="tab"
                aria-selected={activeDept === d.code}
                className={`ac-dept-tab${activeDept === d.code ? ' is-active' : ''}`}
                onClick={() => setActiveDept(d.code)}
              >
                {d.name}
              </button>
            ))}
          </div>

          <div className="ac-dept-panel" role="tabpanel">
            <div>
              <span className="ac-dept-panel__code">{dept.code} · B.Tech</span>
              <h3>{dept.name}</h3>
              <p>{dept.description}</p>
              <div className="ac-dept-panel__tags">
                {dept.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>

            <div className="ac-dept-side">
              <div className="ac-plate">
                <h4>Career &amp; outcomes</h4>
                <div className="ac-dept-panel__facts">
                  {dept.facts.map(([label, value]) => (
                    <div key={label}><b>{label}</b><span>{value}</span></div>
                  ))}
                </div>
              </div>
              <div className="ac-plate">
                <h4>Department laboratories</h4>
                <ul>
                  {dept.labs.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Diploma / M.Tech split */}
      <section className="ac-split">
        <div className="ac-container">
          <div className="ac-split-grid">
            <div className="ac-split-card ac-split-card--diploma" id="diploma">
              <span className="ac-eyebrow">Diploma Engineering — {diploma.duration}</span>
              <h3>Practical training from day one</h3>
              <p>
                Diploma Engineering at PLRCT is built for students who want hands-on,
                workshop-first technical training. Heavy lab and workshop hours, direct
                industry exposure and a clear lateral-entry pathway into B.Tech make this
                route ideal for early specialisation.
              </p>
              <ul>
                <li>Workshop-heavy, practice-first curriculum across CSE, EE, ME, CE, ECE and IT</li>
                <li>Structured industrial exposure through visits and short-term training</li>
                <li>Lateral entry directly into the second year of the relevant B.Tech program</li>
                <li>Early career pathway into junior engineering and technician roles</li>
              </ul>
              <Link href={diploma.href} className="ac-btn ac-btn--ghost">Explore Diploma Engineering <Icon name="arrow" /></Link>
            </div>

            <div className="ac-split-card ac-split-card--mtech" id="mtech">
              <span className="ac-eyebrow">M.Tech Engineering — {mtech.duration}</span>
              <h3>Research-driven postgraduate specialisation</h3>
              <p>
                M.Tech at PLRCT is built around thesis-driven research, specialisation-focused
                coursework and industry collaboration, preparing graduates for R&amp;D, academic
                and senior engineering careers.
              </p>
              <ul>
                <li>Specialisations in CSE, Electrical, Mechanical, Civil and ECE</li>
                <li>Thesis and dissertation work under dedicated faculty guidance</li>
                <li>Industry-collaborated research and innovation projects</li>
                <li>Pathways into PSU, R&amp;D and academic careers, plus international higher study</li>
              </ul>
              <Link href={mtech.href} className="ac-btn ac-btn--ghost">Explore M.Tech Engineering <Icon name="arrow" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Why choose */}
      <section className="ac-features">
        <div className="ac-container">
          <div className="ac-section-head center">
            <span className="ac-eyebrow">Why Choose Our Engineering Programs</span>
            <h2 className="ac-heading-xl">Built for practical, career-ready engineers</h2>
          </div>
          <div className="ac-feature-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="ac-feature">
                <div className="ac-feature__icon"><Icon name={f.icon} /></div>
                <h4>{f.title}</h4>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Lab gallery */}
      <section className="ac-labs">
        <div className="ac-container">
          <div className="ac-section-head">
            <span className="ac-eyebrow">Laboratories &amp; Facilities</span>
            <h2 className="ac-heading-xl">Where coursework becomes practice</h2>
          </div>
          <div className="ac-lab-grid">
            {LABS.map((lab) => (
              <div key={lab.title} className={`ac-lab-card${lab.size === 'wide' ? ' is-wide' : ''}${lab.size === 'tall' ? ' is-tall' : ''}`}>
                <img src={`/images/academics/labs/${lab.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`} alt={lab.title} />
                <div className="ac-lab-card__overlay">
                  <h5>{lab.title}</h5>
                  <p>{lab.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Curriculum */}
      <section className="ac-curriculum">
        <div className="ac-container">
          <div className="ac-section-head">
            <span className="ac-eyebrow">Curriculum &amp; Learning</span>
            <h2 className="ac-heading-xl">Outcome-based, practice-first education</h2>
          </div>
          <div className="ac-curriculum-grid">
            {CURRICULUM_POINTS.map((c) => (
              <div key={c.tag} className="ac-curriculum-item">
                <span>{c.tag}</span>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Careers */}
      <section className="ac-careers">
        <div className="ac-container">
          <div className="ac-section-head">
            <span className="ac-eyebrow">Career Opportunities</span>
            <h2 className="ac-heading-xl">Where PLRCT engineers go next</h2>
          </div>
          <div className="ac-career-grid">
            {CAREERS.map((c) => (
              <div key={c} className="ac-career-chip"><span className="dot" />{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Placement support */}
      <section className="ac-placement">
        <div className="ac-container">
          <span className="ac-eyebrow">Placement Support</span>
          <h2 className="ac-heading-lg">Structured preparation, not last-minute drives</h2>
          <div className="ac-placement-grid">
            {PLACEMENT_SUPPORT.map((p) => (
              <div key={p.title} className="ac-placement-item">
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <div className="ac-recruiters">
            <p className="ac-recruiters__label">Recruiting partners (placeholder)</p>
            <div className="ac-recruiters__row">
              {['Recruiter 01', 'Recruiter 02', 'Recruiter 03', 'Recruiter 04', 'Recruiter 05', 'Recruiter 06'].map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Admission process */}
      <section className="ac-admission" id="admission-process">
        <div className="ac-container">
          <div className="ac-section-head">
            <span className="ac-eyebrow">Admission Process</span>
            <h2 className="ac-heading-xl">Four steps from application to enrolment</h2>
          </div>
          <div className="ac-timeline">
            {ADMISSION_STEPS.map((s, i) => (
              <div key={s.title} className="ac-timeline-step">
                <div className="ac-timeline-step__num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="ac-admission-notes">
            {ADMISSION_NOTES.map((n) => (
              <div key={n.title} className="ac-plate">
                <h5>{n.title}</h5>
                <p>{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- AEO answer blocks */}
      <section className="ac-aeo">
        <div className="ac-container">
          <div className="ac-section-head">
            <span className="ac-eyebrow">Quick Answers</span>
            <h2 className="ac-heading-lg">Common questions about PLRCT engineering programs</h2>
          </div>
          <div className="ac-aeo-grid">
            {AEO_BLOCKS.map((b) => (
              <div key={b.q} className="ac-aeo-card">
                <p className="q">{b.q}</p>
                <p className="a">{b.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- FAQ */}
      <section className="ac-faq" id="faq">
        <div className="ac-container">
          <div className="ac-section-head center">
            <span className="ac-eyebrow">Frequently Asked Questions</span>
            <h2 className="ac-heading-xl">Everything about admissions &amp; programs</h2>
          </div>
          <div className="ac-faq-list">
            {FAQS.map((f) => (
              <details key={f.q} className="ac-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Final CTA */}
      <section className="ac-cta ac-grid-bg">
        <div className="ac-container">
          <span className="ac-eyebrow">Admissions Open</span>
          <h2 className="ac-heading-xl">Build Your Engineering Career with PLRCT</h2>
          <p>
            Join a leading engineering institution in Faridabad with industry-focused B.Tech,
            Diploma and M.Tech education, modern laboratories, experienced faculty, research
            opportunities and strong placement support.
          </p>
          <div className="ac-cta__actions">
            {/* CHANGE: same reasoning as the hero buttons — anchor to the
                on-page Admission Process section instead of not-yet-built
                /admissions and /contact routes. */}
            <Link href="#admission-process" className="ac-btn ac-btn--primary">Apply for Admission <Icon name="arrow" /></Link>
            <Link href="#admission-process" className="ac-btn ac-btn--ghost">Contact Admissions</Link>
            <Link href="#admission-process" className="ac-btn ac-btn--ghost">Download Prospectus</Link>
          </div>
        </div>
      </section>
    </main>
  );
}