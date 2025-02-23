
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface RegionSelectProps {
  onRegionChange: (region: string) => void;
}

export function RegionSelect({ onRegionChange }: RegionSelectProps) {
  const [regions, setRegions] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRegions() {
      try {
        const { data, error } = await supabase
          .from('regions')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setRegions(data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des régions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRegions();
  }, []);

  return (
    <Select
      onValueChange={onRegionChange}
      disabled={loading}
    >
      <SelectTrigger>
        <SelectValue placeholder="Région" />
      </SelectTrigger>
      <SelectContent>
        {regions.map((region) => (
          <SelectItem key={region.id} value={region.name}>
            {region.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
