
import { City, Neighborhood } from "../types/locationTypes";
import { CAMEROON_CITIES } from "../data/citiesData";

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

/**
 * Trouve les villes d'une région
 */
export function getCitiesInRegion(regionName: string): City[] {
  const normalizedRegionName = regionName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  for (const region in CAMEROON_CITIES) {
    const normalizedRegion = region.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalizedRegion === normalizedRegionName) {
      return CAMEROON_CITIES[region];
    }
  }
  
  return [];
}

/**
 * Obtient toutes les régions du Cameroun
 */
export function getAllRegions(): string[] {
  return Object.keys(CAMEROON_CITIES);
}

/**
 * Obtient toutes les villes du Cameroun
 */
export function getAllCities(): City[] {
  const allCities: City[] = [];
  
  for (const region in CAMEROON_CITIES) {
    allCities.push(...CAMEROON_CITIES[region]);
  }
  
  return allCities;
}

/**
 * Obtient les prix moyens au m² pour une ville
 */
export function getPricePerSquareMeter(cityName: string): string {
  const city = findCityInfo(cityName);
  if (!city) return "Je n'ai pas d'informations sur les prix dans cette ville.";
  
  // Convertir la fourchette de prix en information plus détaillée
  const priceInfo = getPriceDetailsByCity(city);
  
  return `À ${city.name}, les prix au m² varient généralement entre ${priceInfo.residential.min} et ${priceInfo.residential.max} FCFA pour les zones résidentielles, et entre ${priceInfo.commercial.min} et ${priceInfo.commercial.max} FCFA pour les zones commerciales.`;
}

/**
 * Obtient des informations détaillées sur les prix pour chaque type de bien
 */
export function getPriceDetailsByCity(city: City): { 
  residential: { min: string, max: string },
  commercial: { min: string, max: string },
  land: { min: string, max: string }
} {
  // Analyse la fourchette de prix générale
  const priceRange = city.priceRange;
  const matches = priceRange.match(/(\d+[\s\d]*)\s*-\s*(\d+[\s\d]*)\s*FCFA/);
  
  // Valeurs par défaut
  const defaultMin = "20 000";
  const defaultMax = "100 000";
  
  let min = defaultMin;
  let max = defaultMax;
  
  if (matches && matches.length >= 3) {
    min = matches[1].trim();
    max = matches[2].trim();
  }
  
  // Ajuster les prix selon la ville
  const adjustmentFactor = getPriceAdjustmentFactor(city.name);
  
  return {
    residential: {
      min: min,
      max: max
    },
    commercial: {
      min: calculateAdjustedPrice(min, adjustmentFactor.commercial.min),
      max: calculateAdjustedPrice(max, adjustmentFactor.commercial.max)
    },
    land: {
      min: calculateAdjustedPrice(min, adjustmentFactor.land.min),
      max: calculateAdjustedPrice(max, adjustmentFactor.land.max)
    }
  };
}

/**
 * Calcule un prix ajusté en fonction d'un facteur
 */
function calculateAdjustedPrice(price: string, factor: number): string {
  const numericPrice = parseInt(price.replace(/\s/g, ""));
  const adjustedPrice = Math.round(numericPrice * factor);
  return adjustedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Obtient les facteurs d'ajustement des prix pour chaque ville
 */
function getPriceAdjustmentFactor(cityName: string): {
  commercial: { min: number, max: number },
  land: { min: number, max: number }
} {
  const normalizedCityName = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Ajuster les facteurs selon le contexte de la ville
  if (normalizedCityName === "yaounde" || normalizedCityName === "douala") {
    return {
      commercial: { min: 1.5, max: 2.0 },
      land: { min: 0.6, max: 0.8 }
    };
  } else if (normalizedCityName === "kribi" || normalizedCityName === "limbe" || normalizedCityName === "buea") {
    return {
      commercial: { min: 1.3, max: 1.7 },
      land: { min: 0.5, max: 0.7 }
    };
  } else if (normalizedCityName === "bafoussam" || normalizedCityName === "bamenda") {
    return {
      commercial: { min: 1.2, max: 1.5 },
      land: { min: 0.4, max: 0.6 }
    };
  }
  
  // Valeurs par défaut pour les autres villes
  return {
    commercial: { min: 1.1, max: 1.4 },
    land: { min: 0.3, max: 0.5 }
  };
}
