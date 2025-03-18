
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CAMEROON_CITIES } from "@/components/chat/data/citiesData";

export function useCitySelector(selectedRegion: string) {
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      if (!selectedRegion) {
        setCities([]);
        setError(null);
        return;
      }

      try {
        setLoadingCities(true);
        setError(null);
        console.log("Chargement des villes pour la région:", selectedRegion);
        
        // Préparer les données de secours pour cette région
        const fallbackCitiesForRegion = CAMEROON_CITIES[selectedRegion] || [];
        const formattedFallbackCities = fallbackCitiesForRegion.map((city, index) => ({
          id: `local-${index}`,
          name: city.name
        }));
        
        // Tenter de récupérer les données depuis Supabase
        try {
          // Récupération de l'ID de la région
          const { data: regionData, error: regionError } = await supabase
            .from('regions')
            .select('id')
            .eq('name', selectedRegion)
            .maybeSingle();
          
          if (regionError || !regionData) {
            console.error('Erreur lors de la récupération de l\'ID de la région:', regionError);
            throw new Error(`Impossible de trouver la région "${selectedRegion}"`);
          }
          
          console.log("ID de la région trouvée:", regionData.id);
          
          // Récupération des villes pour cette région
          const { data: citiesData, error: citiesError } = await supabase
            .from('cities')
            .select('id, name')
            .eq('region_id', regionData.id)
            .order('name');
          
          if (citiesError) {
            throw citiesError;
          }
          
          if (!citiesData || citiesData.length === 0) {
            console.log("Aucune ville trouvée dans la base de données pour cette région, utilisation des données locales");
            setCities(formattedFallbackCities);
            setUseFallback(true);
          } else {
            console.log(`${citiesData.length} villes chargées depuis la base de données pour la région ${selectedRegion}:`, citiesData);
            setCities(citiesData);
            setUseFallback(false);
          }
        } catch (supabaseError) {
          console.error('Erreur lors du chargement des villes depuis Supabase:', supabaseError);
          console.log("Utilisation des données locales comme secours");
          setCities(formattedFallbackCities);
          setUseFallback(true);
          setError(supabaseError instanceof Error ? supabaseError : new Error(String(supabaseError)));
        }
      } catch (unexpectedError) {
        console.error('Erreur inattendue lors du chargement des villes:', unexpectedError);
        // En cas d'erreur inattendue, utiliser toujours les données de secours
        const fallbackCitiesForRegion = CAMEROON_CITIES[selectedRegion] || [];
        const formattedFallbackCities = fallbackCitiesForRegion.map((city, index) => ({
          id: `local-${index}`,
          name: city.name
        }));
        setCities(formattedFallbackCities);
        setUseFallback(true);
        setError(unexpectedError instanceof Error ? unexpectedError : new Error(String(unexpectedError)));
      } finally {
        setLoadingCities(false);
      }
    }

    fetchCities();
  }, [selectedRegion]);

  return { cities, loadingCities, error, useFallback };
}
