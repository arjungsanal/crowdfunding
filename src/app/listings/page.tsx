import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroSection from "@/components/heroSection";
import LiveCampaign from "@/components/pages/listings/listings";

export default function Listings() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <LiveCampaign />
            <Footer />
        </div>
    );
}