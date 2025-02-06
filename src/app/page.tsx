import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CampaignCard from "@/components/campaignCard";
import LiveCampaign from "@/components/liveCampaign";

export default function Home() {
  return (
    <div>
      <Navbar/>
      {/* <h1>Crowd Funding</h1> */}
      <LiveCampaign/>  
      {/* <CampaignCard/>     */}
       <Footer/>
    </div>

  );
}
