import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import ContactModal from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
      <ContactModal />
    </main>
  );
}
