import Link from 'next/link';
import { SITE } from '@/lib/aboutData';

/* -----------------------------------------------------------------------
 * Breadcrumb — visible trail + BreadcrumbList JSON-LD in one place, so
 * every About page gets identical schema without hand-rolling it per file.
 * Rendered server-side only (no client state), so there's no hydration
 * mismatch risk with the raw <script> tag.
 * -------------------------------------------------------------------- */
export function AboutBreadcrumb({ trail }) {
  // trail: [{ label, href }] — last item has no href (current page)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://ptlrct.com${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="plrct-about-crumb">
      <ol>
        {trail.map((item, i) => (
          <li key={item.label}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            {i < trail.length - 1 && <span aria-hidden="true"> / </span>}
          </li>
        ))}
      </ol>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

/* -----------------------------------------------------------------------
 * AEO answer block — renders a visible Q&A plus matching FAQPage schema
 * for the specific questions passed in, so pages only mark up the
 * answers actually relevant to them.
 * -------------------------------------------------------------------- */
export function AeoBlock({ items, heading = 'Quick Answers' }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <section className="plrct-about-aeo" aria-label={heading}>
      <p className="plrct-about-aeo__eyebrow">{heading}</p>
      <div className="plrct-about-aeo__grid">
        {items.map((item) => (
          <div className="plrct-about-aeo__item" key={item.q}>
            <p className="plrct-about-aeo__q">{item.q}</p>
            <p className="plrct-about-aeo__a">{item.a}</p>
          </div>
        ))}
      </div>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

/* -----------------------------------------------------------------------
 * CTA band — identical closing section across all five pages, per brief.
 * -------------------------------------------------------------------- */
export function AboutCta() {
  return (
    <section className="plrct-about-cta">
      <div className="plrct-about-cta__inner">
        <h2>Begin Your Academic Journey with PLRCT</h2>
        <p>Admissions for the upcoming session are open across B.Tech, Diploma, BCA, BBA, MBA, and Pharmacy programs.</p>
        <div className="plrct-about-cta__actions">
          <Link href="/apply" className="plrct-btn plrct-btn--primary">Apply Now</Link>
          <Link href="/admissions/prospectus" className="plrct-btn plrct-btn--secondary">Download Brochure</Link>
          <Link href="/contact" className="plrct-btn plrct-btn--ghost">Contact Admissions</Link>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
 * Footer preview — lightweight institutional footer strip shown beneath
 * the CTA on every About page, consistent with the rest of the site.
 * -------------------------------------------------------------------- */
export function AboutFooterPreview() {
  return (
    <footer className="plrct-about-footer">
      <div className="plrct-about-footer__inner">
        <div>
          <p className="plrct-about-footer__name">{SITE.name}</p>
          <p>{SITE.locality}, {SITE.city}, {SITE.region} — {SITE.metro}</p>
        </div>
        <nav aria-label="About section links" className="plrct-about-footer__links">
          <Link href="/about/overview">Overview</Link>
          <Link href="/about/infrastructure">Infrastructure</Link>
          <Link href="/about/messages">Messages</Link>
          <Link href="/about/affiliations">Affiliations</Link>
          <Link href="/about/vision-mission">Vision &amp; Mission</Link>
        </nav>
        <div className="plrct-about-footer__contact">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`}>{SITE.phone}</a>
        </div>
      </div>
    </footer>
  );
}