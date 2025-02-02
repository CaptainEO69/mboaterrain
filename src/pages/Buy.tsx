import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyCard } from "@/components/PropertyCard";
import { BottomNav } from "@/components/BottomNav";
import { PropertySearchForm, PropertyFilters } from "@/components/PropertySearchForm";

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

export default function Buy() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async (filters: PropertyFilters = {}) => {
    try {
      let query = supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url,
            is_main
          )
        `)
        .eq("transaction_type", "sale")
        .order("created_at", { ascending: false });

      if (filters.propertyType) {
        query = query.eq("property_type", filters.propertyType);
      }
      if (filters.city) {
        query = query.eq("city", filters.city);
      }
      if (filters.maxPrice) {
        query = query.lte("price", filters.maxPrice);
      }
      if (filters.minSize) {
        query = query.gte("area_size", filters.minSize);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      console.error("Erreur lors du chargement des propriétés:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-4">Acheter un bien</h1>
        <PropertySearchForm transactionType="sale" onSearch={fetchProperties} />
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
              price={`${property.price.toLocaleString()} FCFA`}
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