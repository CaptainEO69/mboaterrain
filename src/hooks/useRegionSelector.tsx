
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useRegionSelector() {
  const [regions, setRegions] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRegions() {
      try {
        setLoading(true);
        console.log("Chargement des régions...");
        
        const { data, error } = await supabase
          .from('regions')
          .select('*')
          .order('name');
        
        if (error) {
          console.error('Erreur lors du chargement des régions:', error);
          toast.error("Impossible de charger les régions");
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.log("Aucune région trouvée");
          toast.info("Aucune région disponible");
        } else {
          console.log(`${data.length} régions chargées:`, data);
        }
        
        setRegions(data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des régions:', error);
        toast.error("Une erreur est survenue lors du chargement des régions");
      } finally {
        setLoading(false);
      }
    }

    fetchRegions();
  }, []);

  return { regions, loading };
}
