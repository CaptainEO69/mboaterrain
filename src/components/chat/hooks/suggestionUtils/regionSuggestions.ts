
import { CAMEROON_CITIES } from "../../data/citiesData";

/**
 * Generates suggestions based on a mentioned region
 */
export function generateRegionSuggestions(lastRegion: string): string[] {
  const suggestions: string[] = [];
  
  suggestions.push(`Villes en ${lastRegion}?`);
  
  const regionCities = CAMEROON_CITIES[lastRegion];
  if (regionCities && regionCities.length > 0) {
    // Take 2 random cities from the region
    const randomCities = [...regionCities]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
      
    suggestions.push(`Infos sur ${randomCities[0].name}?`);
    if (randomCities.length > 1) {
      suggestions.push(`Quartiers à ${randomCities[1].name}?`);
    }
  }
  
  return suggestions;
}
