
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
        
        // D'abord récupérer l'ID de la région
        const { data: regionData, error: regionError } = await supabase
          .from('regions')
          .select('id')
          .eq('name', selectedRegion)
          .maybeSingle();
        
        if (regionError) {
          console.error('Erreur lors de la récupération de la région:', regionError);
          toast.error("Impossible de récupérer les informations de la région");
          setCities([]);
          setLoadingCities(false);
          return;
        }
        
        if (!regionData) {
          console.error('Aucune donnée de région trouvée');
          toast.error("Région non trouvée");
          setCities([]);
          setLoadingCities(false);
          return;
        }
        
        console.log("ID de région trouvé:", regionData.id);
        
        // Puis récupérer les villes pour cette région
        const { data: citiesData, error: citiesError } = await supabase
          .from('cities')
          .select('id, name')
          .eq('region_id', regionData.id)
          .order('name');
        
        console.log("Réponse du serveur pour les villes:", { citiesData, citiesError });
        
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
