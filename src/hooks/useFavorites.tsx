
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export function useFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from("favorites")
        .select("property_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites:", error);
        return [];
      }

      return data?.map(fav => fav.property_id) || [];
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
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Ajouté aux favoris");
    },
    onError: () => {
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
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success("Retiré des favoris");
    },
    onError: () => {
      toast.error("Erreur lors de la suppression des favoris");
    },
  });

  return {
    favorites,
    isLoading,
    addToFavorites: addToFavorites.mutate,
    removeFromFavorites: removeFromFavorites.mutate,
    isFavorite: (propertyId: string) => favorites?.includes(propertyId),
  };
}
