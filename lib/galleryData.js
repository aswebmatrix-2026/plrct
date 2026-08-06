import { dbConnect } from "@/lib/mongodb";
import GalleryEvent from "@/models/GalleryEvent";

/** Fetch published albums with optional filters. Used directly in Server Components. */
export async function getPublishedEvents({ category, year, q, sort = "latest", limit = 100 } = {}) {
  await dbConnect();

  const filter = { status: "published" };
  if (category) filter.category = category;
  if (year) filter.year = Number(year);
  if (q) {
    const or = [{ eventName: { $regex: q, $options: "i" } }, { category: { $regex: q, $options: "i" } }];
    if (!isNaN(Number(q))) or.push({ year: Number(q) });
    filter.$or = or;
  }

  const events = await GalleryEvent.find(filter)
    .sort(sort === "oldest" ? { eventDate: 1 } : { eventDate: -1 })
    .limit(limit)
    .lean({ virtuals: true });

  return JSON.parse(JSON.stringify(events));
}

export async function getFeaturedEvent() {
  await dbConnect();
  const event = await GalleryEvent.findOne({ status: "published", featured: true })
    .sort({ eventDate: -1 })
    .lean({ virtuals: true });
  return event ? JSON.parse(JSON.stringify(event)) : null;
}

export async function getHomepageEvents(limit = 6) {
  await dbConnect();
  const events = await GalleryEvent.find({ status: "published", showOnHomepage: true })
    .sort({ eventDate: -1 })
    .limit(limit)
    .lean({ virtuals: true });
  return JSON.parse(JSON.stringify(events));
}

export async function getDistinctYears() {
  await dbConnect();
  const years = await GalleryEvent.distinct("year", { status: "published" });
  return years.sort((a, b) => b - a);
}

export async function getEventBySlug(slug) {
  await dbConnect();
  const event = await GalleryEvent.findOneAndUpdate(
    { slug, status: "published" },
    { $inc: { views: 1 } },
    { returnDocument: "after" }
  ).lean({ virtuals: true });
  return event ? JSON.parse(JSON.stringify(event)) : null;
}