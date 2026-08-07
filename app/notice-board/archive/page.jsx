import { dbConnect
 } from "@/lib/mongodb";
import Notice from "@/models/Notice";
import NoticeCard from "@/components/NoticeCard";
import "@/styles/notice-board.css";

export const metadata = {
  title: "Notice Archive",
  description: "Browse past and expired notices from PLRCT, Faridabad, organized by year, month and category.",
  alternates: { canonical: "/notice-board/archive" },
};

function groupNotices(notices) {
  const byYear = {};
  for (const notice of notices) {
    const date = new Date(notice.publishDate);
    const year = date.getFullYear();
    const month = date.toLocaleDateString("en-IN", { month: "long" });
    byYear[year] ??= {};
    byYear[year][month] ??= [];
    byYear[year][month].push(notice);
  }
  return byYear;
}

export default async function ArchivePage() {
  await dbConnect
();
  await Notice.syncLifecycle();

  const notices = await Notice.find({ status: "Archived" })
    .sort({ publishDate: -1 })
    .lean();

  const grouped = groupNotices(JSON.parse(JSON.stringify(notices)));
  const years = Object.keys(grouped).sort((a, b) => b - a);

  return (
    <main>
      <section className="board-hero">
        <h1 className="board-hero__title">Notice Archive</h1>
        <p className="board-hero__subtitle">
          Past notices from PLRCT, organized by year, month and category. Expired notices move
          here automatically once their validity period ends.
        </p>
      </section>

      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-lg) var(--space-md) var(--space-2xl)" }}>
        {years.length === 0 && <div className="board-empty">No archived notices yet.</div>}

        {years.map((year) => (
          <div key={year} style={{ marginBottom: "var(--space-xl)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "var(--space-md)" }}>{year}</h2>
            {Object.keys(grouped[year]).map((month) => (
              <div key={month} style={{ marginBottom: "var(--space-lg)" }}>
                <h3 style={{ fontFamily: "var(--font-utility)", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--plrct-gray-500)", marginBottom: "var(--space-sm)" }}>
                  {month}
                </h3>
                <div className="board-results__grid">
                  {grouped[year][month].map((notice) => (
                    <NoticeCard key={notice._id} notice={notice} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}