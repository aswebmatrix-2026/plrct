import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect
 } from "@/lib/mongodb";
import Notice from "@/models/Notice";
import NoticeForm from "@/components/admin/NoticeForm";

export const metadata = {
  title: "Edit Notice | PLRCT Admin",
  robots: { index: false, follow: false },
};

export default async function EditNoticePage({ params }) {
  // middleware.js already blocks unauthenticated requests to this route,
  // this session check is a defense-in-depth guard for the direct DB read below.
  const session = await getServerSession(authOptions);
  if (!session?.user) notFound();

  await dbConnect
();
  const notice = await Notice.findById(params.id).lean();
  if (!notice) notFound();

  return <NoticeForm initialNotice={JSON.parse(JSON.stringify(notice))} noticeId={params.id} />;
}