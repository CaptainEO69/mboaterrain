
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyFilters } from "@/components/PropertySearchForm";

type PropertyImage = {
  image_url: string;
  is_main: boolean;
};

type Property = {
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
  property_images: PropertyImage[];
};

export function useProperties(transactionType: "sale" | "rent") {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async (filters: PropertyFilters = {}) => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*, property_images(*)")
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

      const formattedProperties = (data || []).map(property => ({
        ...property,
        property_images: property.property_images || [],
      })) as Property[];

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
