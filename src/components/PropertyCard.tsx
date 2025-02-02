import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { Button } from "./ui/button";

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  size: string;
  imageUrl: string;
  className?: string;
}

export function PropertyCard({ id, title, price, location, size, imageUrl, className }: PropertyCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const favorite = isFavorite(id);

  return (
    <Link to={`/property/${id}`} className={cn("block rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow", className)}>
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            if (favorite) {
              removeFromFavorites(id);
            } else {
              addToFavorites(id);
            }
          }}
        >
          <Heart className={cn("w-5 h-5", favorite ? "fill-cmr-red text-cmr-red" : "text-cmr-red")} />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-cmr-green font-bold text-xl mb-2">{price}</p>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{location}</span>
          <span>{size}</span>
        </div>
      </div>
    </Link>
  );
}