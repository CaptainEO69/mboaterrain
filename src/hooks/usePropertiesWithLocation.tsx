
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useGeolocation } from "./useGeolocation";
import { PropertyFilters } from "@/components/PropertySearchForm";

export interface PropertyWithLocation {
  id: string;
  title: string;
  price: number;
  city: string;
  neighborhood: string;
  district: string;
  area_size: number;
  property_type: string;
  transaction_type: "sale" | "rent";
  latitude: number | null;
  longitude: number | null;
  distance: number | null;
  property_images: {
    image_url: string;
    is_main: boolean;
  }[];
  is_furnished: boolean | null;
  distance_from_road: number | null;
  bathrooms: number | null;
  bedrooms: number | null;
  description: string | null;
}

export function usePropertiesWithLocation(transactionType: "sale" | "rent") {
  const [properties, setProperties] = useState<PropertyWithLocation[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyWithLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const { 
    coordinates, 
    calculateDistance, 
    hasLocation,
    permissionDenied
  } = useGeolocation();

  // Charger les propriétés depuis Supabase
  const fetchProperties = async (filters: PropertyFilters = {}) => {
    try {
      setLoading(true);
      const query = supabase
        .from("properties")
        .select("*, property_images(image_url, is_main)")
        .eq("transaction_type", transactionType);

      // Appliquer les filtres
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

      // Formater les propriétés avec la distance si la géolocalisation est disponible
      const formattedProperties: PropertyWithLocation[] = (propertiesData || []).map(property => {
        let distance = null;
        
        // Vérifier si la propriété et l'utilisateur ont des coordonnées
        if (hasLocation && property.latitude && property.longitude) {
          distance = calculateDistance(
            coordinates.latitude!,
            coordinates.longitude!,
            property.latitude,
            property.longitude
          );
        }

        return {
          ...property,
          latitude: property.latitude || null,
          longitude: property.longitude || null,
          transaction_type: property.transaction_type as "sale" | "rent",
          property_images: (property.property_images || []),
          is_furnished: property.is_furnished || null,
          distance_from_road: property.distance_from_road || null,
          bathrooms: property.bathrooms || null,
          bedrooms: property.bedrooms || null,
          description: property.description || null,
          distance: distance
        };
      });

      setProperties(formattedProperties);
      setFilteredProperties(formattedProperties);
    } catch (error: any) {
      console.error("Erreur lors du chargement des propriétés:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Charger les propriétés au démarrage
  useEffect(() => {
    fetchProperties();
  }, [transactionType, coordinates.latitude, coordinates.longitude]);

  // Filtrer les propriétés par proximité
  const findNearbyProperties = (radius: number = 10) => {
    if (!hasLocation) {
      return;
    }

    setNearbyLoading(true);
    
    // Filtrer uniquement les propriétés avec coordonnées GPS
    const propertiesWithLocation = properties.filter(
      p => p.latitude !== null && p.longitude !== null
    );
    
    // Filtrer par rayon (en km)
    const nearby = propertiesWithLocation
      .filter(p => p.distance !== null && p.distance <= radius)
      .sort((a, b) => (a.distance || 999) - (b.distance || 999));
    
    setFilteredProperties(nearby);
    setNearbyLoading(false);
  };

  // Réinitialiser le filtre de proximité
  const resetNearbyFilter = () => {
    setFilteredProperties(properties);
  };

  return {
    properties: filteredProperties,
    allProperties: properties,
    loading,
    nearbyLoading,
    fetchProperties,
    findNearbyProperties,
    resetNearbyFilter,
    hasLocation,
    permissionDenied
  };
}
