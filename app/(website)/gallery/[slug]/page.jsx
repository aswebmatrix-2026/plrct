import { notFound } from "next/navigation";
import GalleryDetailClient from "./GalleryDetailClient";
import { getEventBySlug } from "@/lib/galleryData";
import "@/styles/gallery-detail.css";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Album Not Found | PLRCT Gallery" };

  return {
    title: event.metaTitle || `${event.eventName} | PLRCT Gallery`,
    description: event.metaDescription || event.shortDescription,
    openGraph: {
      title: event.eventName,
      description: event.shortDescription,
      images: event.coverImage?.url ? [event.coverImage.url] : [],
      type: "article",
    },
  };
}

export default async function GalleryDetailPage({ params }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: event.eventName,
    description: event.shortDescription,
    image: [event.coverImage?.url, ...event.images.map((i) => i.url)].filter(Boolean),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Gallery", item: "/gallery" },
      { "@type": "ListItem", position: 3, name: event.eventName, item: `/gallery/${event.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GalleryDetailClient event={event} />
    </>
  );
}