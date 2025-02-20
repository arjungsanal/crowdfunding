import Footer from "@/components/footer";
import AdminNavbar from "@/components/pages/admin/adminNavbar";
import AdminDashboard from "@/components/pages/admin/dashboard";


export default function() {
    return(
        <>
            <AdminNavbar/>
            <AdminDashboard />
            <Footer />
        </>

    )
}