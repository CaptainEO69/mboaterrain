
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
  const [loading, setLoading] = useState(false);
  const [locationInfo, setLocationInfo] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

  // Chargement des villes lorsqu'une région est sélectionnée
  useEffect(() => {
    async function fetchCities() {
      if (!selectedRegion) {
        setCities([]);
        return;
      }

      try {
        setLoading(true);
        
        // Récupérer l'ID de la région
        const { data: regionData, error: regionError } = await supabase
          .from('regions')
          .select('id')
          .eq('name', selectedRegion)
          .maybeSingle();
        
        if (regionError) {
          console.error('Erreur lors de la récupération de la région:', regionError);
          toast.error("Impossible de récupérer les informations de la région");
          setCities([]);
          setLoading(false);
          return;
        }
        
        if (!regionData) {
          console.error('Région non trouvée');
          setCities([]);
          setLoading(false);
          return;
        }
        
        console.log("Région sélectionnée:", regionData);
        
        // Récupérer les villes de la région
        const { data: citiesData, error: citiesError } = await supabase
          .from('cities')
          .select('id, name')
          .eq('region_id', regionData.id)
          .order('name');
        
        if (citiesError) {
          console.error('Erreur lors du chargement des villes:', citiesError);
          toast.error("Impossible de charger les villes");
          setCities([]);
        } else {
          console.log("Villes récupérées:", citiesData);
          setCities(citiesData || []);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des villes:', error);
        toast.error("Une erreur est survenue lors du chargement des villes");
        setCities([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, [selectedRegion]);
  
  // Fonction appelée lorsque la géolocalisation est réussie
  const handleLocationFound = async (latitude: number, longitude: number) => {
    try {
      setLocationInfo({ latitude, longitude });
      
      // Stockage temporaire des coordonnées
      localStorage.setItem('userLatitude', latitude.toString());
      localStorage.setItem('userLongitude', longitude.toString());
      
      toast.success("Position enregistrée avec succès");
      
      // Afficher les coordonnées
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
          setSelectedRegion(region);
          setSelectedCity("");
        }}
      />

      <div>
        <Label>Ville</Label>
        <Select
          value={selectedCity}
          onValueChange={(value) => {
            setSelectedCity(value);
            onCityChange(value);
          }}
          disabled={loading || !selectedRegion}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez une ville" />
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
                {loading ? "Chargement..." : "Aucune ville disponible"}
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
