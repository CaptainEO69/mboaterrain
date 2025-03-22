
import { ConversationContext, GeneratedResponse } from "../types/conversationContext";
import { findCityInfo } from "./locationUtils";
import { PREDEFINED_RESPONSES } from "../types";
import { supabase } from "@/integrations/supabase/client";

/**
 * Génère une réponse personnalisée basée sur le contexte
 */
export async function generatePersonalizedResponse(
  normalizedQuestion: string,
  conversationContext: ConversationContext,
  userId?: string
): Promise<GeneratedResponse | null> {
  const { userProfile, userPreferences, lastCity, lastRegion, lastPropertyType } = conversationContext;
  
  // If user is logged in, try to get more detailed preferences from database
  let enhancedPreferences = userPreferences;
  
  if (userId) {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('price_min, price_max, preferred_locations, specific_criteria, property_type')
        .eq('user_id', userId)
        .maybeSingle();
        
      if (data) {
        enhancedPreferences = {
          ...userPreferences,
          budget: data.price_min && data.price_max ? 
            `${data.price_min.toLocaleString()} à ${data.price_max.toLocaleString()} FCFA` : 
            userPreferences?.budget,
          propertyType: data.property_type || userPreferences?.propertyType,
          preferredLocations: data.preferred_locations || userPreferences?.preferredLocations,
          specificCriteria: data.specific_criteria
        };
      }
    } catch (error) {
      console.error("Error fetching user preferences:", error);
    }
  }
  
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
    if (enhancedPreferences) {
      // Si nous avons une ville et un type de propriété
      if (lastCity && enhancedPreferences.purpose && lastPropertyType) {
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
          
          // Check if user has specific criteria
          const criteriaMsg = enhancedPreferences.specificCriteria ? 
            Object.entries(enhancedPreferences.specificCriteria as Record<string, boolean>)
              .filter(([_, value]) => value)
              .map(([key]) => {
                switch(key) {
                  case 'pool': return 'piscine';
                  case 'balcony': return 'balcon';
                  case 'garage': return 'garage';
                  case 'garden': return 'jardin';
                  case 'security': return 'sécurité';
                  case 'furnished': return 'meublé';
                  default: return key;
                }
              }).join(', ') : '';
              
          const criteriaSection = criteriaMsg ? 
            `Je vois aussi que vous recherchez des propriétés avec: ${criteriaMsg}. ` : '';
          
          return {
            content: `Selon votre profil et votre intérêt pour ${enhancedPreferences.purpose === "achat" ? "l'achat" : 
                       enhancedPreferences.purpose === "location" ? "la location" : "l'investissement"} de ${propertyTypeMsg} 
                     à ${city.name}, je vous recommande particulièrement les quartiers de ${popularAreas}.
                     ${criteriaSection}
                     ${enhancedPreferences.budget ? `Avec un budget de ${enhancedPreferences.budget}, vous pourriez ${
                       enhancedPreferences.purpose === "achat" ? "acquérir" : 
                       enhancedPreferences.purpose === "location" ? "louer" : "investir dans"
                     } un bien de bonne qualité dans ces zones.` : ""}`,
            isPersonalized: true,
            isExpert: true
          };
        }
      }
      // Si nous avons juste une ville
      else if (lastCity && enhancedPreferences.purpose) {
        const city = findCityInfo(lastCity);
        if (city) {
          const popularAreas = city.neighborhoods
            .filter(n => n.isPopular)
            .map(n => n.name)
            .slice(0, 3)
            .join(", ");
          
          // Include preferred locations if available
          const locationPreferences = enhancedPreferences.preferredLocations && 
            enhancedPreferences.preferredLocations.length > 0 ? 
            `Je note aussi que vous vous intéressez particulièrement à ${enhancedPreferences.preferredLocations.join(', ')}. ` : '';
          
          return {
            content: `${locationPreferences}Selon votre profil et votre intérêt pour ${enhancedPreferences.purpose === "achat" ? "l'achat" : 
                       enhancedPreferences.purpose === "location" ? "la location" : "l'investissement"}, 
                     à ${city.name}, je vous recommande particulièrement les quartiers de ${popularAreas}.
                     ${enhancedPreferences.budget ? `Avec un budget de ${enhancedPreferences.budget}, vous pourriez ${
                       enhancedPreferences.purpose === "achat" ? "acquérir" : 
                       enhancedPreferences.purpose === "location" ? "louer" : "investir dans"
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
