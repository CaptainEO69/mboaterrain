
import { Label } from "@/components/ui/label";
import { GeolocationButton } from "./GeolocationButton";
import { useLocationStorage } from "@/hooks/useLocationStorage";

interface LocationDisplayProps {
  onLocationFound: (latitude: number, longitude: number) => void;
}

export function LocationDisplay({ onLocationFound }: LocationDisplayProps) {
  const { location, hasLocation } = useLocationStorage();

  // La fonction de géolocalisation est désactivée
  const handleLocationFound = (latitude: number, longitude: number) => {
    onLocationFound(latitude, longitude);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Label>Région</Label>
        <GeolocationButton onLocationFound={handleLocationFound} />
      </div>
      
      {hasLocation && location.latitude && location.longitude && (
        <div className="text-xs text-muted-foreground">
          Position: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </div>
      )}
    </>
  );
}
