
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { LocationSelect } from "@/components/property-search/LocationSelect";
import { useState } from "react";

export function LocationField() {
  const [geoLocation, setGeoLocation] = useState<{lat: number | null, lng: number | null}>({
    lat: null,
    lng: null
  });
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Label>Localisation</Label>
        <MapPin className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <LocationSelect
        onCityChange={(city) => {
          const form = document.querySelector('form');
          if (form) {
            const formData = new FormData(form);
            formData.set('city', city);
          }
        }}
        onNeighborhoodChange={(neighborhood) => {
          const form = document.querySelector('form');
          if (form) {
            const formData = new FormData(form);
            formData.set('neighborhood', neighborhood);
          }
        }}
        onDistrictChange={(district) => {
          const form = document.querySelector('form');
          if (form) {
            const formData = new FormData(form);
            formData.set('district', district);
          }
        }}
      />
    </div>
  );
}
