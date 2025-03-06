
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyList } from "@/components/PropertyList";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart } from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);
  const { favorites, isLoading: favoritesLoading } = useFavorites();

  // Ajouter un timeout plus court pour éviter le chargement infini
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        if (!error) {
          setError("Le chargement a pris trop de temps. Veuillez rafraîchir la page.");
        }
      }
    }, 3000); // Réduit de 5000ms à 3000ms

    return () => clearTimeout(timeoutId);
  }, [isLoading, error]);

  // Charge les propriétés uniquement quand les favoris sont chargés
  useEffect(() => {
    console.log("Favorites status:", { 
      favoritesLoading, 
      favoritesCount: favorites?.length,
      favorites
    });
    
    if (favoritesLoading) return;

    const fetchFavoriteProperties = async () => {
      // Si aucun favori, on ne charge rien
      if (!favorites || favorites.length === 0) {
        console.log("No favorites found, setting empty properties array");
        setProperties([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Fetching favorite properties, favorites:", favorites);

        // Utilisation d'une requête optimisée pour de meilleures performances
        const { data, error } = await supabase
          .from("properties")
          .select(`
            id, title, price, city, neighborhood, area_size,
            property_images (image_url, is_main)
          `)
          .in("id", favorites);

        if (error) {
          console.error("Erreur lors du chargement des propriétés:", error);
          setError("Impossible de charger vos favoris. Veuillez réessayer.");
          throw error;
        }

        console.log("Favorite properties fetched:", data);
        setProperties(data || []);
      } catch (error: any) {
        console.error("Erreur lors du chargement des propriétés:", error.message);
        setError("Une erreur est survenue. Veuillez réessayer.");
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
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-red-500 bg-white rounded-lg shadow-sm">
            <p className="text-lg font-medium">Erreur</p>
            <p className="text-sm mt-2 text-center max-w-md">{error}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500 bg-white rounded-lg shadow-sm">
            <Heart className="w-16 h-16 mb-4 stroke-1" />
            <p className="text-lg font-medium">Vous n'avez aucun favori</p>
            <p className="text-sm mt-2 text-center max-w-md">
              Explorez les annonces disponibles et ajoutez-les à vos favoris pour les retrouver ici
            </p>
          </div>
        ) : (
          <PropertyList properties={properties} loading={false} />
        )}
      </div>
    </div>
  );
}
