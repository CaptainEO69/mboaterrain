import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  title: string;
  price: string;
  location: string;
  size: string;
  imageUrl: string;
  className?: string;
}

export function PropertyCard({ title, price, location, size, imageUrl, className }: PropertyCardProps) {
  return (
    <div className={cn("rounded-lg overflow-hidden shadow-md bg-white", className)}>
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
          <Heart className="w-5 h-5 text-cmr-red" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-cmr-green font-bold text-xl mb-2">{price}</p>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{location}</span>
          <span>{size}</span>
        </div>
      </div>
    </div>
  );
}