"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GALLERY_CATEGORIES_CLIENT } from "@/lib/constants";

export default function FilterBar({ years }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/gallery?${params.toString()}`);
  }

  return (
    <div className="gallery-filter-bar">
      <form
        className="gallery-search"
        onSubmit={(e) => {
          e.preventDefault();
          updateParam("q", e.target.q.value);
        }}
      >
        <input
          type="text"
          name="q"
          placeholder="Search by event name, year, or category..."
          defaultValue={searchParams.get("q") || ""}
        />
        <button type="submit">Search</button>
      </form>

      <div className="gallery-filter-selects">
        <select value={searchParams.get("category") || ""} onChange={(e) => updateParam("category", e.target.value)}>
          <option value="">All Categories</option>
          {GALLERY_CATEGORIES_CLIENT.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={searchParams.get("year") || ""} onChange={(e) => updateParam("year", e.target.value)}>
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select value={searchParams.get("sort") || "latest"} onChange={(e) => updateParam("sort", e.target.value)}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
}