"use client";

import { useState } from "react";
import Link from "next/link";
import Lightbox from "@/components/gallery/Lightbox";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function GalleryDetailClient({ event }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [copied, setCopied] = useState(false);

  const images = event.images?.length
    ? event.images
    : [{ url: event.coverImage.url, altText: event.eventName, caption: "" }];

  function toggleSelect(index) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: event.eventName, text: event.shortDescription, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadSelected() {
    const toDownload = selected.size ? [...selected] : images.map((_, i) => i);
    toDownload.forEach((i) => {
      const a = document.createElement("a");
      a.href = images[i].url;
      a.download = `${event.slug}-${i + 1}.jpg`;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }

  return (
    <div className="album-detail">
      <div className="album-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.coverImage?.url} alt={event.eventName} className="album-hero-image" />
        <div className="album-hero-overlay" />
        <div className="album-hero-content">
          <Link href="/gallery" className="album-back-link">
            &larr; Back to Gallery
          </Link>
          <span className="badge badge-gold">{event.category}</span>
          <h1>{event.eventName}</h1>
          <div className="album-meta">
            <span>{event.year}</span>
            <span className="dot">&bull;</span>
            <span>{formatDate(event.eventDate)}</span>
            {event.location ? (
              <>
                <span className="dot">&bull;</span>
                <span>{event.location}</span>
              </>
            ) : null}
            <span className="dot">&bull;</span>
            <span>{images.length} Photos</span>
          </div>
        </div>
      </div>

      <div className="album-body">
        <p className="album-description">{event.description || event.shortDescription}</p>

        <div className="album-actions">
          <button className="btn btn-outline" onClick={handleShare}>
            {copied ? "Link Copied!" : "Share Album"}
          </button>
          <button className="btn btn-primary" onClick={downloadSelected}>
            {selected.size ? `Download Selected (${selected.size})` : "Download All"}
          </button>
        </div>

        <div className="album-masonry">
          {images.map((img, index) => (
            <div key={img.publicId || index} className="album-masonry-item">
              <button
                className="album-select-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelect(index);
                }}
                aria-label="Select image"
              >
                {selected.has(index) ? "✓" : ""}
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.altText || event.eventName}
                loading="lazy"
                onClick={() => setLightboxIndex(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  );
}