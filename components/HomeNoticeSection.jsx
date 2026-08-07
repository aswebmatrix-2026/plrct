import Link from "next/link";
import { dbConnect
 } from "@/lib/mongodb";
import Notice from "@/models/Notice";
import NoticeCard from "@/components/NoticeCard";
import "@/styles/notice-board.css";

// Server component — runs at request time so the homepage always shows the
// true latest 6 notices without a client-side fetch waterfall.
export default async function HomeNoticeSection() {
  await dbConnect
();
  await Notice.syncLifecycle();

  const notices = await Notice.find({ status: "Published", showOnHomepage: true })
    .sort({ pinned: -1, publishDate: -1 })
    .limit(6)
    .lean();

  if (notices.length === 0) return null;

  return (
    <section className="home-notices">
      <div className="home-notices__inner">
        <div className="section-heading">
          <div className="section-heading__eyebrow">PLRCT Notice Board</div>
          <h2 className="section-heading__title">Latest Announcements</h2>
        </div>

        <div className="home-notices__grid">
          {notices.map((notice) => (
            <NoticeCard key={notice._id.toString()} notice={JSON.parse(JSON.stringify(notice))} />
          ))}
        </div>

        <div className="home-notices__footer">
          <Link href="/notice-board" className="btn btn--primary">
            View All Notices
          </Link>
        </div>
      </div>
    </section>
  );
}