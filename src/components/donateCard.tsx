import { Card, CardContent } from "@/components/ui/card";

interface DonateCardProps {
  stepNumber: number;
  heading: string;
  description: string;
}

function DonateCard({ stepNumber, heading, description }: DonateCardProps) {
  return (
    <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow rounded-xl bg-white dark:bg-gray-900 p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-red-100 dark:from-gray-800 dark:to-transparent opacity-50"></div>
      
      <CardContent className="relative z-10 flex flex-col items-start gap-3">
        {/* Step Number */}
        <div className="text-5xl font-extrabold text-blue-500 dark:text-blue-400">
          {stepNumber}
        </div>

        {/* Heading */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {heading}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export default DonateCard;