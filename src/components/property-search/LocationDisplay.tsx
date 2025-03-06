
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { GeolocationButton } from "./GeolocationButton";

interface LocationDisplayProps {
  onLocationFound: (latitude: number, longitude: number) => void;
}

export function LocationDisplay({ onLocationFound }: LocationDisplayProps) {
  const [locationInfo, setLocationInfo] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

  const handleLocationFound = (latitude: number, longitude: number) => {
    setLocationInfo({ latitude, longitude });
    onLocationFound(latitude, longitude);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Label>Région</Label>
        <GeolocationButton onLocationFound={handleLocationFound} />
      </div>
      
      {locationInfo.latitude && locationInfo.longitude && (
        <div className="text-xs text-muted-foreground">
          Position: {locationInfo.latitude.toFixed(4)}, {locationInfo.longitude.toFixed(4)}
        </div>
      )}
    </>
  );
}
