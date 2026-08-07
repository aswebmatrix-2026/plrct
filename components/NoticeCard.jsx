import Link from "next/link";

function formatDate(dateStr) {
  if (!dateStr) return "—";

  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function NoticeCard({ notice }) {
  if (!notice) return null;

  // Prefer slug.
  // If slug is missing, use id.
  const noticeSlug = notice.slug || notice.id;

  if (!noticeSlug) {
    return null;
  }

  return (
    <article className="notice-card">

      <Link
        href={`/notice-board/${encodeURIComponent(noticeSlug)}`}
        className="notice-card__link"
      >

        <div className="notice-card__top">

          {notice.category && (
            <span className="notice-card__category">
              {notice.category}
            </span>
          )}

          {notice.priority && (
            <span
              className={`notice-card__priority notice-card__priority--${String(
                notice.priority
              ).toLowerCase()}`}
            >
              {notice.priority}
            </span>
          )}

        </div>

        <h3 className="notice-card__title">
          {notice.title}
        </h3>

        {notice.shortDescription && (
          <p className="notice-card__description">
            {notice.shortDescription}
          </p>
        )}

        <div className="notice-card__meta">

          {notice.publishDate && (
            <span>
              {formatDate(notice.publishDate)}
            </span>
          )}

          {typeof notice.views === "number" && (
            <span>
              {notice.views} views
            </span>
          )}

        </div>

        {notice.pdfUrl && (
          <div className="notice-card__pdf">
            📄 PDF Available
          </div>
        )}

      </Link>

    </article>
  );
}