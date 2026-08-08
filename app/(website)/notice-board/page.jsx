import { Suspense } from "react";
import NoticeBoardExplorer from "@/components/NoticeBoardExplorer";
import "@/styles/notice-board.css";

export const metadata = {
  title: "Notice Board",
  description:
    "Official digital notice board of PLRCT, Faridabad. Browse admission notices, examination schedules, academic announcements, placement drives, scholarships, circulars, tenders and recruitment notices.",
  openGraph: {
    title: "PLRCT Notice Board — PLRCT, Faridabad",
    description:
      "Stay updated with the latest admission, examination, academic, placement and scholarship notices from PLRCT.",
    type: "website",
  },
  alternates: { canonical: "/notice-board" },
};

export default function NoticeBoardPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Notice Board", item: "/notice-board" },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="board-hero">
        <h1 className="board-hero__title">Official Digital Notice Board</h1>
        <p className="board-hero__subtitle">
          Stay updated with admission notifications, examination schedules, academic
          announcements, placement drives, scholarships, workshops, and official circulars
          from PLRCT, Faridabad.
        </p>
      </section>

      <Suspense fallback={<div className="board-empty">Loading notices...</div>}>
        <NoticeBoardExplorer scope="published" />
      </Suspense>
    </main>
  );
}