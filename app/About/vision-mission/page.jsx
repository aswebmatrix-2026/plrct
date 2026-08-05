import '../../../components/about/AboutShared.css';
import './vision-mission.css';
import { AboutBreadcrumb, AeoBlock, AboutCta, AboutFooterPreview } from '@/components/about/AboutShared';
import Reveal from '@/components/about/Reveal';
import { VISION_STATEMENT, MISSION_CARDS, CORE_VALUES, ROADMAP, FAQ_VISION, SITE } from '@/lib/aboutData';

export const metadata = {
  title: 'Vision & Mission | Pt. L.R. College of Technology, Faridabad',
  description:
    'PLRCT\'s vision and mission — shaping future leaders through quality technical and management education in Faridabad, Delhi NCR, serving Ballabgarh, Palwal, and Greater Faridabad.',
  alternates: { canonical: 'https://ptlrct.com/about/vision-mission' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Vision & Mission — Pt. L.R. College of Technology',
  about: { '@type': 'CollegeOrUniversity', name: SITE.name, slogan: VISION_STATEMENT },
};

export default function VisionMissionPage() {
  return (
    <main className="plrct-about plrct-vm">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <AboutBreadcrumb
        trail={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Vision & Mission' },
        ]}
      />

      <section className="plrct-vm-hero">
        <div className="plrct-vm-hero__inner">
          <p className="plrct-eyebrow" style={{ color: 'var(--plrct-gold-soft)' }}>Vision &amp; Mission</p>
          <h1>Vision &amp; Mission</h1>
          <p>Shaping Future Leaders Through Quality Education</p>
        </div>
      </section>

      {/* ---- Vision manifesto ---- */}
      <section className="plrct-vm-vision">
        <div className="plrct-about__inner">
          <Reveal as="blockquote" className="plrct-vm-vision__block">
            <span className="plrct-vm-vision__mark" aria-hidden="true">&ldquo;</span>
            <p>{VISION_STATEMENT}</p>
          </Reveal>
        </div>
      </section>

      {/* ---- Mission cards ---- */}
      <section className="plrct-vm-mission">
        <div className="plrct-about__inner">
          <Reveal as="div">
            <p className="plrct-eyebrow">How the Vision Becomes Practice</p>
            <h2 className="plrct-section-title">Our mission, in six commitments</h2>
          </Reveal>
          <div className="plrct-vm-mission__grid">
            {MISSION_CARDS.map((card, i) => (
              <Reveal as="article" delay={(i % 3) * 90} className="plrct-vm-mission-card" key={card.title}>
                <span className="plrct-vm-mission-card__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Core values ---- */}
      <section className="plrct-vm-values">
        <div className="plrct-about__inner">
          <Reveal as="div">
            <p className="plrct-eyebrow" style={{ color: 'var(--plrct-gold-soft)' }}>What We Hold To</p>
            <h2 className="plrct-section-title" style={{ color: 'var(--plrct-white)' }}>Core values</h2>
          </Reveal>
          <div className="plrct-vm-values__row">
            {CORE_VALUES.map((v) => (
              <div className="plrct-vm-value" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Roadmap ---- */}
      <section className="plrct-vm-roadmap">
        <div className="plrct-about__inner">
          <Reveal as="div">
            <p className="plrct-eyebrow">Strategic Objectives</p>
            <h2 className="plrct-section-title">Roadmap ahead</h2>
          </Reveal>
          <div className="plrct-vm-roadmap__track">
            {ROADMAP.map((item, i) => (
              <Reveal as="div" delay={i * 80} className="plrct-vm-roadmap__stop" key={item.area}>
                <span className="plrct-vm-roadmap__dot" aria-hidden="true" />
                <h3>{item.area}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AeoBlock items={[FAQ_VISION]} />
      <AboutCta />
      <AboutFooterPreview />
    </main>
  );
}