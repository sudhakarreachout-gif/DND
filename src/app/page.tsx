import HeroSection from "@/components/HeroSection";
import EthosSection from "@/components/EthosSection";
import AtelierTeam from "@/components/AtelierTeam";
import ServicesOverview from "@/components/ServicesOverview";
import MasonryGallery from "@/components/MasonryGallery";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas">
      <HeroSection />
      <EthosSection />
      <AtelierTeam />
      <ServicesOverview />
      <MasonryGallery />
      <BookingForm />
      <Footer />
    </main>
  );
}
