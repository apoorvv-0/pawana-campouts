import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import WhyUs from "@/components/WhyUs";
import BundleBanner from "@/components/BundleBanner";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedSection />
        <WhyUs />
        <BundleBanner />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
