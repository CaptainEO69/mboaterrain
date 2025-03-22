
import { ConversationContext, GeneratedResponse } from "../types/conversationContext";
import { findCityInfo } from "./locationUtils";
import { PREDEFINED_RESPONSES } from "../types";

/**
 * Génère une réponse personnalisée basée sur le contexte
 */
export function generatePersonalizedResponse(
  normalizedQuestion: string,
  conversationContext: ConversationContext
): GeneratedResponse | null {
  const { userProfile, userPreferences, lastCity, lastRegion, lastPropertyType } = conversationContext;
  
  // Personnalisation pour utilisateurs connectés
  if (userProfile?.isLoggedIn) {
    // Réponse pour professionnels
    if (userProfile.userType && userProfile.userType !== "particulier") {
      if (normalizedQuestion.includes("conseil") || normalizedQuestion.includes("expertise") || normalizedQuestion.includes("professionnel")) {
        const professionalResponses = PREDEFINED_RESPONSES["professionnel"];
        if (professionalResponses) {
          return {
            content: professionalResponses[Math.floor(Math.random() * professionalResponses.length)],
            isPersonalized: true,
            isExpert: true
          };
        }
      }
    }
    
    // Personnalisation basée sur les préférences utilisateur
    if (userPreferences) {
      // Si nous avons une ville et un type de propriété
      if (lastCity && userPreferences.purpose && lastPropertyType) {
        const city = findCityInfo(lastCity);
        if (city) {
          const propertyTypeMsg = lastPropertyType === "terrain" ? "terrains" : 
                                lastPropertyType === "maison" ? "maisons" :
                                lastPropertyType === "appartement" ? "appartements" :
                                lastPropertyType === "bureau" ? "bureaux/commerces" : "biens immobiliers";
          
          const popularAreas = city.neighborhoods
            .filter(n => n.isPopular)
            .map(n => n.name)
            .slice(0, 3)
            .join(", ");
          
          return {
            content: `Selon votre profil et votre intérêt pour ${userPreferences.purpose === "achat" ? "l'achat" : 
                       userPreferences.purpose === "location" ? "la location" : "l'investissement"} de ${propertyTypeMsg} 
                     à ${city.name}, je vous recommande particulièrement les quartiers de ${popularAreas}.
                     ${userPreferences.budget ? `Avec un budget de ${userPreferences.budget}, vous pourriez ${
                       userPreferences.purpose === "achat" ? "acquérir" : 
                       userPreferences.purpose === "location" ? "louer" : "investir dans"
                     } un bien de bonne qualité dans ces zones.` : ""}`,
            isPersonalized: true,
            isExpert: true
          };
        }
      }
      // Si nous avons juste une ville
      else if (lastCity && userPreferences.purpose) {
        const city = findCityInfo(lastCity);
        if (city) {
          const popularAreas = city.neighborhoods
            .filter(n => n.isPopular)
            .map(n => n.name)
            .slice(0, 3)
            .join(", ");
          
          return {
            content: `Selon votre profil et votre intérêt pour ${userPreferences.purpose === "achat" ? "l'achat" : 
                       userPreferences.purpose === "location" ? "la location" : "l'investissement"}, 
                     à ${city.name}, je vous recommande particulièrement les quartiers de ${popularAreas}.
                     ${userPreferences.budget ? `Avec un budget de ${userPreferences.budget}, vous pourriez ${
                       userPreferences.purpose === "achat" ? "acquérir" : 
                       userPreferences.purpose === "location" ? "louer" : "investir dans"
                     } un bien de bonne qualité dans ces zones.` : ""}`,
            isPersonalized: true,
            isExpert: true
          };
        }
      }
    }
  }
  
  return null;
}
