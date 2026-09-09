import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import dbConnect from "@/lib/mongodb";
import Admission from "@/models/Admission";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, fontFamily: "Helvetica" },
  header: { textAlign: "center", marginBottom: 16, borderBottom: "2pt solid #C8102E", paddingBottom: 8 },
  title: { fontSize: 16, color: "#C8102E", fontWeight: "bold" },
  subtitle: { fontSize: 10, color: "#555" },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 12, fontWeight: "bold", color: "#C8102E", marginBottom: 4 },
  row: { flexDirection: "row", marginBottom: 3 },
  label: { width: 140, color: "#555" },
  value: { flex: 1, fontWeight: "bold" },
  photo: { width: 80, height: 96, position: "absolute", right: 32, top: 32, border: "1pt solid #ccc" },
  photoPlaceholder: {
    justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5",
  },

  // Document index table (page 1)
  docTable: { marginTop: 4, borderTop: "1pt solid #ddd" },
  docTableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottom: "1pt solid #eee",
    alignItems: "center",
  },
  docTableLabel: { flex: 1, color: "#333" },
  docTableStatus: { width: 90, textAlign: "right" },
  docTableStatusOk: { color: "#1a7f37", fontWeight: "bold" },
  docTableStatusMissing: { color: "#999" },

  // Full document pages
  docPage: { padding: 32, fontFamily: "Helvetica" },
  docPageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottom: "1pt solid #C8102E",
    paddingBottom: 6,
  },
  docPageTitle: { fontSize: 12, fontWeight: "bold", color: "#C8102E" },
  docPageMeta: { fontSize: 8, color: "#777" },
  docPageImageWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  docPageImage: {
    width: "100%",
    height: 680,
    objectFit: "contain",
    border: "1pt solid #ccc",
  },
  docPageUnavailable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    border: "1pt dashed #ccc",
  },
  docPageUnavailableText: { fontSize: 10, color: "#777", textAlign: "center", paddingHorizontal: 40 },
});

function Field({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value ?? "-"}</Text>
    </View>
  );
}

// Prefer the original filename (set at upload time) to detect the real
// extension — cloud storage URLs often don't carry a usable extension.
function isRenderableImage(doc) {
  if (!doc) return false;
  const candidate = (doc.originalName || doc.url || "").split("?")[0].toLowerCase();
  return candidate.endsWith(".jpg") || candidate.endsWith(".jpeg") || candidate.endsWith(".png");
}

// Order matters — this is the order they'll appear in the index and as pages.
const ALL_DOC_FIELDS = [
  { key: "photo", label: "Passport Size Photo" },
  { key: "signature", label: "Signature" },
  { key: "aadhaarFile", label: "Aadhaar Card" },
  { key: "marksheet10", label: "10th Marksheet" },
  { key: "marksheet12", label: "12th Marksheet" },
  { key: "diplomaMarksheet", label: "Diploma Marksheet" },
  { key: "categoryCertificate", label: "Category Certificate" },
  { key: "migrationCertificate", label: "Migration Certificate" },
  { key: "characterCertificate", label: "Character Certificate" },
];

function DocumentIndexTable({ docsMap }) {
  return (
    <View style={styles.docTable}>
      {ALL_DOC_FIELDS.map(({ key, label }) => {
        const uploaded = !!docsMap?.[key]?.url;
        return (
          <View key={key} style={styles.docTableRow}>
            <Text style={styles.docTableLabel}>{label}</Text>
            <Text
              style={[
                styles.docTableStatus,
                uploaded ? styles.docTableStatusOk : styles.docTableStatusMissing,
              ]}
            >
              {uploaded ? "✔ Uploaded" : "Not Provided"}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function DocumentFullPage({ appNumber, label, doc }) {
  return (
    <Page size="A4" style={styles.docPage}>
      <View style={styles.docPageHeader}>
        <Text style={styles.docPageTitle}>{label}</Text>
        <Text style={styles.docPageMeta}>Application No: {appNumber}</Text>
      </View>

      {isRenderableImage(doc) ? (
        <View style={styles.docPageImageWrap}>
          <Image src={doc.url} style={styles.docPageImage} />
        </View>
      ) : (
        <View style={styles.docPageUnavailable}>
          <Text style={styles.docPageUnavailableText}>
            This document was uploaded as a non-image file
            {doc.originalName ? ` ("${doc.originalName}")` : ""} and cannot be previewed inline
            here. Please refer to the original upload for this document.
          </Text>
        </View>
      )}
    </Page>
  );
}

function ApplicationPDF({ a }) {
  const photo = a.documents?.photo;

  // Everything except the passport photo gets its own large page —
  // the photo stays in its original spot on page 1 (top-right corner).
  const uploadedDocs = ALL_DOC_FIELDS
    .filter(({ key }) => key !== "photo")
    .map(({ key, label }) => ({ key, label, doc: a.documents?.[key] }))
    .filter((d) => d.doc?.url);

  return (
    <Document>
      {/* Page 1 — application summary + document index */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>PLRCT</Text>
          <Text style={styles.subtitle}>Admission Application — {a.admissionSession}</Text>
          <Text style={styles.subtitle}>Application No: {a.applicationNumber}</Text>
        </View>

        {photo?.url && (
          isRenderableImage(photo) ? (
            <Image src={photo.url} style={styles.photo} />
          ) : (
            <View style={[styles.photo, styles.photoPlaceholder]}>
              <Text style={{ fontSize: 7 }}>PHOTO</Text>
            </View>
          )
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Details</Text>
          <Field label="Program Type" value={a.programType?.toUpperCase()} />
          <Field label="Department" value={a.department} />
          <Field label="Admission Mode" value={a.admissionMode} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Field label="Full Name" value={a.fullName} />
          <Field label="Father's Name" value={a.fatherName} />
          <Field label="Mother's Name" value={a.motherName} />
          <Field label="Gender" value={a.gender} />
          <Field label="Date of Birth" value={new Date(a.dob).toLocaleDateString("en-IN")} />
          <Field label="Category" value={a.category?.toUpperCase()} />
          <Field label="Blood Group" value={a.bloodGroup} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Details</Text>
          <Field label="Mobile" value={a.phone} />
          <Field label="Email" value={a.email} />
          <Field label="Address" value={a.permanentAddress} />
          <Field label="City / State" value={`${a.city}, ${a.state} - ${a.pincode}`} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Details</Text>
          <Field label="10th Board" value={a.class10?.board} />
          <Field label="10th Percentage" value={a.class10?.percentage} />
          {a.class12 && (
            <>
              <Field label="12th/Diploma Board" value={a.class12?.board} />
              <Field label="12th/Diploma %" value={a.class12?.percentage} />
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uploaded Documents (see following pages)</Text>
          <DocumentIndexTable docsMap={a.documents} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application Status</Text>
          <Field label="Current Status" value={a.applicationStatus?.replace("_", " ")} />
          <Field label="Submitted On" value={new Date(a.createdAt).toLocaleString("en-IN")} />
        </View>
      </Page>

      {/* One full page per uploaded document (excluding passport photo) */}
      {uploadedDocs.map(({ key, label, doc }) => (
        <DocumentFullPage key={key} appNumber={a.applicationNumber} label={label} doc={doc} />
      ))}
    </Document>
  );
}

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await dbConnect();

  let admission;
  try {
    admission = await Admission.findById(id).lean();
  } catch (err) {
    console.error("PDF route DB error:", err);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!admission) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const buffer = await renderToBuffer(<ApplicationPDF a={admission} />);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${admission.applicationNumber}.pdf"`,
    },
  });
}