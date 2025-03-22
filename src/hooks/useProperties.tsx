
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyFilters } from "@/components/PropertySearchForm";

interface BasePropertyImage {
  image_url: string;
  is_main: boolean;
}

interface BaseProperty {
  id: string;
  title: string;
  price: number;
  city: string;
  neighborhood: string;
  district: string;
  area_size: number;
  property_type: string;
  transaction_type: "sale" | "rent";
  is_furnished: boolean | null;
  distance_from_road: number | null;
  bathrooms: number | null;
  bedrooms: number | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface PropertyWithImages extends BaseProperty {
  property_images: BasePropertyImage[];
}

export function useProperties(transactionType: "sale" | "rent") {
  const [properties, setProperties] = useState<PropertyWithImages[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async (filters: PropertyFilters = {}) => {
    try {
      const query = supabase
        .from("properties")
        .select("*, property_images(image_url, is_main)")
        .eq("transaction_type", transactionType);

      // Apply filters conditionally
      if (filters.propertyType) query.eq("property_type", filters.propertyType);
      if (filters.city) query.eq("city", filters.city);
      if (filters.district) query.eq("district", filters.district);
      if (filters.neighborhood) query.eq("neighborhood", filters.neighborhood);
      if (filters.maxPrice) query.lte("price", filters.maxPrice);
      if (filters.minSize) query.gte("area_size", filters.minSize);
      if (filters.isFurnished !== undefined) query.eq("is_furnished", filters.isFurnished);
      if (filters.distanceFromRoad) query.lte("distance_from_road", filters.distanceFromRoad);

      const { data: propertiesData, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;

      // Cast the response data to the correct type with explicit type checking
      const formattedProperties: PropertyWithImages[] = (propertiesData || []).map(property => ({
        ...property,
        transaction_type: property.transaction_type as "sale" | "rent",
        property_images: (property.property_images || []) as BasePropertyImage[],
        is_furnished: property.is_furnished || null,
        distance_from_road: property.distance_from_road || null,
        bathrooms: property.bathrooms || null,
        bedrooms: property.bedrooms || null,
        description: property.description || null,
      }));

      setProperties(formattedProperties);
    } catch (error: any) {
      console.error("Erreur lors du chargement des propriétés:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [transactionType]);

  return { properties, loading, fetchProperties };
}
