import type { Metadata } from "next";
import { Outfit, Lexend } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const lexend = Lexend({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Pawana Campouts — Stays, Activities & Bundles near Pawana Lake",
  description:
    "Book curated camping, cottages, villas, activities, and complete weekend bundles near Pawana Lake. Better prices, zero hassle.",
  keywords: [
    "Pawana Lake camping",
    "Pawana campouts",
    "lakeside camping",
    "weekend getaway Pune",
    "Pawana cottages",
    "adventure activities Pawana",
  ],
  openGraph: {
    title: "Pawana Campouts — Your Complete Pawana Escape",
    description:
      "Stays, activities, and complete weekend bundles near Pawana Lake.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${lexend.variable}`}>
      <body>{children}</body>
    </html>
  );
}
