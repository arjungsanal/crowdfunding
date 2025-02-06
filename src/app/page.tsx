import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CampaignCard from "@/components/campaignCard";
import LiveCampaign from "@/components/liveCampaign";
import HeroSection from "@/components/heroSection";
import StepsSection from "@/components/stepsSection";
import DonateSteps from "@/components/donateSteps";

export default function Home() {
  return (
    <div>
      <Navbar/>
      {/* <h1>Crowd Funding</h1> */}
      <HeroSection/>
      <LiveCampaign/>  
      {/* <CampaignCard/>     */}
      <StepsSection/>
      <DonateSteps/>
      <Footer/>
    </div>

  );
}

// https://media.istockphoto.com/id/2153926949/photo/donate-to-charity-donation-concept-give-help-by-sending-money.webp?a=1&b=1&s=612x612&w=0&k=20&c=xuPRedAKdmYdJhMHHRqKO2FG4aOk_ub2iIJLOLiT5Fc=