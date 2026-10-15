"use client";

import { useState } from "react";
import Link from "next/link";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function GalleryTable({ initialEvents }) {
  const [events, setEvents] = useState(initialEvents);
  const [busySlug, setBusySlug] = useState(null);

  async function runAction(slug, action) {
    setBusySlug(slug);
    try {
      const res = await fetch(`/api/gallery/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      if (action === "duplicate") {
        setEvents((prev) => [data.event, ...prev]);
      } else {
        setEvents((prev) => prev.map((e) => (e.slug === slug ? { ...e, ...data.event } : e)));
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setBusySlug(null);
    }
  }

  async function handleDelete(slug) {
    if (!confirm("Delete this album permanently? This also removes its images from Cloudinary.")) return;
    setBusySlug(slug);
    try {
      const res = await fetch(`/api/gallery/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setEvents((prev) => prev.filter((e) => e.slug !== slug));
    } catch (err) {
      alert(err.message);
    } finally {
      setBusySlug(null);
    }
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Year</th>
            <th>Category</th>
            <th>Photos</th>
            <th>Status</th>
            <th>Featured</th>
            <th>Date</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id} className={busySlug === event.slug ? "row-busy" : ""}>
              <td className="cell-title">{event.eventName}</td>
              <td>{event.year}</td>
              <td>{event.category}</td>
              <td>{event.images?.length || 0}</td>
              <td>
                <span className={`status-pill status-${event.status}`}>{event.status}</span>
              </td>
              <td>{event.featured ? "★" : "—"}</td>
              <td>{formatDate(event.eventDate)}</td>
              <td>{event.views}</td>
              <td className="cell-actions">
                <Link href={`/gallery/${event.slug}`} target="_blank" title="View">
                  View
                </Link>
                <Link href={`/admin/gallery/edit/${event._id}`} title="Edit">
                  Edit
                </Link>
                {event.status === "published" ? (
                  <button onClick={() => runAction(event.slug, "unpublish")}>Unpublish</button>
                ) : (
                  <button onClick={() => runAction(event.slug, "publish")}>Publish</button>
                )}
                <button onClick={() => runAction(event.slug, event.featured ? "unfeature" : "feature")}>
                  {event.featured ? "Unfeature" : "Feature"}
                </button>
                <button onClick={() => runAction(event.slug, "duplicate")}>Duplicate</button>
                <button onClick={() => runAction(event.slug, "archive")}>Archive</button>
                <button className="danger" onClick={() => handleDelete(event.slug)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {events.length === 0 && (
            <tr>
              <td colSpan={9} className="empty-row">
                No albums yet. Click "Create Gallery Event" to add the first one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}