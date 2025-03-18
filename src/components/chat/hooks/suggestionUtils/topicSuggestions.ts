
/**
 * Generates suggestions based on a detected topic
 */
export function generateTopicSuggestions(lastTopic: string): string[] {
  const suggestions: string[] = [];
  
  if (lastTopic === "prix") {
    suggestions.push("Prix par région?");
    suggestions.push("Estimation précise?");
    suggestions.push("Évolution des prix?");
  } else if (lastTopic === "investissement") {
    suggestions.push("Rendement locatif?");
    suggestions.push("Meilleures zones?");
    suggestions.push("Risques à éviter?");
  } else if (lastTopic === "document") {
    suggestions.push("Vérifier un titre?");
    suggestions.push("Coût des documents?");
    suggestions.push("Notaire nécessaire?");
  } else if (lastTopic === "quartier") {
    suggestions.push("Quartiers à Douala?");
    suggestions.push("Quartiers à Yaoundé?");
    suggestions.push("Critères de choix?");
  } else if (lastTopic === "vente") {
    suggestions.push("Étapes de vente?");
    suggestions.push("Délai moyen?");
    suggestions.push("Frais de vente?");
  } else if (lastTopic === "credit") {
    suggestions.push("Meilleur taux?");
    suggestions.push("Conditions requises?");
    suggestions.push("Délai d'obtention?");
  }
  
  return suggestions;
}
