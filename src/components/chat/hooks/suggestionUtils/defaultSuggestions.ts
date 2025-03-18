
import { CAMEROON_CITIES } from "../../data/citiesData";

/**
 * Generates default suggestions when no specific context is detected
 */
export function generateDefaultSuggestions(): string[] {
  const suggestions: string[] = [];
  
  // Suggestions based on different cities
  const allRegions = Object.keys(CAMEROON_CITIES);
  const randomRegion1 = allRegions[Math.floor(Math.random() * allRegions.length)];
  const randomRegion2 = allRegions[Math.floor(Math.random() * allRegions.length)];
  
  if (CAMEROON_CITIES[randomRegion1] && CAMEROON_CITIES[randomRegion1].length > 0) {
    const randomCity1 = CAMEROON_CITIES[randomRegion1][0];
    suggestions.push(`Infos sur ${randomCity1.name}?`);
  } else {
    suggestions.push("Prix du marché?");
  }
  
  if (CAMEROON_CITIES[randomRegion2] && CAMEROON_CITIES[randomRegion2].length > 0) {
    const randomCity2 = CAMEROON_CITIES[randomRegion2][0];
    suggestions.push(`Quartiers à ${randomCity2.name}?`);
  } else {
    suggestions.push("Conseils d'investissement?");
  }
  
  // General suggestion
  suggestions.push("Démarches d'achat?");
  
  return suggestions;
}
