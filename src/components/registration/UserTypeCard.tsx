import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface UserTypeCardProps {
  type: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: "green" | "red" | "yellow";
}

const colorClasses = {
  green: "hover:border-cmr-green hover:bg-cmr-green/5 text-cmr-green",
  red: "hover:border-cmr-red hover:bg-cmr-red/5 text-cmr-red",
  yellow: "hover:border-cmr-yellow hover:bg-cmr-yellow/5 text-cmr-yellow",
};

export function UserTypeCard({ type, title, description, icon: Icon, color }: UserTypeCardProps) {
  const colorClass = colorClasses[color];
  
  return (
    <Link to={`/register/form?type=${type}`}>
      <Button 
        variant="outline" 
        className={`w-full justify-start h-auto p-4 ${colorClass}`}
      >
        <Icon className="h-8 w-8 mr-4" />
        <div className="text-left">
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
      </Button>
    </Link>
  );
}