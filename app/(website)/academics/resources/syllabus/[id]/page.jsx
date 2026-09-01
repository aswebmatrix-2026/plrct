// app/academics/resources/syllabus/[id]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";

// ASSUMPTION: adjust this import path to match your existing project.
import connectDB from "@/lib/mongodb";
import Syllabus from "@/models/Syllabus";
import "./syllabus-detail.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.plrct.edu.in";

async function getSyllabus(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  await connectDB();
  const doc = await Syllabus.findOne({ _id: id, published: true }).lean();
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}

export async function generateMetadata({ params }) {
  const doc = await getSyllabus(params.id);
  if (!doc) {
    return { title: "Syllabus Not Found | PLRCT" };
  }

  const pageUrl = `${SITE_URL}/academics/resources/syllabus/${doc._id}`;
  const description =
    doc.description?.trim() ||
    `${doc.title} — ${doc.department}, ${doc.semester}, Academic Year ${doc.academicYear}. View or download the official PLRCT syllabus PDF.`;

  return {
    title: `${doc.title} | PLRCT Syllabus`,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: doc.title,
      description,
      url: pageUrl,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: doc.title,
      description,
    },
  };
}

export default async function SyllabusDetailPage({ params }) {
  const doc = await getSyllabus(params.id);

  if (!doc) {
    notFound();
  }

  return (
    <div className="syllabus-detail">
      <nav className="syllabus-detail__breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/academics/resources/syllabus">Syllabus</Link> /{" "}
        <span aria-current="page">{doc.title}</span>
      </nav>

      <div className="syllabus-detail__header">
        <div>
          <h1 className="syllabus-detail__title">{doc.title}</h1>
          <div className="syllabus-detail__meta">
            <span className="syllabus-detail__badge">{doc.program}</span>
            <span className="syllabus-detail__badge">{doc.department}</span>
            <span className="syllabus-detail__badge">{doc.semester}</span>
            <span className="syllabus-detail__badge">{doc.academicYear}</span>
          </div>
        </div>
        <a
          href={doc.pdfUrl}
          download
          className="syllabus-detail__download"
          aria-label={`Download ${doc.title} PDF`}
        >
          Download PDF
        </a>
      </div>

      <div className="syllabus-detail__viewer">
        {/* Native browser PDF viewer supports scroll + zoom without forcing a download */}
        <iframe src={doc.pdfUrl} title={`${doc.title} PDF viewer`} />
      </div>

      <Link href="/academics/resources/syllabus" className="syllabus-detail__back">
        ← Back to Syllabus
      </Link>
    </div>
  );
}