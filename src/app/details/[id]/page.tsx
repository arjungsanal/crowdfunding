import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ContactReport from "@/components/pages/details/contactReport";
import FundraisingCard from "@/components/pages/details/detailsCard";
import CampaignDetails from "@/components/pages/details/publicDetails";
import SlidingTabsComponent from "@/components/pages/details/slidingTab";
import { campaignStatus, fetchCampaignDetails } from "@/util/helper";



export default async function Details({ params }: { params: { id: string } }) {

    const { id } = await params;
    console.log("Campaign ID:", id);

    // Fetch campaign details using the id
    const campaignDetails = await fetchCampaignDetails(id);
    console.log("Campaign Details:", campaignDetails);

    //Fetch campaign status
    const campaignStatusDetails = await campaignStatus(id);
    console.log("Campaign Status:", campaignStatusDetails);

    return (
        <div>
            <Navbar />
            <FundraisingCard campaignData={campaignDetails} campaignStatusDetails={campaignStatusDetails} />

            <div className="flex items-center justify-center  bg-gray-100">
                <SlidingTabsComponent campaignData={campaignDetails}/>
            </div>

            <CampaignDetails campaignerDetails={campaignDetails} recentDonations={[{
                donorName: 'arjun',
                id: "yugyuguyg",
                amount: 552225552,
                timestamp: "2022"
            }]} />

            <ContactReport />
            <Footer />

        </div>
    );
}