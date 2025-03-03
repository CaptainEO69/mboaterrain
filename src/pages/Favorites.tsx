
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Si l'utilisateur n'est pas connecté, on redirige vers la page de connexion
      navigate("/login");
      return;
    }

    if (favoritesLoading) return;

    const fetchFavoriteProperties = async () => {
      setIsLoading(true);
      
      try {
        if (favorites.length === 0) {
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
  }, [favorites, favoritesLoading, user, navigate]);

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
            <p className="text-lg">Vous n'avez aucun favori</p>
            <p className="text-sm mt-2">Ajoutez des propriétés à vos favoris pour les retrouver ici</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                price={`${property.price.toLocaleString()} FCFA`}
                location={`${property.neighborhood}, ${property.city}`}
                size={`${property.area_size} m²`}
                imageUrl={
                  property.property_images.find((img) => img.is_main)?.image_url ||
                  "/placeholder.svg"
                }
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
