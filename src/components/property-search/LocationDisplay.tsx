
import { Label } from "@/components/ui/label";
import { useLocationStorage } from "@/hooks/useLocationStorage";

export function LocationDisplay() {
  // N'utilisons plus la géolocalisation
  const { location, hasLocation } = useLocationStorage();

  return (
    <>
      <div className="flex items-center justify-between">
        <Label>Région</Label>
      </div>
      
      {hasLocation && location.latitude && location.longitude && (
        <div className="text-xs text-muted-foreground">
          Position: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </div>
      )}
    </>
  );
}
