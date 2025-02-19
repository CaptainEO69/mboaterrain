
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyFilters } from "@/components/PropertySearchForm";

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
  property_images: {
    image_url: string;
    is_main: boolean;
  }[];
};

export function useProperties(transactionType: "sale" | "rent") {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async (filters: PropertyFilters = {}) => {
    try {
      const query = supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url,
            is_main
          )
        `)
        .eq("transaction_type", transactionType);

      // Apply filters
      if (filters.propertyType) {
        query.eq("property_type", filters.propertyType);
      }
      if (filters.city) {
        query.eq("city", filters.city);
      }
      if (filters.maxPrice) {
        query.lte("price", filters.maxPrice);
      }
      if (filters.minSize) {
        query.gte("area_size", filters.minSize);
      }
      if (filters.rooms) {
        query.eq("rooms", filters.rooms);
      }
      if (filters.isFurnished !== undefined) {
        query.eq("is_furnished", filters.isFurnished);
      }
      if (filters.distanceFromRoad) {
        query.lte("distance_from_road", filters.distanceFromRoad);
      }

      query.order("created_at", { ascending: false });

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
  }, [transactionType]);

  return { properties, loading, fetchProperties };
}
