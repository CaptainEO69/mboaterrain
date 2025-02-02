import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

export default function Rent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select(`
            *,
            property_images (
              image_url,
              is_main
            )
          `)
          .eq("transaction_type", "rent")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setProperties(data || []);
      } catch (error: any) {
        console.error("Erreur lors du chargement des propriétés:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-4">Louer un bien</h1>
        
        <form className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">Maison meublée</SelectItem>
              <SelectItem value="apartment">Maison non meublée</SelectItem>
              <SelectItem value="land">Appartement meublé</SelectItem>
              <SelectItem value="office">Appartement non meublé</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yaounde">Yaoundé</SelectItem>
              <SelectItem value="douala">Douala</SelectItem>
              <SelectItem value="bafoussam">Bafoussam</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="Budget maximum (FCFA/mois)" type="number" />

          <Button type="submit" className="w-full bg-cmr-green hover:bg-cmr-green/90">
            Rechercher
          </Button>
        </form>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Chargement des propriétés...</p>
        ) : properties.length === 0 ? (
          <p>Aucune propriété disponible</p>
        ) : (
          properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              price={`${property.price.toLocaleString()} FCFA/mois`}
              location={`${property.neighborhood}, ${property.city}`}
              size={`${property.area_size} m²`}
              imageUrl={
                property.property_images.find((img) => img.is_main)?.image_url ||
                "/placeholder.svg"
              }
            />
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}