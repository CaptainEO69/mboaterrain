
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PropertyImages } from "@/components/property/PropertyImages";
import { PropertyDetails as PropertyDetailsComponent } from "@/components/property/PropertyDetails";
import { usePropertyDetails } from "@/hooks/usePropertyDetails";
import { usePropertyFavorite } from "@/hooks/usePropertyFavorite";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { property, loading } = usePropertyDetails(id);
  const { isFavorite, toggleFavorite } = usePropertyFavorite(id, user?.profile?.id);

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
        <PropertyImages
          images={property.property_images}
          title={property.title}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />

        <PropertyDetailsComponent
          property={property}
          isOwner={isOwner}
          onEdit={(id) => navigate(`/edit-property/${id}`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
