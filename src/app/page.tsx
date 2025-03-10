
import { AuthProvider } from "@/context/AuthContext";
import { HomePage } from "@/components/pages/home/home";

export default function Home() {
  return (
    <AuthProvider>    
      <HomePage />
      </AuthProvider>
    
  );
}