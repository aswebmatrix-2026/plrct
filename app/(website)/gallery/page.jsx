import Link from "next/link";
import { Suspense } from "react";
import GalleryCard from "@/components/gallery/GalleryCard";
import FilterBar from "@/components/gallery/FilterBar";
import { GALLERY_CATEGORIES_CLIENT } from "@/lib/constants";
import { getPublishedEvents, getFeaturedEvent, getDistinctYears } from "@/lib/galleryData";
import "@/styles/gallery.css";

export const metadata = {
  title: "PLRCT Digital Gallery | PLRCT, Faridabad",
  description:
    "Explore campus life, academic events, laboratories, workshops, industrial visits, placements, cultural activities, sports, and memorable moments at PLRCT, Faridabad. Engineering College Gallery Faridabad, Campus Photos Haryana.",
  openGraph: {
    title: "PLRCT Digital Gallery",
    description: "Explore campus life and events at PLRCT, Faridabad.",
    type: "website",
  },
};

export default async function GalleryPage({ searchParams }) {
  const { category, year, q, sort } = (await searchParams) || {};

  const [events, featured, years] = await Promise.all([
    getPublishedEvents({ category, year, q, sort }),
    getFeaturedEvent(),
    getDistinctYears(),
  ]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Gallery", item: "/gallery" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="gallery-hero">
        <div className="gallery-hero-overlay" />
        <div className="gallery-hero-content">
          <span className="section-kicker light">PLRCT</span>
          <h1>PLRCT Digital Gallery</h1>
          <p>
            Explore campus life, academic events, laboratories, workshops, industrial visits, placements,
            cultural activities, sports, and memorable moments at PLRCT.
          </p>
          <div className="gallery-hero-actions">
            <a href="#latest" className="btn btn-primary">
              Latest Events
            </a>
            <a href="#albums" className="btn btn-ghost">
              Explore Gallery
            </a>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      {featured && (
        <section id="latest" className="featured-event">
          <div className="featured-event-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.coverImage?.url} alt={featured.eventName} />
          </div>
          <div className="featured-event-info">
            <span className="badge badge-gold">Featured Album</span>
            <h2>{featured.eventName}</h2>
            <div className="featured-event-meta">
              <span>{featured.year}</span>
              <span className="dot">&bull;</span>
              <span>{featured.category}</span>
              <span className="dot">&bull;</span>
              <span>{featured.photoCount} Photos</span>
            </div>
            <p>{featured.shortDescription}</p>
            <Link href={`/gallery/${featured.slug}`} className="btn btn-primary">
              View Album
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="gallery-categories">
        <h2 className="section-title">Browse by Category</h2>
        <div className="category-grid">
          {GALLERY_CATEGORIES_CLIENT.map((cat) => (
            <Link key={cat} href={`/gallery?category=${encodeURIComponent(cat)}`} className="category-card">
              <span>{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Album Grid */}
      <section id="albums" className="gallery-albums">
        <h2 className="section-title">Event Albums</h2>

        <Suspense>
          <FilterBar years={years} />
        </Suspense>

        {events.length === 0 ? (
          <p className="gallery-empty">No albums found for these filters yet. Please check back soon.</p>
        ) : (
          <div className="gallery-grid">
            {events.map((event) => (
              <GalleryCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}