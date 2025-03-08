
import { useState, useEffect } from "react";
import { RegionSelect } from "./RegionSelect";
import { CitySelect } from "./CitySelect";
import { ManualCityInput } from "./ManualCityInput";
import { LocationTextFields } from "./LocationTextFields";
import { LocationDisplay } from "./LocationDisplay";
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
  
  // Debug
  useEffect(() => {
    console.log("LocationSelect state:", { selectedRegion, useManualCityInput });
  }, [selectedRegion, useManualCityInput]);

  return (
    <div className="space-y-4">
      <LocationDisplay />
      
      <RegionSelect
        onRegionChange={(region) => {
          console.log("Région sélectionnée dans LocationSelect:", region);
          setSelectedRegion(region);
        }}
      />

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
        <ManualCityInput onCityChange={onCityChange} />
      ) : (
        <CitySelect 
          selectedRegion={selectedRegion} 
          onCityChange={onCityChange} 
        />
      )}

      <LocationTextFields 
        onDistrictChange={onDistrictChange}
        onNeighborhoodChange={onNeighborhoodChange}
      />
    </div>
  );
}
