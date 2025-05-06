
import { AuthProvider } from "@/context/AuthContext";
import { HomePage } from "@/components/pages/home/home";
import { LoadingProvider } from "@/context/LoadingContext";

export default function Home() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </LoadingProvider>

  );
}