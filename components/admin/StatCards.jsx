"use client";

import { useEffect, useState } from "react";

export default function StatCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data.totals))
      .catch(() => setStats(null));
  }, []);

  const cards = [
    { label: "Total Notices", value: stats?.totalNotices, accent: false },
    { label: "Published", value: stats?.publishedNotices, accent: false },
    { label: "Drafts", value: stats?.draftNotices, accent: false },
    { label: "Urgent", value: stats?.urgentNotices, accent: true },
    { label: "Expired / Archived", value: stats?.expiredNotices, accent: false },
    { label: "PDF Downloads", value: stats?.totalDownloads, accent: false },
    { label: "Notice Views", value: stats?.totalViews, accent: false },
  ];

  return (
    <div className="stat-grid">
      {cards.map((c) => (
        <div key={c.label} className={`stat-card${c.accent ? " stat-card--accent" : ""}`}>
          <div className="stat-card__label">{c.label}</div>
          <div className="stat-card__value">{stats ? c.value ?? 0 : "—"}</div>
        </div>
      ))}
    </div>
  );
}