import '../../../components/about/AboutShared.css';
import './overview.css';
import { AboutBreadcrumb, AeoBlock, AboutCta, AboutFooterPreview } from '@/components/about/AboutShared';
import Reveal from '@/components/about/Reveal';
import Counter from '@/components/about/Counter';
import { OVERVIEW_STATS, OVERVIEW_PILLARS, OVERVIEW_TIMELINE, AEO_BLOCKS, SITE } from '@/lib/aboutData';

export const metadata = {
  title: 'About PLRCT | Institutional Overview — Pt. L.R. College of Technology, Faridabad',
  description:
    'Discover Pt. L.R. College of Technology (PLRCT), Ballabgarh, Faridabad — an AICTE-approved engineering, management, and pharmacy campus serving Faridabad, Delhi NCR, Ballabgarh, and Palwal with industry-oriented technical education.',
  alternates: { canonical: 'https://ptlrct.com/about/overview' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Institutional Overview — Pt. L.R. College of Technology',
  about: {
    '@type': 'CollegeOrUniversity',
    name: SITE.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: `${SITE.locality}, ${SITE.city}`,
      addressRegion: SITE.region,
      addressCountry: 'IN',
    },
  },
};

export default function OverviewPage() {
  return (
    <main className="plrct-about plrct-overview">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <AboutBreadcrumb
        trail={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Overview' },
        ]}
      />

      {/* ---- Hero ---- */}
      <section className="plrct-overview-hero">
        <div className="plrct-overview-hero__media" aria-hidden="true">
          <div className="plrct-overview-hero__campus-mark" />
        </div>
        <div className="plrct-overview-hero__inner">
          <p className="plrct-eyebrow" style={{ color: 'var(--plrct-gold-soft)' }}>Institutional Overview</p>
          <h1>About Pt. L.R. College of Technology</h1>
          <p className="plrct-overview-hero__sub">
            Excellence in Technical and Professional Education in Faridabad — an AICTE-approved campus
            in Ballabgarh serving students across Faridabad, Delhi NCR, Ballabgarh, and Palwal.
          </p>
        </div>
      </section>

      {/* ---- Stat strip ---- */}
      <section className="plrct-overview-stats">
        <div className="plrct-about__inner plrct-overview-stats__grid">
          {OVERVIEW_STATS.map((stat, i) => (
            <Reveal as="div" delay={i * 90} className="plrct-overview-stat" key={stat.label}>
              <p className="plrct-overview-stat__value">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="plrct-overview-stat__label">{stat.label}</p>
            </Reveal>
          ))}
        </div>
        <p className="plrct-overview-stats__note">
          Figures shown are illustrative placeholders for this redesign — replace with PLRCT&rsquo;s latest verified figures before publishing.
        </p>
      </section>

      {/* ---- Pillars — two-column editorial layout ---- */}
      <section className="plrct-overview-pillars">
        <div className="plrct-about__inner">
          <Reveal as="div">
            <p className="plrct-eyebrow">What Defines PLRCT</p>
            <h2 className="plrct-section-title">Seven pillars of the institution</h2>
            <p className="plrct-section-lede">
              From governance to future planning, these are the threads that run through every
              department, program, and decision at PLRCT.
            </p>
          </Reveal>

          <div className="plrct-overview-pillars__list">
            {OVERVIEW_PILLARS.map((pillar, i) => (
              <Reveal as="article" delay={(i % 2) * 80} className="plrct-overview-pillar" key={pillar.title}>
                <span className="plrct-overview-pillar__index">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Timeline ---- */}
      <section className="plrct-overview-timeline">
        <div className="plrct-about__inner">
          <Reveal as="div">
            <p className="plrct-eyebrow">Since Founding</p>
            <h2 className="plrct-section-title">How the campus has grown</h2>
          </Reveal>
          <ol className="plrct-overview-timeline__rail">
            {OVERVIEW_TIMELINE.map((entry, i) => (
              <Reveal as="li" delay={i * 100} key={entry.year}>
                <span className="plrct-overview-timeline__node" aria-hidden="true" />
                <p className="plrct-overview-timeline__year">{entry.year}</p>
                <p className="plrct-overview-timeline__text">{entry.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- Gallery strip ---- */}
      <section className="plrct-overview-gallery">
        <div className="plrct-about__inner">
          <Reveal as="div">
            <p className="plrct-eyebrow">Campus Life</p>
            <h2 className="plrct-section-title">A campus built for daily use, not just photographs</h2>
          </Reveal>
          <div className="plrct-overview-gallery__grid" role="list" aria-label="Campus gallery placeholders">
            {['Academic Block', 'Central Library', 'Engineering Labs', 'Sports Complex', 'Auditorium', 'Campus Grounds'].map((label) => (
              <div className="plrct-overview-gallery__tile" role="listitem" key={label}>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AeoBlock items={AEO_BLOCKS} />
      <AboutCta />
      <AboutFooterPreview />
    </main>
  );
}