
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface GeolocationButtonProps {
  onLocationFound: (latitude: number, longitude: number) => void;
}

export function GeolocationButton({ onLocationFound }: GeolocationButtonProps) {
  // Fonction désactivée qui n'utilise pas la géolocalisation
  const handleClick = () => {
    console.log("Fonctionnalité de géolocalisation temporairement désactivée");
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      type="button"
      onClick={handleClick}
      disabled={true}
      className="text-xs flex items-center gap-1"
    >
      <MapPin className="h-3 w-3" />
      <span>Ma position (désactivé)</span>
    </Button>
  );
}
