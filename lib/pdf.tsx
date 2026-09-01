import React from "react";
import { Document, Page, View, Text, Image, StyleSheet, renderToBuffer, Font } from "@react-pdf/renderer";

/**
 * Generates the I-Card PDF with @react-pdf/renderer (pure Node, no headless
 * Chrome/puppeteer needed — works fine on Vercel/serverless). This mirrors
 * components/id-card/StudentIdCard.tsx's layout and color variables so the
 * PDF matches the on-screen preview. If you tune the CSS variables in
 * StudentIdCard.css against your real reference image, mirror the same
 * hex values in COLORS below.
 */
const COLORS = {
  blue: "#12318f",
  blueDark: "#0c2266",
  yellow: "#ffcc29",
  beige: "#f3e6c8",
  red: "#c8102e",
  white: "#ffffff",
  dark: "#1a1a1a",
};

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: "#f2f2f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 280,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.blue,
    color: COLORS.white,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    marginRight: 8,
  },
  collegeName: { fontSize: 11, fontWeight: 700 },
  yellowBand: { height: 18, backgroundColor: COLORS.yellow },
  photoWrap: { display: "flex", alignItems: "center", marginTop: -28 },
  photoFrame: {
    width: 84,
    height: 100,
    backgroundColor: COLORS.white,
    borderRadius: 6,
  },
  photo: { width: 84, height: 100, borderRadius: 6, objectFit: "cover" },
  name: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.dark,
    marginTop: 8,
    textTransform: "uppercase",
  },
  infoBlock: { padding: "6px 16px 2px" },
  infoRow: { flexDirection: "row", fontSize: 10, color: COLORS.red, paddingVertical: 1.5 },
  label: { fontWeight: 700, width: 78 },
  value: { flex: 1 },
  lowerSection: {
    backgroundColor: COLORS.beige,
    marginTop: 8,
    padding: "10px 16px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  signatureLabel: { fontSize: 8, color: "#444", textAlign: "center", marginTop: 2 },
  signatureLine: { width: 70, borderBottomWidth: 1, borderBottomColor: "#555", height: 16 },
  appId: { fontSize: 7, color: "#666" },
  yellowSeparator: { height: 5, backgroundColor: COLORS.yellow },
  footer: {
    backgroundColor: COLORS.blueDark,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 8,
    padding: 5,
  },
});

export interface IdCardPdfData {
  studentName: string;
  fatherName: string;
  course: string;
  discipline: string;
  rollNumber?: string | null;
  session: string;
  mobile: string;
  address: string;
  photoUrl: string;
  principalSignatureUrl?: string | null;
  applicationId: string;
}

function IdCardDocument({ data }: { data: IdCardPdfData }) {
  return (
    <Document>
      <Page size={[320, 480]} style={styles.page}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.logo} />
            <Text style={styles.collegeName}>Pt. L. R. College of Technology</Text>
          </View>
          <View style={styles.yellowBand} />

          <View style={styles.photoWrap}>
            <View style={styles.photoFrame}>
              {data.photoUrl ? <Image style={styles.photo} src={data.photoUrl} /> : null}
            </View>
          </View>

          <Text style={styles.name}>{data.studentName}</Text>

          <View style={styles.infoBlock}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Father&apos;s Name:</Text>
              <Text style={styles.value}>{data.fatherName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Course:</Text>
              <Text style={styles.value}>
                {data.course}
                {data.discipline ? ` (${data.discipline})` : ""}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Roll No.:</Text>
              <Text style={styles.value}>{data.rollNumber || "—"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Session:</Text>
              <Text style={styles.value}>{data.session}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Mobile:</Text>
              <Text style={styles.value}>{data.mobile}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{data.address}</Text>
            </View>
          </View>

          <View style={styles.lowerSection}>
            <View>
              {data.principalSignatureUrl ? (
                <Image style={{ height: 22, width: 60, objectFit: "contain" }} src={data.principalSignatureUrl} />
              ) : (
                <View style={styles.signatureLine} />
              )}
              <Text style={styles.signatureLabel}>Principal</Text>
            </View>
            <Text style={styles.appId}>{data.applicationId}</Text>
          </View>

          <View style={styles.yellowSeparator} />
          <Text style={styles.footer}>Pt. L. R. College of Technology</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function generateIdCardPdf(data: IdCardPdfData): Promise<Buffer> {
  return renderToBuffer(<IdCardDocument data={data} />);
}
