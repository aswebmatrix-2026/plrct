"use client";
import "./dashboard.css";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, CartesianGrid,
} from "recharts";
import { Users, CalendarDays, GraduationCap, Cpu, Clock, CheckCircle2, XCircle, Mail } from "lucide-react";

const COLORS = ["#C8102E", "#f59e0b", "#16a34a", "#2563eb", "#7c3aed", "#dc2626"];

function StatCard({ icon: Icon, label, value, tone = "text-gray-900" }) {
  return (
    <div className="glass-card bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{label}</p>
        <Icon size={18} className="text-brand" />
      </div>
      <p className={`text-2xl font-display font-bold mt-2 ${tone}`}>{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/admissions/stats")
      .then((res) => res.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) {
    return <div className="p-8 text-gray-400">Loading dashboard...</div>;
  }

  const { cards, charts, analytics } = data;

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">Admissions Overview</h1>
        <p className="text-sm text-gray-500">Session 2026–2027</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Applications" value={cards.total} />
        <StatCard icon={CalendarDays} label="Today's Applications" value={cards.today} />
        <StatCard icon={GraduationCap} label="Diploma Applications" value={cards.diploma} />
        <StatCard icon={Cpu} label="B.Tech Applications" value={cards.btech} />
        <StatCard icon={Clock} label="Pending" value={cards.pending} tone="text-pending" />
        <StatCard icon={CheckCircle2} label="Approved" value={cards.approved} tone="text-success" />
        <StatCard icon={XCircle} label="Rejected" value={cards.rejected} tone="text-rejected" />
        <StatCard icon={Mail} label="Total Inquiries" value={cards.inquiries} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card bg-white p-5">
          <h3 className="font-medium text-gray-700 mb-4">Daily Application Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={charts.dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#C8102E" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card bg-white p-5">
          <h3 className="font-medium text-gray-700 mb-4">Department-wise Applications</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={charts.byDepartment} layout="vertical" margin={{ left: 40 }}>
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="department" width={160} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#C8102E" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card bg-white p-5">
          <h3 className="font-medium text-gray-700 mb-4">Program-wise Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={[
                  { name: "Diploma", value: cards.diploma },
                  { name: "B.Tech", value: cards.btech },
                ]}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
              >
                {COLORS.map((c, i) => (
                  <Cell key={i} fill={c} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card bg-white p-5">
          <h3 className="font-medium text-gray-700 mb-4">Top States by Applications</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={charts.byState}>
              <XAxis dataKey="state" tick={{ fontSize: 10 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card bg-white p-5 flex gap-10">
        <div>
          <p className="text-sm text-gray-500">Conversion Rate</p>
          <p className="text-2xl font-display font-bold text-brand">{analytics.conversionRate}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Approval Rate</p>
          <p className="text-2xl font-display font-bold text-success">{analytics.approvalRate}%</p>
        </div>
      </div>
    </div>
  );
}