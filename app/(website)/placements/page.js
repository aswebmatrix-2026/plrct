import { dbConnect } from "@/lib/mongodb.js";
import Placement, { PLACEMENT_DEPARTMENTS, PLACEMENT_PROGRAMS } from "@/models/Placement";
import PlacementCard from "@/components/PlacementCard";
import "@/styles/placements.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Placement Drives | PLRCT Faridabad",
  description: "Browse active, upcoming and past placement drives at Pt. L.R. College of Technology, Faridabad.",
};

async function getData(sp) {
  await dbConnect();
  const page = Number(sp.page) || 1;
  const limit = 9;
  const filter = { published: true };
  if (sp.q) filter.$text = { $search: sp.q };
  if (sp.department) filter.department = sp.department;
  if (sp.program) filter.program = sp.program;

  const [items, total] = await Promise.all([
    Placement.find(filter).sort("-createdAt").skip((page - 1) * limit).limit(limit).lean(),
    Placement.countDocuments(filter),
  ]);
  return { items: JSON.parse(JSON.stringify(items)), total, page, pages: Math.ceil(total / limit) || 1 };
}

export default async function PlacementsPage({ searchParams }) {
  const sp = await searchParams;
  const { items, page, pages } = await getData(sp || {});

  return (
    <main>
      <section className="placements-hero">
        <div className="container">
          <h1>Placement Drives</h1>
          <p>Explore recruitment opportunities from leading companies visiting PLRCT, Faridabad.</p>
        </div>
      </section>

      <div className="container">
        <form className="placement-toolbar" method="GET">
          <input type="text" name="q" placeholder="Search company or role..." defaultValue={sp?.q || ""} />
          <select name="department" defaultValue={sp?.department || ""}>
            <option value="">All Departments</option>
            {PLACEMENT_DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select name="program" defaultValue={sp?.program || ""}>
            <option value="">All Programs</option>
            {PLACEMENT_PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <button className="btn btn-primary" type="submit">Filter</button>
        </form>

        <div className="placement-grid">
          {items.length === 0 && <p>No placement drives found.</p>}
          {items.map((p) => <PlacementCard key={p._id} p={p} />)}
        </div>

        {pages > 1 && (
          <div className="pagination">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <a key={n} href={`?page=${n}${sp?.q ? `&q=${sp.q}` : ""}`}>
                <button className={n === page ? "active" : ""}>{n}</button>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}