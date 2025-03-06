
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useCitySelector } from "@/hooks/useCitySelector";

interface CitySelectProps {
  selectedRegion: string;
  onCityChange: (city: string) => void;
}

export function CitySelect({ selectedRegion, onCityChange }: CitySelectProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const { cities, loadingCities } = useCitySelector(selectedRegion);

  return (
    <Select
      value={selectedCity}
      onValueChange={(value) => {
        console.log("Ville sélectionnée:", value);
        setSelectedCity(value);
        onCityChange(value);
      }}
      disabled={loadingCities || !selectedRegion}
    >
      <SelectTrigger className="w-full">
        {loadingCities ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Chargement des villes...</span>
          </div>
        ) : (
          <SelectValue placeholder={
            !selectedRegion 
              ? "Sélectionnez d'abord une région" 
              : (cities.length === 0 ? "Aucune ville disponible pour cette région" : "Sélectionnez une ville")
          } />
        )}
      </SelectTrigger>
      <SelectContent>
        {cities.length > 0 ? (
          cities.map((city) => (
            <SelectItem key={city.id} value={city.name}>
              {city.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-cities" disabled>
            {loadingCities 
              ? "Chargement..." 
              : (!selectedRegion 
                  ? "Sélectionnez d'abord une région" 
                  : "Aucune ville disponible pour cette région"
                )
            }
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
