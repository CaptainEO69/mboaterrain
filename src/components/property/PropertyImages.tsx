
import { PropertyImage } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface PropertyImagesProps {
  images: PropertyImage[];
  title: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function PropertyImages({ images, title, isFavorite, onToggleFavorite }: PropertyImagesProps) {
  const mainImage = images.find(img => img.is_main);
  const otherImages = images.filter(img => !img.is_main);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img
          src={mainImage?.image_url || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-full"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onToggleFavorite}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current text-red-500" : ""}`} />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {otherImages.map(image => (
          <div key={image.id} className="aspect-video rounded-lg overflow-hidden">
            <img
              src={image.image_url}
              alt={title}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
