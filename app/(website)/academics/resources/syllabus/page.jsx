// app/academics/resources/syllabus/page.jsx
import Link from "next/link";
import SyllabusExplorer from "./SyllabusExplorer";
import "./syllabus.css";

// ASSUMPTION: replace with your actual production domain / existing site-url constant
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.plrct.edu.in";
const PAGE_URL = `${SITE_URL}/academics/resources/syllabus`;

export const metadata = {
  title: "PLRCT Syllabus — B.Tech, Diploma & M.Tech Engineering Syllabus | Pt. L.R. College of Technology",
  description:
    "Download the latest B.Tech, Diploma and M.Tech engineering syllabus from Pt. L.R. College of Technology (PLRCT), Faridabad. Semester-wise syllabus for CSE, EE, ME, CE, ECE, AIML and more.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "PLRCT Academic Syllabus — B.Tech, Diploma & M.Tech Engineering",
    description:
      "Explore and download semester-wise engineering syllabus for all PLRCT programs in Faridabad, Haryana.",
    url: PAGE_URL,
    siteName: "Pt. L.R. College of Technology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PLRCT Academic Syllabus",
    description:
      "Download semester-wise B.Tech, Diploma and M.Tech engineering syllabus from PLRCT, Faridabad.",
  },
};

const FAQ_ITEMS = [
  {
    q: "Where can I find the PLRCT syllabus?",
    a: "The complete PLRCT syllabus for all engineering programs is available on this page. Use the program cards or the search and filter tools below to find the syllabus for your specific department and semester.",
  },
  {
    q: "How can I download the B.Tech syllabus?",
    a: "Select B.Tech Engineering from the program cards or filters, find your department and semester, then click \"Download\" on the syllabus card to save the PDF directly.",
  },
  {
    q: "Does PLRCT provide Diploma Engineering syllabus?",
    a: "Yes. PLRCT publishes semester-wise Diploma Engineering syllabus for all its diploma departments, available for viewing and download on this page.",
  },
  {
    q: "Does PLRCT offer M.Tech syllabus?",
    a: "Yes. Postgraduate M.Tech syllabus documents, including specialisations, are published here and can be filtered by department and semester.",
  },
  {
    q: "How can I view a syllabus PDF?",
    a: "Click \"View PDF\" on any syllabus card to open it in the built-in PDF viewer, where you can scroll and zoom without needing to download the file first.",
  },
  {
    q: "Can I download the syllabus directly?",
    a: "Yes. Every syllabus has a \"Download\" button that saves the PDF directly to your device — no login or extra steps required.",
  },
];

function StructuredData() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Academics", item: `${SITE_URL}/academics` },
      { "@type": "ListItem", position: 3, name: "Syllabus", item: PAGE_URL },
    ],
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Pt. L.R. College of Technology",
    alternateName: "PLRCT",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Faridabad",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

export default function SyllabusPage() {
  return (
    <div className="syllabus-page">
      <StructuredData />

      <nav className="syllabus-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/academics">Academics</Link> /{" "}
        <span aria-current="page">Syllabus</span>
      </nav>

      <section className="syllabus-hero">
        <h1 className="syllabus-hero__heading">Academic Syllabus</h1>
        <p className="syllabus-hero__text">
          Explore the latest syllabus and academic curriculum for B.Tech, Diploma and M.Tech
          engineering programs at Pt. L.R. College of Technology.
        </p>
        <div className="syllabus-hero__image" role="img" aria-label="PLRCT campus and academics illustration">
          Hero image placeholder
        </div>
        <a href="#syllabus-search" className="syllabus-hero__cta">Explore Syllabus</a>
      </section>

      <section className="syllabus-programs" aria-label="Select your program">
        <article className="syllabus-program-card">
          <h3>B.Tech Engineering</h3>
          <p>Explore semester-wise B.Tech engineering syllabus.</p>
          <a href="#syllabus-search" className="syllabus-program-card__btn">View Syllabus</a>
        </article>
        <article className="syllabus-program-card">
          <h3>Diploma Engineering</h3>
          <p>Explore practical and industry-oriented Diploma Engineering syllabus.</p>
          <a href="#syllabus-search" className="syllabus-program-card__btn">View Syllabus</a>
        </article>
        <article className="syllabus-program-card">
          <h3>M.Tech Engineering</h3>
          <p>Explore postgraduate engineering syllabus and specialisations.</p>
          <a href="#syllabus-search" className="syllabus-program-card__btn">View Syllabus</a>
        </article>
      </section>

      <SyllabusExplorer />

      <p className="syllabus-geo-note">
        Students searching for B.Tech and Diploma Engineering syllabus in Faridabad and the Delhi
        NCR region — including nearby areas like Ballabgarh and Greater Faridabad — can access the
        latest academic documents through the PLRCT syllabus portal.
      </p>

      <section className="syllabus-faq" aria-label="Frequently asked questions">
        <h2>Frequently Asked Questions</h2>
        {FAQ_ITEMS.map((item) => (
          <details className="syllabus-faq-item" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}