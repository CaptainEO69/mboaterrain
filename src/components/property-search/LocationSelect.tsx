
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

interface LocationSelectProps {
  onCityChange: (city: string) => void;
  onNeighborhoodChange: (neighborhood: string) => void;
  onDepartmentChange: (department: string) => void;
  onDistrictChange: (district: string) => void;
}

export function LocationSelect({ 
  onCityChange, 
  onNeighborhoodChange,
  onDepartmentChange,
  onDistrictChange
}: LocationSelectProps) {
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [loading, setLoading] = useState(true);

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
      // Pour une première version, nous utilisons simplement les coordonnées 
      // pour les stocker dans le localStorage pour un usage ultérieur
      localStorage.setItem('userLatitude', latitude.toString());
      localStorage.setItem('userLongitude', longitude.toString());
      
      // Dans une version future, on pourrait faire un appel à une API de géocodage inversé
      // pour convertir ces coordonnées en adresse et remplir automatiquement les champs
    } catch (error) {
      console.error('Erreur lors de la géolocalisation:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Région</Label>
        <GeolocationButton onLocationFound={handleLocationFound} />
      </div>
      
      <RegionSelect
        onRegionChange={(region) => {
          setSelectedRegion(region);
          setSelectedCity("");
          setCities([]);
          setNeighborhoods([]);
        }}
      />

      <div>
        <Label>Département</Label>
        <Input
          placeholder="Entrez le département"
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="w-full"
        />
      </div>

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
