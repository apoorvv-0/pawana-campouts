import type { Metadata } from "next";
import { Outfit, Lexend } from "next/font/google";
import "./globals.css";
import WhatsAppFloat from "@/components/WhatsAppFloat";

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
  metadataBase: new URL("https://pawanacampouts.com"),
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
    "camping near Pune",
    "Pawana Lake stays",
    "best camping Pawana",
  ],
  openGraph: {
    title: "Pawana Campouts — Your Complete Pawana Escape",
    description:
      "Stays, activities, and complete weekend bundles near Pawana Lake.",
    type: "website",
    siteName: "Pawana Campouts",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawana Campouts — Stays & Activities near Pawana Lake",
    description: "Book curated camping, cottages, villas near Pawana Lake.",
  },
  alternates: {
    canonical: "https://pawanacampouts.com",
  },
};

// JSON-LD LocalBusiness schema
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://pawanacampouts.com",
  name: "Pawana Campouts",
  description: "Curated camping, cottages, villas, activities, and weekend bundles near Pawana Lake, Lonavala. Best prices, zero hassle.",
  url: "https://pawanacampouts.com",
  telephone: "+918329649001",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Pawana Lake, Thakursai Village",
    addressLocality: "Lonavala",
    addressRegion: "Maharashtra",
    postalCode: "410406",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.6868,
    longitude: 73.4918,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "21:00",
  },
  priceRange: "₹1,200 - ₹25,000",
  image: "https://pawanacampouts.com/images/hero-landscape.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "47",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${lexend.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
