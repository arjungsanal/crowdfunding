import DonateSteps from "@/components/donateSteps"
import Footer from "@/components/footer"
import HeroSection from "@/components/heroSection"
import LiveCampaign from "@/components/liveCampaign"
import Navbar from "@/components/navbar"
import PlatformFeatures from "@/components/platformFeatures"
import StepsSection from "@/components/stepsSection"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export const HomePage = () => {
  return (
   <>
   <Navbar />
      <HeroSection />
      <LiveCampaign />
      <StepsSection/>
      <DonateSteps/>
      <PlatformFeatures />

      {/* Redesigned Tagline Section */}
      <section className="w-full py-20 bg-slate-50 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            <span className="text-blue-600">Empower Change. </span>Contribute Today.
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Join a global community of changemakers. Your support, no matter the size, helps create a better future for everyone.
          </p>
          <Button asChild className="mt-10 px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            <Link href="/listings">Start Making A Difference</Link>
          </Button>
        </div>
        {/* Gradient overlay for a modern touch */}
        {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/50 to-transparent"></div> */}
      </section>

      <Footer />
   </>
  )
}
