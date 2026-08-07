import StatCards from "@/components/admin/StatCards";
import NoticeTable from "@/components/admin/NoticeTable";
import "@/styles/notice-dashboard.css";

export const metadata = {
  title: "Notice Management | PLRCT Admin",
  robots: { index: false, follow: false },
};

export default function AdminNoticesPage() {
  return (
    <main className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Notice Management</h1>
          <p className="dashboard__subtitle">Create, publish, and track every notice on the PLRCT digital notice board.</p>
        </div>
      </div>

      <StatCards />
      <NoticeTable />
    </main>
  );
}