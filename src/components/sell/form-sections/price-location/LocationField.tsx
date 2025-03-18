
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { LocationSelect } from "@/components/property-search/LocationSelect";
import { useState } from "react";

export function LocationField() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('city', city);
    }
    console.log("Ville sélectionnée:", city);
  };
  
  const handleNeighborhoodChange = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('neighborhood', neighborhood);
    }
    console.log("Quartier saisi:", neighborhood);
  };
  
  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
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
      
      {/* Afficher la sélection actuelle */}
      {(selectedCity || selectedNeighborhood || selectedDistrict) && (
        <div className="mt-2 text-sm text-muted-foreground">
          {selectedCity && <div>Ville: {selectedCity}</div>}
          {selectedNeighborhood && <div>Quartier: {selectedNeighborhood}</div>}
          {selectedDistrict && <div>Arrondissement: {selectedDistrict}</div>}
        </div>
      )}
    </div>
  );
}
