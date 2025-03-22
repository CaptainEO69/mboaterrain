
import { useState, useEffect } from "react";
import { useProperties } from "./useProperties";
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
  const { properties: allProperties, loading, fetchProperties } = useProperties(transactionType);
  const [properties, setProperties] = useState<PropertyWithLocation[]>([]);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  
  const { 
    coordinates, 
    calculateDistance, 
    hasLocation,
    permissionDenied
  } = useGeolocation();

  // Calculate distances when properties or location change
  useEffect(() => {
    if (!allProperties) return;

    const propertiesWithDistance = allProperties.map(property => {
      let distance = null;
      
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
        distance
      };
    });

    setProperties(propertiesWithDistance);
  }, [allProperties, coordinates.latitude, coordinates.longitude, hasLocation, calculateDistance]);

  // Find nearby properties
  const findNearbyProperties = (radius: number = 10) => {
    if (!hasLocation) return;

    setNearbyLoading(true);
    
    // Filter properties with location data
    const propertiesWithLocation = properties.filter(
      p => p.latitude !== null && p.longitude !== null
    );
    
    // Filter by radius and sort by distance
    const nearby = propertiesWithLocation
      .filter(p => p.distance !== null && p.distance <= radius)
      .sort((a, b) => (a.distance || 999) - (b.distance || 999));
    
    setProperties(nearby);
    setNearbyLoading(false);
  };

  // Reset filters
  const resetNearbyFilter = () => {
    // Recalculate distances for all properties
    const propertiesWithDistance = allProperties.map(property => {
      let distance = null;
      
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
        distance
      };
    });

    setProperties(propertiesWithDistance);
  };

  // Apply filters from the search form
  const applyFilters = (filters: PropertyFilters) => {
    fetchProperties(filters);
  };

  return {
    properties,
    allProperties,
    loading,
    nearbyLoading,
    fetchProperties: applyFilters,
    findNearbyProperties,
    resetNearbyFilter,
    hasLocation,
    permissionDenied
  };
}
