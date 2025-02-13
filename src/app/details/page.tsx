import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ContactReport from "@/components/pages/details/contactReport";
import FundraisingCard from "@/components/pages/details/detailsCard";
import CampaignDetails from "@/components/pages/details/publicDetails";
import SlidingTabsComponent from "@/components/pages/details/slidingTab";

export default function Details() {
    return (
        <div>
            <Navbar />
            <FundraisingCard />

            <div className="flex items-center justify-center  bg-gray-100">
                <SlidingTabsComponent />
            </div>

            <CampaignDetails campaignerDetails={{
                campaigner: "Fathima",
                beneficiary: "Arjun",
                relation: "Friend",
                location: "Trivandrum"
            }} recentDonations={[{
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