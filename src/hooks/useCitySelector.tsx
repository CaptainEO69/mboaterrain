
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useCitySelector(selectedRegion: string) {
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      if (!selectedRegion) {
        setCities([]);
        return;
      }

      try {
        setLoadingCities(true);
        console.log("Chargement des villes pour la région:", selectedRegion);
        
        // Récupération directe des villes par région
        const { data, error } = await supabase
          .from('cities')
          .select('id, name, region_id')
          .eq('region_id', (await supabase
            .from('regions')
            .select('id')
            .eq('name', selectedRegion)
            .single()).data.id)
          .order('name');
        
        console.log("Données de villes récupérées:", data);
        
        if (error) {
          console.error('Erreur lors du chargement des villes:', error);
          toast.error("Impossible de charger les villes");
          setCities([]);
        } else if (!data || data.length === 0) {
          console.log("Aucune ville trouvée pour cette région");
          toast.info("Aucune ville trouvée pour cette région");
          setCities([]);
        } else {
          console.log(`${data.length} villes chargées pour la région ${selectedRegion}:`, data);
          setCities(data);
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

  return { cities, loadingCities };
}
