
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { LocationSelect } from "@/components/property-search/LocationSelect";

export function LocationField() {
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
    </div>
  );
}
