import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type PropertyFilters = {
  propertyType?: string;
  city?: string;
  maxPrice?: number;
  minSize?: number;
  bedrooms?: number;
  isFurnished?: boolean;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  distanceFromRoad?: number;
};

interface PropertySearchFormProps {
  transactionType: "sale" | "rent";
  onSearch: (filters: PropertyFilters) => void;
}

export function PropertySearchForm({ transactionType, onSearch }: PropertySearchFormProps) {
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Select
            onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">Maison</SelectItem>
              <SelectItem value="apartment">Appartement</SelectItem>
              <SelectItem value="land">Terrain</SelectItem>
              <SelectItem value="commercial">Local commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            onValueChange={(value) => setFilters({ ...filters, city: value })}
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
        </div>

        <div>
          <Input
            placeholder={`Budget maximum (FCFA${transactionType === "rent" ? "/mois" : ""})`}
            type="number"
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <Input
            placeholder="Surface minimum (m²)"
            type="number"
            onChange={(e) => setFilters({ ...filters, minSize: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <Input
            placeholder="Chambres minimum"
            type="number"
            onChange={(e) => setFilters({ ...filters, minBedrooms: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <Input
            placeholder="Salles de bain minimum"
            type="number"
            onChange={(e) => setFilters({ ...filters, minBathrooms: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {transactionType === "rent" && (
          <div>
            <Select
              onValueChange={(value) => setFilters({ ...filters, isFurnished: value === "true" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Meublé" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Oui</SelectItem>
                <SelectItem value="false">Non</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <Input
            placeholder="Distance max. de la route (m)"
            type="number"
            onChange={(e) => setFilters({ ...filters, distanceFromRoad: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-cmr-green hover:bg-cmr-green/90">
        Rechercher
      </Button>
    </form>
  );
}