import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PropertyForm } from "@/components/sell/PropertyForm";
import { FeatureCard } from "@/components/sell/FeatureCard";
import { Building2, MapPin, Ruler, FileCheck } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Tous types de biens",
    description: "Maisons, appartements, terrains",
  },
  {
    icon: MapPin,
    title: "Localisation précise",
    description: "Ville et quartier",
  },
  {
    icon: Ruler,
    title: "Détails complets",
    description: "Surface, distance route",
  },
  {
    icon: FileCheck,
    title: "Documents légaux",
    description: "Titres et certificats",
  },
];

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
      const files = formData.getAll("images") as File[];
      if (files.length > 0 && property) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
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
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
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