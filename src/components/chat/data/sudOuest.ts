
import { City } from "../types/locationTypes";

export const SUDOUEST_CITIES: City[] = [
  {
    name: "Buéa",
    region: "Sud-Ouest",
    neighborhoods: [
      { name: "Molyko", isPopular: true, description: "Quartier universitaire dynamique." },
      { name: "Great Soppo", isPopular: true, description: "Zone résidentielle principale." },
      { name: "Federal Quarter", isPopular: true, description: "Ancien quartier administratif colonial." },
      { name: "Small Soppo", isPopular: false, description: "Quartier résidentiel." },
      { name: "Bonduma", isPopular: false, description: "Zone résidentielle en développement." },
      { name: "Clerks Quarter", isPopular: false, description: "Ancien quartier colonial." },
      { name: "Mile 16", isPopular: false, description: "Zone périphérique." },
      { name: "Mile 17", isPopular: false, description: "Zone commerciale importante." }
    ],
    priceRange: "40 000 - 180 000 FCFA/m²",
    description: "Ancienne capitale du Cameroun allemand, située au pied du mont Cameroun avec un climat frais et une belle vue.",
    keyFeatures: ["Mont Cameroun", "Université de Buéa", "Climat frais", "Architecture coloniale"]
  },
  {
    name: "Limbé",
    region: "Sud-Ouest",
    neighborhoods: [
      { name: "Down Beach", isPopular: true, description: "Zone balnéaire animée." },
      { name: "GRA", isPopular: true, description: "Zone résidentielle administrative." },
      { name: "Bota", isPopular: true, description: "Quartier résidentiel de qualité." },
      { name: "Mile 4", isPopular: false, description: "Zone résidentielle." },
      { name: "Middle Farms", isPopular: false, description: "Quartier résidentiel en développement." },
      { name: "Unity Quarter", isPopular: false, description: "Zone résidentielle mixte." },
      { name: "New Town", isPopular: false, description: "Quartier plus récent." }
    ],
    priceRange: "35 000 - 150 000 FCFA/m²",
    description: "Ville côtière avec des plages de sable noir, site de la raffinerie nationale et du jardin botanique, très touristique.",
    keyFeatures: ["Plages de sable noir", "Jardin botanique", "Raffinerie", "Tourisme"]
  }
];
