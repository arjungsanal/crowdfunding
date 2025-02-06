import { Button } from "@/components/ui/button";

function HeroSection() {
  return (
    <section className="w-full bg-gray-100 py-10 px-4 md:px-8 lg:px-12 xl:px-20">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left Content Section */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Fund Your Dreams with
            <span className="text-blue-600 dark:text-blue-400"> CrestFunding</span>
          </h1>
          <p className="text-gray-600 md:text-lg lg:text-xl">
            Turn your innovative ideas into reality. Join our platform to create meaningful campaigns and make a difference.
          </p>
          <div>
            <Button size="lg" asChild>
              <a href="/campaign/create">Start a Campaign</a>
            </Button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src="/assets/heroimage.png"
            alt="Hero Image"
            className="rounded-lg object-cover w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
