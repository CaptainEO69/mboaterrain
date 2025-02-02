import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Sell() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.profile?.id) {
      toast.error("Vous devez compléter votre profil avant de publier une annonce");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      // Créer la propriété
      const { data: property, error: propertyError } = await supabase
        .from("properties")
        .insert([
          {
            owner_id: user.profile.id,
            title: formData.get("title"),
            description: formData.get("description"),
            property_type: formData.get("property_type"),
            transaction_type: formData.get("transaction_type"),
            price: formData.get("price"),
            city: formData.get("city"),
            neighborhood: formData.get("neighborhood"),
            area_size: formData.get("area_size"),
            bedrooms: formData.get("bedrooms"),
            bathrooms: formData.get("bathrooms"),
            is_furnished: formData.get("is_furnished") === "true",
            distance_from_road: formData.get("distance_from_road"),
          },
        ])
        .select()
        .single();

      if (propertyError) throw propertyError;

      // Uploader les images
      if (images) {
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
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-4">Publier une annonce</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre de l'annonce</Label>
            <Input id="title" name="title" required />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" />
          </div>

          <div>
            <Label htmlFor="property_type">Type de bien</Label>
            <Select name="property_type" required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">Maison</SelectItem>
                <SelectItem value="apartment">Appartement</SelectItem>
                <SelectItem value="land">Terrain</SelectItem>
                <SelectItem value="office">Bureau</SelectItem>
                <SelectItem value="store">Commerce</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="transaction_type">Type de transaction</Label>
            <Select name="transaction_type" required>
              <SelectTrigger>
                <SelectValue placeholder="Vente ou Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">Vente</SelectItem>
                <SelectItem value="rent">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Prix (FCFA)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="1000"
              required
            />
          </div>

          <div>
            <Label htmlFor="city">Ville</Label>
            <Select name="city" required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yaounde">Yaoundé</SelectItem>
                <SelectItem value="douala">Douala</SelectItem>
                <SelectItem value="bafoussam">Bafoussam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="neighborhood">Quartier</Label>
            <Input id="neighborhood" name="neighborhood" required />
          </div>

          <div>
            <Label htmlFor="area_size">Superficie (m²)</Label>
            <Input
              id="area_size"
              name="area_size"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <Label htmlFor="bedrooms">Nombre de chambres</Label>
            <Input id="bedrooms" name="bedrooms" type="number" min="0" />
          </div>

          <div>
            <Label htmlFor="bathrooms">Nombre de salles de bain</Label>
            <Input id="bathrooms" name="bathrooms" type="number" min="0" />
          </div>

          <div>
            <Label htmlFor="is_furnished">Meublé</Label>
            <Select name="is_furnished">
              <SelectTrigger>
                <SelectValue placeholder="Le bien est-il meublé ?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Oui</SelectItem>
                <SelectItem value="false">Non</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="distance_from_road">Distance de la route (m)</Label>
            <Input
              id="distance_from_road"
              name="distance_from_road"
              type="number"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <Label htmlFor="images">Photos</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages(e.target.files)}
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-1">
              Vous pouvez sélectionner plusieurs photos. La première sera l'image principale.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-cmr-green hover:bg-cmr-green/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publication en cours..." : "Publier l'annonce"}
          </Button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
}