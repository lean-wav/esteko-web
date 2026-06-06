import Navbar from "@/components/Navbar";
import HeroAssembly from "@/components/HeroAssembly";
import ServicesGrid from "@/components/ServicesGrid";
import ProcessTimeline from "@/components/ProcessTimeline";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Main navigation */}
      <Navbar />

      {/* Main layout contents */}
      <main className="flex-1 w-full bg-brand-bg relative">
        {/* Scroll structural assembly Hero */}
        <HeroAssembly />

        {/* Services grid (2x2 with full-screen details) */}
        <ServicesGrid />

        {/* Horizontal scroll process timeline */}
        <ProcessTimeline />

        {/* Final contact and budget form */}
        <ContactCTA />
      </main>

      {/* Footer watermark branding */}
      <Footer />
    </>
  );
}

