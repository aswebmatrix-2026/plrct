import { notFound } from "next/navigation";
import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import Notice from "@/models/Notice";
import PdfViewer from "@/components/PdfViewer";
import NoticeCard from "@/components/NoticeCard";
import ShareButtons from "@/components/ShareButtons";
import "@/styles/notice-detail.css";
import "@/styles/notice-board.css";

async function findNotice(slug) {
  await dbConnect();

  const notice = await Notice.findOne({
    $or: [
      { slug: slug },
      { id: slug },
    ],
  }).lean();

  return notice
    ? JSON.parse(JSON.stringify(notice))
    : null;
}

async function getNoticeForMetadata(slug) {
  return findNotice(slug);
}

async function getNoticeAndTrackView(slug) {
  await dbConnect();

  await Notice.syncLifecycle();

  const notice = await Notice.findOne({
    $or: [
      { slug: slug },
      { id: slug },
    ],
  });

  if (!notice) {
    return null;
  }

  notice.views = (notice.views || 0) + 1;
  await notice.save();

  const related = await Notice.find({
    _id: { $ne: notice._id },
    category: notice.category,
    status: "Published",
  })
    .sort({ publishDate: -1 })
    .limit(4)
    .lean();

  return {
    notice: JSON.parse(JSON.stringify(notice)),
    related: JSON.parse(JSON.stringify(related)),
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const notice = await getNoticeForMetadata(slug);

  if (!notice) {
    return {
      title: "Notice Not Found | PLRCT",
    };
  }

  return {
    title: `${notice.title} | PLRCT Notice Board`,
    description:
      notice.shortDescription ||
      `Official notice from Pt. L.R. College of Technology, Faridabad.`,

    alternates: {
      canonical: `/notice-board/${notice.slug || notice.id}`,
    },

    openGraph: {
      title: notice.title,
      description:
        notice.shortDescription ||
        `Official notice from Pt. L.R. College of Technology, Faridabad.`,
      type: "article",
      publishedTime: notice.publishDate
        ? new Date(notice.publishDate).toISOString()
        : undefined,
      modifiedTime: notice.updatedAt
        ? new Date(notice.updatedAt).toISOString()
        : undefined,
    },
  };
}

function formatDate(dateStr) {
  if (!dateStr) return "—";

  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function NoticeDetailPage({ params }) {
  const { slug } = await params;

  const data = await getNoticeAndTrackView(slug);

  if (!data) {
    notFound();
  }

  const { notice, related } = data;

  const noticeSlug = notice.slug || notice.id;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: notice.title,
    description: notice.shortDescription,
    datePublished: notice.publishDate,
    dateModified: notice.updatedAt,
    publisher: {
      "@type": "CollegeOrUniversity",
      name: "Pt. L.R. College of Technology (PLRCT), Faridabad",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Notice Board",
        item: "/notice-board",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: notice.title,
        item: `/notice-board/${noticeSlug}`,
      },
    ],
  };

  return (
    <main className="notice-detail">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <nav
        className="detail-breadcrumb"
        aria-label="Breadcrumb"
      >
        <Link href="/">Home</Link>
        {" / "}
        <Link href="/notice-board">Notice Board</Link>
        {" / "}
        {notice.title}
      </nav>

      <header className="detail-header">

        <div className="detail-header__badges">

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

        <h1 className="detail-header__title">
          {notice.title}
        </h1>

        <div className="detail-header__meta">

          <span>
            Published:{" "}
            <strong>
              {formatDate(notice.publishDate)}
            </strong>
          </span>

          <span>
            Last Updated:{" "}
            <strong>
              {formatDate(notice.updatedAt)}
            </strong>
          </span>

          {notice.expiryDate && (
            <span>
              Valid Until:{" "}
              <strong>
                {formatDate(notice.expiryDate)}
              </strong>
            </span>
          )}

          <span>
            Views:{" "}
            <strong>
              {notice.views || 0}
            </strong>
          </span>

        </div>

        <div className="detail-header__actions">

          {notice.pdfUrl && (
            <a
              className="btn btn--primary"
              href={`/api/notices/download/${noticeSlug}`}
            >
              Download PDF
            </a>
          )}

          <ShareButtons
            title={notice.title}
            id={noticeSlug}
          />

        </div>

      </header>

      <div className="detail-content">
        {notice.content}
      </div>

      {notice.pdfUrl && (
        <PdfViewer
          pdfUrl={notice.pdfUrl}
          downloadUrl={`/api/notices/download/${noticeSlug}`}
          title={notice.title}
        />
      )}

      {related.length > 0 && (
        <section className="detail-related">

          <h2 className="detail-related__title">
            Related Notices
          </h2>

          <div className="detail-related__grid">

            {related.map((relatedNotice) => (
              <NoticeCard
                key={relatedNotice._id}
                notice={relatedNotice}
              />
            ))}

          </div>

        </section>
      )}

    </main>
  );
}