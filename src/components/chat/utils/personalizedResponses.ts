import { supabase } from "@/integrations/supabase/client";
import { ConversationContext } from "../types/conversationContext";

// Fonction pour personnaliser les réponses en fonction du contexte de la conversation
export async function getPersonalizedResponse(
  input: string,
  conversationContext: ConversationContext
): Promise<string> {
  let personalizedResponse = "";

  // Exemple de personnalisation basée sur le contexte
  if (conversationContext.lastCity) {
    personalizedResponse += `Ah, je vois que vous êtes intéressé par ${conversationContext.lastCity}. `;
  }

  if (conversationContext.userPreferences?.budget) {
    personalizedResponse += `Vous avez un budget d'environ ${conversationContext.userPreferences.budget}. `;
  }

  // Ajout d'une logique pour recommander des propriétés basées sur les préférences
  if (conversationContext.userPreferences?.propertyType) {
    personalizedResponse += `Je peux vous recommander des propriétés de type ${conversationContext.userPreferences.propertyType}. `;
  }

  // Exemple d'appel à une base de données pour récupérer des informations personnalisées
  if (conversationContext.userProfile?.isLoggedIn) {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("preferred_locations, property_type, price_min, price_max, specific_criteria")
        .eq("user_id", conversationContext.userProfile.user_id)
        .single();

      if (profileData && !profileError) {
        const hasMinPrice = typeof profileData.price_min === 'number';
        const hasMaxPrice = typeof profileData.price_max === 'number';
        const priceRange = hasMinPrice && hasMaxPrice
          ? `entre ${profileData.price_min} et ${profileData.price_max} FCFA`
          : hasMinPrice ? `à partir de ${profileData.price_min} FCFA` : '';
        
        // Only access properties if they exist
        const propertyType = profileData.property_type || '';
        const locations = profileData.preferred_locations || [];
        const criteria = profileData.specific_criteria || [];
        
        // Continue using these variables safely
        if (propertyType) {
          personalizedResponse += `Je vois que vous préférez les biens de type ${propertyType}. `;
        }
  
        if (locations && locations.length > 0) {
          personalizedResponse += `Vous êtes intéressé par les localités suivantes : ${locations.join(", ")}. `;
        }
  
        if (priceRange) {
          personalizedResponse += `Votre budget se situe ${priceRange}. `;
        }
  
        if (criteria && criteria.length > 0) {
          personalizedResponse += `Vous avez des critères spécifiques tels que : ${criteria.join(", ")}. `;
        }
      } else {
        console.error("Erreur lors de la récupération du profil utilisateur:", profileError);
        personalizedResponse += "Je n'ai pas pu récupérer vos préférences pour le moment. ";
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      personalizedResponse += "Une erreur s'est produite lors de la récupération de vos informations. ";
    }
  } else {
    personalizedResponse += "Pour une expérience plus personnalisée, veuillez vous connecter. ";
  }

  return personalizedResponse;
}
