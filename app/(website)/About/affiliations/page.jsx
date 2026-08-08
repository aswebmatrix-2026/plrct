import './affiliations.css';
import { AboutBreadcrumb, AeoBlock, AboutCta, AboutFooterPreview } from '@/components/about/AboutShared';
import Reveal from '@/components/about/Reveal';
import { AFFILIATIONS, FAQ_APPROVED, SITE } from '@/lib/aboutData';
import '../../../../components/about/AboutShared.css';

export const metadata = {
  title: 'Approvals & Affiliations | AICTE, PCI Recognized — PLRCT Faridabad',
  description:
    'PLRCT, Ballabgarh, Faridabad is AICTE-approved with PCI-recognized pharmacy programs. View PLRCT\'s regulatory approvals, university affiliation, and compliance record.',
  alternates: { canonical: 'https://ptlrct.com/about/affiliations' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Approvals, Affiliations & Academic Recognition — PLRCT',
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
    <main className="PLRCT-about PLRCT-affil">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <AboutBreadcrumb
        trail={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Affiliations' },
        ]}
      />

      <section className="PLRCT-affil-hero">
        <div className="PLRCT-affil-hero__inner">
          <p className="PLRCT-eyebrow" style={{ color: 'var(--PLRCT-gold-soft)' }}>Approvals &amp; Recognition</p>
          <h1>Approvals, Affiliations &amp; Academic Recognition</h1>
          <p>Every program PLRCT offers operates under statutory oversight — here&rsquo;s exactly which bodies, and what that means in practice.</p>
        </div>
      </section>

      {/* ---- Badge grid ---- */}
      <section className="PLRCT-affil-badges-section">
        <div className="PLRCT-about__inner">
          <Reveal as="div">
            <p className="PLRCT-eyebrow">Regulatory Standing</p>
            <h2 className="PLRCT-section-title">Official approvals &amp; affiliations</h2>
          </Reveal>
          <div className="PLRCT-affil-badges">
            {AFFILIATIONS.map((item, i) => (
              <Reveal as="article" delay={(i % 4) * 80} className="PLRCT-affil-badge" key={item.title}>
                <span className="PLRCT-affil-badge__seal" aria-hidden="true">
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
      <section className="PLRCT-affil-trust">
        <div className="PLRCT-about__inner PLRCT-affil-trust__row">
          {['AICTE Approved', 'PCI Recognized', 'University Affiliated', 'Annually Audited'].map((label) => (
            <span className="PLRCT-affil-trust__chip" key={label}>{label}</span>
          ))}
        </div>
      </section>

      {/* ---- Document downloads ---- */}
      <section className="PLRCT-affil-docs">
        <div className="PLRCT-about__inner">
          <Reveal as="div">
            <p className="PLRCT-eyebrow">Verify for Yourself</p>
            <h2 className="PLRCT-section-title">Download official documents</h2>
            <p className="PLRCT-section-lede">
              Link these cards to the actual signed PDFs on file — placeholders shown here so the
              layout is ready the moment scanned documents are available.
            </p>
          </Reveal>
          <div className="PLRCT-affil-docs__grid">
            {DOCS.map((doc) => (
              <a href="#" className="PLRCT-affil-doc" key={doc.label} aria-disabled="true">
                <span className="PLRCT-affil-doc__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M12 11v6M9 14h6" />
                  </svg>
                </span>
                <span>
                  <p className="PLRCT-affil-doc__label">{doc.label}</p>
                  <p className="PLRCT-affil-doc__note">{doc.note}</p>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <AeoBlock items={[FAQ_APPROVED]} />
      <AboutCta />
     
    </main>
  );
}