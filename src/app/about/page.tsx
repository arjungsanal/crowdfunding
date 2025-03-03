import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface Purpose {
  title: string
  description: string
}

interface TeamMember {
  name: string
  role: string
  image: string
  initials: string
}

const purposes: Purpose[] = [
  {
    title: "Decentralized Governance ",
    description: " The community can participate in decision-making, ensuring that the most deserving campaigns receive visibility and support"
  },
  {
    title: "Transparent and Secure Fundraising ",
    description: "Utilizing blockchain technology, every donation and fund transfer is recorded on a public ledger, ensuring complete transparency and preventing fraud"
  },
  {
    title: "Smart Contract Automation",
    description: "Funds are released automatically based on predefined milestones, ensuring donors' contributions are used as intended while providing accountability for fundraisers"
  }
]

const team: TeamMember[] = [
  {
    name: "Arjun G S",
    role: "Founder & CEO",
    image: "https://imgs.search.brave.com/ql4hU-SPpqm8vU1dBZz4dQD4W7O0LemxMt3qsQ-MQE8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvcHJl/dHR5LXByb2ZpbGUt/cGljdHVyZXMtbjNn/MDllODAxZzM2ZG1o/MC5qcGc",
    initials: "A"
  },
  {
    name: "Fathima Sulthana H",
    role: "Tech Lead",
    image: "https://imgs.search.brave.com/3XTvoD3-aTCfEfruafWutlezVEIrhPeBkjr44DtCKFg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvcHJl/dHR5LXByb2ZpbGUt/cGljdHVyZXMtNHQ0/eWZyczRtZGg4M2Nr/Ny5qcGc",
    initials: "F"
  },
  {
    name: "Stephy Jacob",
    role: "Operations Lead",
    image: "https://imgs.search.brave.com/mh04i5y-xX7D2X0Mk77o8TPiPGN8ydBrK-ZG4Cja7-E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvcHJl/dHR5LXByb2ZpbGUt/cGljdHVyZXMtbnhr/cHk5ZHUydnFtaXlv/NC5qcGc",
    initials: "S"
  }
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - Reduced padding */}
        <section className="relative overflow-hidden bg-black py-16 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black" />
          <div className="relative container">
            <div className="mx-auto max-w-2xl text-center text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                About Us
              </h1>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Building the future of crowdfunding through transparent,
                community-driven support for innovative projects.
              </p>
            </div>
          </div>
        </section>

        {/* Purpose Section - Reduced padding and margins */}
        <section className="py-12 sm:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Purpose
              </h2>
              <Separator className="my-4 mx-auto w-12 bg-black" />
            </div>
            <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              {purposes.map((item, index) => (
                <Card 
                  key={index} 
                  className="border-none bg-gray-50 transition-transform hover:-translate-y-1"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section - Reduced padding and margins */}
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Team
              </h2>
              <Separator className="my-4 mx-auto w-12 bg-black" />
            </div>
            <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              {team.map((member, index) => (
                <Card 
                  key={index} 
                  className="border-none bg-white transition-transform hover:-translate-y-1"
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Avatar className="h-20 w-20 mx-auto ring-4 ring-black/5">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="bg-black text-white">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">{member.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section - Reduced padding */}
        <section className="w-full py-12 bg-slate-50 text-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              <span className="text-black-100">Empower Change. </span>Contribute Today.
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Join a global community of changemakers. Your support, no matter the size, helps create a better future for everyone.
            </p>
            <button className="mt-6 px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray transition duration-300 transform hover:scale-105">
              Start Making A Difference
            </button>
          </div>
          {/* Gradient overlay for a modern touch */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-primary/50 to-transparent"></div>
        </section>
      </main>

      <Footer />
    </div>
  )
}