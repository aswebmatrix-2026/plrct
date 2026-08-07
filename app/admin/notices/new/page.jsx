import NoticeForm from "@/components/admin/NoticeForm";

export const metadata = {
  title: "Create Notice | PLRCT Admin",
  robots: { index: false, follow: false },
};

export default function NewNoticePage() {
  return <NoticeForm />;
}