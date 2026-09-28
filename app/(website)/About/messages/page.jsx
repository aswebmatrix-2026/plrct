import '../../../../components/about/AboutShared.css';
import './messages.css';
import { AboutBreadcrumb, AeoBlock, AboutCta, AboutFooterPreview } from '@/components/about/AboutShared';
import Reveal from '@/components/about/Reveal';
import { LEADERSHIP, LEADERSHIP_VALUES, FAQ_LEADERSHIP, SITE } from '@/lib/aboutData';

export const metadata = {
  title: 'Leadership Messages | Chairman, Director & Principal — Pt. L.R. College of Technology, Faridabad',
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

export default function messages() {
  return (
    <main className="pt-about ptlrct-messages">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <AboutBreadcrumb
        trail={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Messages' },
        ]}
      />

      <section className="ptlrct-messages-hero">
        <div className="ptlrct-messages-hero__inner">
          <p className="ptlrct-eyebrow">Leadership Messages</p>
          <h1>Guiding the Future of Education</h1>
          <p>Three offices, one accountability chain — strategic direction, institutional execution, and academic governance.</p>
        </div>
      </section>

      {/* ---- Leadership profiles ---- */}
      {LEADERSHIP.map((leader, i) => (
        <section className={`ptlrct-message-block${i % 2 === 1 ? ' is-reversed' : ''}`} key={leader.role}>
          <div className="ptlrct-about__inner ptlrct-message-block__grid">
            <Reveal as="div" className="ptlrct-message-portrait">
              <div className="ptlrct-message-portrait__frame" aria-hidden="true">
                <span>{leader.role.slice(0, 2).toUpperCase()}</span>
              </div>
              <p className="ptlrct-message-portrait__role">{leader.role}</p>
            </Reveal>
            <Reveal as="article" className="ptlrct-message-content">
              <blockquote>&ldquo;{leader.quote}&rdquo;</blockquote>
              <h2 className="ptlrct-section-title">{leader.name}</h2>
              <p>{leader.bio}</p>
              <p><strong>Leadership philosophy —</strong> {leader.philosophy}</p>
              <p><strong>Educational commitment —</strong> {leader.commitment}</p>
              <p className="ptlrct-message-signature">{leader.role}, Pt. L.R. College of Technology</p>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ---- Leadership values ---- */}
      <section className="ptlrct-messages-values">
        <div className="ptlrct-about__inner">
          <Reveal as="div">
            <p className="ptlrct-eyebrow">What Ties the Three Offices Together</p>
            <h2 className="ptlrct-section-title">Leadership values</h2>
          </Reveal>
          <div className="ptlrct-messages-values__grid">
            {LEADERSHIP_VALUES.map((v, i) => (
              <Reveal as="div" delay={i * 90} className="ptlrct-messages-value" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AeoBlock items={[FAQ_LEADERSHIP]} />
      <AboutCta />
      
    </main>
  );
}