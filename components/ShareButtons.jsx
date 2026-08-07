"use client";

import { useState } from "react";

export default function ShareButtons({ title, id }) {
  const [copied, setCopied] = useState(false);

  function getUrl() {
    return typeof window !== "undefined" ? `${window.location.origin}/notice-board/${id}` : "";
  }

  async function handleShare() {
    const url = getUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled — no action needed
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <>
      <button type="button" className="btn btn--ghost" onClick={handleShare}>
        {copied ? "Link Copied" : "Share Notice"}
      </button>
      <button type="button" className="btn btn--ghost" onClick={handlePrint}>
        Print Notice
      </button>
    </>
  );
}