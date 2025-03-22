
// Type pour le contexte de conversation
export interface ConversationContext {
  lastCity?: string;
  lastRegion?: string;
  lastNeighborhood?: string;
  lastTopic?: string;
  lastPropertyType?: string;
  userPreferences?: {
    budget?: string;
    propertyType?: string;
    purpose?: string; // achat, location, investissement
    preferredLocations?: string[];
  };
  userProfile?: {
    isLoggedIn: boolean;
    userType?: string; // particulier, agent, notaire, etc.
    interests?: string[];
  };
  // Historique des recherches récentes pour mieux comprendre le contexte
  recentSearches?: string[];
}

// Type pour les réponses générées
export interface GeneratedResponse {
  content: string;
  isPersonalized: boolean;
  isExpert: boolean;
}
