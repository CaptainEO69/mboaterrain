
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { GeolocationButton } from "./GeolocationButton";
import { useLocationStorage } from "@/hooks/useLocationStorage";

interface LocationDisplayProps {
  onLocationFound: (latitude: number, longitude: number) => void;
}

export function LocationDisplay({ onLocationFound }: LocationDisplayProps) {
  const { location, saveLocation, hasLocation } = useLocationStorage();
  const [showCoordinates, setShowCoordinates] = useState(false);

  const handleLocationFound = (latitude: number, longitude: number) => {
    // Sauvegarder les coordonnées avec notre hook
    saveLocation(latitude, longitude);
    setShowCoordinates(true);
    // Remonter l'information au parent
    onLocationFound(latitude, longitude);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Label>Région</Label>
        <GeolocationButton onLocationFound={handleLocationFound} />
      </div>
      
      {(hasLocation || showCoordinates) && location.latitude && location.longitude && (
        <div className="text-xs text-muted-foreground">
          Position: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </div>
      )}
    </>
  );
}
