
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function usePropertyFavorite(propertyId: string | undefined, userId: string | undefined) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!userId || !propertyId) return;

      try {
        const { data, error } = await supabase
          .from("favorites")
          .select()
          .eq("user_id", userId)
          .eq("property_id", propertyId)
          .maybeSingle();

        if (error) throw error;
        setIsFavorite(!!data);
      } catch (error: any) {
        console.error("Error fetching favorite status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [propertyId, userId]);

  const toggleFavorite = async () => {
    if (!userId || !propertyId) return;

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("property_id", propertyId);

        if (error) throw error;
        toast.success("Retiré des favoris");
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({
            user_id: userId,
            property_id: propertyId
          });

        if (error) throw error;
        toast.success("Ajouté aux favoris");
      }

      setIsFavorite(!isFavorite);
    } catch (error: any) {
      toast.error("Erreur lors de la modification des favoris");
    }
  };

  return { isFavorite, toggleFavorite };
}
