import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PropertyForm } from "@/components/sell/PropertyForm";
import { Building2, MapPin, Ruler, FileCheck } from "lucide-react";

export default function Sell() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    if (!user?.profile?.id) {
      toast.error("Vous devez compléter votre profil avant de publier une annonce");
      return;
    }

    setIsSubmitting(true);

    try {
      const propertyData = {
        owner_id: user.profile.id,
        title: formData.get("title") as string,
        description: formData.get("description") as string | null,
        property_type: formData.get("property_type") as string,
        transaction_type: formData.get("transaction_type") as string,
        price: Number(formData.get("price")),
        city: formData.get("city") as string,
        neighborhood: formData.get("neighborhood") as string,
        area_size: Number(formData.get("area_size")),
        is_furnished: formData.get("is_furnished") === "true",
        distance_from_road: formData.get("distance_from_road") 
          ? Number(formData.get("distance_from_road")) 
          : null,
      };

      const { data: property, error: propertyError } = await supabase
        .from("properties")
        .insert([propertyData])
        .select()
        .single();

      if (propertyError) throw propertyError;

      // Upload images if present
      const images = formData.get("images") as FileList;
      if (images && property) {
        for (let i = 0; i < images.length; i++) {
          const file = images[i];
          const fileExt = file.name.split(".").pop();
          const filePath = `${property.id}/${Math.random()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("property_images")
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: imageUrl } = supabase.storage
            .from("property_images")
            .getPublicUrl(filePath);

          const { error: imageError } = await supabase
            .from("property_images")
            .insert([
              {
                property_id: property.id,
                image_url: imageUrl.publicUrl,
                is_main: i === 0,
              },
            ]);

          if (imageError) throw imageError;
        }
      }

      toast.success("Annonce publiée avec succès");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-gradient-to-r from-cmr-green to-cmr-green/80 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Publier une annonce</h1>
          <p className="text-lg opacity-90 mb-8">
            Vendez ou louez votre bien immobilier en toute simplicité
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <Building2 className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Tous types de biens</h3>
                <p className="text-sm opacity-75">Maisons, appartements, terrains</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <MapPin className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Localisation précise</h3>
                <p className="text-sm opacity-75">Ville et quartier</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <Ruler className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Détails complets</h3>
                <p className="text-sm opacity-75">Surface, distance route</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <FileCheck className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Documents légaux</h3>
                <p className="text-sm opacity-75">Titres et certificats</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <PropertyForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
}