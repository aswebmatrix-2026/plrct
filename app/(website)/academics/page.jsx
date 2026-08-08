import AcademicsClient from './AcademicsClient';
import { FAQS, DEPARTMENTS } from './data';

/* -------------------------------------------------------------------------
 * SEO metadata (Next.js App Router)
 * ---------------------------------------------------------------------- */
export const metadata = {
  title: 'Engineering Courses in Faridabad | B.Tech, Diploma & M.Tech — PLRCT',
  description:
    'Explore AICTE-approved B.Tech, Diploma Engineering and M.Tech programs at PLRCT, Faridabad. Computer Science, Electrical, Mechanical, Civil & ECE departments with advanced labs, research opportunities and placement support.',
  keywords: [
    'Best Engineering College in Faridabad',
    'B.Tech Admission Faridabad',
    'Diploma Engineering College Faridabad',
    'M.Tech Admission Faridabad',
    'Computer Science Engineering Faridabad',
    'Electrical Engineering College Haryana',
    'Civil Engineering College Faridabad',
    'Mechanical Engineering College Faridabad',
    'AICTE Approved Engineering College Haryana',
    'Engineering College Near Delhi NCR',
  ],
  alternates: { canonical: 'https://ptlrct.com/academics' },
  openGraph: {
    title: 'Engineering & Technical Education Programs — PLRCT, Faridabad',
    description:
      'AICTE-approved B.Tech, Diploma and M.Tech engineering programs in Faridabad, Haryana, with advanced laboratories, experienced faculty and placement support.',
    url: 'https://ptlrct.com/academics',
    siteName: 'PLRCT',
    locale: 'en_IN',
    type: 'website',
  },
};

/* -------------------------------------------------------------------------
 * JSON-LD structured data — Course list + FAQPage (AEO/GEO support)
 * ---------------------------------------------------------------------- */
function StructuredData() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'Course', name: 'B.Tech Engineering', provider: { '@type': 'CollegeOrUniversity', name: 'PLRCT', address: 'Faridabad, Haryana, India' } },
      { '@type': 'Course', name: 'Diploma Engineering', provider: { '@type': 'CollegeOrUniversity', name: 'PLRCT', address: 'Faridabad, Haryana, India' } },
      { '@type': 'Course', name: 'M.Tech Engineering', provider: { '@type': 'CollegeOrUniversity', name: 'PLRCT', address: 'Faridabad, Haryana, India' } },
      ...DEPARTMENTS.map((d) => ({
        '@type': 'Course',
        name: `B.Tech ${d.name}`,
        provider: { '@type': 'CollegeOrUniversity', name: 'PLRCT', address: 'Faridabad, Haryana, India' },
      })),
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ptlrct.com/' },
      { '@type': 'ListItem', position: 2, name: 'Academics & Courses', item: 'https://ptlrct.com/academics' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

export default function AcademicsPage() {
  return (
    <>
      <StructuredData />
      <AcademicsClient />
    </>
  );
}