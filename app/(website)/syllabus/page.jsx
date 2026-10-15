"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/app/admin/syllabus/admin-syllabus.css";

export default function SyllabusPage() {
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/syllabus?published=true");
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load syllabus."
          );
        }

        setSyllabus(
          Array.isArray(result.data) ? result.data : []
        );
      } catch (err) {
        console.error("Syllabus fetch error:", err);
        setError(err.message || "Failed to load syllabus.");
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabus();
  }, []);

  return (
    <main className="syl-admin syllabus-public">
      <header className="syl-admin__header">
        <div>
          <h1 className="syl-admin__title">
            Academic Syllabus
          </h1>
          <p className="syl-admin__subtitle">
            Browse and download the latest academic syllabus
            for your program, department and semester.
          </p>
        </div>
      </header>

      {loading ? (
        <div className="syl-admin__table-wrap">
          <div className="syl-admin__empty">
            Loading syllabus...
          </div>
          {[1, 2, 3].map((item) => (
            <div className="syl-skeleton-row" key={item}>
              <div
                className="syl-skeleton"
                style={{ width: "100%", height: 18 }}
              />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="syl-admin__empty" role="alert">
          <h2>Unable to load syllabus</h2>
          <p>{error}</p>
          <button
            type="button"
            className="syl-admin__add-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : syllabus.length === 0 ? (
        <div className="syl-admin__empty">
          <h2>No Syllabus Available</h2>
          <p>
            Published syllabus documents will appear here
            once they are available.
          </p>
        </div>
      ) : (
        <>
          <div className="syl-public-count">
            {syllabus.length} Published{" "}
            {syllabus.length === 1 ? "Syllabus" : "Syllabi"}
          </div>

          <div className="syl-admin__table-wrap">
            <table className="syl-admin__table">
              <thead>
                <tr>
                  <th>Syllabus</th>
                  <th>Program</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>Academic Year</th>
                  <th>Document</th>
                </tr>
              </thead>

              <tbody>
                {syllabus.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <strong>{item.title}</strong>
                      {item.featured && (
                        <span
                          className="syl-badge syl-badge--featured"
                          style={{ marginLeft: 8 }}
                        >
                          Featured
                        </span>
                      )}
                    </td>

                    <td>
                      <span className="syl-badge syl-badge--program">
                        {item.program || "—"}
                      </span>
                    </td>

                    <td>{item.department || "—"}</td>
                    <td>{item.semester || "—"}</td>
                    <td>{item.academicYear || "—"}</td>

                    <td>
                      {item.pdfUrl ? (
                        <div className="syl-admin__actions">
                          <a
                            className="syl-icon-btn"
                            href={item.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View PDF
                          </a>

                          <a
                            className="syl-icon-btn"
                            href={item.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                          >
                            Download
                          </a>
                        </div>
                      ) : (
                        <span>Document unavailable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="syl-admin__cards">
            {syllabus.map((item) => (
              <article
                className="syl-admin-card"
                key={item._id}
              >
                <div className="syl-admin-card__title">
                  {item.title}
                  {item.featured && (
                    <span
                      className="syl-badge syl-badge--featured"
                      style={{ marginLeft: 8 }}
                    >
                      Featured
                    </span>
                  )}
                </div>

                <div className="syl-admin-card__meta">
                  {item.program || "—"} ·{" "}
                  {item.department || "—"}
                </div>

                <div className="syl-admin-card__meta">
                  Semester: {item.semester || "—"}
                </div>

                <div className="syl-admin-card__meta">
                  Academic Year: {item.academicYear || "—"}
                </div>

                {item.pdfUrl ? (
                  <div className="syl-public-actions">
                    <a
                      className="syl-icon-btn"
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View PDF
                    </a>

                    <a
                      className="syl-icon-btn"
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      Download
                    </a>
                  </div>
                ) : (
                  <p>Document unavailable</p>
                )}
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}