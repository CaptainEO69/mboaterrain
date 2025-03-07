
import { ConversationContext } from "../types/conversationContext";
import { CAMEROON_CITIES } from "../types";

/**
 * Extrait le contexte à partir de la question posée par l'utilisateur
 */
export function extractContextFromQuery(
  normalizedQuery: string,
  setConversationContext: (updater: (prev: ConversationContext) => ConversationContext) => void
): void {
  // Détection de région
  for (const region in CAMEROON_CITIES) {
    const normalizedRegion = region.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalizedQuery.includes(normalizedRegion)) {
      setConversationContext(prev => ({ ...prev, lastRegion: region }));
      break;
    }
  }

  // Détection de ville
  for (const region in CAMEROON_CITIES) {
    for (const city of CAMEROON_CITIES[region]) {
      const normalizedCityName = city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (normalizedQuery.includes(normalizedCityName)) {
        setConversationContext(prev => ({ 
          ...prev, 
          lastCity: city.name, 
          lastRegion: city.region 
        }));
        break;
      }
    }
  }

  // Détection de quartier
  for (const region in CAMEROON_CITIES) {
    for (const city of CAMEROON_CITIES[region]) {
      for (const neighborhood of city.neighborhoods) {
        const normalizedNeighborhoodName = neighborhood.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (normalizedQuery.includes(normalizedNeighborhoodName)) {
          setConversationContext(prev => ({ 
            ...prev, 
            lastNeighborhood: neighborhood.name,
            lastCity: city.name,
            lastRegion: city.region 
          }));
          break;
        }
      }
    }
  }

  // Détection de type de bien immobilier
  const propertyTypes = [
    { type: "terrain", keywords: ["terrain", "parcelle", "lot", "hectare", "are", "m2"] },
    { type: "maison", keywords: ["maison", "villa", "pavillon", "domicile", "residence", "résidence"] },
    { type: "appartement", keywords: ["appartement", "studio", "f1", "f2", "f3", "f4", "f5", "t1", "t2", "t3", "t4", "t5"] },
    { type: "bureau", keywords: ["bureau", "local", "commerce", "commercial", "boutique", "magasin", "shop"] },
    { type: "immeuble", keywords: ["immeuble", "building", "batiment", "bâtiment"] }
  ];

  for (const { type, keywords } of propertyTypes) {
    if (keywords.some(keyword => normalizedQuery.includes(keyword))) {
      setConversationContext(prev => ({ ...prev, lastPropertyType: type }));
      
      // Mise à jour des préférences utilisateur
      setConversationContext(prev => ({
        ...prev,
        userPreferences: { ...prev.userPreferences, propertyType: type }
      }));
      break;
    }
  }

  // Détection de préférences
  if (normalizedQuery.includes("acheter") || normalizedQuery.includes("achat")) {
    setConversationContext(prev => ({
      ...prev,
      userPreferences: { ...prev.userPreferences, purpose: "achat" }
    }));
  } else if (normalizedQuery.includes("louer") || normalizedQuery.includes("location")) {
    setConversationContext(prev => ({
      ...prev,
      userPreferences: { ...prev.userPreferences, purpose: "location" }
    }));
  } else if (normalizedQuery.includes("investir") || normalizedQuery.includes("investissement")) {
    setConversationContext(prev => ({
      ...prev,
      userPreferences: { ...prev.userPreferences, purpose: "investissement" }
    }));
  }

  // Détection de type de bien
  if (normalizedQuery.includes("maison") || normalizedQuery.includes("villa")) {
    setConversationContext(prev => ({
      ...prev,
      userPreferences: { ...prev.userPreferences, propertyType: "maison" }
    }));
  } else if (normalizedQuery.includes("appartement")) {
    setConversationContext(prev => ({
      ...prev,
      userPreferences: { ...prev.userPreferences, propertyType: "appartement" }
    }));
  } else if (normalizedQuery.includes("terrain") || normalizedQuery.includes("parcelle")) {
    setConversationContext(prev => ({
      ...prev,
      userPreferences: { ...prev.userPreferences, propertyType: "terrain" }
    }));
  } else if (normalizedQuery.includes("bureau") || normalizedQuery.includes("commerce")) {
    setConversationContext(prev => ({
      ...prev,
      userPreferences: { ...prev.userPreferences, propertyType: "commercial" }
    }));
  }

  // Détection de budget
  const budgetRegex = /(\d+)\s*(millions?|million|m|fcfa|franc|xaf)/i;
  const budgetMatch = normalizedQuery.match(budgetRegex);
  if (budgetMatch) {
    let budget = budgetMatch[1];
    if (budgetMatch[2].toLowerCase().startsWith('m')) {
      budget = budget + " millions FCFA";
    } else {
      budget = budget + " FCFA";
    }
    setConversationContext(prev => ({
      ...prev,
      userPreferences: { ...prev.userPreferences, budget: budget }
    }));
  }

  // Détection de sujets/topics
  const topicKeywords: Record<string, string[]> = {
    "prix": ["prix", "coute", "cout", "cher", "budget", "tarif", "cout", "coutent", "valent", "vaut"],
    "marché": ["marche", "marché", "tendance", "evolution", "évolution", "demande", "offre"],
    "investissement": ["investir", "investissement", "placement", "rendement", "rentabilite", "rentabilité"],
    "document": ["document", "papier", "titre", "foncier", "contrat", "notaire", "acte", "légal", "legal"],
    "financement": ["credit", "crédit", "pret", "prêt", "banque", "financement", "financer"],
    "démarche": ["demarche", "démarche", "procedure", "procédure", "étape", "etape", "comment", "processus"],
    "sécurité": ["securite", "sécurité", "sur", "sûr", "fiable", "confiance", "arnaque", "risque"]
  };

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => normalizedQuery.includes(keyword))) {
      setConversationContext(prev => ({ ...prev, lastTopic: topic }));
      break;
    }
  }
}
