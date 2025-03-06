
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyList } from "@/components/PropertyList";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type Property = {
  id: string;
  title: string;
  price: number;
  city: string;
  neighborhood: string;
  area_size: number;
  property_images: {
    image_url: string;
    is_main: boolean;
  }[];
};

export default function Favorites() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { favorites, isLoading: favoritesLoading } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    if (favoritesLoading) return;

    const fetchFavoriteProperties = async () => {
      setIsLoading(true);
      
      try {
        if (!favorites || favorites.length === 0) {
          setProperties([]);
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("properties")
          .select(`
            *,
            property_images (
              image_url,
              is_main
            )
          `)
          .in("id", favorites);

        if (error) {
          console.error("Erreur lors du chargement des propriétés:", error);
          throw error;
        }

        setProperties(data || []);
      } catch (error: any) {
        console.error("Erreur lors du chargement des propriétés:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteProperties();
  }, [favorites, favoritesLoading]);

  return (
    <div className="min-h-screen pb-20">
      <h1 className="text-xl font-bold p-4">Mes Favoris</h1>

      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cmr-green"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <Heart className="w-16 h-16 mb-4 stroke-1" />
            <p className="text-lg font-medium">Vous n'avez aucun favori</p>
            <p className="text-sm mt-2">Ajoutez des propriétés à vos favoris pour les retrouver ici</p>
          </div>
        ) : (
          <PropertyList properties={properties} loading={false} />
        )}
      </div>
    </div>
  );
}
