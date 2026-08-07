import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import AlbumForm from "@/components/gallery/AlbumForm";
import "@/styles/gallery-dashboard.css";

export const metadata = { title: "Create Gallery Event | PLRCT Admin" };

export default async function NewGalleryEventPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/gallery/new");

  return (
    <div className="admin-gallery-page">
      <div className="admin-page-header">
        <div>
          <h1>Create Gallery Event</h1>
          <p>Add a new album — it will appear on the public Gallery page once published.</p>
        </div>
      </div>
      <AlbumForm mode="create" />
    </div>
  );
}