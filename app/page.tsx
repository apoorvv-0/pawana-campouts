import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProofBar from "@/components/SocialProofBar";
import FeaturedSection from "@/components/FeaturedSection";
import WhyUs from "@/components/WhyUs";
import BundleBanner from "@/components/BundleBanner";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const FAQ_ITEMS = [
  {
    question: "How far is Pawana Lake from Pune?",
    answer: "Pawana Lake is approximately 55 km from Pune, about a 1.5 to 2 hour drive via the Pune-Mumbai Expressway. It's one of the most accessible weekend getaway destinations from Pune.",
  },
  {
    question: "What is the best time to visit Pawana Lake?",
    answer: "The best time to visit is from October to March when the weather is pleasant and cool. However, the monsoon season (July-September) transforms the landscape into lush greenery and is popular for its dramatic beauty. We operate year-round with weatherproof tents and sheltered accommodations.",
  },
  {
    question: "Is camping at Pawana Lake safe?",
    answer: "Absolutely. Safety is our top priority. All our campsites have trained staff, first aid kits, fire safety equipment, and emergency vehicle access. Activities like kayaking include certified life vests and professional guides. We've safely hosted over 2,000 guests.",
  },
  {
    question: "What activities are available near Pawana Lake?",
    answer: "We offer guided lake kayaking, Tikona Fort sunrise treks, lakeside bonfires with acoustic music, night stargazing sessions, and BBQ evenings. You can bundle activities with your stay for up to 30% savings.",
  },
  {
    question: "Can I bring pets to Pawana Campouts?",
    answer: "Yes! Most of our properties are pet-friendly. Look for the 'Pet Friendly' tag on property listings. We recommend keeping pets leashed in common areas and bringing their food and bowls.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "We offer free cancellation with 100% refund up to 7 days before check-in. Cancellations 3-7 days before check-in receive a 50% refund. Less than 72 hours before check-in, no refund is provided. Weather-related cancellations receive a full credit note.",
  },
  {
    question: "How do I book a stay at Pawana Campouts?",
    answer: "You can book directly through our website by selecting a property and clicking 'Book Now', or reach out to us on WhatsApp at +91 83296 49001 for instant confirmation and personalized recommendations.",
  },
];

// JSON-LD FAQPage schema for SEO
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <SocialProofBar />
        <FeaturedSection />
        <WhyUs />
        <BundleBanner />
        <Testimonials />
        <FAQ items={FAQ_ITEMS} />
      </main>
      <Footer />
    </>
  );
}
