
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
import { CAMEROON_CITIES } from "@/components/chat/data/citiesData";

interface CitySelectProps {
  selectedRegion: string;
  onCityChange: (city: string) => void;
}

export function CitySelect({ selectedRegion, onCityChange }: CitySelectProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const { cities, loadingCities } = useCitySelector(selectedRegion);
  const [localCities, setLocalCities] = useState<{ id: string; name: string }[]>([]);
  const [useFallback, setUseFallback] = useState(false);

  // Réinitialiser la ville sélectionnée quand la région change
  useEffect(() => {
    setSelectedCity("");
    onCityChange(""); // Réinitialiser aussi la valeur dans le composant parent
  }, [selectedRegion, onCityChange]);

  // Utiliser les données locales si aucune ville n'est trouvée dans la base de données
  useEffect(() => {
    if (!loadingCities && cities.length === 0 && selectedRegion) {
      // Si la base de données n'a pas de villes pour cette région, utiliser les données locales
      setUseFallback(true);
      
      // Chercher dans les données locales
      const regionCities = CAMEROON_CITIES[selectedRegion] || [];
      const formattedCities = regionCities.map((city, index) => ({
        id: `local-${index}`,
        name: city.name
      }));
      
      setLocalCities(formattedCities);
      console.log("Utilisation des données locales pour", selectedRegion, ":", formattedCities);
    } else {
      setUseFallback(false);
    }
  }, [loadingCities, cities, selectedRegion]);

  // Déterminer les villes à afficher (depuis la base de données ou les données locales)
  const displayCities = useFallback ? localCities : cities;
  const hasNoCities = !loadingCities && displayCities.length === 0;

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
              : "Sélectionnez une ville"
          } />
        )}
      </SelectTrigger>
      <SelectContent>
        {displayCities && displayCities.length > 0 ? (
          displayCities.map((city) => (
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
