
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useNeighborhoods(cityId?: string) {
  const { data: neighborhoods = [], isLoading } = useQuery({
    queryKey: ["neighborhoods", cityId],
    queryFn: async () => {
      if (!cityId) return [];
      
      const { data, error } = await supabase
        .from("neighborhoods")
        .select("*")
        .eq("city_id", cityId)
        .order("name");

      if (error) {
        toast.error("Erreur lors du chargement des quartiers");
        throw error;
      }

      return data || [];
    },
    enabled: !!cityId,
  });

  return { neighborhoods, isLoading };
}
