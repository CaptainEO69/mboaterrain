
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useEffect } from "react";
import { toast } from "sonner";

interface GeolocationButtonProps {
  onLocationFound: (latitude: number, longitude: number) => void;
}

export function GeolocationButton({ onLocationFound }: GeolocationButtonProps) {
  const { 
    latitude, 
    longitude, 
    error, 
    loading, 
    success,
    getPosition 
  } = useGeolocation();

  // When geolocation is successful, call the callback
  useEffect(() => {
    if (success && latitude && longitude) {
      onLocationFound(latitude, longitude);
    }
  }, [success, latitude, longitude, onLocationFound]);

  // Show error toast when geolocation fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Button 
      variant="outline" 
      size="sm" 
      type="button"
      onClick={getPosition}
      disabled={loading}
      className="text-xs flex items-center gap-1"
    >
      <MapPin className="h-3 w-3" />
      {loading ? "Localisation..." : "Ma position"}
    </Button>
  );
}
