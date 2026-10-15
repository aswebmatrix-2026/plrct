import type { Metadata } from "next";
<<<<<<< HEAD
import {
  Playfair_Display,
  Poppins,
  Inter,
  Space_Grotesk,
} from "next/font/google";
=======
import { Playfair_Display, Poppins, Inter, Space_Grotesk } from "next/font/google";
>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88

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
<<<<<<< HEAD
  weight: ["400", "500", "600", "700"],
=======
  weight: ["500", "600", "700"],
>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88
  variable: "--font-stat",
  display: "swap",
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title:
    "Pt. L.R. College of Technology Faridabad | Best Engineering & Professional College in Faridabad, Haryana",
  description:
    "Pt. L.R. College of Technology, Faridabad — AICTE approved engineering and professional college offering B.Tech, Diploma, BCA, BBA, MBA and Pharmacy with modern labs, experienced faculty and placement support across Faridabad, Haryana and Delhi NCR.",
=======
  title: "Pt. L.R. College of Technology Faridabad | Best Engineering & Professional College in Faridabad, Haryana",
  description:
    "Pt. L.R. College of Technology (Pt. L.R. College of Technology), Faridabad — AICTE approved engineering and professional college offering B.Tech, Diploma, BCA, BBA, MBA and Pharmacy with modern labs, experienced faculty and strong placement support across Faridabad, Haryana & Delhi NCR.",
>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88
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
<<<<<<< HEAD
              name: "Pt. L.R. College of Technology",
=======
              name: "Pt. L.R. College of Technology (Pt. L.R. College of Technology)",
>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88
              alternateName: "Pt. L.R. College of Technology Faridabad",
              url: "https://www.Pt. L.R. College of Technology.ac.in",
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
<<<<<<< HEAD
=======

>>>>>>> 4e3406f2a4599a0e45bbfba063bc28c0dad0fe88
        <main id="main-content">{children}</main>
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}