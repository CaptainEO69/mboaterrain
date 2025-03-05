
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Heart, Edit, Trash2, ArrowLeft, MessageSquare } from "lucide-react";
import { toast } from "sonner";

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
              phone_number
            )
          `)
          .eq("id", id)
          .single();

        if (error) throw error;
        setProperty(data);
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

  const handleContactOwner = async () => {
    if (!user) {
      toast.error("Veuillez vous connecter pour contacter le propriétaire");
      navigate("/login");
      return;
    }

    if (!property) return;

    try {
      // Vérifier si une conversation existe déjà
      const { data: existingMessages } = await supabase
        .from("messages")
        .select()
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .or(`sender_id.eq.${property.owner_id},receiver_id.eq.${property.owner_id}`)
        .limit(1);

      if (existingMessages && existingMessages.length > 0) {
        // Une conversation existe déjà, rediriger vers la messagerie
        navigate("/messaging");
        return;
      }

      // Créer un premier message
      const { error } = await supabase
        .from("messages")
        .insert({
          sender_id: user.id,
          receiver_id: property.owner_id,
          content: `Bonjour, je suis intéressé(e) par votre propriété "${property.title}"`,
          property_id: property.id,
          read: false,
        });

      if (error) throw error;

      toast.success("Message envoyé au propriétaire");
      navigate("/messaging");
    } catch (error: any) {
      console.error("Erreur lors de l'envoi du message:", error);
      toast.error("Erreur lors de l'envoi du message");
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
            <h2 className="font-semibold mb-2">Contact</h2>
            <p>{property.profiles.full_name || "Nom non renseigné"}</p>
            <p>{property.profiles.phone_number || "Téléphone non renseigné"}</p>
            
            {!isOwner && (
              <Button 
                onClick={handleContactOwner}
                className="mt-3 w-full bg-cmr-green hover:bg-cmr-green/90"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Contacter le propriétaire
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
