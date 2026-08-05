import type { Metadata } from "next";
import { Playfair_Display, Poppins, Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar/page.jsx";
import Footer from "@/components/Footer/page.jsx";
import ToastProvider from "@/components/ToastProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sub",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-stat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PLRCT Faridabad | Best Engineering & Professional College in Faridabad, Haryana",
  description:
    "Pt. L.R. College of Technology (PLRCT), Faridabad — AICTE approved engineering and professional college offering B.Tech, Diploma, BCA, BBA, MBA and Pharmacy with modern labs, experienced faculty and strong placement support across Faridabad, Haryana & Delhi NCR.",
  keywords: [
    "Best Engineering College in Faridabad",
    "Top Engineering College in Haryana",
    "B.Tech Admission Faridabad",
    "Diploma Engineering College Faridabad",
    "AICTE Approved College Haryana",
    "Engineering College Near Delhi NCR",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollegeOrUniversity",
              name: "Pt. L.R. College of Technology (PLRCT)",
              alternateName: "PLRCT Faridabad",
              url: "https://www.plrct.ac.in",
              foundingDate: "2011",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Faridabad",
                addressRegion: "Haryana",
                addressCountry: "IN",
              },
              areaServed: [
                "Faridabad",
                "Ballabgarh",
                "Palwal",
                "Gurugram",
                "Noida",
                "South Delhi",
                "Delhi NCR",
              ],
              hasCredential: "AICTE Approved",
            }),
          }}
        />

        <Navbar />

        <main id="main-content">{children}</main>
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}