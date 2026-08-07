import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import slugify from "slugify";
import { authOptions } from "@/lib/authOptions";
import { dbConnect as connectDB } from "@/lib/mongodb";
import GalleryEvent, { GALLERY_CATEGORIES } from "@/models/GalleryEvent";

/**
 * GET /api/gallery
 * Public listing endpoint with filtering, search, and sort.
 * Query params:
 *   status   - draft | published | archived (admin only sees non-published)
 *   category, year, q (search), sort (latest|oldest), featured, homepage, limit, page
 */
export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);

  const session = await getServerSession(authOptions);
  const isAdmin = !!session?.user;

  const filter = {};

  // Public visitors only ever see published albums.
  const statusParam = searchParams.get("status");
  if (isAdmin && statusParam) {
    filter.status = statusParam;
  } else if (!isAdmin) {
    filter.status = "published";
  }

  const category = searchParams.get("category");
  if (category && GALLERY_CATEGORIES.includes(category)) filter.category = category;

  const year = searchParams.get("year");
  if (year) filter.year = Number(year);

  const featured = searchParams.get("featured");
  if (featured === "true") filter.featured = true;

  const homepage = searchParams.get("homepage");
  if (homepage === "true") filter.showOnHomepage = true;

  const q = searchParams.get("q");
  if (q) {
    filter.$or = [
      { eventName: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } },
      { year: isNaN(Number(q)) ? undefined : Number(q) },
    ].filter((clause) => Object.values(clause)[0] !== undefined);
  }

  const sort = searchParams.get("sort") === "oldest" ? { eventDate: 1 } : { eventDate: -1 };

  const limit = Math.min(Number(searchParams.get("limit")) || 100, 200);
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);

  const [events, total] = await Promise.all([
    GalleryEvent.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean({ virtuals: true }),
    GalleryEvent.countDocuments(filter),
  ]);

  return NextResponse.json({ events, total, page, limit });
}

/**
 * POST /api/gallery
 * Create a new album. Admin only.
 * Expects JSON body with event fields + coverImage {url, publicId} + images[] (already uploaded via /api/gallery/upload).
 */
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const body = await request.json();

  const required = ["eventName", "year", "eventDate", "category", "shortDescription", "coverImage"];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  if (!GALLERY_CATEGORIES.includes(body.category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  let slug = body.slug ? slugify(body.slug, { lower: true, strict: true }) : slugify(`${body.eventName}-${body.year}`, { lower: true, strict: true });

  // Ensure slug uniqueness
  let candidate = slug;
  let suffix = 1;
  while (await GalleryEvent.findOne({ slug: candidate })) {
    candidate = `${slug}-${suffix++}`;
  }
  slug = candidate;

  const images = (body.images || []).map((img, index) => ({
    url: img.url,
    publicId: img.publicId,
    altText: img.altText || body.eventName,
    caption: img.caption || "",
    displayOrder: img.displayOrder ?? index,
    width: img.width,
    height: img.height,
  }));

  const event = await GalleryEvent.create({
    eventName: body.eventName,
    slug,
    year: Number(body.year),
    eventDate: new Date(body.eventDate),
    category: body.category,
    location: body.location || "",
    shortDescription: body.shortDescription,
    description: body.description || "",
    coverImage: body.coverImage,
    images,
    featured: !!body.featured,
    showOnHomepage: !!body.showOnHomepage,
    status: body.status === "published" ? "published" : "draft",
    metaTitle: body.metaTitle || `${body.eventName} | PLRCT Gallery`,
    metaDescription: body.metaDescription || body.shortDescription,
    createdBy: session.user.email || session.user.name || "admin",
  });

  return NextResponse.json({ event }, { status: 201 });
}