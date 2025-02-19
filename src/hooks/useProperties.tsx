
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
  area_size: number;
  property_type: string;
  transaction_type: "sale" | "rent";
  rooms?: number;
  is_furnished?: boolean;
  distance_from_road?: number;
}

interface PropertyWithImages extends BaseProperty {
  property_images: BasePropertyImage[];
}

export function useProperties(transactionType: "sale" | "rent") {
  const [properties, setProperties] = useState<PropertyWithImages[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async (filters: PropertyFilters = {}) => {
    try {
      const { data: propertiesData, error } = await supabase
        .from("properties")
        .select("*, property_images!property_images_property_id_fkey(image_url, is_main)")
        .eq("transaction_type", transactionType)
        .eq("property_type", filters.propertyType || null)
        .eq("city", filters.city || null)
        .lte("price", filters.maxPrice || null)
        .gte("area_size", filters.minSize || null)
        .eq("rooms", filters.rooms || null)
        .eq("is_furnished", filters.isFurnished || null)
        .lte("distance_from_road", filters.distanceFromRoad || null)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedProperties = (propertiesData || []).map(property => ({
        ...property,
        property_images: property.property_images || [],
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
