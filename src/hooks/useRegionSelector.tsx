
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Données de secours pour les régions du Cameroun
const FALLBACK_REGIONS = [
  { id: "fallback-1", name: "Adamaoua" },
  { id: "fallback-2", name: "Centre" },
  { id: "fallback-3", name: "Est" },
  { id: "fallback-4", name: "Extrême-Nord" },
  { id: "fallback-5", name: "Littoral" },
  { id: "fallback-6", name: "Nord" },
  { id: "fallback-7", name: "Nord-Ouest" },
  { id: "fallback-8", name: "Ouest" },
  { id: "fallback-9", name: "Sud" },
  { id: "fallback-10", name: "Sud-Ouest" }
];

export function useRegionSelector() {
  const [regions, setRegions] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    async function fetchRegions() {
      try {
        setLoading(true);
        setError(null);
        console.log("Chargement des régions...");
        
        const { data, error } = await supabase
          .from('regions')
          .select('id, name')
          .order('name');
        
        if (error) {
          console.error('Erreur lors du chargement des régions:', error);
          setError(error);
          
          // Utiliser les données de secours en cas d'erreur
          console.log("Utilisation des données de secours pour les régions");
          setRegions(FALLBACK_REGIONS);
          setUseFallback(true);
        } else if (!data || data.length === 0) {
          console.log("Aucune région trouvée dans la base de données, utilisation des données de secours");
          setRegions(FALLBACK_REGIONS);
          setUseFallback(true);
        } else {
          console.log(`${data.length} régions chargées:`, data);
          setRegions(data);
          setUseFallback(false);
        }
      } catch (error) {
        console.error('Erreur inattendue lors du chargement des régions:', error);
        setError(error instanceof Error ? error : new Error(String(error)));
        
        // Utiliser les données de secours en cas d'erreur
        console.log("Utilisation des données de secours pour les régions suite à une erreur");
        setRegions(FALLBACK_REGIONS);
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    }

    fetchRegions();
  }, []);

  return { regions, loading, error, useFallback };
}
