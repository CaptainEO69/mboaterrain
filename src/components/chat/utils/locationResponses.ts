
import { City, Neighborhood } from "../types/locations";
import { GeneratedResponse } from "../types/conversationContext";
import { findCityInfo, findNeighborhoodInfo, getPopularNeighborhoods } from "./locationUtils";

/**
 * Génère une réponse pour une ville spécifique
 */
export function generateCityResponse(cityInfo: City): GeneratedResponse {
  const popularAreas = cityInfo.neighborhoods
    .filter(n => n.isPopular)
    .map(n => n.name)
    .join(", ");
    
  return {
    content: `${cityInfo.name} est située dans la région ${cityInfo.region} du Cameroun. ${cityInfo.description}
Les prix immobiliers y varient généralement entre ${cityInfo.priceRange}.
Les quartiers les plus recherchés sont ${popularAreas}.`,
    isPersonalized: false,
    isExpert: true
  };
}

/**
 * Génère une réponse pour un quartier spécifique
 */
export function generateNeighborhoodResponse(
  neighborhoodInfo: Neighborhood, 
  cityName: string,
  cityInfo?: City
): GeneratedResponse {
  return {
    content: `Le quartier ${neighborhoodInfo.name} à ${cityName} est ${
      neighborhoodInfo.isPopular ? "l'un des plus prisés" : "un quartier intéressant"
    } de la ville. ${neighborhoodInfo.description || ""} ${
      neighborhoodInfo.isPopular && cityInfo 
        ? `Les prix y sont généralement dans la fourchette haute de ${cityInfo.priceRange}.` 
        : ""
    }`,
    isPersonalized: false,
    isExpert: true
  };
}

/**
 * Cherche et génère une réponse pour un quartier identifié dans toutes les villes
 */
export function findAndGenerateNeighborhoodResponse(
  potentialNeighborhood: string,
  cityName: string | undefined,
  cities: Record<string, City[]>
): GeneratedResponse | null {
  // Si contexte de ville, chercher dans cette ville
  if (cityName) {
    const neighborhoodInfo = findNeighborhoodInfo(cityName, potentialNeighborhood);
    if (neighborhoodInfo) {
      const city = findCityInfo(cityName);
      return generateNeighborhoodResponse(neighborhoodInfo, cityName, city || undefined);
    }
  }
  
  // Recherche dans toutes les villes principales
  for (const region in cities) {
    for (const city of cities[region]) {
      const neighborhoodInfo = findNeighborhoodInfo(city.name, potentialNeighborhood);
      if (neighborhoodInfo) {
        return {
          content: `Le quartier ${neighborhoodInfo.name} se trouve à ${city.name} (région ${city.region}). C'est ${
            neighborhoodInfo.isPopular ? "l'un des quartiers les plus prisés" : "un quartier"
          } de la ville. ${neighborhoodInfo.description || ""} ${
            neighborhoodInfo.isPopular
              ? `Les prix immobiliers y sont généralement dans la fourchette haute de ${city.priceRange}.` 
              : ""
          }`,
          isPersonalized: false,
          isExpert: true
        };
      }
    }
  }
  
  return null;
}
