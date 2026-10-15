"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "@/styles/ticker.css";

const CATEGORY_LABEL = {
  Admission: "Admission",
  Examination: "Examination",
  Academic: "Academic",
  Placement: "Placement",
  Scholarship: "Scholarship",
  Circular: "Circular",
  Tender: "Tender",
  Recruitment: "Recruitment",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function NoticeTicker() {
  const [notices, setNotices] = useState([]);

  async function loadNotices() {
    try {
      const res = await fetch("/api/notices?ticker=true&sort=latest", { cache: "no-store" });
      const data = await res.json();
      setNotices(data.notices || []);
    } catch (err) {
      console.error("Failed to load ticker notices:", err);
    }
  }

  useEffect(() => {
    loadNotices();
    // Auto-refresh every minute so newly published/urgent notices appear
    // without requiring a page reload.
    const interval = setInterval(loadNotices, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Duplicate the list once so the CSS marquee (translateX(-50%)) loops seamlessly.
  const loopItems = useMemo(() => [...notices, ...notices], [notices]);

  // Slower scroll for longer lists so reading speed stays comfortable.
  const duration = Math.max(24, notices.length * 4.5);

  if (notices.length === 0) return null;

  return (
    <div className="ticker" role="region" aria-label="Latest notices">
      <div className="ticker__badge">
        <span className="ticker__badge-dot" aria-hidden="true" />
        Latest Notices
      </div>
      <div className="ticker__viewport">
        <div className="ticker__track" style={{ "--ticker-duration": `${duration}s` }}>
          {loopItems.map((notice, idx) => (
            <Link
              key={`${notice._id}-${idx}`}
              href={`/notice-board/${notice.id}`}
              className={`ticker__item${notice.priority === "Urgent" ? " ticker__item--urgent" : ""}`}
            >
              {notice.pdfUrl && (
                <svg className="ticker__item-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M15 2v5h5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              )}
              <span className="ticker__item-title">{notice.title}</span>
              <span className="ticker__item-category">{CATEGORY_LABEL[notice.category] || notice.category}</span>
              <span className="ticker__item-meta">{formatDate(notice.publishDate)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}