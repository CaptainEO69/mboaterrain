
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

  // Lorsque la géolocalisation réussit, appeler le callback
  useEffect(() => {
    if (success && latitude && longitude) {
      console.log("Géolocalisation réussie, envoi des coordonnées:", latitude, longitude);
      onLocationFound(latitude, longitude);
    }
  }, [success, latitude, longitude, onLocationFound]);

  // Afficher un toast d'erreur lorsque la géolocalisation échoue
  useEffect(() => {
    if (error) {
      console.error("Erreur de géolocalisation dans le composant:", error);
      toast.error(`Erreur de géolocalisation: ${error}`);
      resetGeolocation();
    }
  }, [error, resetGeolocation]);

  // Gérer le clic sur le bouton
  const handleGeolocationClick = () => {
    if (loading) return;
    
    // Effacer les erreurs précédentes
    resetGeolocation();
    
    // Demander la position
    console.log("Demande de géolocalisation...");
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
