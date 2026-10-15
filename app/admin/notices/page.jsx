
import StatCards from "@/components/admin/StatCards";
import NoticeTable from "@/components/admin/NoticeTable";
import "@/styles/notice-dashboard.css";

export const metadata = {
  title: "Notice Management | Pt. L.R. College of Technology Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminNoticesPage() {
  return (
    <main className="notice-dashboard">
      <div className="notice-dashboard__header">
        <div className="notice-dashboard__intro">
          <h1 className="notice-dashboard__title">
            Notice Management
          </h1>

          <p className="notice-dashboard__subtitle">
            Create, publish, and track every notice on the Pt. L.R.
            College of Technology digital notice board.
          </p>
        </div>
      </div>

      <section
        className="notice-dashboard__stats"
        aria-label="Notice statistics"
      >
        <StatCards />
      </section>

      <section
        className="notice-dashboard__content"
        aria-label="Notice management table"
      >
        <NoticeTable />
      </section>
    </main>
  );
}
