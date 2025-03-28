
import { useState, useEffect } from "react";
import { RegionSelect } from "./RegionSelect";
import { CitySelect } from "./CitySelect";
import { ManualCityInput } from "./ManualCityInput";
import { LocationTextFields } from "./LocationTextFields";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
  const [useManualCityInput, setUseManualCityInput] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  
  // Debug
  useEffect(() => {
    console.log("LocationSelect state:", { 
      selectedRegion, 
      selectedCity,
      useManualCityInput 
    });
  }, [selectedRegion, selectedCity, useManualCityInput]);

  // Propagation des changements de ville au parent
  useEffect(() => {
    onCityChange(selectedCity);
  }, [selectedCity, onCityChange]);

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <Label className="mb-2 block">Région</Label>
        <RegionSelect
          onRegionChange={(region) => {
            console.log("Région sélectionnée dans LocationSelect:", region);
            setSelectedRegion(region);
            // Réinitialiser la ville quand la région change
            setSelectedCity("");
          }}
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Label>Ville</Label>
          <div className="flex items-center space-x-2">
            <Label htmlFor="manual-city-mode" className="text-xs text-muted-foreground">
              Saisie manuelle
            </Label>
            <Switch
              id="manual-city-mode"
              checked={useManualCityInput}
              onCheckedChange={setUseManualCityInput}
            />
          </div>
        </div>
        
        {useManualCityInput ? (
          <ManualCityInput 
            onCityChange={(city) => {
              setSelectedCity(city);
            }} 
          />
        ) : (
          <CitySelect 
            selectedRegion={selectedRegion} 
            onCityChange={(city) => {
              setSelectedCity(city);
            }} 
          />
        )}
      </div>

      <LocationTextFields 
        onDistrictChange={onDistrictChange}
        onNeighborhoodChange={onNeighborhoodChange}
      />
    </div>
  );
}
