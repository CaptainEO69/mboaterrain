
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { toast } from "sonner";

interface GeolocationButtonProps {
  onLocationFound: (latitude: number, longitude: number) => void;
}

export function GeolocationButton({ onLocationFound }: GeolocationButtonProps) {
  const { latitude, longitude, error, loading, success, getPosition } = useGeolocation();

  // Appeler le callback onLocationFound lorsque les coordonnées sont trouvées
  useEffect(() => {
    if (success && latitude !== null && longitude !== null) {
      console.log("Coordonnées trouvées:", { latitude, longitude });
      onLocationFound(latitude, longitude);
      toast.success("Position trouvée avec succès");
    }
  }, [success, latitude, longitude, onLocationFound]);

  // Afficher une notification d'erreur si nécessaire
  useEffect(() => {
    if (error) {
      console.error("Erreur de géolocalisation:", error);
      toast.error(`Erreur de géolocalisation: ${error}`);
    }
  }, [error]);

  const handleClick = () => {
    toast.info("Recherche de votre position...");
    getPosition();
  };

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
