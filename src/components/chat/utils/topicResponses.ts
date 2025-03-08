
import { GeneratedResponse } from "../types/conversationContext";

/**
 * Génère une réponse pour des questions spécifiques sur le timing
 */
export function generateTimingResponse(isExpertQuestion: boolean): GeneratedResponse {
  return {
    content: isExpertQuestion 
      ? "Le meilleur moment pour acheter est généralement en début d'année ou pendant la saison des pluies (juin-septembre) quand il y a moins d'activité sur le marché. Les prix sont souvent plus négociables à ces périodes. Les statistiques montrent une baisse d'activité de 15-20% pendant ces périodes, ce qui donne un avantage aux acheteurs."
      : "Le meilleur moment pour acheter est généralement en début d'année ou pendant la saison des pluies (juin-septembre) quand il y a moins d'activité sur le marché. Les prix sont souvent plus négociables à ces périodes.",
    isPersonalized: false,
    isExpert: isExpertQuestion
  };
}

/**
 * Génère une réponse pour des questions sur les délais
 */
export function generateTimeframeResponse(isExpertQuestion: boolean): GeneratedResponse {
  return {
    content: isExpertQuestion
      ? "La durée moyenne d'une transaction immobilière complète au Cameroun est de 2 à 3 mois. Cela inclut: la période de mise en vente (2-3 semaines), les visites (1-2 semaines), la négociation (1-2 semaines), et les formalités administratives et notariales (3-4 semaines). La vérification du titre foncier peut parfois allonger ce délai, surtout dans les zones rurales."
      : "La durée moyenne d'une transaction immobilière complète au Cameroun est de 2 à 3 mois. Cela inclut la période de mise en vente, les visites, la négociation, et les formalités administratives et notariales.",
    isPersonalized: false,
    isExpert: isExpertQuestion
  };
}

/**
 * Génère une réponse de remerciement
 */
export function generateThankYouResponse(): GeneratedResponse {
  return {
    content: "Je vous en prie, c'est un plaisir de vous aider! N'hésitez pas si vous avez d'autres questions concernant l'immobilier au Cameroun.",
    isPersonalized: false,
    isExpert: false
  };
}

/**
 * Génère une suggestion de sujet
 */
export function generateTopicSuggestion(
  lastCity?: string, 
  lastRegion?: string, 
  lastTopic?: string, 
  lastPropertyType?: string
): GeneratedResponse {
  let suggestedTopic = "";
  
  if (lastCity) {
    suggestedTopic = `Pour ${lastCity}, je peux vous renseigner sur les quartiers prisés, les prix du marché, ou les opportunités d'investissement. Que souhaitez-vous savoir plus précisément?`;
  } else if (lastRegion) {
    suggestedTopic = `Concernant la région ${lastRegion}, je peux vous informer sur les principales villes, le marché immobilier local ou les spécificités de cette zone. Que voulez-vous explorer?`;
  } else if (lastTopic) {
    suggestedTopic = `Pour approfondir sur le sujet "${lastTopic}", avez-vous des questions plus spécifiques? Je peux vous donner des détails précis adaptés à votre situation.`;
  } else if (lastPropertyType) {
    const propertyTypeMsg = lastPropertyType === "terrain" ? "terrains" : 
                          lastPropertyType === "maison" ? "maisons" :
                          lastPropertyType === "appartement" ? "appartements" :
                          lastPropertyType === "commercial" ? "espaces commerciaux" : "biens immobiliers";
    suggestedTopic = `Concernant les ${propertyTypeMsg}, je peux vous informer sur les prix, les meilleures zones, ou les conseils d'achat/investissement. Que voulez-vous savoir plus précisément?`;
  } else {
    suggestedTopic = "Je peux vous renseigner sur les villes et quartiers du Cameroun, les prix du marché, les démarches d'achat/vente, ou l'investissement immobilier. Quel sujet vous intéresse en particulier?";
  }
  
  return {
    content: suggestedTopic,
    isPersonalized: false,
    isExpert: false
  };
}
