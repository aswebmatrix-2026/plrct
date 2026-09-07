import { NextResponse } from "next/server";

import { nanoid } from "nanoid";
import slugify from "slugify";
import { dbConnect} from "../../../lib/mongodb";
import Notice from "../../../models/Notice";
import { requireAdmin } from "../../../lib/requireAdmin";

export async function GET(request) {
  await dbConnect
();
  await Notice.syncLifecycle();

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const priority = searchParams.get("priority");
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") || "latest";
  const scope = searchParams.get("scope") || "published";
  const ticker = searchParams.get("ticker"); // "true" => ticker-specific shaping
  const homepage = searchParams.get("homepage"); // "true" => homepage section shaping
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
  const limit = Math.min(parseInt(searchParams.get("limit") || "12", 10), 50);

  const query = {};

  if (scope === "published") query.status = "Published";
  else if (scope === "archive") query.status = "Archived";
  // scope === "all" is intentionally left unrestricted but should only be
  // reachable from admin-authenticated screens in the UI layer.

  if (category) query.category = category;
  if (priority) query.priority = priority;
  if (homepage === "true") query.showOnHomepage = true;
  if (ticker === "true") query.showInTicker = true;

  if (year || month) {
    const start = new Date(Number(year) || new Date().getFullYear(), month ? Number(month) - 1 : 0, 1);
    const end = month
      ? new Date(Number(year) || new Date().getFullYear(), Number(month), 1)
      : new Date((Number(year) || new Date().getFullYear()) + 1, 0, 1);
    query.publishDate = { $gte: start, $lt: end };
  }

  if (search) {
    query.$text = { $search: search };
  }

  // Pinned + featured + urgent notices always surface first, then by date.
  const priorityRank = { Urgent: 0, Featured: 1, Important: 2, Normal: 3 };

  let notices = await Notice.find(query)
    .sort({ pinned: -1, publishDate: sort === "oldest" ? 1 : -1 })
    .skip(ticker === "true" ? 0 : (page - 1) * limit)
    .limit(ticker === "true" ? 10 : limit)
    .lean();

  if (ticker === "true") {
    notices = notices.sort((a, b) => (priorityRank[a.priority] ?? 3) - (priorityRank[b.priority] ?? 3));
  }

  const total = await Notice.countDocuments(query);

  return NextResponse.json({
    notices,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

// POST /api/notices — create a new notice (admin only)
export async function POST(request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await dbConnect
();
  const body = await request.json();

  if (!body.title || !body.category || !body.shortDescription || !body.content) {
    return NextResponse.json(
      { error: "title, category, shortDescription and content are required." },
      { status: 400 }
    );
  }

  let id = body.id
    ? slugify(body.id, { lower: true, strict: true })
    : slugify(body.title, { lower: true, strict: true });

  const existing = await Notice.findOne({ id });
  if (existing) id = `${id}-${nanoid(6)}`;

  const now = new Date();
  const publishDate = body.publishDate ? new Date(body.publishDate) : now;
  const status = body.status || (publishDate > now ? "Scheduled" : "Published");

  const notice = await Notice.create({
    title: body.title,
    id,
    category: body.category,
    shortDescription: body.shortDescription,
    content: body.content,
    pdfUrl: body.pdfUrl || null,
    pdfPublicId: body.pdfPublicId || null,
    pdfFileName: body.pdfFileName || null,
    priority: body.priority || "Normal",
    featured: !!body.featured,
    pinned: !!body.pinned,
    showOnHomepage: body.showOnHomepage !== false,
    showInTicker: body.showInTicker !== false,
    status,
    publishDate,
    expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
  });

  return NextResponse.json({ notice }, { status: 201 });
}