import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Heart, Edit, Trash2, ArrowLeft, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { RatingDialog } from "@/components/ratings/RatingDialog";
import { MessageDialog } from "@/components/messages/MessageDialog";
import { Star } from "lucide-react";

type Property = {
  id: string;
  title: string;
  description: string | null;
  property_type: string;
  transaction_type: string;
  price: number;
  city: string;
  neighborhood: string;
  area_size: number;
  bedrooms: number | null;
  bathrooms: number | null;
  is_furnished: boolean | null;
  distance_from_road: number | null;
  owner_id: string;
  property_images: {
    id: string;
    image_url: string;
    is_main: boolean;
  }[];
  profiles: {
    full_name: string | null;
    phone_number: string | null;
  };
};

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [sellerRating, setSellerRating] = useState<{
    average_rating: number;
    total_ratings: number;
  } | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select(`
            *,
            property_images (*),
            profiles (
              full_name,
              phone_number,
              user_id
            )
          `)
          .eq("id", id)
          .single();

        if (error) throw error;
        setProperty(data);

        if (data.profiles?.user_id) {
          const { data: ratingData, error: ratingError } = await supabase
            .rpc('get_seller_rating', {
              seller_id: data.profiles.user_id
            });

          if (!ratingError && ratingData) {
            setSellerRating(ratingData[0]);
          }
        }
      } catch (error: any) {
        toast.error("Erreur lors du chargement de la propriété");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!property || !window.confirm("Êtes-vous sûr de vouloir supprimer cette propriété ?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", property.id);

      if (error) throw error;

      toast.success("Propriété supprimée avec succès");
      navigate("/");
    } catch (error: any) {
      toast.error("Erreur lors de la suppression");
    }
  };

  if (loading) {
    return <div className="p-8">Chargement...</div>;
  }

  if (!property) {
    return <div className="p-8">Propriété non trouvée</div>;
  }

  const isOwner = user?.profile?.id === property.owner_id;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={property.property_images.find(img => img.is_main)?.image_url || "/placeholder.svg"}
              alt={property.title}
              className="object-cover w-full h-full"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current text-red-500" : ""}`} />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {property.property_images
              .filter(img => !img.is_main)
              .map(image => (
                <div key={image.id} className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={property.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{property.title}</h1>
              <p className="text-xl font-semibold text-cmr-green">
                {property.price.toLocaleString()} FCFA
                {property.transaction_type === "rent" ? "/mois" : ""}
              </p>
            </div>
            {isOwner && (
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate(`/edit-property/${property.id}`)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Localisation:</span>
              <p>{property.neighborhood}, {property.city}</p>
            </div>
            <div>
              <span className="font-semibold">Type:</span>
              <p>{property.property_type}</p>
            </div>
            <div>
              <span className="font-semibold">Surface:</span>
              <p>{property.area_size} m²</p>
            </div>
            {property.bedrooms && (
              <div>
                <span className="font-semibold">Chambres:</span>
                <p>{property.bedrooms}</p>
              </div>
            )}
            {property.bathrooms && (
              <div>
                <span className="font-semibold">Salles de bain:</span>
                <p>{property.bathrooms}</p>
              </div>
            )}
            {property.is_furnished !== null && (
              <div>
                <span className="font-semibold">Meublé:</span>
                <p>{property.is_furnished ? "Oui" : "Non"}</p>
              </div>
            )}
            {property.distance_from_road && (
              <div>
                <span className="font-semibold">Distance de la route:</span>
                <p>{property.distance_from_road} m</p>
              </div>
            )}
          </div>

          {property.description && (
            <div>
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{property.description}</p>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                <p className="text-sm text-yellow-700">
                  Avant toute transaction, veillez à vérifier l'authenticité des documents fournis par le propriétaire auprès des autorités compétentes
                </p>
              </div>
            </div>

            <h2 className="font-semibold mb-2">Contact</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">{property.profiles.full_name || "Nom non renseigné"}</p>
                <p className="text-gray-600">{property.profiles.phone_number || "Téléphone non renseigné"}</p>
                
                {sellerRating && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= sellerRating.average_rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({sellerRating.average_rating}/5 - {sellerRating.total_ratings} avis)
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <MessageDialog 
                  recipientId={property.profiles.user_id}
                  propertyId={property.id}
                />
                {!isOwner && user && (
                  <RatingDialog sellerId={property.profiles.user_id} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
