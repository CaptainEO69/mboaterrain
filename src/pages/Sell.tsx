import { useState } from "react";
import { PropertyForm } from "@/components/sell/PropertyForm";
import { Building2, MapPin, BadgeDollarSign, FileCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export default function Sell() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (formData: FormData) => {
    if (!user?.profile?.id) {
      toast.error("Vous devez être connecté pour publier une annonce");
      return;
    }

    try {
      setIsSubmitting(true);

      // Convert FormData values to the correct types
      const propertyData = {
        owner_id: user.profile.id,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        property_type: formData.get('property_type') as string,
        transaction_type: formData.get('transaction_type') as string,
        price: Number(formData.get('price')),
        city: formData.get('city') as string,
        neighborhood: formData.get('neighborhood') as string,
        area_size: Number(formData.get('area_size')),
        bedrooms: formData.get('bedrooms') ? Number(formData.get('bedrooms')) : null,
        bathrooms: formData.get('bathrooms') ? Number(formData.get('bathrooms')) : null,
        is_furnished: formData.get('is_furnished') === 'true',
        distance_from_road: formData.get('distance_from_road') ? Number(formData.get('distance_from_road')) : null
      };

      // Insert property data
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single();

      if (propertyError) throw propertyError;

      // Handle image uploads
      const images = formData.getAll('images') as File[];
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const fileExt = image.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${property.id}/${fileName}`;

          // Upload image to storage
          const { error: uploadError } = await supabase.storage
            .from('property_images')
            .upload(filePath, image);

          if (uploadError) throw uploadError;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('property_images')
            .getPublicUrl(filePath);

          // Save image reference in database
          const { error: imageError } = await supabase
            .from('property_images')
            .insert([
              {
                property_id: property.id,
                image_url: publicUrl,
                is_main: i === 0, // First image is main
              }
            ]);

          if (imageError) throw imageError;
        }
      }

      toast.success("Annonce publiée avec succès");
      navigate('/');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error("Erreur lors de la publication de l'annonce");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-gradient-to-r from-cmr-green to-cmr-green/80 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Vendre un bien au Cameroun</h1>
          <p className="text-lg opacity-90 mb-8">
            Publiez votre annonce et trouvez rapidement des acheteurs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <Building2 className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Types de Biens</h3>
                <p className="text-sm opacity-75">Maison, Terrain, etc.</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <MapPin className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Emplacement</h3>
                <p className="text-sm opacity-75">Précisez la localisation</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <BadgeDollarSign className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Prix Flexibles</h3>
                <p className="text-sm opacity-75">Définissez vos tarifs</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3">
              <FileCheck className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Documents</h3>
                <p className="text-sm opacity-75">Titre foncier, etc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <PropertyForm 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting}
            transactionType="sell"
          />
        </div>
      </div>
    </div>
  );
}