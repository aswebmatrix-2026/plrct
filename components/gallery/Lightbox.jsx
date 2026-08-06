"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";

export default function Lightbox({ images, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);
  const touchStartX = useRef(null);

  const goNext = useCallback(() => {
    setZoomed(false);
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setZoomed(false);
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [goNext, goPrev, onClose]);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) goPrev();
    else if (delta < -50) goNext();
    touchStartX.current = null;
  }

  const current = images[index];

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        &times;
      </button>

      <div className="lightbox-counter">
        {index + 1} / {images.length}
      </div>

      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="Previous image"
      >
        &#10094;
      </button>

      <div
        className="lightbox-image-wrap"
        onClick={(e) => {
          e.stopPropagation();
          setZoomed((z) => !z);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={current.url}
          alt={current.altText || "Gallery image"}
          fill
          sizes="100vw"
          className={`lightbox-image ${zoomed ? "zoomed" : ""}`}
          priority
        />
        {current.caption ? <p className="lightbox-caption">{current.caption}</p> : null}
      </div>

      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="Next image"
      >
        &#10095;
      </button>

      <a
        className="lightbox-download"
        href={current.url}
        download
        onClick={(e) => e.stopPropagation()}
      >
        Download
      </a>
    </div>
  );
}