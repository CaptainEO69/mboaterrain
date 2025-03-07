
import { City, Neighborhood, CAMEROON_CITIES } from "../types";

/**
 * Trouve les informations sur une ville
 */
export function findCityInfo(cityName: string): City | null {
  const normalizedCityName = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  for (const region in CAMEROON_CITIES) {
    const cityInfo = CAMEROON_CITIES[region].find(
      city => city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalizedCityName
    );
    
    if (cityInfo) {
      return cityInfo;
    }
  }
  
  return null;
}

/**
 * Trouve les informations sur un quartier
 */
export function findNeighborhoodInfo(cityName: string, neighborhoodName: string): Neighborhood | null {
  const city = findCityInfo(cityName);
  if (!city) return null;
  
  const normalizedNeighborhoodName = neighborhoodName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  for (const neighborhood of city.neighborhoods) {
    const normalizedName = neighborhood.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalizedName === normalizedNeighborhoodName) {
      return neighborhood;
    }
  }
  
  return null;
}

/**
 * Obtient les quartiers populaires d'une ville
 */
export function getPopularNeighborhoods(cityName: string): string {
  const city = findCityInfo(cityName);
  if (!city) return "Je n'ai pas d'informations sur cette ville.";
  
  const popularNeighborhoods = city.neighborhoods
    .filter(n => n.isPopular)
    .map(n => n.name)
    .join(", ");
  
  return `À ${city.name}, les quartiers les plus recherchés sont ${popularNeighborhoods}. ${city.description} Les prix immobiliers varient généralement entre ${city.priceRange}.`;
}
