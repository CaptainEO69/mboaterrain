
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { RegionSelect } from "./RegionSelect";
import { GeolocationButton } from "./GeolocationButton";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [loadingCities, setLoadingCities] = useState(false);
  const [locationInfo, setLocationInfo] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

  // Charger les villes lorsqu'une région est sélectionnée
  useEffect(() => {
    async function fetchCities() {
      if (!selectedRegion) {
        setCities([]);
        return;
      }

      try {
        setLoadingCities(true);
        console.log("Chargement des villes pour la région:", selectedRegion);
        
        // D'abord récupérer l'ID de la région
        const { data: regionData, error: regionError } = await supabase
          .from('regions')
          .select('id')
          .eq('name', selectedRegion)
          .single();
        
        if (regionError) {
          console.error('Erreur lors de la récupération de la région:', regionError);
          toast.error("Impossible de récupérer les informations de la région");
          setCities([]);
          return;
        }
        
        if (!regionData || !regionData.id) {
          console.error('Aucune donnée de région trouvée');
          toast.error("Région non trouvée");
          setCities([]);
          return;
        }
        
        console.log("Données de région trouvées:", regionData);
        
        // Puis récupérer les villes pour cette région
        const { data: citiesData, error: citiesError } = await supabase
          .from('cities')
          .select('id, name')
          .eq('region_id', regionData.id)
          .order('name');
        
        if (citiesError) {
          console.error('Erreur lors du chargement des villes:', citiesError);
          toast.error("Impossible de charger les villes");
          setCities([]);
        } else if (!citiesData || citiesData.length === 0) {
          console.log("Aucune ville trouvée pour cette région");
          toast.info("Aucune ville trouvée pour cette région");
          setCities([]);
        } else {
          console.log("Villes chargées:", citiesData);
          setCities(citiesData);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des villes:', error);
        toast.error("Une erreur est survenue lors du chargement des villes");
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    }

    fetchCities();
  }, [selectedRegion]);
  
  // Fonction appelée lorsque la géolocalisation réussit
  const handleLocationFound = async (latitude: number, longitude: number) => {
    try {
      setLocationInfo({ latitude, longitude });
      
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
      <div className="flex items-center justify-between">
        <Label>Région</Label>
        <GeolocationButton onLocationFound={handleLocationFound} />
      </div>
      
      {locationInfo.latitude && locationInfo.longitude && (
        <div className="text-xs text-muted-foreground">
          Position: {locationInfo.latitude.toFixed(4)}, {locationInfo.longitude.toFixed(4)}
        </div>
      )}
      
      <RegionSelect
        onRegionChange={(region) => {
          console.log("Région sélectionnée:", region);
          setSelectedRegion(region);
          setSelectedCity("");
        }}
      />

      <div>
        <Label>Ville</Label>
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
              <SelectValue placeholder={cities.length === 0 ? "Sélectionnez d'abord une région" : "Sélectionnez une ville"} />
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
                {loadingCities ? "Chargement..." : "Aucune ville disponible"}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Arrondissement</Label>
        <Input
          placeholder="Entrez l'arrondissement"
          onChange={(e) => onDistrictChange(e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <Label>Quartier</Label>
        <Input
          placeholder="Entrez le quartier"
          onChange={(e) => onNeighborhoodChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}
