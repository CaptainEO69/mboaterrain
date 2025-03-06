
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
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
    getPosition,
    resetGeolocation 
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
      toast.error(`Erreur de géolocalisation: ${error}`);
      resetGeolocation();
    }
  }, [error, resetGeolocation]);

  // Handle button click
  const handleGeolocationClick = () => {
    if (loading) return;
    
    // Clear any previous errors
    resetGeolocation();
    
    // Request position
    getPosition();
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      type="button"
      onClick={handleGeolocationClick}
      disabled={loading}
      className="text-xs flex items-center gap-1"
    >
      {loading ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Localisation...</span>
        </>
      ) : (
        <>
          <MapPin className="h-3 w-3" />
          <span>Ma position</span>
        </>
      )}
    </Button>
  );
}
