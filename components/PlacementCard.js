import Link from "next/link";
import "@/styles/placements.css";

export default function PlacementCard({ p }) {
  return (
    <div className={`glass-card placement-card ${p.featured ? "featured" : ""}`}>
      <div className="logo-wrap">
        {p.companyLogo ? <img src={p.companyLogo} alt={p.companyName} /> : <span>{p.companyName?.[0]}</span>}
      </div>
      <h3>{p.companyName}</h3>
      <div className="role">{p.jobRole}</div>
      <div className="meta-row"><span>{p.department}</span><span className="package">{p.salaryPackage}</span></div>
      <div className="meta-row">
        <span>Eligibility: {p.eligibility || "—"}</span>
      </div>
      <div className="meta-row">
        <span>Last Date</span>
        <span>{p.lastDate ? new Date(p.lastDate).toLocaleDateString() : "—"}</span>
      </div>
      <Link href={`/placements/${p.slug}`} className="btn btn-primary btn-sm">View Details</Link>
    </div>
  );
}
