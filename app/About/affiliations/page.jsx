import '../../../components/about/AboutShared.css';
import './affiliations.css';
import { AboutBreadcrumb, AeoBlock, AboutCta, AboutFooterPreview } from '@/components/about/AboutShared';
import Reveal from '@/components/about/Reveal';
import { AFFILIATIONS, FAQ_APPROVED, SITE } from '@/lib/aboutData';

export const metadata = {
  title: 'Approvals & Affiliations | AICTE, PCI Recognized — PLRCT Faridabad',
  description:
    'Pt. L.R. College of Technology, Ballabgarh, Faridabad is AICTE-approved with PCI-recognized pharmacy programs. View PLRCT\'s regulatory approvals, university affiliation, and compliance record.',
  alternates: { canonical: 'https://ptlrct.com/about/affiliations' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Approvals, Affiliations & Academic Recognition — Pt. L.R. College of Technology',
  about: { '@type': 'CollegeOrUniversity', name: SITE.name },
};

const DOCS = [
  { label: 'AICTE Approval Letter', note: 'Current academic year' },
  { label: 'PCI Recognition Certificate', note: 'Pharmacy programs' },
  { label: 'University Affiliation Order', note: 'State technical university' },
  { label: 'Mandatory Disclosure', note: 'AICTE format' },
];

export default function AffiliationsPage() {
  return (
    <main className="plrct-about plrct-affil">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <AboutBreadcrumb
        trail={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Affiliations' },
        ]}
      />

      <section className="plrct-affil-hero">
        <div className="plrct-affil-hero__inner">
          <p className="plrct-eyebrow" style={{ color: 'var(--plrct-gold-soft)' }}>Approvals &amp; Recognition</p>
          <h1>Approvals, Affiliations &amp; Academic Recognition</h1>
          <p>Every program PLRCT offers operates under statutory oversight — here&rsquo;s exactly which bodies, and what that means in practice.</p>
        </div>
      </section>

      {/* ---- Badge grid ---- */}
      <section className="plrct-affil-badges-section">
        <div className="plrct-about__inner">
          <Reveal as="div">
            <p className="plrct-eyebrow">Regulatory Standing</p>
            <h2 className="plrct-section-title">Official approvals &amp; affiliations</h2>
          </Reveal>
          <div className="plrct-affil-badges">
            {AFFILIATIONS.map((item, i) => (
              <Reveal as="article" delay={(i % 4) * 80} className="plrct-affil-badge" key={item.title}>
                <span className="plrct-affil-badge__seal" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="9" r="6.5" />
                    <path d="M8.5 14.5 7 22l5-3 5 3-1.5-7.5" />
                  </svg>
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Trust indicators ---- */}
      <section className="plrct-affil-trust">
        <div className="plrct-about__inner plrct-affil-trust__row">
          {['AICTE Approved', 'PCI Recognized', 'University Affiliated', 'Annually Audited'].map((label) => (
            <span className="plrct-affil-trust__chip" key={label}>{label}</span>
          ))}
        </div>
      </section>

      {/* ---- Document downloads ---- */}
      <section className="plrct-affil-docs">
        <div className="plrct-about__inner">
          <Reveal as="div">
            <p className="plrct-eyebrow">Verify for Yourself</p>
            <h2 className="plrct-section-title">Download official documents</h2>
            <p className="plrct-section-lede">
              Link these cards to the actual signed PDFs on file — placeholders shown here so the
              layout is ready the moment scanned documents are available.
            </p>
          </Reveal>
          <div className="plrct-affil-docs__grid">
            {DOCS.map((doc) => (
              <a href="#" className="plrct-affil-doc" key={doc.label} aria-disabled="true">
                <span className="plrct-affil-doc__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M12 11v6M9 14h6" />
                  </svg>
                </span>
                <span>
                  <p className="plrct-affil-doc__label">{doc.label}</p>
                  <p className="plrct-affil-doc__note">{doc.note}</p>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <AeoBlock items={[FAQ_APPROVED]} />
      <AboutCta />
      <AboutFooterPreview />
    </main>
  );
}