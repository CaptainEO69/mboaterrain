
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export function useFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading, error } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      try {
        const { data, error } = await supabase
          .from("favorites")
          .select("property_id")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching favorites:", error);
          return [];
        }

        return data?.map(fav => fav.property_id) || [];
      } catch (error) {
        console.error("Unexpected error fetching favorites:", error);
        return [];
      }
    },
    enabled: !!user?.id,
  });

  const addToFavorites = useMutation({
    mutationFn: async (propertyId: string) => {
      if (!user?.id) throw new Error("Utilisateur non connecté");
      
      const { error } = await supabase
        .from("favorites")
        .insert([{ user_id: user.id, property_id: propertyId }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
      toast.success("Ajouté aux favoris");
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout aux favoris:", error);
      toast.error("Erreur lors de l'ajout aux favoris");
    },
  });

  const removeFromFavorites = useMutation({
    mutationFn: async (propertyId: string) => {
      if (!user?.id) throw new Error("Utilisateur non connecté");
      
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
      toast.success("Retiré des favoris");
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression des favoris:", error);
      toast.error("Erreur lors de la suppression des favoris");
    },
  });

  return {
    favorites,
    isLoading,
    error,
    addToFavorites: addToFavorites.mutate,
    removeFromFavorites: removeFromFavorites.mutate,
    isFavorite: (propertyId: string) => favorites?.includes(propertyId),
  };
}
