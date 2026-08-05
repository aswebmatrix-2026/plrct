"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Download, Search, Eye } from "lucide-react";
import { DEPARTMENTS } from "@/lib/validation/admissionSchema";

const STATUS_OPTIONS = [
  "new",
  "under_review",
  "documents_pending",
  "approved",
  "rejected",
  "admission_confirmed",
];

export default function AdmissionsListPage() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    programType: "",
    department: "",
    status: "",
    city: "",
    state: "",
  });

  const fetchData = useCallback((page = 1) => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));

    fetch(`/api/admissions?${params.toString()}`)
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

  const allDepartments = [...new Set([...DEPARTMENTS.diploma, ...DEPARTMENTS.btech])];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Admissions</h1>
          <p className="text-sm text-gray-500">{pagination.total} applications</p>
        </div>
        <div className="flex gap-2">
          <a href="/api/admissions/export?format=xlsx" className="btn-secondary flex items-center gap-2 text-sm">
            <Download size={15} /> Excel
          </a>
          <a href="/api/admissions/export?format=csv" className="btn-secondary flex items-center gap-2 text-sm">
            <Download size={15} /> CSV
          </a>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card bg-white p-4 grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="relative lg:col-span-2">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Name, phone, email, app no."
            className="input-field pl-9"
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          />
        </div>
        <select
          className="input-field"
          value={filters.programType}
          onChange={(e) => setFilters((f) => ({ ...f, programType: e.target.value }))}
        >
          <option value="">All Programs</option>
          <option value="diploma">Diploma</option>
          <option value="btech">B.Tech</option>
        </select>
        <select
          className="input-field"
          value={filters.department}
          onChange={(e) => setFilters((f) => ({ ...f, department: e.target.value }))}
        >
          <option value="">All Departments</option>
          {allDepartments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          className="input-field"
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.replace("_", " ")}</option>
          ))}
        </select>
        <input
          placeholder="City"
          className="input-field"
          value={filters.city}
          onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
        />
      </div>

      {/* Table */}
      <div className="glass-card bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="px-4 py-3 font-medium">App. Number</th>
              <th className="px-4 py-3 font-medium">Student Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Program</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No applications found.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/60">
                  <td className="px-4 py-3 font-medium text-gray-800">{item.applicationNumber}</td>
                  <td className="px-4 py-3">{item.fullName}</td>
                  <td className="px-4 py-3">{item.phone}</td>
                  <td className="px-4 py-3 uppercase text-xs">{item.programType}</td>
                  <td className="px-4 py-3">{item.department}</td>
                  <td className="px-4 py-3">
                    <span className={`badge status-${item.applicationStatus}`}>
                      {item.applicationStatus.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/admissions/${item._id}`} className="text-brand hover:underline flex items-center gap-1">
                      <Eye size={14} /> View
                    </Link>
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
