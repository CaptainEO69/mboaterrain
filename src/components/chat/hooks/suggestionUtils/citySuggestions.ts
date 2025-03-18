
import { CAMEROON_CITIES } from "../../data/citiesData";

/**
 * Generates suggestions based on a mentioned city and topic
 */
export function generateCitySuggestions(lastCity: string, lastTopic: string | null): string[] {
  const suggestions: string[] = [];
  
  suggestions.push(`Quartiers prisés à ${lastCity}?`);
  suggestions.push(`Prix à ${lastCity}?`);
  
  if (lastTopic === "investissement") {
    suggestions.push(`Investir à ${lastCity}?`);
  } else if (lastTopic === "document") {
    suggestions.push(`Démarches à ${lastCity}?`);
  } else if (lastTopic === "credit") {
    suggestions.push(`Financement à ${lastCity}?`);
  } else {
    suggestions.push(`Marché immobilier à ${lastCity}?`);
  }
  
  return suggestions;
}
