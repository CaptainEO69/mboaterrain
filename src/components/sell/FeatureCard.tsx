import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
      <Icon className="w-6 h-6" />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-75">{description}</p>
      </div>
    </div>
  );
}