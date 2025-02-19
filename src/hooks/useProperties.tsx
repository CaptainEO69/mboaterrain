
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyFilters } from "@/components/PropertySearchForm";
import { Database } from "@/types/supabase";

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
      let query = supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url,
            is_main
          )
        `)
        .eq("transaction_type", transactionType);

      // Apply filters in sequence
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
      if (filters.rooms) {
        query = query.eq("rooms", filters.rooms);
      }
      if (filters.isFurnished !== undefined) {
        query = query.eq("is_furnished", filters.isFurnished);
      }
      if (filters.distanceFromRoad) {
        query = query.lte("distance_from_road", filters.distanceFromRoad);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;

      // Ensure the correct type casting
      const typedProperties = (data || []).map(item => ({
        ...item,
        transaction_type: item.transaction_type as "sale" | "rent",
        property_images: item.property_images || []
      })) as Property[];

      setProperties(typedProperties);
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
