import '../../../../components/about/AboutShared.css';
import './infrastructure.css';
import { AboutBreadcrumb, AeoBlock, AboutCta, AboutFooterPreview } from '@/components/about/AboutShared';
import Reveal from '@/components/about/Reveal';
import { INFRASTRUCTURE_FACILITIES, FAQ_FACILITIES, FAQ_WHY_CHOOSE, SITE } from '@/lib/aboutData';

export const metadata = {
  title: 'Campus Infrastructure | PLRCT, Faridabad',
  description:
    'Explore PLRCT\'s campus infrastructure in Ballabgarh, Faridabad — smart classrooms, engineering laboratories, a central digital library, hostel, sports complex, and transport serving Faridabad, Delhi NCR, and Palwal.',
  alternates: { canonical: 'https://ptlrct.com/about/infrastructure' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Campus Infrastructure — PLRCT',
  about: { '@type': 'CollegeOrUniversity', name: SITE.name },
};

const ICONS = {
  smartboard: <path d="M3 4h18v12H3zM8 20h8M12 16v4" />,
  flask: <path d="M9 2v6L4 20a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2L15 8V2M8 2h8" />,
  gear: <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM2 12h2m16 0h2M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />,
  monitor: <path d="M3 4h18v12H3zM8 20h8" />,
  book: <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5v-18Z M20 17H6.5A2.5 2.5 0 0 0 4 19.5" />,
  auditorium: <path d="M3 20h18M5 20V10l7-6 7 6v10M9 20v-6h6v6" />,
  hostel: <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-5h6v5" />,
  sports: <circle cx="12" cy="12" r="9" />,
  cafeteria: <path d="M6 2v6a4 4 0 0 0 4 4v10M10 2v8M6 2v8M18 2v20M14 8h8" />,
  bus: <path d="M3 16V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9H3ZM3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2M7 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />,
  medical: <path d="M12 2v20M2 12h20" />,
  digital: <path d="M4 4h16v14H4zM9 21h6M12 18v3" />,
};

const ZONES = [
  { label: 'Academic Block', x: 30, y: 25 },
  { label: 'Library', x: 68, y: 22 },
  { label: 'Labs & Workshops', x: 22, y: 58 },
  { label: 'Auditorium', x: 78, y: 55 },
  { label: 'Hostel', x: 50, y: 78 },
  { label: 'Sports Ground', x: 15, y: 85 },
];

export default function InfrastructurePage() {
  return (
    <main className="PLRCT-about PLRCT-infra">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <AboutBreadcrumb
        trail={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Infrastructure' },
        ]}
      />

      <section className="PLRCT-infra-hero">
        <div className="PLRCT-infra-hero__inner">
          <p className="PLRCT-eyebrow" style={{ color: 'var(--PLRCT-gold-soft)' }}>Campus Infrastructure</p>
          <h1>World-Class Campus Infrastructure</h1>
          <p>
            Every facility on PLRCT&rsquo;s Ballabgarh campus is built to a working standard, not a
            showcase one — labs, library, and hostel alike are sized and equipped for daily academic use.
          </p>
        </div>
      </section>

      {/* ---- Facility grid ---- */}
      <section className="PLRCT-infra-grid-section">
        <div className="PLRCT-about__inner">
          <Reveal as="div">
            <p className="PLRCT-eyebrow">Twelve Core Facilities</p>
            <h2 className="PLRCT-section-title">Everything a working technical campus needs</h2>
          </Reveal>
          <div className="PLRCT-infra-grid">
            {INFRASTRUCTURE_FACILITIES.map((f, i) => (
              <Reveal as="article" delay={(i % 3) * 90} className="PLRCT-infra-card" key={f.title}>
                <span className="PLRCT-infra-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[f.icon]}
                  </svg>
                </span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Illustrative campus zone map (signature element) ---- */}
      <section className="PLRCT-infra-map-section">
        <div className="PLRCT-about__inner">
          <Reveal as="div">
            <p className="PLRCT-eyebrow">Getting Around</p>
            <h2 className="PLRCT-section-title">An at-a-glance campus map</h2>
            <p className="PLRCT-section-lede">
              A simplified, illustrative layout of the Ballabgarh campus — swap in a to-scale site
              plan once one is available for production.
            </p>
          </Reveal>
          <div className="PLRCT-infra-map">
            <svg viewBox="0 0 100 100" className="PLRCT-infra-map__svg" role="img" aria-label="Illustrative campus zone map">
              <rect x="4" y="4" width="92" height="92" rx="6" fill="none" stroke="var(--PLRCT-hairline)" strokeWidth="0.6" />
              <path d="M10 40 H90 M50 10 V90" stroke="var(--PLRCT-hairline)" strokeWidth="0.5" strokeDasharray="1 2" />
              {ZONES.map((zone) => (
                <g key={zone.label} transform={`translate(${zone.x} ${zone.y})`}>
                  <circle r="3.2" fill="var(--PLRCT-red)" opacity="0.9" />
                  <circle r="6" fill="none" stroke="var(--PLRCT-gold)" strokeWidth="0.4" />
                </g>
              ))}
            </svg>
            <ul className="PLRCT-infra-map__legend">
              {ZONES.map((zone) => (
                <li key={zone.label}>
                  <span className="PLRCT-infra-map__dot" aria-hidden="true" />
                  {zone.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AeoBlock items={[FAQ_FACILITIES, FAQ_WHY_CHOOSE]} />
      <AboutCta />
      
    </main>
  );
}