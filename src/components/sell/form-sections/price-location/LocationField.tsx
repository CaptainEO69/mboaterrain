
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { LocationSelect } from "@/components/property-search/LocationSelect";
import { GeolocationButton } from "@/components/property-search/GeolocationButton";
import { useLocationStorage } from "@/hooks/useLocationStorage";

export function LocationField() {
  const { location, saveLocation, hasLocation } = useLocationStorage();
  
  const handleCityChange = (city: string) => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('city', city);
    }
    console.log("Ville sélectionnée:", city);
  };
  
  const handleNeighborhoodChange = (neighborhood: string) => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('neighborhood', neighborhood);
    }
    console.log("Quartier saisi:", neighborhood);
  };
  
  const handleDistrictChange = (district: string) => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('district', district);
    }
    console.log("Arrondissement saisi:", district);
  };
  
  const handleLocationFound = (latitude: number, longitude: number) => {
    // Utiliser notre nouveau hook pour sauvegarder les coordonnées
    saveLocation(latitude, longitude);
    
    // Ajouter les coordonnées au formulaire
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('latitude', latitude.toString());
      formData.set('longitude', longitude.toString());
    }
    
    console.log("Géolocalisation dans LocationField:", { latitude, longitude });
  };
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Label>Localisation</Label>
        <MapPin className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <LocationSelect
        onCityChange={handleCityChange}
        onNeighborhoodChange={handleNeighborhoodChange}
        onDistrictChange={handleDistrictChange}
      />

      <div className="mt-4 flex items-center gap-2">
        <Label className="text-sm">Position exacte:</Label>
        <GeolocationButton onLocationFound={handleLocationFound} />
      </div>

      {hasLocation && location.latitude && location.longitude && (
        <div className="mt-2 text-xs text-muted-foreground">
          Coordonnées: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
        </div>
      )}
    </div>
  );
}
