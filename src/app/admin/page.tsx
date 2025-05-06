import Footer from "@/components/footer";

import AdminDashboard from "@/components/pages/admin/dashboard";
import { LoadingProvider } from "@/context/LoadingContext";


export default function() {
    return(
        <>
            <LoadingProvider minDisplayTime={2000}>
            <AdminDashboard />
            <Footer />
            </LoadingProvider>
        </>

    )
}