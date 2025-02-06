import StepsCard from "./stepsCard";

function StepsSection() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">How to start a campaign?</h2>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-4 ">
        <StepsCard
          stepNumber={1}
          heading="Sign Up"
          description="Create an account to get started with our platform."
        />
        <StepsCard
          stepNumber={2}
          heading="Create a Campaign"
          description="Set up your campaign and share your story with the world."
        />
        <StepsCard
          stepNumber={3}
          heading="Reach Your Goals"
          description="Track your progress and achieve your funding targets."
        />
      </div>
    </div>
  );
}

export default StepsSection;
