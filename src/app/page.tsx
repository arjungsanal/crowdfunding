
import { AuthProvider } from "@/context/AuthContext";
import { HomePage } from "@/components/pages/home/home";
import { LoadingProvider } from "@/context/LoadingContext";
// import {
//   createThirdwebClient,
//   getContract,
//   resolveMethod,
// } from "thirdweb";
// import { defineChain } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";

// // create the client with your clientId, or secretKey if in a server environment
// export const client = createThirdwebClient({
//   clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
// });

// // connect to your contract
// export const contract = getContract({
//   client,
//   chain: ,defineChain(11155111)
//   address: "0x1609112877e1B6675a74f56e1c5d474a59EC184d",
// });


export default function Home() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ThirdwebProvider>
        <HomePage />
        </ThirdwebProvider>
      </AuthProvider>
    </LoadingProvider>

  );
}