
import { City } from "../types/locationTypes";

export const EXTREMENORD_CITIES: City[] = [
  {
    name: "Maroua",
    region: "Extrême-Nord",
    neighborhoods: [
      { name: "Domayo", isPopular: true, description: "Quartier central animé." },
      { name: "Djarengol", isPopular: true, description: "Zone résidentielle moderne." },
      { name: "Kakataré", isPopular: false, description: "Quartier traditionnel." },
      { name: "Dougoï", isPopular: false, description: "Zone résidentielle." },
      { name: "Palar", isPopular: false, description: "Quartier périphérique." },
      { name: "Baouliwol", isPopular: false, description: "Zone en développement." }
    ],
    priceRange: "15 000 - 75 000 FCFA/m²",
    description: "Capitale régionale de l'Extrême-Nord, centre artisanal et touristique, connue pour son artisanat et ses paysages.",
    keyFeatures: ["Artisanat", "Monts Mandara", "Université", "Architecture traditionnelle"]
  },
  {
    name: "Kousseri",
    region: "Extrême-Nord",
    neighborhoods: [
      { name: "Centre-ville", isPopular: true, description: "Zone commerciale centrale." },
      { name: "Lac", isPopular: false, description: "Quartier proche du Logone." },
      { name: "Douanes", isPopular: false, description: "Zone frontalière." }
    ],
    priceRange: "15 000 - 60 000 FCFA/m²",
    description: "Ville frontalière avec le Tchad, située sur le fleuve Logone, importante pour le commerce transfrontalier.",
    keyFeatures: ["Commerce frontalier", "Fleuve Logone", "Proximité avec N'Djamena"]
  }
];
