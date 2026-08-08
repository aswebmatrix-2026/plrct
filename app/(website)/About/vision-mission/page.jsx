import '../../../../components/about/AboutShared.css';
import './vision-mission.css';
import { AboutBreadcrumb, AeoBlock, AboutCta, AboutFooterPreview } from '@/components/about/AboutShared';
import Reveal from '@/components/about/Reveal';
import { VISION_STATEMENT, MISSION_CARDS, CORE_VALUES, ROADMAP, FAQ_VISION, SITE } from '@/lib/aboutData';

export const metadata = {
  title: 'Vision & Mission | PLRCT, Faridabad',
  description:
    'PLRCT\'s vision and mission — shaping future leaders through quality technical and management education in Faridabad, Delhi NCR, serving Ballabgarh, Palwal, and Greater Faridabad.',
  alternates: { canonical: 'https://ptlrct.com/about/vision-mission' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Vision & Mission — PLRCT',
  about: { '@type': 'CollegeOrUniversity', name: SITE.name, slogan: VISION_STATEMENT },
};

export default function VisionMissionPage() {
  return (
    <main className="PLRCT-about PLRCT-vm">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <AboutBreadcrumb
        trail={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Vision & Mission' },
        ]}
      />

      <section className="PLRCT-vm-hero">
        <div className="PLRCT-vm-hero__inner">
          <p className="PLRCT-eyebrow" style={{ color: 'var(--PLRCT-gold-soft)' }}>Vision &amp; Mission</p>
          <h1>Vision &amp; Mission</h1>
          <p>Shaping Future Leaders Through Quality Education</p>
        </div>
      </section>

      {/* ---- Vision manifesto ---- */}
      <section className="PLRCT-vm-vision">
        <div className="PLRCT-about__inner">
          <Reveal as="blockquote" className="PLRCT-vm-vision__block">
            <span className="PLRCT-vm-vision__mark" aria-hidden="true">&ldquo;</span>
            <p>{VISION_STATEMENT}</p>
          </Reveal>
        </div>
      </section>

      {/* ---- Mission cards ---- */}
      <section className="PLRCT-vm-mission">
        <div className="PLRCT-about__inner">
          <Reveal as="div">
            <p className="PLRCT-eyebrow">How the Vision Becomes Practice</p>
            <h2 className="PLRCT-section-title">Our mission, in six commitments</h2>
          </Reveal>
          <div className="PLRCT-vm-mission__grid">
            {MISSION_CARDS.map((card, i) => (
              <Reveal as="article" delay={(i % 3) * 90} className="PLRCT-vm-mission-card" key={card.title}>
                <span className="PLRCT-vm-mission-card__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Core values ---- */}
      <section className="PLRCT-vm-values">
        <div className="PLRCT-about__inner">
          <Reveal as="div">
            <p className="PLRCT-eyebrow" style={{ color: 'var(--PLRCT-gold-soft)' }}>What We Hold To</p>
            <h2 className="PLRCT-section-title" style={{ color: 'var(--PLRCT-white)' }}>Core values</h2>
          </Reveal>
          <div className="PLRCT-vm-values__row">
            {CORE_VALUES.map((v) => (
              <div className="PLRCT-vm-value" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Roadmap ---- */}
      <section className="PLRCT-vm-roadmap">
        <div className="PLRCT-about__inner">
          <Reveal as="div">
            <p className="PLRCT-eyebrow">Strategic Objectives</p>
            <h2 className="PLRCT-section-title">Roadmap ahead</h2>
          </Reveal>
          <div className="PLRCT-vm-roadmap__track">
            {ROADMAP.map((item, i) => (
              <Reveal as="div" delay={i * 80} className="PLRCT-vm-roadmap__stop" key={item.area}>
                <span className="PLRCT-vm-roadmap__dot" aria-hidden="true" />
                <h3>{item.area}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AeoBlock items={[FAQ_VISION]} />
      <AboutCta />
      
    </main>
  );
}