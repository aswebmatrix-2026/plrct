import Link from "next/link";
import GalleryCard from "./GalleryCard";
import { getHomepageEvents, getFeaturedEvent } from "@/lib/galleryData";

export default async function LatestGallerySection() {
  const [events, featured] = await Promise.all([getHomepageEvents(6), getFeaturedEvent()]);

  if (!events.length && !featured) return null;

  return (
    <section className="home-gallery-section">
      <div className="home-gallery-header">
        <div>
          <span className="section-kicker">Campus Moments</span>
          <h2>Latest Gallery</h2>
        </div>
        <Link href="/gallery" className="btn btn-outline">
          View All Gallery
        </Link>
      </div>

      {featured && (
        <Link href={`/gallery/${featured.slug}`} className="home-featured-strip">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featured.coverImage?.url} alt={featured.eventName} />
          <div className="home-featured-strip-info">
            <span className="badge badge-gold">Featured</span>
            <h3>{featured.eventName}</h3>
            <p>{featured.shortDescription}</p>
          </div>
        </Link>
      )}

      <div className="home-gallery-grid">
        {events.map((event) => (
          <GalleryCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
}