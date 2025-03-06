import { useState } from "react";
import { RegionSelect } from "./RegionSelect";
import { CitySelect } from "./CitySelect";
import { LocationTextFields } from "./LocationTextFields";
import { LocationDisplay } from "./LocationDisplay";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface LocationSelectProps {
  onCityChange: (city: string) => void;
  onNeighborhoodChange: (neighborhood: string) => void;
  onDistrictChange: (district: string) => void;
}

export function LocationSelect({ 
  onCityChange, 
  onNeighborhoodChange,
  onDistrictChange
}: LocationSelectProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  // Fonction appelée lorsque la géolocalisation réussit
  const handleLocationFound = async (latitude: number, longitude: number) => {
    try {
      // Stocker les coordonnées temporairement
      localStorage.setItem('userLatitude', latitude.toString());
      localStorage.setItem('userLongitude', longitude.toString());
      
      toast.success("Position enregistrée avec succès");
      console.log("Coordonnées géographiques:", { latitude, longitude });
    } catch (error) {
      console.error('Erreur lors du traitement de la géolocalisation:', error);
      toast.error("Erreur lors du traitement de votre localisation");
    }
  };

  return (
    <div className="space-y-4">
      <LocationDisplay onLocationFound={handleLocationFound} />
      
      <RegionSelect
        onRegionChange={(region) => {
          console.log("Région sélectionnée:", region);
          setSelectedRegion(region);
        }}
      />

      <div>
        <Label>Ville</Label>
        <CitySelect 
          selectedRegion={selectedRegion} 
          onCityChange={onCityChange} 
        />
      </div>

      <LocationTextFields 
        onDistrictChange={onDistrictChange}
        onNeighborhoodChange={onNeighborhoodChange}
      />
    </div>
  );
}
