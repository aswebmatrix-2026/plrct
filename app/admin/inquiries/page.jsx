"use client";
import "./inquiries-list.css";

import { useEffect, useState, useCallback } from "react";
import { Search } from "lucide-react";

const STATUS_OPTIONS = ["new", "contacted", "resolved"];

const COURSES = [
  "B.Tech Computer Science Engineering",
  "B.Tech Electrical Engineering",
  "B.Tech Mechanical Engineering",
  "B.Tech Civil Engineering",
  "B.Tech Electronics & Communication Engineering",
  "B.Tech Artificial Intelligence & Machine Learning",
  "Diploma Computer Science Engineering",
  "Diploma Electrical Engineering",
  "Diploma Mechanical Engineering",
  "Diploma Civil Engineering",
  "M.Tech Engineering",
];

export default function InquiriesListPage() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", course: "", status: "" });

  const fetchData = useCallback((page = 1) => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));

    fetch(`/api/contact?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
      })
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  async function updateStatus(id, status) {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchData(pagination.page);
    } catch {
      // fetchData already re-syncs on next filter change; a toast library
      // can be wired here the same way AdmissionDetailPage does with react-hot-toast.
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Contact Inquiries</h1>
          <p className="text-sm text-gray-500">{pagination.total} inquiries from the public contact form</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card bg-white p-4 grid sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Name, phone, email"
            className="input-field pl-9"
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          />
        </div>
        <select
          className="input-field"
          value={filters.course}
          onChange={(e) => setFilters((f) => ({ ...f, course: e.target.value }))}
        >
          <option value="">All Courses</option>
          {COURSES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          className="input-field"
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">City / State</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No inquiries found.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/60">
                  <td className="px-4 py-3 font-medium text-gray-800">{item.fullName}</td>
                  <td className="px-4 py-3">
                    <div>{item.email}</div>
                    <div className="text-gray-500 text-xs">{item.mobile}</div>
                  </td>
                  <td className="px-4 py-3">{item.course}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {[item.city, item.state].filter(Boolean).join(", ") || "-"}
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate text-gray-500">{item.message || "-"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                      className={`badge-select status-${item.status}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => fetchData(p)}
              className={`h-8 w-8 rounded-lg text-sm ${p === pagination.page ? "bg-brand text-white" : "bg-white border border-gray-200 text-gray-600"}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}