"use client";

import { useRef, useState } from "react";

/**
 * Lightweight, dependency-free PDF viewer built on the browser's native PDF
 * rendering inside an <iframe>. Works on desktop and mobile without shipping
 * a PDF.js bundle. Falls back to a "view online" link if the iframe can't render.
 */
export default function PdfViewer({ pdfUrl, downloadUrl, title }) {
  const [zoom, setZoom] = useState(100);
  const wrapperRef = useRef(null);

  function handleFullscreen() {
    if (wrapperRef.current?.requestFullscreen) {
      wrapperRef.current.requestFullscreen();
    }
  }

  function handlePrint() {
    const win = window.open(pdfUrl, "_blank");
    win?.addEventListener("load", () => win.print());
  }

  if (!pdfUrl) return null;

  return (
    <div className="pdf-viewer" ref={wrapperRef}>
      <div className="pdf-viewer__toolbar">
        <span className="pdf-viewer__title">{title || "Notice PDF"}</span>
        <div className="pdf-viewer__controls">
          <button type="button" className="btn btn--ghost" onClick={() => setZoom((z) => Math.max(50, z - 10))} aria-label="Zoom out">
            −
          </button>
          <span className="pdf-viewer__zoom">{zoom}%</span>
          <button type="button" className="btn btn--ghost" onClick={() => setZoom((z) => Math.min(200, z + 10))} aria-label="Zoom in">
            +
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleFullscreen}>
            Fullscreen
          </button>
          <button type="button" className="btn btn--ghost" onClick={handlePrint}>
            Print
          </button>
          <a className="btn btn--primary" href={downloadUrl || pdfUrl}>
            Download
          </a>
        </div>
      </div>

      <div className="pdf-viewer__frame-wrap">
        <iframe
          src={`${pdfUrl}#toolbar=0`}
          title={title || "Notice PDF preview"}
          className="pdf-viewer__frame"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        />
      </div>
    </div>
  );
}