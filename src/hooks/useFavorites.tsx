
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function useFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading, error } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      try {
        console.log("Fetching favorites for user:", user.id);
        const { data, error } = await supabase
          .from("favorites")
          .select("property_id")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching favorites:", error);
          toast.error("Erreur lors du chargement des favoris");
          return [];
        }

        console.log("Favorites fetched:", data);
        return data?.map(fav => fav.property_id) || [];
      } catch (error) {
        console.error("Unexpected error fetching favorites:", error);
        toast.error("Erreur inattendue lors du chargement des favoris");
        return [];
      }
    },
    enabled: !!user?.id,
    retry: 1, // Réduit de 2 à 1
    staleTime: 1000 * 60 * 10, // Augmenté à 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    initialData: [], // Définit une valeur initiale vide
  });

  // Préchargement du cache
  useEffect(() => {
    if (user?.id) {
      // Précharger les favoris dès que l'utilisateur est authentifié
      queryClient.prefetchQuery({
        queryKey: ["favorites", user.id],
        queryFn: async () => {
          const { data } = await supabase
            .from("favorites")
            .select("property_id")
            .eq("user_id", user.id);
          return data?.map(fav => fav.property_id) || [];
        },
      });
    }
  }, [user?.id, queryClient]);

  // Le reste du code reste identique
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
