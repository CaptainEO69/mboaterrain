
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { toast } from "sonner";

interface GeolocationButtonProps {
  onLocationFound: (latitude: number, longitude: number) => void;
}

export function GeolocationButton({ onLocationFound }: GeolocationButtonProps) {
  const [isLocating, setIsLocating] = useState(false);
  const { latitude, longitude, error, loading, getPosition } = useGeolocation();

  const handleClick = () => {
    setIsLocating(true);
    getPosition();
  };

  // Effet lorsque les coordonnées sont trouvées ou une erreur survient
  if (latitude && longitude && isLocating) {
    onLocationFound(latitude, longitude);
    setIsLocating(false);
    toast.success("Position trouvée !");
  }

  if (error && isLocating) {
    toast.error(`Erreur de géolocalisation: ${error}`);
    setIsLocating(false);
  }

  return (
    <Button 
      type="button" 
      variant="outline" 
      size="sm" 
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2"
    >
      <MapPin className="h-4 w-4" />
      {loading ? "Localisation..." : "Me localiser"}
    </Button>
  );
}
