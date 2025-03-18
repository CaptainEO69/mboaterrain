
import { CAMEROON_CITIES } from "../../data/citiesData";

/**
 * Extracts entities like city, region, neighborhood and topic from recent messages
 */
export function extractEntitiesFromMessages(messages: Array<{content: string; sender: string;}>) {
  if (messages.length === 0) return null;
  
  const lastMessages = messages.slice(-3); // Consider the 3 most recent messages
  let lastCity: string | null = null;
  let lastRegion: string | null = null;
  let lastNeighborhood: string | null = null;
  let lastTopic: string | null = null;
  
  // Keywords by category to detect topics
  const topicKeywords: Record<string, string[]> = {
    "prix": ["prix", "coûte", "cher", "budget", "tarif"],
    "investissement": ["investir", "placement", "rendement"],
    "document": ["papier", "titre", "foncier", "notaire"],
    "quartier": ["quartier", "zone", "secteur"],
    "vente": ["vendre", "vente", "céder"],
    "credit": ["prêt", "crédit", "financement"]
  };
  
  // Analyze each message
  for (const msg of lastMessages) {
    const content = msg.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Search for regions
    for (const region in CAMEROON_CITIES) {
      const normalizedRegion = region.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (content.includes(normalizedRegion)) {
        lastRegion = region;
        break;
      }
    }
    
    // Search for cities
    for (const region in CAMEROON_CITIES) {
      for (const city of CAMEROON_CITIES[region]) {
        const normalizedCity = city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (content.includes(normalizedCity)) {
          lastCity = city.name;
          lastRegion = region;
          break;
        }
      }
      if (lastCity) break;
    }
    
    // Search for neighborhoods
    if (lastCity) {
      const cityRegion = Object.keys(CAMEROON_CITIES).find(region => 
        CAMEROON_CITIES[region].some(city => city.name === lastCity)
      );
      
      if (cityRegion) {
        const city = CAMEROON_CITIES[cityRegion].find(city => city.name === lastCity);
        if (city) {
          for (const neighborhood of city.neighborhoods) {
            const normalizedNeighborhood = neighborhood.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (content.includes(normalizedNeighborhood)) {
              lastNeighborhood = neighborhood.name;
              break;
            }
          }
        }
      }
    }
    
    // Search for topics
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(kw => content.includes(kw))) {
        lastTopic = topic;
        break;
      }
    }
  }
  
  return { lastCity, lastRegion, lastNeighborhood, lastTopic };
}
