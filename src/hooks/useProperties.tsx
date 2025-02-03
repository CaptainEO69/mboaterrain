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
      let query = supabase
        .from("properties")
        .select(`
          *,
          property_images (
            image_url,
            is_main
          )
        `)
        .eq("transaction_type", transactionType)
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
      if (filters.minBedrooms) {
        query = query.gte("bedrooms", filters.minBedrooms);
      }
      if (filters.maxBedrooms) {
        query = query.lte("bedrooms", filters.maxBedrooms);
      }
      if (filters.minBathrooms) {
        query = query.gte("bathrooms", filters.minBathrooms);
      }
      if (filters.maxBathrooms) {
        query = query.lte("bathrooms", filters.maxBathrooms);
      }
      if (filters.isFurnished !== undefined) {
        query = query.eq("is_furnished", filters.isFurnished);
      }
      if (filters.distanceFromRoad) {
        query = query.lte("distance_from_road", filters.distanceFromRoad);
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

  return { properties, loading, fetchProperties };
}