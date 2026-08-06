import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import GalleryEvent from "@/models/GalleryEvent";
import AlbumForm from "@/components/gallery/AlbumForm";
import "@/styles/gallery-dashboard.css";

export const metadata = { title: "Edit Gallery Event | PLRCT Admin" };

export default async function EditGalleryEventPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(`/admin/login?callbackUrl=/admin/gallery/edit/${params.id}`);

  await dbConnect();
  const event = await GalleryEvent.findById(params.id).lean({ virtuals: true });
  if (!event) notFound();

  return (
    <div className="admin-gallery-page">
      <div className="admin-page-header">
        <div>
          <h1>Edit Gallery Event</h1>
          <p>Update album details, images, or publish status.</p>
        </div>
      </div>
      <AlbumForm mode="edit" initialEvent={JSON.parse(JSON.stringify(event))} />
    </div>
  );
}