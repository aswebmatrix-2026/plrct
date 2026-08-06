import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions.js";
import { dbConnect } from "@/lib/mongodb.js";
import GalleryEvent from "@/models/GalleryEvent";
import GalleryTable from "./GalleryTable";
import "@/styles/gallery-dashboard.css";

export const metadata = { title: "Gallery Management | PLRCT Admin" };

export default async function AdminGalleryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login?callbackUrl=/admin/gallery");

  await dbConnect();

  const [totalAlbums, featuredAlbums, publishedAlbums, draftAlbums, photoAgg, viewAgg, events] = await Promise.all([
    GalleryEvent.countDocuments({}),
    GalleryEvent.countDocuments({ featured: true }),
    GalleryEvent.countDocuments({ status: "published" }),
    GalleryEvent.countDocuments({ status: "draft" }),
    GalleryEvent.aggregate([{ $project: { count: { $size: "$images" } } }, { $group: { _id: null, total: { $sum: "$count" } } }]),
    GalleryEvent.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
    GalleryEvent.find({}).sort({ createdAt: -1 }).lean({ virtuals: true }),
  ]);

  const stats = [
    { label: "Total Albums", value: totalAlbums },
    { label: "Total Photos", value: photoAgg[0]?.total || 0 },
    { label: "Featured Albums", value: featuredAlbums },
    { label: "Published Albums", value: publishedAlbums },
    { label: "Draft Albums", value: draftAlbums },
    { label: "Total Gallery Views", value: viewAgg[0]?.total || 0 },
  ];

  return (
    <div className="admin-gallery-page">
      <div className="admin-page-header">
        <div>
          <h1>Gallery Management</h1>
          <p>Create and manage PLRCT event albums.</p>
        </div>
        <Link href="/admin/gallery/new" className="btn btn-primary">
          + Create Gallery Event
        </Link>
      </div>

      <div className="admin-stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="admin-stat-card">
            <span className="admin-stat-value">{s.value}</span>
            <span className="admin-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <GalleryTable initialEvents={JSON.parse(JSON.stringify(events))} />
    </div>
  );
}