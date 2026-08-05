import '../../../components/about/AboutShared.css';
import './messages.css';
import { AboutBreadcrumb, AeoBlock, AboutCta, AboutFooterPreview } from '@/components/about/AboutShared';
import Reveal from '@/components/about/Reveal';
import { LEADERSHIP, LEADERSHIP_VALUES, FAQ_LEADERSHIP, SITE } from '@/lib/aboutData';

export const metadata = {
  title: 'Leadership Messages | Chairman, Director & Principal — PLRCT Faridabad',
  description:
    'Read leadership messages from the Chairman, Director, and Principal of Pt. L.R. College of Technology, Ballabgarh, Faridabad — their vision, philosophy, and commitment to students.',
  alternates: { canonical: 'https://ptlrct.com/about/messages' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Leadership Messages — Pt. L.R. College of Technology',
  about: { '@type': 'CollegeOrUniversity', name: SITE.name },
};

export default function MessagesPage() {
  return (
    <main className="plrct-about plrct-messages">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <AboutBreadcrumb
        trail={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Messages' },
        ]}
      />

      <section className="plrct-messages-hero">
        <div className="plrct-messages-hero__inner">
          <p className="plrct-eyebrow">Leadership Messages</p>
          <h1>Guiding the Future of Education</h1>
          <p>Three offices, one accountability chain — strategic direction, institutional execution, and academic governance.</p>
        </div>
      </section>

      {/* ---- Leadership profiles ---- */}
      {LEADERSHIP.map((leader, i) => (
        <section className={`plrct-message-block${i % 2 === 1 ? ' is-reversed' : ''}`} key={leader.role}>
          <div className="plrct-about__inner plrct-message-block__grid">
            <Reveal as="div" className="plrct-message-portrait">
              <div className="plrct-message-portrait__frame" aria-hidden="true">
                <span>{leader.role.slice(0, 2).toUpperCase()}</span>
              </div>
              <p className="plrct-message-portrait__role">{leader.role}</p>
            </Reveal>
            <Reveal as="article" className="plrct-message-content">
              <blockquote>&ldquo;{leader.quote}&rdquo;</blockquote>
              <h2 className="plrct-section-title">{leader.name}</h2>
              <p>{leader.bio}</p>
              <p><strong>Leadership philosophy —</strong> {leader.philosophy}</p>
              <p><strong>Educational commitment —</strong> {leader.commitment}</p>
              <p className="plrct-message-signature">{leader.role}, PLRCT</p>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ---- Leadership values ---- */}
      <section className="plrct-messages-values">
        <div className="plrct-about__inner">
          <Reveal as="div">
            <p className="plrct-eyebrow">What Ties the Three Offices Together</p>
            <h2 className="plrct-section-title">Leadership values</h2>
          </Reveal>
          <div className="plrct-messages-values__grid">
            {LEADERSHIP_VALUES.map((v, i) => (
              <Reveal as="div" delay={i * 90} className="plrct-messages-value" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AeoBlock items={[FAQ_LEADERSHIP]} />
      <AboutCta />
      <AboutFooterPreview />
    </main>
  );
}