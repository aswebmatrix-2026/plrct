"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";

/* Which notices from your existing notice system appear on this page.
   They are matched against the `category` field returned by /api/notices.
   If your exam notices are filed under another category name, add it here. */
const INCLUDE_CATEGORIES = ["Examination"];

const STATUS_LABELS = {
  tba: "To be announced",
  confirm: "Requires administrative confirmation",
  awaiting: "Awaiting official notice",
  info: "General guidance",
  official: "Official notice",
  urgent: "Urgent",
};

/** Status label. Pass `children` to override the default text. */
export function StatusLabel({ type = "tba", onDark = false, children }) {
  return (
    <span
      className={`ec-status ec-status--${type}${onDark ? " ec-status--on-dark" : ""}`}
    >
      <span className="ec-status__dot" aria-hidden="true" />
      {children ?? STATUS_LABELS[type]}
    </span>
  );
}

/* ---------- helpers ---------- */

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (!dateStr || Number.isNaN(d.getTime())) return "Date not specified";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* Filter-chip group. Uses `subCategory` from the backend if it exists,
   otherwise guesses from keywords in the notice title. */
function classify(notice) {
  if (notice.subCategory) return notice.subCategory;
  const t = `${notice.title || ""}`.toLowerCase();
  if (/(re-?evaluation|revaluation|re-?check|rechecking|scrutiny)/.test(t))
    return "Re-evaluation";
  if (/(result|declared|marksheet)/.test(t)) return "Results";
  if (/(date ?sheet|time ?table|schedule|admit card|roll no)/.test(t))
    return "Schedule & Admit Card";
  if (/(internal|practical|viva|sessional|class test)/.test(t))
    return "Internal & Practical";
  if (/(form|registration|enrol|fee|backlog|re-?appear)/.test(t)) return "Forms";
  return "General";
}

function normalize(raw) {
  return {
    key: raw._id || raw.id,
    id: raw.id || raw._id,
    title: raw.title,
    summary: raw.summary || raw.description || "",
    group: classify(raw),
    date: formatDate(raw.publishDate),
    rawDate: raw.publishDate,
    urgent: raw.priority === "Urgent",
    pdfUrl: raw.pdfUrl || null,
  };
}

/* ---------- single notice ---------- */

function NoticeItem({ notice }) {
  const { title, summary, group, date, urgent, pdfUrl, id } = notice;

  return (
    <li className="ec-notice">
      <div className="ec-notice__meta">
        <span className="ec-notice__label">Date</span>
        <span className="ec-notice__date">{date}</span>
        <span className="ec-notice__category">{group}</span>
      </div>

      <div className="ec-notice__body">
        <h3>{title}</h3>
        {summary ? <p>{summary}</p> : null}

        <div className="ec-notice__foot">
          <StatusLabel type={urgent ? "urgent" : "official"} />
          <span className="ec-notice__actions">
            <Link className="ec-text-link" href={`/notice-board/${id}`}>
              Read notice
              <span className="ec-sr-only">: {title}</span>
            </Link>
            {pdfUrl ? (
              <a
                className="ec-text-link"
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open PDF
                <span className="ec-sr-only"> for {title} (opens in a new tab)</span>
              </a>
            ) : null}
          </span>
        </div>
      </div>
    </li>
  );
}

/* ---------- board ---------- */

export function NoticeBoard({ categories = [] }) {
  const [state, setState] = useState("loading"); // loading | ready | error
  const [notices, setNotices] = useState([]);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");
  const [attempt, setAttempt] = useState(0);
  const searchId = useId();

  useEffect(() => {
    const controller = new AbortController();
    setState("loading");

    (async () => {
      try {
        const res = await fetch(
          "/api/notices?sort=latest&category=Examination&limit=100",
          { cache: "no-store", signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const allowed = INCLUDE_CATEGORIES.map((c) => c.toLowerCase());
        const list = (data.notices || [])
          .filter((n) => allowed.includes(String(n.category || "").toLowerCase()))
          .map(normalize)
          .sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));

        setNotices(list);
        setState("ready");
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Failed to load examination notices:", err);
        setState("error");
      }
    })();

    return () => controller.abort();
  }, [attempt]);

  const counts = useMemo(() => {
    const map = { All: notices.length };
    categories.forEach((c) => {
      map[c] = notices.filter((n) => n.group === c).length;
    });
    return map;
  }, [notices, categories]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notices.filter((n) => {
      if (group !== "All" && n.group !== group) return false;
      if (!q) return true;
      return `${n.title} ${n.summary} ${n.group} ${n.date}`
        .toLowerCase()
        .includes(q);
    });
  }, [notices, query, group]);

  const hasFilters = query.trim() !== "" || group !== "All";

  if (state === "loading") {
    return (
      <p className="ec-board__count" role="status" aria-live="polite">
        Loading examination notices…
      </p>
    );
  }

  if (state === "error") {
    return (
      <div className="ec-empty" role="alert">
        <h3>Notices could not be loaded</h3>
        <p>
          Please check your connection and try again. You can also view all
          notices on the <Link href="/notice-board">notice board</Link>.
        </p>
        <button
          type="button"
          className="ec-btn ec-btn--primary"
          onClick={() => setAttempt((n) => n + 1)}
        >
          Try again
        </button>
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div className="ec-empty">
        <h3>No examination notices published yet</h3>
        <p>
          New examination notices will appear here as soon as they are
          published. You can also check the{" "}
          <Link href="/notice-board">college notice board</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="ec-board">
      <div className="ec-board__controls">
        <div className="ec-search">
          <label htmlFor={searchId}>Search notices</label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, category or keyword"
            autoComplete="off"
          />
        </div>

        <div role="group" aria-label="Filter notices by category" className="ec-chips">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              className="ec-chip"
              aria-pressed={group === c}
              onClick={() => setGroup(c)}
            >
              {c} <span className="ec-chip__count">({counts[c] ?? 0})</span>
            </button>
          ))}
        </div>
      </div>

      <p className="ec-board__count" role="status" aria-live="polite">
        Showing {filtered.length} of {notices.length} notices
        {hasFilters ? (
          <>
            {" "}
            <button
              type="button"
              className="ec-linkbtn"
              onClick={() => {
                setQuery("");
                setGroup("All");
              }}
            >
              Clear filters
            </button>
          </>
        ) : null}
      </p>

      {filtered.length > 0 ? (
        <ul className="ec-notice-list">
          {filtered.map((n) => (
            <NoticeItem key={n.key || n.id} notice={n} />
          ))}
        </ul>
      ) : (
        <div className="ec-empty">
          <h3>No notices match your search</h3>
          <p>Try a different keyword or clear the filters.</p>
        </div>
      )}

      <p className="ec-board__all">
        <Link className="ec-text-link" href="/notice-board">
          View all college notices →
        </Link>
      </p>
    </div>
  );
}