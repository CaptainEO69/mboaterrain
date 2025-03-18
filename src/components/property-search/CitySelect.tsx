
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useCitySelector } from "@/hooks/useCitySelector";
import { Skeleton } from "@/components/ui/skeleton";

interface CitySelectProps {
  selectedRegion: string;
  onCityChange: (city: string) => void;
}

export function CitySelect({ selectedRegion, onCityChange }: CitySelectProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const { cities, loadingCities, error, useFallback } = useCitySelector(selectedRegion);

  // Réinitialiser la ville sélectionnée quand la région change
  useEffect(() => {
    setSelectedCity("");
    onCityChange(""); // Réinitialiser aussi la valeur dans le composant parent
  }, [selectedRegion, onCityChange]);

  // Afficher l'état actuel du chargement des villes
  useEffect(() => {
    console.log("État du CitySelect:", { 
      selectedRegion, 
      citiesCount: cities.length, 
      loadingCities, 
      useFallback,
      error: error?.message
    });
  }, [selectedRegion, cities, loadingCities, useFallback, error]);

  const handleCityChange = (value: string) => {
    console.log("Ville sélectionnée:", value);
    setSelectedCity(value);
    onCityChange(value);
  };

  if (loadingCities) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <Select
      value={selectedCity}
      onValueChange={handleCityChange}
      disabled={!selectedRegion}
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
              : "Sélectionnez une ville"
          } />
        )}
      </SelectTrigger>
      <SelectContent>
        {cities && cities.length > 0 ? (
          cities.map((city) => (
            <SelectItem key={city.id} value={city.name}>
              {city.name}
              {useFallback && city.id.startsWith('local-') && ' (données locales)'}
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
