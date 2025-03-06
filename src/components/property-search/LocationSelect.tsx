
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
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [locationInfo, setLocationInfo] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

  useEffect(() => {
    async function fetchCities() {
      if (selectedRegion) {
        try {
          const { data, error } = await supabase
            .from('cities')
            .select('*')
            .eq('region_id', (await supabase
              .from('regions')
              .select('id')
              .eq('name', selectedRegion)
              .single()).data?.id)
            .order('name');
          
          if (error) throw error;
          setCities(data || []);
        } catch (error) {
          console.error('Erreur lors du chargement des villes:', error);
          setCities([]);
        } finally {
          setLoading(false);
        }
      } else {
        setCities([]);
      }
    }

    fetchCities();
  }, [selectedRegion]);

  useEffect(() => {
    async function fetchNeighborhoods() {
      if (selectedCity) {
        try {
          const { data: cityData } = await supabase
            .from('cities')
            .select('id')
            .eq('name', selectedCity)
            .single();

          if (cityData) {
            const { data: neighborhoodsData, error } = await supabase
              .from('neighborhoods')
              .select('name')
              .eq('city_id', cityData.id)
              .order('name');

            if (error) throw error;
            setNeighborhoods(neighborhoodsData.map(n => n.name) || []);
          }
        } catch (error) {
          console.error('Erreur lors du chargement des quartiers:', error);
          setNeighborhoods([]);
        }
      } else {
        setNeighborhoods([]);
      }
    }

    fetchNeighborhoods();
  }, [selectedCity]);
  
  const handleLocationFound = async (latitude: number, longitude: number) => {
    try {
      setLocationInfo({ latitude, longitude });
      
      // Stockage temporaire des coordonnées
      localStorage.setItem('userLatitude', latitude.toString());
      localStorage.setItem('userLongitude', longitude.toString());
      
      // Dans une future version, on pourrait implémenter une recherche des lieux à proximité
      // avec une API comme Google Geocoding ou Mapbox
      toast.success("Coordonnées enregistrées avec succès. Fonctionnalité de recherche par proximité en développement.");
      
      // Implémentation simple : afficher les coordonnées
      console.log("Coordonnées géographiques:", { latitude, longitude });
    } catch (error) {
      console.error('Erreur lors du traitement de la géolocalisation:', error);
      toast.error("Erreur lors du traitement de votre localisation.");
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
          setCities([]);
          setNeighborhoods([]);
        }}
      />

      <div>
        <Label>Ville</Label>
        <Select
          onValueChange={(value) => {
            setSelectedCity(value);
            onCityChange(value);
          }}
          disabled={loading || !selectedRegion}
        >
          <SelectTrigger>
            <SelectValue placeholder="Ville" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
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
        <Select
          onValueChange={onNeighborhoodChange}
          disabled={!selectedCity}
        >
          <SelectTrigger>
            <SelectValue placeholder="Quartier" />
          </SelectTrigger>
          <SelectContent>
            {neighborhoods.map((neighborhood) => (
              <SelectItem key={neighborhood} value={neighborhood}>
                {neighborhood}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
