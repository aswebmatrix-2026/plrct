import Link from "next/link";
import Image from "next/image";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function GalleryCard({ event }) {
  const photoCount = event.photoCount ?? event.images?.length ?? 0;

  return (
    <Link href={`/gallery/${event.slug}`} className="gallery-card">
      <div className="gallery-card-image-wrap">
        <Image
          src={event.coverImage?.url}
          alt={event.eventName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="gallery-card-image"
        />
        <div className="gallery-card-overlay">
          <span className="gallery-card-view-btn">View Album</span>
        </div>
        <span className="gallery-card-badge">{event.category}</span>
      </div>
      <div className="gallery-card-body">
        <div className="gallery-card-meta">
          <span>{event.year}</span>
          <span className="dot">&bull;</span>
          <span>{photoCount} Photos</span>
        </div>
        <h3 className="gallery-card-title">{event.eventName}</h3>
        <p className="gallery-card-date">{formatDate(event.eventDate)}</p>
      </div>
    </Link>
  );
}