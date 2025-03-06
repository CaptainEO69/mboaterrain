
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { LocationSelect } from "@/components/property-search/LocationSelect";
import { useState } from "react";

export function LocationField() {
  const [locationInfo, setLocationInfo] = useState<{lat: number | null, lng: number | null}>({
    lat: null,
    lng: null
  });
  
  const handleCityChange = (city: string) => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('city', city);
    }
    console.log("City selected:", city);
  };
  
  const handleNeighborhoodChange = (neighborhood: string) => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('neighborhood', neighborhood);
    }
    console.log("Neighborhood entered:", neighborhood);
  };
  
  const handleDistrictChange = (district: string) => {
    const form = document.querySelector('form');
    if (form) {
      const formData = new FormData(form);
      formData.set('district', district);
    }
    console.log("District entered:", district);
  };
  
  const handleLocationFound = (latitude: number, longitude: number) => {
    setLocationInfo({ lat: latitude, lng: longitude });
    console.log("Geolocation in LocationField:", { latitude, longitude });
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

      {locationInfo.lat && locationInfo.lng && (
        <div className="mt-2 text-xs text-muted-foreground">
          Coordonnées: {locationInfo.lat.toFixed(6)}, {locationInfo.lng.toFixed(6)}
        </div>
      )}
    </div>
  );
}
