import Footer from "@/components/footer";

import AdminDashboard from "@/components/pages/admin/dashboard";
import { LoadingProvider } from "@/context/LoadingContext";
import { ThirdwebProvider } from "thirdweb/react";


export default function() {
    return(
        <>
            <LoadingProvider minDisplayTime={2000}>
            <ThirdwebProvider>
            <AdminDashboard />
            <Footer />
            </ThirdwebProvider>
            </LoadingProvider>
        </>

    )
}