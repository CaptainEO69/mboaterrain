
import { City } from "../types/locationTypes";

export const NORD_CITIES: City[] = [
  {
    name: "Garoua",
    region: "Nord",
    neighborhoods: [
      { name: "Bibémiré", isPopular: true, description: "Quartier central et administratif." },
      { name: "Marouaré", isPopular: true, description: "Zone résidentielle développée." },
      { name: "Lopéré", isPopular: false, description: "Quartier résidentiel." },
      { name: "Foulbéré", isPopular: false, description: "Zone traditionnelle." },
      { name: "Poumpoumré", isPopular: false, description: "Quartier périphérique." },
      { name: "Djamboutou", isPopular: false, description: "Zone en développement." }
    ],
    priceRange: "20 000 - 85 000 FCFA/m²",
    description: "Capitale régionale du Nord, ville portuaire sur la Bénoué, centre commercial et industriel important.",
    keyFeatures: ["Port fluvial", "Industrie cotonnière", "Aéroport", "Architecture traditionnelle"]
  }
];
