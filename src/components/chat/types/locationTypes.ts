
// Structure pour les quartiers
export interface Neighborhood {
  name: string;
  description?: string;
  isPopular: boolean;
  priceRange?: string;
}

// Structure pour les villes
export interface City {
  name: string;
  region: string;
  neighborhoods: Neighborhood[];
  priceRange: string;
  description: string;
  keyFeatures?: string[];
}

// Type pour la base de données des villes et quartiers
export type CameroonCitiesDatabase = Record<string, City[]>;
