
import { ConversationContext, GeneratedResponse } from "../types/conversationContext";
import { PREDEFINED_RESPONSES } from "../types";
import { findCityInfo, findNeighborhoodInfo, getPopularNeighborhoods } from "./locationUtils";
import { CAMEROON_CITIES } from "../data/citiesData";
import { generatePersonalizedResponse } from "./personalizedResponses";
import { generatePropertyTypeResponse, generatePropertyCategoryResponse, generateBestLocationResponse } from "./propertyTypeResponses";
import { generateCityResponse, findAndGenerateNeighborhoodResponse } from "./locationResponses";
import { 
  generateTimingResponse, 
  generateTimeframeResponse, 
  generateThankYouResponse, 
  generateTopicSuggestion 
} from "./topicResponses";
import { 
  detectKeywords, 
  isExpertQuestion, 
  detectPropertyType, 
  extractCityFromQuestion, 
  extractNeighborhoodFromQuestion,
  isBestLocationQuestion
} from "./keywordDetection";

/**
 * Obtient une réponse aléatoire d'une catégorie
 */
export function getRandomResponse(category: string): string {
  const responses = PREDEFINED_RESPONSES[category] || PREDEFINED_RESPONSES["default"];
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Fonction principale pour générer une réponse
 */
export function generateResponse(
  question: string,
  conversationContext: ConversationContext
): GeneratedResponse {
  const normalizedQuestion = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  console.log("Génération de réponse pour:", normalizedQuestion);
  console.log("Contexte actuel:", conversationContext);
  
  // Tentative de réponse personnalisée
  const personalizedResponse = generatePersonalizedResponse(normalizedQuestion, conversationContext);
  if (personalizedResponse) return personalizedResponse;
  
  // Vérification si c'est une question d'expert
  const expertQuestion = isExpertQuestion(normalizedQuestion);
  
  // Détection de la ville dans la question
  const potentialCity = extractCityFromQuestion(normalizedQuestion);
  
  // Détection de type de bien dans la question
  const detectedPropertyType = detectPropertyType(normalizedQuestion);
  
  // Si un type de propriété est détecté dans la question ou dans le contexte
  const propertyType = detectedPropertyType || conversationContext.lastPropertyType;
  
  if (propertyType) {
    // Vérifier s'il y a une ville mentionnée ou en contexte
    const cityName = potentialCity || conversationContext.lastCity;
    
    if (cityName) {
      const cityInfo = findCityInfo(cityName);
      if (cityInfo) {
        // Réponse spécifique au type de bien et à la ville
        const propertyResponse = generatePropertyTypeResponse(propertyType, cityInfo);
        if (propertyResponse) {
          return propertyResponse;
        }
      }
    }
  }
  
  // Vérifier si c'est une demande de quartiers pour une ville spécifique
  if (potentialCity && normalizedQuestion.includes("quartier")) {
    if (potentialCity.length > 3) {
      const cityInfo = findCityInfo(potentialCity);
      if (cityInfo) {
        return {
          content: getPopularNeighborhoods(potentialCity),
          isPersonalized: false,
          isExpert: true
        };
      }
    }
  }
  
  // Vérifier si c'est une demande sur une ville en général
  if (potentialCity) {
    if (potentialCity.length > 3) {
      const cityInfo = findCityInfo(potentialCity);
      if (cityInfo) {
        return generateCityResponse(cityInfo);
      }
    }
  }
  
  // Détection de quartier spécifique
  const potentialNeighborhood = extractNeighborhoodFromQuestion(normalizedQuestion);
  if (potentialNeighborhood) {
    const neighborhoodResponse = findAndGenerateNeighborhoodResponse(
      potentialNeighborhood, 
      conversationContext.lastCity,
      CAMEROON_CITIES
    );
    
    if (neighborhoodResponse) {
      return neighborhoodResponse;
    }
  }
  
  // Détection améliorée des questions sur les meilleurs emplacements
  if (isBestLocationQuestion(normalizedQuestion)) {
    // Chercher si une ville est mentionnée ou en contexte
    const cityName = conversationContext.lastCity || 
                    potentialCity ||
                    (normalizedQuestion.includes("yaounde") ? "Yaoundé" : 
                     normalizedQuestion.includes("douala") ? "Douala" : null);
                     
    if (cityName) {
      const cityInfo = findCityInfo(cityName);
      if (cityInfo) {
        return generateBestLocationResponse(cityInfo, propertyType);
      }
    }
  }
  
  // Questions spécifiques sur le timing
  if (normalizedQuestion.includes("meilleur") && normalizedQuestion.includes("moment")) {
    return generateTimingResponse(expertQuestion);
  }
  
  // Questions sur les délais de transaction
  if ((normalizedQuestion.includes("delai") || normalizedQuestion.includes("durée") || normalizedQuestion.includes("duree") || normalizedQuestion.includes("temps")) && 
      (normalizedQuestion.includes("vente") || normalizedQuestion.includes("vendre") || normalizedQuestion.includes("transaction"))) {
    return generateTimeframeResponse(expertQuestion);
  }
  
  // Remerciements
  if (normalizedQuestion.includes("merci") || normalizedQuestion.includes("super") || normalizedQuestion.includes("excellent")) {
    return generateThankYouResponse();
  }
  
  // Recherche par mots-clés
  const detectedCategories = detectKeywords(normalizedQuestion);
  
  if (detectedCategories.length > 0) {
    // Si nous avons un type de bien et une catégorie, personnaliser la réponse
    if (propertyType) {
      const category = detectedCategories[0]; // Utiliser la première catégorie détectée
      
      // Pour les catégories les plus importantes
      if (category === "prix" || category === "investissement") {
        const specificResponse = generatePropertyCategoryResponse(propertyType, category);
        if (specificResponse) return specificResponse;
      }
    }
    
    // Utiliser une réponse prédéfinie pour la catégorie
    const category = detectedCategories[0];
    const response = getRandomResponse(category);
    return {
      content: response,
      isPersonalized: false,
      isExpert: expertQuestion
    };
  }
  
  // Proposition de sujet si la question n'est pas claire
  if (normalizedQuestion.length < 15 || !normalizedQuestion.includes("?")) {
    return generateTopicSuggestion(
      conversationContext.lastCity,
      conversationContext.lastRegion,
      conversationContext.lastTopic,
      conversationContext.lastPropertyType
    );
  }
  
  // Réponse par défaut
  return {
    content: getRandomResponse("default"),
    isPersonalized: false,
    isExpert: false
  };
}
