import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface LocationSelectProps {
  onCityChange: (city: string) => void;
  onNeighborhoodChange: (neighborhood: string) => void;
}

export function LocationSelect({ onCityChange, onNeighborhoodChange }: LocationSelectProps) {
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCities() {
      try {
        const { data, error } = await supabase
          .from('cities')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setCities(data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des villes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const mockNeighborhoods = [
        "Centre-ville",
        "Bastos",
        "Santa Barbara",
        "Hippodrome",
        "Tsinga",
        "Mvan",
        "Nsam",
        "Mvog-Mbi",
      ];
      setNeighborhoods(mockNeighborhoods);
    } else {
      setNeighborhoods([]);
    }
  }, [selectedCity]);

  return (
    <div className="space-y-4">
      <Select
        onValueChange={(value) => {
          setSelectedCity(value);
          onCityChange(value);
        }}
        disabled={loading}
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
  );
}