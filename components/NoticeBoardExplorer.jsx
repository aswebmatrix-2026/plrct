"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NoticeCard from "@/components/NoticeCard";

const CATEGORIES = [
  "Admission",
  "Examination",
  "Academic",
  "Placement",
  "Scholarship",
  "Circular",
  "Tender",
  "Recruitment",
];
const PRIORITIES = ["Urgent", "Important", "Featured", "Normal"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function NoticeBoardExplorer({ scope = "published" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [notices, setNotices] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || "";
  const priority = searchParams.get("priority") || "";
  const year = searchParams.get("year") || "";
  const month = searchParams.get("month") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "latest";
  const page = searchParams.get("page") || "1";

  const updateParam = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      if (key !== "page") params.delete("page");
      router.push(`/notice-board?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ scope, sort, page });
    if (category) params.set("category", category);
    if (priority) params.set("priority", priority);
    if (year) params.set("year", year);
    if (month) params.set("month", month);
    if (search) params.set("search", search);

    fetch(`/api/notices?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setNotices(data.notices || []);
        setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
      })
      .finally(() => setLoading(false));
  }, [scope, category, priority, year, month, search, sort, page]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  return (
    <div className="board-layout">
      <aside className="board-filters" aria-label="Filter notices">
        <div className="board-filters__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
            <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <input
            type="search"
            placeholder="Search notices..."
            defaultValue={search}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateParam("search", e.currentTarget.value);
            }}
            aria-label="Search notice title or keywords"
          />
        </div>

        <div className="board-filters__group">
          <label htmlFor="filter-category">Category</label>
          <select id="filter-category" value={category} onChange={(e) => updateParam("category", e.target.value)}>
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="board-filters__group">
          <label htmlFor="filter-priority">Priority</label>
          <select id="filter-priority" value={priority} onChange={(e) => updateParam("priority", e.target.value)}>
            <option value="">All Priorities</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="board-filters__group">
          <label htmlFor="filter-year">Year</label>
          <select id="filter-year" value={year} onChange={(e) => updateParam("year", e.target.value)}>
            <option value="">Any Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="board-filters__group">
          <label htmlFor="filter-month">Month</label>
          <select id="filter-month" value={month} onChange={(e) => updateParam("month", e.target.value)}>
            <option value="">Any Month</option>
            {MONTHS.map((m, idx) => (
              <option key={m} value={idx + 1}>{m}</option>
            ))}
          </select>
        </div>

        <div className="board-filters__group">
          <label htmlFor="filter-sort">Sort</label>
          <select id="filter-sort" value={sort} onChange={(e) => updateParam("sort", e.target.value)}>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn--ghost board-filters__reset"
          onClick={() => router.push("/notice-board")}
        >
          Reset Filters
        </button>
      </aside>

      <div className="board-results">
        <p className="board-results__count">
          {loading ? "Loading notices..." : `${pagination.total} notice${pagination.total === 1 ? "" : "s"} found`}
        </p>

        {!loading && notices.length === 0 && (
          <div className="board-empty">No notices match your filters. Try adjusting your search.</div>
        )}

        <div className="board-results__grid">
          {notices.map((notice) => (
            <NoticeCard key={notice._id} notice={notice} />
          ))}
        </div>

        {pagination.pages > 1 && (
          <div className="board-pagination">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                aria-current={String(p) === page}
                onClick={() => updateParam("page", String(p))}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}