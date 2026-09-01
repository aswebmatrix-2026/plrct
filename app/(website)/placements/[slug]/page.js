import { dbConnect } from "@/lib/mongodb.js";
import Placement from "@/models/Placement";
import "@/styles/placements.css";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await dbConnect();
  const p = await Placement.findOne({ slug, published: true }).lean();
  if (!p) return {};
  return {
    title: `${p.companyName} - ${p.jobRole} | PLRCT Placements`,
    description: p.description?.slice(0, 150) || `${p.companyName} placement drive at PLRCT`,
  };
}

export default async function PlacementDetail({ params }) {
  const { slug } = await params;
  await dbConnect();
  const p = await Placement.findOne({ slug, published: true }).lean();
  if (!p) notFound();

  const related = await Placement.find({
    department: p.department,
    slug: { $ne: p.slug },
    published: true,
  }).limit(3).lean();

  return (
    <main>
      <section className="placement-detail-banner">
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {p.companyLogo && <img src={p.companyLogo} alt={p.companyName} />}
          <div>
            <h1 style={{ margin: 0 }}>{p.companyName}</h1>
            <p style={{ margin: "4px 0 0" }}>{p.jobRole} · {p.department}</p>
          </div>
        </div>
      </section>

      <div className="container placement-detail-grid">
        <div>
          <div className="glass-card placement-detail-card">
            <h3>Job Description</h3>
            <p>{p.description || "No description provided."}</p>
          </div>
          <div className="glass-card placement-detail-card">
            <h3>Selection Process</h3>
            <p>{p.selectionProcess || "To be announced."}</p>
          </div>
          <div className="glass-card placement-detail-card">
            <h3>Eligibility</h3>
            <p>{p.eligibility} {p.minimumPercentage ? `(Min ${p.minimumPercentage}%)` : ""}</p>
          </div>
        </div>

        <div>
          <div className="glass-card placement-detail-card">
            <h3>Important Details</h3>
            <p><strong>Package:</strong> {p.salaryPackage}</p>
            <p><strong>Type:</strong> {p.jobType}</p>
            <p><strong>Location:</strong> {p.location}</p>
            <p><strong>Last Date:</strong> {p.lastDate ? new Date(p.lastDate).toLocaleDateString() : "—"}</p>
            {p.driveDate && <p><strong>Drive Date:</strong> {new Date(p.driveDate).toLocaleDateString()} {p.driveTime}</p>}
            {p.documents && <p><strong>Documents Required:</strong> {p.documents}</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {p.applyLink && <a className="btn btn-primary" href={p.applyLink} target="_blank" rel="noreferrer">Apply Now</a>}
              {p.pdfFile && <a className="btn btn-outline" href={p.pdfFile} target="_blank" rel="noreferrer">Download PDF</a>}
              <a className="btn btn-ghost" href={`https://wa.me/?text=Check%20this%20placement%20drive:%20${encodeURIComponent(p.companyName)}`} target="_blank" rel="noreferrer">Share</a>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container">
          <h3>Related Placements</h3>
          <div className="related-placements">
            {related.map((r) => (
              <a key={r._id} href={`/placements/${r.slug}`} className="glass-card placement-card">
                <h4>{r.companyName}</h4>
                <p>{r.jobRole}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}