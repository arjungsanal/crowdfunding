
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { HomePage } from "@/components/pages/home/home";

export default function Home() {
  return (
    <AuthProvider>    
      <HomePage />
      <Toaster />
      </AuthProvider>
    
  );
}