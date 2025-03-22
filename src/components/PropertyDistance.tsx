
import { MapPin } from "lucide-react";

interface PropertyDistanceProps {
  distance: number | null;
  className?: string;
}

export function PropertyDistance({ distance, className = "" }: PropertyDistanceProps) {
  if (distance === null) return null;
  
  // Formater la distance
  const formattedDistance = distance < 1 
    ? `${Math.round(distance * 1000)} m de vous` 
    : `${distance} km de vous`;
  
  return (
    <div className={`flex items-center text-sm text-gray-600 ${className}`}>
      <MapPin className="w-3 h-3 mr-1" />
      <span>{formattedDistance}</span>
    </div>
  );
}
