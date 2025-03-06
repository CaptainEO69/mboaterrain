
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
        
        // Récupération de l'ID de la région
        const { data: regionData, error: regionError } = await supabase
          .from('regions')
          .select('id')
          .eq('name', selectedRegion)
          .single();
        
        if (regionError || !regionData) {
          console.error('Erreur lors de la récupération de l\'ID de la région:', regionError);
          setCities([]);
          setLoadingCities(false);
          return;
        }
        
        console.log("ID de la région trouvée:", regionData.id);
        
        // Récupération des villes pour cette région
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
          console.log(`${citiesData.length} villes chargées pour la région ${selectedRegion}:`, citiesData);
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

  return { cities, loadingCities };
}
