
/**
 * Catégories de mots-clés pour identifier les sujets de questions
 */
export const keywordMappings: Record<string, string[]> = {
  "prix": ["cout", "coute", "cher", "budget", "prix", "tarif", "combien", "fcfa", "xaf", "euro", "dollar"],
  "vente": ["vendre", "vente", "mettre en vente", "vends", "céder", "ceder", "mise en vente"],
  "location": ["louer", "location", "bail", "locataire", "proprietaire", "propriétaire"],
  "document": ["document", "papier", "titre", "foncier", "contrat", "acte", "cadastre", "légal", "legal"],
  "investissement": ["investir", "investissement", "placement", "rendement", "rentabilité", "rentabilite"],
  "crédit": ["credit", "crédit", "pret", "prêt", "banque", "financement", "financer", "emprunt"],
  "construction": ["construire", "construction", "bâtir", "batir", "chantier", "architecte", "entrepreneur"],
  "quartier": ["quartier", "zone", "secteur", "emplacement", "lieu"],
  "notaire": ["notaire", "acte", "authentique", "officiel", "légalisation", "legalisation"],
  "regions": ["region", "régions", "province", "cameroun", "pays"],
  "villes": ["ville", "cité", "urban", "agglomeration", "métropole"],
  "sécurité": ["securite", "sécurité", "arnaque", "fraude", "confiance", "fiable", "sûr", "sur"],
  "visite": ["visite", "visiter", "voir", "rendez-vous", "rendez", "rendezvous", "rdv"],
  "estimation": ["estimer", "estimation", "evaluer", "évaluer", "evaluation", "évaluation", "valeur", "vaut"],
  "expertise": ["expert", "spécialiste", "professionnel", "expertise", "spécialise", "spécialisé"],
  "professionnel": ["agent", "courtier", "promoteur", "profession", "notaire", "architecte", "expert"]
};

/**
 * Détecte les mots-clés dans une question normalisée
 */
export function detectKeywords(normalizedQuestion: string): string[] {
  const detectedCategories: string[] = [];
  
  for (const [category, keywords] of Object.entries(keywordMappings)) {
    if (keywords.some(keyword => normalizedQuestion.includes(keyword))) {
      detectedCategories.push(category);
    }
  }
  
  return detectedCategories;
}

/**
 * Détecte si une question est une demande d'expertise (détaillée)
 */
export function isExpertQuestion(normalizedQuestion: string): boolean {
  return normalizedQuestion.includes("exactement") || 
         normalizedQuestion.includes("precisement") || 
         normalizedQuestion.includes("précisément") ||
         normalizedQuestion.includes("detail") || 
         normalizedQuestion.includes("détail") ||
         normalizedQuestion.includes("expliquez") ||
         normalizedQuestion.includes("pourquoi") ||
         (normalizedQuestion.includes("comment") && (
           normalizedQuestion.includes("fonctionne") || 
           normalizedQuestion.includes("procédure") || 
           normalizedQuestion.includes("procedure")
         ));
}

/**
 * Détecte le type de propriété mentionné dans la question
 */
export function detectPropertyType(normalizedQuestion: string): string | null {
  const propertyTypes = {
    "terrain": ["terrain", "parcelle", "lot"],
    "maison": ["maison", "villa", "pavillon"],
    "appartement": ["appartement", "studio", "f1", "f2", "f3"],
    "commercial": ["bureau", "commerce", "local", "boutique"]
  };
  
  for (const [type, keywords] of Object.entries(propertyTypes)) {
    if (keywords.some(keyword => normalizedQuestion.includes(keyword))) {
      return type;
    }
  }
  
  return null;
}

/**
 * Extrait une ville potentielle de la question
 */
export function extractCityFromQuestion(normalizedQuestion: string): string | null {
  const cityRegex = /(?:a|de|sur|pour|dans|quartiers?(?:\sde)?)\s+([a-zA-Zé\s]+?)(?:$|\s+[?.,]|\s+(?:qui|pour|comment|est|sont))/i;
  const cityMatch = normalizedQuestion.match(cityRegex);
  
  if (cityMatch) {
    const potentialCity = cityMatch[1].trim();
    if (potentialCity && potentialCity.length > 3) {
      return potentialCity;
    }
  }
  
  // Détection directe de villes majeures
  if (normalizedQuestion.includes("yaounde")) return "Yaoundé";
  if (normalizedQuestion.includes("douala")) return "Douala";
  
  return null;
}

/**
 * Extrait un quartier potentiel de la question
 */
export function extractNeighborhoodFromQuestion(normalizedQuestion: string): string | null {
  const neighborhoodRegex = /(?:quartier|zone|secteur)\s+([a-zA-Zé\s]+?)(?:$|\s+[?.,]|\s+(?:a|de|qui|pour|comment|est|sont))/i;
  const neighborhoodMatch = normalizedQuestion.match(neighborhoodRegex);
  
  if (neighborhoodMatch) {
    const potentialNeighborhood = neighborhoodMatch[1].trim();
    if (potentialNeighborhood && potentialNeighborhood.length > 3) {
      return potentialNeighborhood;
    }
  }
  
  return null;
}

/**
 * Détecte si la question concerne les meilleurs emplacements
 */
export function isBestLocationQuestion(normalizedQuestion: string): boolean {
  return (normalizedQuestion.includes("meilleur") || normalizedQuestion.includes("mieux") || 
         normalizedQuestion.includes("ideal") || normalizedQuestion.includes("idéal") || 
         normalizedQuestion.includes("bon")) && 
        (normalizedQuestion.includes("endroit") || normalizedQuestion.includes("emplacement") || 
         normalizedQuestion.includes("quartier") || normalizedQuestion.includes("lieu") ||
         normalizedQuestion.includes("zone"));
}
